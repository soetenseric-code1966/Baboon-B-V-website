// Datawerf lab (besluit 29-10-2026): Supabase Edge Function `datawerf-lab` in het project Aardappelmonitor
// (tijdelijk, geen extra kosten). Schema `lab` (zie ../../20261029160000_lab.sql), alleen via deze functie bereikbaar.
// Broncode: Baboon-B-V-website, supabase/lab/functions/datawerf-lab/. Uitrollen: zie supabase/lab/LEESMIJ.md.
//
// POST JSON { actie, ... }:
//   start     { naam, email, bedrijf?, idee, taal, robot }   → { id, sleutel }   (prompt 1 start op de achtergrond)
//   vraag     { id, sleutel, tekst }                          → { ok }           (volgende prompt, max 10)
//   stand     { id, sleutel }                                 → idee, prompts, laatste ontwerp, teller, waarde
//   voorbeeld { naam }                                        → { titel, samenvatting, html } (vaste voorbeelden, openbaar)
//   overzicht (header x-lab-beheer)                           → alle ideeën met prompts, tijd en kosten
//   ontwerp   (header x-lab-beheer) { id, nr }                → het ontwerp van één prompt (voor beheer)
//
// Geheimen (Supabase → Edge Functions → Secrets): ANTHROPIC_API_KEY (werkruimte "Lab" in de Claude Console, met
// maandlimiet), TURNSTILE_SECRET (Cloudflare Turnstile), LAB_BEHEER_SLEUTEL (eigen wachtwoord voor het overzicht).
// Instellingen (optioneel): LAB_MODEL, LAB_DAGLIMIET (prompts per dag, standaard 50), LAB_PRIJS_IN / LAB_PRIJS_UIT
// (USD per miljoen tokens), LAB_USD_EUR. Mail: RESEND_API_KEY, LAB_AFZENDER, LAB_SITE. Nooit sleutels of volledige foutmeldingen teruggeven of loggen.
import postgres from "npm:postgres@3.4.5";
import {
  BESTANDEN_KOP, BEZIG_VERLOOPT_MS, MAX_PROMPTS, SYSTEEM, VOORBEELDEN, begintVandaag, bestandenTekst, controleerStart, controleerVraag, kostenEur, leesOntwerp,
  mailKlaar, mailLinks, toegestaneHerkomst, voegStijlToe, waardeEur, zonderStijl,
} from "./regels.ts";

const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { max: 3, prepare: false });
const env = (k: string, d = "") => Deno.env.get(k) ?? d;
const getal = (k: string, d: number) => { const v = Number(env(k)); return Number.isFinite(v) && v > 0 ? v : d; };

declare const EdgeRuntime: { waitUntil(p: Promise<unknown>): void } | undefined;

function antwoord(req: Request, body: unknown, status = 200): Response {
  const herkomst = toegestaneHerkomst(req.headers.get("origin"));
  return new Response(status === 204 ? null : JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...(herkomst ? { "Access-Control-Allow-Origin": herkomst, Vary: "Origin" } : {}),
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Lab-Beheer",
    },
  });
}

async function sha256(s: string): Promise<string> {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, "0")).join("");
}
function gelijk(a: string, b: string): boolean {
  if (!a || !b || a.length !== b.length) return false;
  let v = 0; for (let i = 0; i < a.length; i++) v |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return v === 0;
}
function nieuweSleutel(): string {
  const b = crypto.getRandomValues(new Uint8Array(24));
  return btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function robotOk(token: unknown, ip: string): Promise<boolean> {
  const geheim = env("TURNSTILE_SECRET");
  if (!geheim) return true; // nog niet ingesteld: alleen de limieten beschermen
  if (typeof token !== "string" || !token) return false;
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", body: new URLSearchParams({ secret: geheim, response: token, remoteip: ip }),
  }).catch(() => null);
  const j = r ? await r.json().catch(() => null) : null;
  return Boolean(j?.success);
}

