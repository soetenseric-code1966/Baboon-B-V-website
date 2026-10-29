// Datawerf lab: pure regels (zonder database of netwerk), ook getest met Node (test/lab-regels.test.mjs).
import { APP_FONTS, APP_OPBOUW, APP_STIJL } from "./stijl.ts";

export const MAX_PROMPTS = 10;
export const MAX_TEKST = 4000;
export const BEZIG_VERLOOPT_MS = 7 * 60 * 1000; // een prompt die langer "bezig" is, telt als mislukt
// Waarde van het werk (besluitenlijst, Lab): tijd × factor × uurtarief, doorgestreept; de factor tonen we niet.
export const WAARDE_FACTOR = 5;
export const WAARDE_UURTARIEF = 125;

export type Invoer = { naam?: unknown; email?: unknown; bedrijf?: unknown; idee?: unknown; taal?: unknown };

const tekst = (x: unknown) => (typeof x === "string" ? x.trim() : "");

/** Controleert het startformulier; geeft de nette waarden of een foutmelding in gewone taal. */
export function controleerStart(i: Invoer): { ok: true; naam: string; email: string; bedrijf: string | null; idee: string; taal: "nl" | "en" } | { ok: false; fout: string } {
  const naam = tekst(i.naam), email = tekst(i.email).toLowerCase(), bedrijf = tekst(i.bedrijf), idee = tekst(i.idee);
  const taal = i.taal === "en" ? "en" : "nl";
  if (!naam || naam.length > 120) return { ok: false, fout: taal === "en" ? "Please enter your name." : "Vul uw naam in." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) return { ok: false, fout: taal === "en" ? "Please enter a valid email address." : "Vul een geldig e-mailadres in." };
  if (bedrijf.length > 160) return { ok: false, fout: taal === "en" ? "Company name is too long." : "De bedrijfsnaam is te lang." };
  if (idee.length < 10) return { ok: false, fout: taal === "en" ? "Describe your idea in at least one sentence." : "Omschrijf uw idee in minstens één zin." };
  if (idee.length > MAX_TEKST) return { ok: false, fout: taal === "en" ? `Keep it under ${MAX_TEKST} characters.` : `Houd het onder de ${MAX_TEKST} tekens.` };
  return { ok: true, naam, email, bedrijf: bedrijf || null, idee, taal };
}

export function controleerVraag(x: unknown): string | null {
  const t = tekst(x);
  return t.length >= 2 && t.length <= MAX_TEKST ? t : null;
}

