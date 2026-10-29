# Datawerf lab – achterkant

Besluit 29-10-2026: "Start gratis" op datawerf.com opent het lab. De bezoeker omschrijft een idee en krijgt binnen een
paar minuten een klikbaar eerste ontwerp met verzonnen gegevens, daarna maximaal 10 prompts per idee.

## Waar het draait
- **Database:** Supabase-project **Aardappelmonitor** (Frankfurt), schema `lab` (tijdelijk, geen extra kosten;
  volledig gescheiden van de monitor). Migratie: `20261029160000_lab.sql` (toegepast 29-10-2026). Bezoekers (anon)
  hebben geen enkele toegang tot `lab`; alleen de functie leest en schrijft (via `SUPABASE_DB_URL`).
- **AI-functie:** Supabase Edge Function `datawerf-lab` (`functions/datawerf-lab/`), `verify_jwt` uit, eigen controles.
  Uitrollen gebeurt met de Supabase-koppeling (deploy_edge_function) met de drie bestanden `index.ts`, `regels.ts` en `stijl.ts`.
- **Website:** `src/lab.ts`, `src/pages/Start.tsx` (/start/), `src/pages/Lab.tsx` (/lab/#id.sleutel),
  `src/pages/LabBeheer.tsx` (/lab/beheer/, niet in menu of sitemap).

## Geheimen en instellingen (Supabase → Edge Functions → Secrets)
| Naam | Wat | Wie |
|---|---|---|
| `ANTHROPIC_API_KEY` | Sleutel uit de Claude Console, werkruimte "Lab" met maandlimiet. Zonder deze sleutel is het lab dicht. | Eric |
| `TURNSTILE_SECRET` | Geheime sleutel van Cloudflare Turnstile (robotcontrole). Zonder: alleen de limieten. | Eric |
| `LAB_BEHEER_SLEUTEL` | Eigen wachtwoord voor /lab/beheer/. | Eric |
| `RESEND_API_KEY` | Sleutel van Resend (maildienst) voor "Uw ontwerp staat klaar" en inloggen met een link per e-mail. Zonder: geen mails. | Eric |
| `LAB_AFZENDER` | Optioneel, standaard `Datawerf lab <lab@datawerf.com>` (domein datawerf.com verifiëren bij Resend). | |
| `LAB_MODEL` | Optioneel, standaard `claude-sonnet-5-5`. | |
| `LAB_DAGLIMIET` | Optioneel, prompts per dag voor het hele lab, standaard 50. | |
| `LAB_PRIJS_IN`, `LAB_PRIJS_UIT`, `LAB_USD_EUR` | Optioneel: prijs per miljoen tokens (USD) en koers, voor de kostenberekening. Standaard 3, 15 en 0,86. | |

De openbare site key van Turnstile staat in `src/lab.ts` (`TURNSTILE_SITEKEY`).

## Regels
- Max. 10 prompts per idee; een mislukte prompt telt niet. Max. 3 nieuwe ideeën per dag per IP (gehasht), daglimiet voor het hele lab.
- De AI krijgt de opdracht alleen verzonnen gegevens te gebruiken en nooit echte bedrijven, personen, kentekens of prijzen te noemen.
- Het ontwerp draait op de website in een afgesloten kader (`sandbox="allow-scripts allow-forms"`, zonder same-origin).
- Per prompt worden tokens, kosten (euro, berekend) en duur bewaard; de factuur in de Claude Console is leidend.
- De geheime link (`#id.sleutel`) is de toegang; op de server staat alleen een hash van de sleutel.
- Inloggen zonder account: na het eerste ontwerp een mail met de link; op Inloggen en /lab/ kan de bezoeker zijn e-mailadres invullen en krijgt hij nieuwe links naar al zijn ideeën (tabel `lab.toegang`, max. 3 mails per uur per adres, `lab.mails`). Migratie `20261029180000_lab_toegang_mails.sql`.
- Vaste app-stijl (zoals Dagplanning en Wielen): `functions/datawerf-lab/stijl.ts`, uitleg in `docs/app-stijl.md`. De functie zet het stylesheet zelf in elk ontwerp; de AI gebruikt alleen de klassen.
- Later: bestanden uploaden voor de opbouw (nooit voor de getallen), verhuizen naar een eigen Datawerf-omgeving.

## Tests
`npm test` (Node, `test/lab-regels.test.mjs`): formulier, kosten, waarde, ontwerp uit het antwoord, daglimiet, toegestane herkomst, AI-opdracht.
