# Datawerf – website

De openbare website van Datawerf (een handelsnaam van Baboon B.V.), op datawerf.com.

- React + Vite + TypeScript, statisch gebouwd: elke pagina staat als losse HTML-pagina klaar (goed voor Google).
- Talen: Nederlands (standaard) en Engels onder `/en/`.
- Hosting: Netlify, alleen statisch (geen Functions, geen Edge Functions, geen Netlify Database).
- DNS: Cloudflare (records voor Netlify op "DNS only").

## Pagina's

| Pagina | NL | EN |
|---|---|---|
| Home | `/` | `/en/` |
| Wat we bouwen | `/wat-we-bouwen/` | `/en/what-we-build/` |
| Apps | `/apps/` | `/en/apps/` |
| Start gratis (lab) | `/start/` | `/en/start/` |
| Lab (tabblad; eigen idee via geheime link `/lab/#id.sleutel`) | `/lab/` | `/en/lab/` |
| Lab-beheer (niet in menu of sitemap) | `/lab/beheer/` | `/en/lab/admin/` |
| Prijzen | `/prijzen/` | `/en/pricing/` |
| Over ons | `/over-ons/` | `/en/about/` |
| Contact | `/contact/` | `/en/contact/` |
| Juridisch | `/juridisch/` | `/en/legal/` |
| Inloggen | `/inloggen/` | `/en/login/` |

## Werken aan de site

```
npm install
npm run dev      # lokaal bekijken
npm run build    # statische site in dist/
```

De pagina's in `src/pages/` zijn gegenereerd uit het Design-canvas "Qplatformz – website en platform" met `scripts/convert-design.mjs`.
Kopteksten en voet staan in `src/Layout.tsx`, de adressen in `src/routes.ts`, de schaalregels voor telefoon in `src/site.css`.
Plaatshouders uit het ontwerp en aanpassingen (contact via mail, inloggen nog niet actief) staan bovenin het conversiescript.

## Opgeleverde projecten tonen

- Blok "Live in gebruik" op Wat we bouwen: `src/live.ts`. Carrousel op de homepage: `src/showcase.ts`.
- Schermafbeeldingen in `public/showcase/` (1600 × 1000, jpg). Nu: Qeldr, Urenregistratie, Aardappelmonitor (beginscherm, toegevoegd 27-10-2026), Dagplanning wagenpark (planbord ingelogd als vlootbeheerder in de demo, toegevoegd 28-10-2026).
- Alleen eigen producten, of klantprojecten met akkoord van de klant.

## Apps en inloggen (29-10-2026)

- Tabblad **Apps** (`src/pages/Apps.tsx`, handgeschreven op het sjabloon): kant-en-klare apps van Datawerf met "Probeer de demo". De lijst staat in `src/apps.ts` (naam, prijs/label, tekst, punten, scherm, demo- en inlogadres).
- **Inloggen** (`src/pages/Inloggen.tsx`, handgeschreven, besluit 29-10-2026): direct een tegel per app (korte omschrijving `short` in `src/apps.ts`, knoppen **Inloggen** en **Demo**); één klik naar het inlogscherm van de app. Onderaan het klantportaal (binnenkort: één inlog voor alle apps).
- Een app toevoegen: één regel in `src/apps.ts` en een schermafbeelding in `public/showcase/` (1600 × 1000).
- Adressen (29-10-2026): Dagplanning op `dagplanning.datawerf.com`, Wielen natrekken op `wielen.datawerf.com` (oude qcontrolz-adressen sturen door).

## Datawerf lab (29-10-2026)
- "Start gratis" (kop, voet en alle knoppen) gaat naar `/start/`: idee, naam, e-mail, bedrijf. Daarna `/lab/#id.sleutel`
  met het ontwerp in een afgesloten kader, de teller (x van 10), de doorgestreepte waarde en "Maak het nauwkeuriger".
- Achterkant, geheimen en regels: `supabase/lab/LEESMIJ.md`. Tests: `npm test`.
- Inloggen zonder account: mail "Uw ontwerp staat klaar" met de link, en op Inloggen en /lab/ "Mail mijn links".
- Tabblad **Lab** (29-10-2026, menu na Apps): `/lab/` zonder idee in het adres toont `src/pages/LabUitleg.tsx`: uitleg in vier stappen, voorbeelden uit het lab (live, via de actie `voorbeeld`; welke staat in `VOORBEELDEN` in `regels.ts` en `LAB_VOORBEELDEN` in `src/lab.ts`), veiligheid, "Uw ideeën" en "Mail mijn links". `/lab/` staat in de sitemap; alleen `/lab/beheer/` is uitgesloten in robots.txt.
- Hulpvragen (29-10-2026): op `/start/` de knop "Help mij mijn idee scherper te maken" (`src/LabVragen.tsx`). Een klein AI-model (actie `vragen`, standaard `claude-haiku-5-5`, instelbaar met `LAB_MODEL_VRAGEN`) stelt 3-5 vragen met keuzes die bij het getypte idee passen; lukt dat niet, dan algemene vragen (`STANDAARD_VRAGEN` in `src/lab.ts`). De vragen verschijnen één voor één (voortgang "1 van 4", Vorige/Volgende of Overslaan; bij één mogelijke keuze vanzelf door). De antwoorden komen als tekst in het ideevak en tellen niet als prompt.
- Bestanden toevoegen (29-10-2026): bij Start en bij "Maak het nauwkeuriger" kan de bezoeker tot drie Excel- (.xlsx) of CSV-bestanden kiezen. `src/labBestanden.ts` leest ze in de browser; alleen de opbouw (bladnamen, kolomnamen, soort per kolom, aantal rijen) gaat mee, nooit de inhoud en niet de bestandsnaam. De bezoeker ziet vooraf wat er meegaat (`src/LabBestanden.tsx`).
- Vaste app-stijl voor alle ontwerpen en apps: `docs/app-stijl.md`.