async function dagVol(): Promise<boolean> {
  const [{ n }] = await sql`SELECT count(*)::int AS n FROM lab.prompts WHERE aangemaakt >= ${begintVandaag()}`;
  return n >= getal("LAB_DAGLIMIET", 50);
}

/** Het idee bij id en sleutel, of null. */
async function zoekIdee(id: unknown, sleutel: unknown) {
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/.test(id) || typeof sleutel !== "string" || sleutel.length < 20) return null;
  const [idee] = await sql`SELECT * FROM lab.ideeen WHERE id = ${id}`;
  if (!idee) return null;
  const hash = await sha256(sleutel);
  if (gelijk(idee.sleutel_hash, hash)) return idee;
  // Een link uit een inlogmail (lab.toegang).
  const [t] = await sql`SELECT 1 FROM lab.toegang WHERE idee_id = ${id} AND sleutel_hash = ${hash}`;
  return t ? idee : null;
}

const labLink = (taal: string, id: string, sleutel: string) =>
  `${env("LAB_SITE", "https://datawerf.com")}${taal === "en" ? "/en/lab/" : "/lab/"}#${id}.${sleutel}`;

/** Verstuurt een mail via Resend (als RESEND_API_KEY is ingesteld) en legt hem vast in lab.mails. */
async function stuurMail(email: string, soort: "klaar" | "links", ideeId: string | null, m: { onderwerp: string; tekst: string; html: string }) {
  const sleutel = env("RESEND_API_KEY");
  let gelukt = false;
  if (sleutel) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${sleutel}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: env("LAB_AFZENDER", "Datawerf lab <lab@datawerf.com>"), to: [email], subject: m.onderwerp, text: m.tekst, html: m.html }),
    }).catch(() => null);
    gelukt = Boolean(r?.ok);
    if (!gelukt) console.error("lab: mail mislukt", soort, r?.status ?? "netwerk");
  }
  await sql`INSERT INTO lab.mails (email, soort, idee_id, gelukt) VALUES (${email}, ${soort}, ${ideeId}, ${gelukt})`.catch(() => {});
}