// Bijgevoegde bestanden (besluit 29-10-2026): de browser leest alleen de opbouw (bladen, kolomnamen, soort, aantal
// rijen); hier wordt die gecontroleerd en als korte tekst achter het idee of de vraag gezet. Nooit de inhoud.
export const BESTANDEN_KOP = "\n\n[Bijgevoegde bestanden: alleen de opbouw, geen inhoud]\n";
const SOORTEN = new Set(["tekst", "getal", "ja/nee", "leeg"]);
const kort = (x: unknown, max = 60) => (typeof x === "string" ? x.replace(/[\u0000-\u001f\u007f\[\]]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "");

/** '' = geen bestanden, null = ongeldig, anders de tekst (max. 6.000 tekens). Bestandsnamen gaan niet mee. */
export function bestandenTekst(x: unknown): string | null {
  if (x == null || (Array.isArray(x) && !x.length)) return "";
  if (!Array.isArray(x) || x.length > 3) return null;
  const regels: string[] = [];
  x.forEach((b: { naam?: unknown; bladen?: unknown }, i) => {
    const ext = kort(typeof b?.naam === "string" ? b.naam.split(".").pop() : "", 5).toLowerCase();
    regels.push(`Bestand ${i + 1}${ext ? ` (.${ext})` : ""}`);
    const bladen = Array.isArray(b?.bladen) ? b.bladen.slice(0, 10) : [];
    for (const bl of bladen as { naam?: unknown; rijen?: unknown; kolommen?: unknown }[]) {
      const kolommen = (Array.isArray(bl?.kolommen) ? bl.kolommen.slice(0, 60) : []) as { naam?: unknown; soort?: unknown }[];
      const metNaam = kolommen.filter((k) => kort(k?.naam) && !/^\(kolom [A-Z]+\)$/.test(kort(k?.naam)));
      const zonder = kolommen.length - metNaam.length;
      const rijen = Math.max(0, Math.min(10_000_000, Math.round(Number(bl?.rijen) || 0)));
      const lijst = metNaam.map((k) => `${kort(k.naam)} (${SOORTEN.has(String(k.soort)) ? k.soort : "tekst"})`).join(", ");
      regels.push(`- Blad "${kort(bl?.naam, 40) || "Blad"}", ca. ${rijen} rijen: ${lijst || "geen kolomnamen gevonden"}${zonder > 0 ? `; plus ${zonder} kolommen zonder naam` : ""}`);
    }
  });
  return regels.join("\n").slice(0, 6000);
}

/** Kosten in euro uit tokens en prijzen per miljoen tokens (USD) en de koers USD→EUR. */
export function kostenEur(tokensIn: number, tokensUit: number, prijsIn: number, prijsUit: number, usdEur: number): number {
  const usd = (tokensIn / 1e6) * prijsIn + (tokensUit / 1e6) * prijsUit;
  return Math.round(usd * usdEur * 10000) / 10000;
}

/** Waarde van het werk in hele euro's (doorgestreept getoond; de bezoeker betaalt € 0). */
export function waardeEur(duurMs: number): number {
  return Math.round((duurMs / 3_600_000) * WAARDE_FACTOR * WAARDE_UURTARIEF);
}

/** Haalt de HTML uit het antwoord van het model (soms met ```html eromheen) plus titel en samenvatting. */
export function leesOntwerp(antwoord: string): { html: string; titel: string | null; samenvatting: string | null } | null {
  let t = antwoord.trim();
  const blok = t.match(/```(?:html)?\s*([\s\S]*?)```/i);
  if (blok && !/^<!doctype|^<html/i.test(t)) t = blok[1].trim();
  t = t.replace(/^```(?:html)?\s*/i, "").replace(/\s*```\s*$/, "");
  const begin = t.search(/<!doctype html|<html/i);
  if (begin < 0) return null;
  t = t.slice(begin);
  const eind = t.toLowerCase().lastIndexOf("</html>");
  if (eind > 0) t = t.slice(0, eind + 7);
  if (t.length < 200) return null;
  const titel = t.match(/<!--\s*titel:\s*([^\n]*?)\s*-->/i)?.[1]?.slice(0, 80) ?? t.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim().slice(0, 80) ?? null;
  const samenvatting = t.match(/<!--\s*samenvatting:\s*([\s\S]*?)\s*-->/i)?.[1]?.trim().slice(0, 600) ?? null;
  return { html: t, titel, samenvatting };
}

/** Begin van de dag in Nederland (voor de daglimiet), als ISO-tijd in UTC. */
export function begintVandaag(nu = new Date()): string {
  const d = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam", year: "numeric", month: "2-digit", day: "2-digit" }).format(nu);
  const uur = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", hour: "2-digit", hourCycle: "h23" }).format(nu));
  const verschil = (uur - nu.getUTCHours() + 24) % 24; // 1 of 2 uur
  return new Date(Date.parse(`${d}T00:00:00Z`) - verschil * 3600_000).toISOString();
}

/** Toegestane herkomst voor de browser (CORS). */
export function toegestaneHerkomst(origin: string | null): string | null {
  if (!origin) return null;
  if (/^https:\/\/(www\.)?datawerf\.com$/.test(origin)) return origin;
  if (/^https:\/\/[a-z0-9-]+--datawerf-website\.netlify\.app$/.test(origin)) return origin;
  if (/^http:\/\/localhost:\d+$/.test(origin)) return origin;
  return null;
}

/** Zet de vaste app-stijl (lettertypen en CSS) in het ontwerp, direct na <head>. */
export function voegStijlToe(html: string): string {
  const blok = `${APP_FONTS}\n<style id="ds-stijl">\n${APP_STIJL}\n</style>`;
  if (/<head[^>]*>/i.test(html)) return html.replace(/<head[^>]*>/i, (m) => `${m}\n${blok}`);
  return html.replace(/<html[^>]*>/i, (m) => `${m}\n<head>\n${blok}\n</head>`);
}

export const SYSTEEM = (taal: "nl" | "en") => `Je bent de ontwerper van het Datawerf lab. Een bezoeker beschrijft een idee voor zakelijke software; jij maakt daar binnen één antwoord een werkend, klikbaar eerste ontwerp van.

Lever precies één compleet HTML-document (begin met <!doctype html>, eindig met </html>), zonder uitleg ervoor of erna en zonder markdown.
Zet direct na <!doctype html> twee commentaarregels:
<!-- titel: korte naam van de app (max 40 tekens) -->
<!-- samenvatting: 2-3 zinnen in gewone taal wat er in dit ontwerp zit en wat de bezoeker kan proberen -->

Vaste huisstijl (verplicht): het stylesheet hieronder en de lettertypen Montserrat en Roboto worden automatisch in <head> gezet. Neem ze NIET zelf op. Gebruik de klassen en variabelen ervan; voeg alleen een klein eigen <style> toe voor iets dat er echt niet in zit (bijvoorbeeld een bandenschema), met de variabelen (var(--merk), var(--accent), var(--lijn) …), nooit met andere lettertypen of een andere kleurstelling.
${APP_OPBOUW}

Ter informatie, het stylesheet (niet opnemen):
${APP_STIJL}

Regels voor het ontwerp:
- Taal van alle teksten: ${taal === "en" ? "Engels" : "Nederlands"}.
- Alle JavaScript inline in het document. Geen externe scripts, geen fetch, geen formulieren die iets versturen.
- Het is een klikbaar prototype: meerdere schermen via het menu (in één pagina met JavaScript), knoppen doen iets zichtbaars, filters werken op de voorbeeldgegevens.
- Gebruik uitsluitend VERZONNEN voorbeeldgegevens die realistisch ogen. Noem nooit echte bedrijven, klanten, leveranciers, personen, kentekens of echte prijzen, ook niet als de bezoeker ze noemt; vervang ze door verzonnen namen en bedragen. Algemene vaktermen, productsoorten, merken van materiaal en maten mogen wel.
- Vraagt het idee om inloggen of rollen: begin met het inlogscherm (ds-login) waarop je zonder wachtwoord een rol kiest, en laat per rol zien wat die ziet.
- Vraagt het idee om uploads: maak een uploadvak (ds-upload) dat een gekozen bestand alleen bij naam toont en zegt dat het ontwerp niets opslaat.
- Staan er bijgevoegde bestanden bij (alleen bladnamen en kolomnamen): gebruik die opbouw voor de tabellen en velden, en laat bij het uploadvak zien hoe zo'n bestand wordt ingelezen (kolom in het bestand → veld in de app). Verzin de gegevens. Komen er namen van bedrijven of leveranciers in blad- of kolomnamen voor, vervang ze dan door een algemene naam (bijvoorbeeld "Leveranciersnummer").
- Werkt ook op een telefoon (geen horizontale scroll; tabellen in .ds-tabelvak).
- Houd het document compact: je hele antwoord blijft onder ongeveer 40.000 tekens (circa 600 regels). Kies hoogstens 4 schermen met de belangrijkste onderdelen van het idee; de rest kan de bezoeker later vragen. Gebruik korte teksten, en maak voorbeeldgegevens met een kleine functie (lus met vast zaadje) in plaats van lange uitgeschreven lijsten. Liever minder schermen die goed werken dan veel half.

Bij een vervolgvraag krijg je het vorige ontwerp mee (zonder het stylesheet): pas het aan volgens de vraag en lever opnieuw het hele document, met dezelfde regels.`;

/** Haalt het automatisch toegevoegde stylesheet weer uit een ontwerp (voor de vervolgvraag, scheelt tokens). */
export function zonderStijl(html: string): string {
  return html.replace(APP_FONTS, "").replace(/<style id="ds-stijl">[\s\S]*?<\/style>/, "");
}

/** Tekst van de mail "Uw ontwerp staat klaar" / "Uw links". */
export function mailKlaar(taal: "nl" | "en", titel: string, link: string) {
  const nl = taal !== "en";
  const onderwerp = nl ? `Uw ontwerp "${titel}" staat klaar` : `Your design "${titel}" is ready`;
  const tekst = nl
    ? `Uw eerste ontwerp in het Datawerf lab staat klaar.\n\nOpen het hier: ${link}\n\nMet deze link komt u altijd terug bij uw idee. U kunt het ontwerp tien keer gratis bijsturen.\n\nDatawerf`
    : `Your first design in the Datawerf lab is ready.\n\nOpen it here: ${link}\n\nThis link always brings you back to your idea. You can refine the design ten times for free.\n\nDatawerf`;
  return { onderwerp, tekst, html: mailHtml(nl ? "Uw ontwerp staat klaar" : "Your design is ready", titel, [{ titel, link }], nl) };
}
export function mailLinks(taal: "nl" | "en", ideeen: { titel: string; link: string }[]) {
  const nl = taal !== "en";
  const onderwerp = nl ? "Uw ideeën in het Datawerf lab" : "Your ideas in the Datawerf lab";
  const tekst = (nl ? "Hier zijn de links naar uw ideeën:\n\n" : "Here are the links to your ideas:\n\n") + ideeen.map((i) => `${i.titel}: ${i.link}`).join("\n") + "\n\nDatawerf";
  return { onderwerp, tekst, html: mailHtml(onderwerp, null, ideeen, nl) };
}
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function mailHtml(kop: string, titel: string | null, ideeen: { titel: string; link: string }[], nl: boolean) {
  const knoppen = ideeen.map((i) => `<p style="margin:0 0 12px"><a href="${esc(i.link)}" style="display:inline-block;padding:12px 22px;border-radius:999px;background:#FF5A1F;color:#ffffff;font-weight:700;text-decoration:none">${esc(i.titel)} →</a></p>`).join("");
  return `<div style="font-family:Arial,sans-serif;color:#14213D;max-width:560px;margin:0 auto;padding:24px">
<p style="font:600 12px monospace;letter-spacing:.06em;text-transform:uppercase;color:#FF5A1F;margin:0 0 8px">Datawerf lab</p>
<h1 style="font-size:24px;margin:0 0 12px">${esc(kop)}</h1>
${titel ? `<p style="margin:0 0 16px">${nl ? "Uw idee" : "Your idea"}: <strong>${esc(titel)}</strong></p>` : ""}
${knoppen}
<p style="margin:16px 0 0;color:#3A4258;font-size:14px">${nl ? "Met deze link komt u altijd terug bij uw idee. Deel hem alleen met mensen die mogen meekijken." : "This link always brings you back to your idea. Only share it with people who may see it."}</p>
<p style="margin:24px 0 0;color:#5C6378;font-size:12px">Datawerf · datawerf.com</p></div>`;
}
