// Datawerf lab: pure regels (zonder database of netwerk), ook getest met Node (test/lab-regels.test.mjs).

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

export const SYSTEEM = (taal: "nl" | "en") => `Je bent de ontwerper van het Datawerf lab. Een bezoeker beschrijft een idee voor zakelijke software; jij maakt daar binnen één antwoord een werkend, klikbaar eerste ontwerp van.

Lever precies één compleet HTML-document (begin met <!doctype html>, eindig met </html>), zonder uitleg ervoor of erna en zonder markdown.
Zet direct na <!doctype html> twee commentaarregels:
<!-- titel: korte naam van de app (max 40 tekens) -->
<!-- samenvatting: 2-3 zinnen in gewone taal wat er in dit ontwerp zit en wat de bezoeker kan proberen -->

Regels voor het ontwerp:
- Taal van alle teksten: ${taal === "en" ? "Engels" : "Nederlands"}.
- Alle CSS en JavaScript inline in het document. Geen externe scripts, geen fetch, geen formulieren die iets versturen. Alleen lettertypen van fonts.googleapis.com zijn toegestaan.
- Het is een klikbaar prototype: meerdere schermen via een menu (in één pagina met JavaScript), knoppen doen iets zichtbaars, filters werken op de voorbeeldgegevens.
- Gebruik uitsluitend VERZONNEN voorbeeldgegevens die realistisch ogen. Noem nooit echte bedrijven, klanten, leveranciers, personen, kentekens of echte prijzen, ook niet als de bezoeker ze noemt; vervang ze door verzonnen namen en bedragen. Algemene vaktermen, productsoorten, merken van materiaal en maten mogen wel.
- Vraagt het idee om inloggen of rollen: maak een inlogscherm waarop je zonder wachtwoord een rol kiest, en laat per rol zien wat die ziet.
- Vraagt het idee om uploads: maak een uploadvak dat een gekozen bestand alleen bij naam toont en zegt dat het ontwerp niets opslaat.
- Rustige, professionele zakelijke uitstraling met een eigen kleur die bij het onderwerp past; goed leesbaar; werkt ook op een telefoon (geen horizontale scroll).
- Bovenaan een kleine regel "Eerste ontwerp · verzonnen gegevens".
- Houd het document onder ongeveer 900 regels.

Bij een vervolgvraag krijg je het vorige ontwerp mee: pas het aan volgens de vraag en lever opnieuw het hele document, met dezelfde regels.`;