/** Roept Claude aan en slaat het ontwerp, de tokens, de kosten en de duur op bij de prompt. */
async function maakOntwerp(promptId: number, ideeId: string, sleutelVoorMail?: string) {
  const start = Date.now();
  try {
    const [idee] = await sql`SELECT * FROM lab.ideeen WHERE id = ${ideeId}`;
    const prompts = await sql`SELECT nr, tekst, status, html FROM lab.prompts WHERE idee_id = ${ideeId} ORDER BY nr`;
    const huidig = prompts.find((p) => p.status === "bezig");
    const vorige = [...prompts].reverse().find((p) => p.status === "klaar" && p.html);
    const geschiedenis = prompts.filter((p) => p.status === "klaar").map((p) => `${p.nr}. ${p.tekst}`).join("\n");
    const inhoud = vorige
      ? `Het idee:\n${idee.idee}\n\nEerdere vragen:\n${geschiedenis}\n\nHet huidige ontwerp:\n${zonderStijl(vorige.html)}\n\nNieuwe vraag van de bezoeker:\n${huidig?.tekst}`
      : `Het idee van de bezoeker${idee.bedrijf ? ` (bedrijf: verzonnen naam gebruiken)` : ""}:\n${idee.idee}`;
    const model = env("LAB_MODEL", "claude-sonnet-5-5");
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": env("ANTHROPIC_API_KEY"), "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model, max_tokens: getal("LAB_MAX_TOKENS", 32000), thinking: { type: "between_tools" }, system: SYSTEEM(idee.taal), messages: [{ role: "user", content: inhoud }] }),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j) throw new Error(`AI gaf status ${r.status}${j?.error?.type ? " (" + j.error.type + ")" : ""}${j?.error?.message ? ": " + String(j.error.message).slice(0, 120) : ""}`);
    const tekst = (j.content ?? []).filter((c: { type: string }) => c.type === "text").map((c: { text: string }) => c.text).join("");
    const tokensIn = j.usage?.input_tokens ?? 0, tokensUit = j.usage?.output_tokens ?? 0;
    const kosten = kostenEur(tokensIn, tokensUit, getal("LAB_PRIJS_IN", 3), getal("LAB_PRIJS_UIT", 15), getal("LAB_USD_EUR", 0.86));
    const ontwerp = j.stop_reason === "max_tokens" ? null : leesOntwerp(tekst);
    if (!ontwerp) {
      const blokken = (j.content ?? []).map((c: { type: string }) => c.type).join(",");
      const reden = `${j.stop_reason === "max_tokens" ? "Ontwerp te groot (afgebroken)" : "Geen bruikbaar ontwerp ontvangen"}; ${tekst.length} tekens tekst; blokken ${blokken}`.slice(0, 300);
      await sql`UPDATE lab.prompts SET status = 'fout', fout = ${reden}, model = ${model}, tokens_in = ${tokensIn},
        tokens_uit = ${tokensUit}, kosten_eur = ${kosten}, duur_ms = ${Date.now() - start}, klaar = now() WHERE id = ${promptId}`;
      return;
    }
    await sql`UPDATE lab.prompts SET status = 'klaar', html = ${voegStijlToe(ontwerp.html)}, samenvatting = ${ontwerp.samenvatting}, model = ${model},
      tokens_in = ${tokensIn}, tokens_uit = ${tokensUit}, kosten_eur = ${kosten}, duur_ms = ${Date.now() - start}, klaar = now() WHERE id = ${promptId}`;
    if (ontwerp.titel) await sql`UPDATE lab.ideeen SET titel = ${ontwerp.titel} WHERE id = ${ideeId} AND titel IS NULL`;
    // Eerste ontwerp klaar: mail met de link (de bezoeker hoeft niet te wachten).
    if (sleutelVoorMail) await stuurMail(idee.email, "klaar", ideeId, mailKlaar(idee.taal, ontwerp.titel ?? "Uw idee", labLink(idee.taal, ideeId, sleutelVoorMail)));
  } catch (e) {
    // De melding (zonder sleutels) komt alleen in lab.prompts.fout, voor beheer; de bezoeker ziet hem niet.
    const melding = e instanceof Error ? e.message.slice(0, 250) : "onbekend";
    console.error("lab: ontwerp mislukt", promptId, melding);
    await sql`UPDATE lab.prompts SET status = 'fout', fout = ${"Het ontwerp kon niet worden gemaakt: " + melding}, duur_ms = ${Date.now() - start}, klaar = now()
      WHERE id = ${promptId}`.catch(() => {});
  }
}
function opAchtergrond(p: Promise<unknown>) {
  if (typeof EdgeRuntime !== "undefined") EdgeRuntime.waitUntil(p); else p.catch(() => {});
}

async function stand(ideeId: string) {
  // Te lang bezig = mislukt (bijvoorbeeld als de functie werd afgebroken).
  await sql`UPDATE lab.prompts SET status = 'fout', fout = 'Duurde te lang' WHERE idee_id = ${ideeId} AND status = 'bezig'
    AND aangemaakt < ${new Date(Date.now() - BEZIG_VERLOOPT_MS).toISOString()}`;
  const [idee] = await sql`SELECT id, titel, idee, taal, status, aangemaakt FROM lab.ideeen WHERE id = ${ideeId}`;
  const prompts = await sql`SELECT nr, tekst, status, samenvatting, duur_ms, aangemaakt FROM lab.prompts WHERE idee_id = ${ideeId} ORDER BY nr`;
  const [laatste] = await sql`SELECT nr, html FROM lab.prompts WHERE idee_id = ${ideeId} AND status = 'klaar' ORDER BY nr DESC LIMIT 1`;
  // Een mislukte prompt telt niet mee (de volgende vraag gebruikt dezelfde plek).
  const gebruikt = prompts.filter((p) => p.status !== "fout").length;
  const duur = prompts.reduce((s, p) => s + (p.duur_ms ?? 0), 0);
  return {
    idee, prompts, ontwerp: laatste ?? null, gebruikt: Math.min(MAX_PROMPTS, gebruikt), max: MAX_PROMPTS,
    bezig: prompts.some((p) => p.status === "bezig"), waarde: waardeEur(duur), minuten: Math.round(duur / 6000) / 10,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return antwoord(req, null, 204);
  if (req.method !== "POST") return antwoord(req, { fout: "Alleen POST" }, 405);
  const body = await req.json().catch(() => ({}));
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  try {
    switch (body.actie) {
      case "start": {
        const c = controleerStart(body);
        if (!c.ok) return antwoord(req, { fout: c.fout }, 400);
        const bijlage = bestandenTekst(body.bestanden);
        if (bijlage === null) return antwoord(req, { fout: "De bestanden konden niet worden gelezen. Probeer maximaal drie Excel- of CSV-bestanden." }, 400);
        const ideeTekst = c.idee + (bijlage ? BESTANDEN_KOP + bijlage : "");
        if (!env("ANTHROPIC_API_KEY")) return antwoord(req, { fout: "Het lab is nog niet open. Probeer het later opnieuw." }, 503);
        if (!(await robotOk(body.robot, ip))) return antwoord(req, { fout: "De robotcontrole is niet gelukt. Probeer het opnieuw." }, 400);
        if (await dagVol()) return antwoord(req, { fout: "Het lab is vandaag vol. Morgen kunt u weer starten, of mail ons." }, 429);
        const ipHash = ip ? await sha256("lab:" + ip) : null;
        if (ipHash) {
          const [{ n }] = await sql`SELECT count(*)::int AS n FROM lab.ideeen WHERE ip_hash = ${ipHash} AND aangemaakt >= ${begintVandaag()}`;
          if (n >= 3) return antwoord(req, { fout: "U heeft vandaag al drie ideeën gestart. Ga verder met een bestaand idee." }, 429);
        }
        const sleutel = nieuweSleutel();
        const [idee] = await sql`INSERT INTO lab.ideeen (sleutel_hash, naam, email, bedrijf, idee, taal, ip_hash)
          VALUES (${await sha256(sleutel)}, ${c.naam}, ${c.email}, ${c.bedrijf}, ${ideeTekst}, ${c.taal}, ${ipHash}) RETURNING id`;
        const [p] = await sql`INSERT INTO lab.prompts (idee_id, nr, tekst) VALUES (${idee.id}, 1, ${ideeTekst}) RETURNING id`;
        opAchtergrond(maakOntwerp(p.id, idee.id, sleutel));
        return antwoord(req, { id: idee.id, sleutel, mail: Boolean(env("RESEND_API_KEY")) });
      }
      case "vraag": {
        const idee = await zoekIdee(body.id, body.sleutel);
        if (!idee) return antwoord(req, { fout: "Dit idee is niet gevonden." }, 404);
        const vraagTekst = controleerVraag(body.tekst);
        if (!vraagTekst) return antwoord(req, { fout: "Typ wat er anders moet (maximaal 4.000 tekens)." }, 400);
        const bijlage = bestandenTekst(body.bestanden);
        if (bijlage === null) return antwoord(req, { fout: "De bestanden konden niet worden gelezen. Probeer maximaal drie Excel- of CSV-bestanden." }, 400);
        const t = vraagTekst + (bijlage ? BESTANDEN_KOP + bijlage : "");
        const prompts = await sql`SELECT id, nr, status FROM lab.prompts WHERE idee_id = ${idee.id} ORDER BY nr`;
        if (prompts.some((p) => p.status === "bezig")) return antwoord(req, { fout: "Het vorige ontwerp wordt nog gemaakt." }, 409);
        if (await dagVol()) return antwoord(req, { fout: "Het lab is vandaag vol. Morgen kunt u verder." }, 429);
        const laatste = prompts[prompts.length - 1];
        let promptId: number;
        if (laatste && laatste.status === "fout") {
          // Een mislukte prompt telt niet: dezelfde plek opnieuw gebruiken.
          await sql`UPDATE lab.prompts SET tekst = ${t}, status = 'bezig', fout = NULL, html = NULL, aangemaakt = now(), klaar = NULL WHERE id = ${laatste.id}`;
          promptId = laatste.id;
        } else {
          const nr = (laatste?.nr ?? 0) + 1;
          if (nr > MAX_PROMPTS) {
            await sql`UPDATE lab.ideeen SET status = 'tegoed op' WHERE id = ${idee.id} AND status = 'actief'`;
            return antwoord(req, { fout: "Uw tien gratis prompts zijn gebruikt.", tegoedOp: true }, 402);
          }
          const [p] = await sql`INSERT INTO lab.prompts (idee_id, nr, tekst) VALUES (${idee.id}, ${nr}, ${t}) RETURNING id`;
          promptId = p.id;
        }
        opAchtergrond(maakOntwerp(promptId, idee.id));
        return antwoord(req, { ok: true });
      }
      case "opnieuw": {
        const idee = await zoekIdee(body.id, body.sleutel);
        if (!idee) return antwoord(req, { fout: "Dit idee is niet gevonden." }, 404);
        const [laatste] = await sql`SELECT id, status FROM lab.prompts WHERE idee_id = ${idee.id} ORDER BY nr DESC LIMIT 1`;
        if (!laatste || laatste.status !== "fout") return antwoord(req, { fout: "Er is niets om opnieuw te proberen." }, 400);
        if (await dagVol()) return antwoord(req, { fout: "Het lab is vandaag vol. Morgen kunt u verder." }, 429);
        await sql`UPDATE lab.prompts SET status = 'bezig', fout = NULL, aangemaakt = now(), klaar = NULL WHERE id = ${laatste.id}`;
        opAchtergrond(maakOntwerp(laatste.id, idee.id));
        return antwoord(req, { ok: true });
      }
      case "links": {
        // Inloggen zonder account: stuur de links naar alle ideeën van dit e-mailadres (nieuwe links, de oude blijven werken).
        const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
        const taal = body.taal === "en" ? "en" : "nl";
        const melding = taal === "en" ? "If ideas belong to this address, we have emailed the links." : "Als er ideeën bij dit adres horen, hebben we de links gemaild.";
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) return antwoord(req, { fout: taal === "en" ? "Please enter a valid email address." : "Vul een geldig e-mailadres in." }, 400);
        if (!env("RESEND_API_KEY")) return antwoord(req, { fout: taal === "en" ? "Email login is not available yet." : "Inloggen per e-mail is nog niet beschikbaar." }, 503);
        const [{ n }] = await sql`SELECT count(*)::int AS n FROM lab.mails WHERE email = ${email} AND soort = 'links' AND aangemaakt > now() - interval '1 hour'`;
        if (n >= 3) return antwoord(req, { ok: true, melding });
        const ideeen = await sql`SELECT id, titel, idee FROM lab.ideeen WHERE email = ${email} AND status <> 'spam' ORDER BY aangemaakt DESC LIMIT 10`;
        if (ideeen.length) {
          const links = [];
          for (const i of ideeen) {
            const sleutel = nieuweSleutel();
            await sql`INSERT INTO lab.toegang (idee_id, sleutel_hash) VALUES (${i.id}, ${await sha256(sleutel)})`;
            links.push({ titel: i.titel || String(i.idee).slice(0, 60), link: labLink(taal, i.id, sleutel) });
          }
          await stuurMail(email, "links", null, mailLinks(taal, links));
        } else {
          await sql`INSERT INTO lab.mails (email, soort, gelukt) VALUES (${email}, 'links', false)`;
        }
        return antwoord(req, { ok: true, melding });
      }
      case "stand": {
        const idee = await zoekIdee(body.id, body.sleutel);
        if (!idee) return antwoord(req, { fout: "Dit idee is niet gevonden." }, 404);
        return antwoord(req, await stand(idee.id));
      }
      case "voorbeeld": {
        const v = typeof body.naam === "string" && Object.hasOwn(VOORBEELDEN, body.naam) ? VOORBEELDEN[body.naam] : null;
        if (!v) return antwoord(req, { fout: "Dit voorbeeld bestaat niet." }, 404);
        const [p] = await sql`SELECT i.titel, p.samenvatting, p.html FROM lab.prompts p JOIN lab.ideeen i ON i.id = p.idee_id
          WHERE p.idee_id = ${v.id} AND p.nr = ${v.nr} AND p.status = 'klaar'`;
        if (!p) return antwoord(req, { fout: "Dit voorbeeld bestaat niet." }, 404);
        return antwoord(req, { titel: p.titel, samenvatting: p.samenvatting, html: p.html });
      }
      case "platform": {
        const idee = await zoekIdee(body.id, body.sleutel);
        if (!idee) return antwoord(req, { fout: "Dit idee is niet gevonden." }, 404);
        await sql`UPDATE lab.ideeen SET status = 'start platform' WHERE id = ${idee.id}`;
        return antwoord(req, { ok: true });
      }
      case "overzicht":
      case "ontwerp": {
        const beheer = env("LAB_BEHEER_SLEUTEL");
        if (!beheer || !gelijk(req.headers.get("x-lab-beheer") ?? "", beheer)) return antwoord(req, { fout: "Geen toegang." }, 401);
        if (body.actie === "ontwerp") {
          if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/.test(body.id)) return antwoord(req, { html: null });
          const [p] = await sql`SELECT html FROM lab.prompts WHERE idee_id = ${body.id} AND nr = ${Number(body.nr) || 0}`;
          return antwoord(req, { html: p?.html ?? null });
        }
        const ideeen = await sql`SELECT i.id, i.aangemaakt, i.naam, i.email, i.bedrijf, i.titel, i.idee, i.status,
            count(p.id)::int AS prompts, coalesce(sum(p.kosten_eur), 0)::float AS kosten, coalesce(sum(p.duur_ms), 0)::int AS duur_ms,
            coalesce(sum(p.tokens_in), 0)::int AS tokens_in, coalesce(sum(p.tokens_uit), 0)::int AS tokens_uit,
            coalesce(json_agg(json_build_object('nr', p.nr, 'tekst', p.tekst, 'status', p.status, 'kosten', p.kosten_eur, 'duur_ms', p.duur_ms,
              'aangemaakt', p.aangemaakt) ORDER BY p.nr) FILTER (WHERE p.id IS NOT NULL), '[]') AS lijst
          FROM lab.ideeen i LEFT JOIN lab.prompts p ON p.idee_id = i.id GROUP BY i.id ORDER BY i.aangemaakt DESC LIMIT 200`;
        const [vandaag] = await sql`SELECT count(*)::int AS n FROM lab.prompts WHERE aangemaakt >= ${begintVandaag()}`;
        return antwoord(req, { ideeen, vandaag: vandaag.n, daglimiet: getal("LAB_DAGLIMIET", 50), model: env("LAB_MODEL", "claude-sonnet-5-5"), open: Boolean(env("ANTHROPIC_API_KEY")), robot: Boolean(env("TURNSTILE_SECRET")), mail: Boolean(env("RESEND_API_KEY")) });
      }
      default:
        return antwoord(req, { fout: "Onbekende actie." }, 400);
    }
  } catch (e) {
    console.error("lab: fout", body?.actie, e instanceof Error ? e.message.slice(0, 200) : "onbekend");
    return antwoord(req, { fout: "Er ging iets mis. Probeer het zo opnieuw." }, 500);
  }
});
