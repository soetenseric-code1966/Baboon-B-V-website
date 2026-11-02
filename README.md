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
| Hoe het werkt (sinds 02-11-2026) | `/hoe-het-werkt/` | `/en/how-it-works/` |
| Start gratis (lab) | `/start/` | `/en/start/` |
| Lab (tabblad; eigen idee via geheime link `/lab/#id.sleutel`) | `/lab/` | `/en/lab/` |
| Lab-beheer (niet in menu of sitemap) | `/lab/beheer/` | `/en/lab/admin/` |
| Prijzen | `/prijzen/` | `/en/pricing/` |
| Over ons | `/over-ons/` | `/en/about/` |
| Contact | `/contact/` | `/en/contact/` |
| Juridisch | `/juridisch/` | `/en/legal/` |
| Inloggen | `/inloggen/` | `/en/login/` |

## Opbouw van de site (02-11-2026)

Elke pagina beantwoordt één vraag, en elk project staat op één plek:
- **Home**: wat is Datawerf (opening, "Waarom Datawerf: AI bouwt. Developers controleren. U heeft eigen software." met drie kaarten waarin de zes usp's als vinkjes staan, carrousel Wat we bouwen, ingangen, afsluiter).
- **Wat we bouwen**: alleen "Opgeleverd en in gebruik" (`src/live.ts`: Qfleetz, Qeldr, Urenregistratie, Aardappelmonitor, Dagplanning, Qtyrez), elke kaart met een schermbeeld en de knop "Bekijk live" of "Bekijk de demo" onderaan op dezelfde hoogte; daarna "Wordt uw idee het volgende project?". Geen voorbeeldideeën ("Herkent u er een?") en geen voorbeelddemo's meer: we tonen wat echt gebouwd is.
- **Lab**: uitleg met de knop "Start met uw idee", de vier stappen en uw ideeën. Geen "Voorbeelden uit het lab", geen blok "Uw idee blijft van u" en geen tweede startknop onderaan (02-11-2026).
- **Kop** blijft staan tijdens scrollen op schermen vanaf 900 px breed (`src/site.css`); op de telefoon niet, daar is de kop met menu ruim 180 px hoog.
- **Hoe het werkt**: van idee tot live (met Qfleetz als echt voorbeeld), samenwerking, AI-agents programmeren / developers controleren, Europees van opzet. De startstappen staan bij het Lab. De niveaus staan alleen bij Prijzen; "van losse AI naar eigen platform" zit in het vergelijkingsblok op de homepage.
- Menu: Wat we bouwen · Hoe het werkt · Lab · Prijzen · Over ons · Contact. Bidderz staat niet in de carrousel.

## Korte homepage en tabblad Hoe het werkt (02-11-2026)

De homepage is kort (± 480 woorden in plaats van ± 1.700): opening, strook, "AI gebruiken is makkelijk. Erop kunnen bouwen niet." (drie kaarten: Excel, zelf met AI, Datawerf), Wat we bouwen, de zes usp's (alleen titels), twee ingangen, link naar Prijzen en de afsluiter. De uitleg staat op het tabblad **Hoe het werkt**: van idee tot live, samenwerking, van losse AI naar eigen platform, acht bouwstappen en drie niveaus, Europees van opzet, startstappen. Beide komen uit `src/pages/Global.tsx` (`Pagina` met `deel` = `home` of `hoe`; nieuwe teksten in `NTXT`). Oude links naar `/#hoe` gaan door naar het tabblad.

## Zes usp's op de homepage (01-11-2026)

De zes kaarten op de homepage (`usps` in `TXT` van `src/pages/Global.tsx`, NL en EN) volgen de visie van Datawerf: uw vakkennis is het startpunt · gebouwd met AI-agents, gecontroleerd door mensen · u ziet elke stap en houdt de regie · veilig met uw gegevens · professioneel gebouwd, ook na de livegang · bewezen in de praktijk. Tekst wijzigen: daar, en de besluitenlijst bijwerken.

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
- Schermafbeeldingen in `public/showcase/` (1600 × 1000, jpg). Nu: Qeldr, Urenregistratie, Aardappelmonitor (beginscherm, toegevoegd 27-10-2026), Dagplanning wagenpark (planbord ingelogd als vlootbeheerder in de demo, toegevoegd 28-10-2026); het Verzekerings- en schadeportaal is sinds 30-10-2026 een animatie (zie Getekende animaties).
- Alleen eigen producten, of klantprojecten met akkoord van de klant.

## Apps en inloggen (29-10-2026)

- Het tabblad **Apps** is vervallen (besluit 02-11-2026): de apps zijn nog niet als product te koop en niet universeel inzetbaar. `/apps/` stuurt door naar Wat we bouwen (`public/_redirects`). `src/apps.ts` blijft de lijst voor **Inloggen** (tegels met Inloggen en Demo).
- **Inloggen** (`src/pages/Inloggen.tsx`, handgeschreven, besluit 29-10-2026): direct een tegel per app (korte omschrijving `short` in `src/apps.ts`, knoppen **Inloggen** en **Demo**); één klik naar het inlogscherm van de app. Onderaan het klantportaal (binnenkort: één inlog voor alle apps).
- Getekende animaties (30-10-2026): video's in `public/video/` (MP4 met muziek + WebM, poster-jpg, 1600 × 900, verzonnen gegevens). Component `src/Film.tsx`: speelt zonder geluid in een lus zodra hij in beeld komt (laadt pas dan), knop "Geluid aan", bij "beweging beperken" niet vanzelf. Qfleetz "van idee tot live" op de homepage in Hoe het werkt (`src/ProcesFilm.tsx`, sinds 30-10-2026 in plaats van het oude voorbeeldscherm per stap): de vier stappen bovenin lopen mee met de animatie, een klik op een stap laat de animatie bij het begin van die stap starten, links de tekst bij de stap, met Pauzeer en Geluid aan. Deze versie van de video heeft geen eigen fasebalk; in het slotbeeld staat een schermafbeelding van Qfleetz duidelijker op de achtergrond (31-10-2026: herkenbaar, tekst en namen onleesbaar); het schadeportaal en de Aardappelmonitor (31-10-2026: 235 bronnen in 1 monitor, weer, satelliet en percelen met verwachte ton per hectare, prijzen en export NL/BE/DE/FR, 20 jaar historie en verwachting; voorbeeldcijfers) de Dagplanning (01-11-2026: ochtendtelling, dienstregeling, planbord Gew./Nu, rode kaart met reden en partij, kaartkleuren gemeld/gestart/gereed, KPI stilstand en doorlooptijd, onderhoudsplanning, verplaatsingsvoorstel; namen zoals de demo, voorbeeldcijfers) en Qtyrez (01-11-2026: kosten per km en per mm, per merk en type band, per merk en type voertuig en per aspositie, veiligheid, afwijkingen, planning en prognose; voorbeeldcijfers; klik opent de demo) in de carrousel (`video` en `duur` in `src/showcase.ts`; een project met video blijft staan tot de animatie rond is).
- Apps nu (niets is gratis, besluit 01-11-2026: prijs "Op aanvraag" tot die besloten is): Dagplanning, Wielen natrekken, **Qtyrez bandenmonitor** (01-11-2026, op aanvraag; Demo → `qtyrez.datawerf.com/demo`, Inloggen → `qtyrez.datawerf.com/`; scherm Kosten & analyse uit de demo in `public/showcase/qtyrez.jpg`), Urenregistratie (binnenkort).
- Een app toevoegen: één regel in `src/apps.ts` en een schermafbeelding in `public/showcase/` (1600 × 1000).
- Adressen (29-10-2026): Dagplanning op `dagplanning.datawerf.com`, Wielen natrekken op `wielen.datawerf.com` (oude qcontrolz-adressen sturen door).

## Datawerf lab (29-10-2026)
- "Start gratis" (kop, voet en alle knoppen) gaat naar `/start/`: idee, naam, e-mail, bedrijf. Daarna `/lab/#id.sleutel`
  met het ontwerp in een afgesloten kader, de teller (x van 10), de doorgestreepte waarde en "Maak het nauwkeuriger".
- Achterkant, geheimen en regels: `supabase/lab/LEESMIJ.md`. Tests: `npm test`.
- Inloggen zonder account: mail "Uw ontwerp staat klaar" met de link, en op Inloggen en /lab/ "Mail mijn links".
- Tabblad **Lab** (29-10-2026; menu sinds 02-11-2026 na Hoe het werkt): `/lab/` zonder idee in het adres toont `src/pages/LabUitleg.tsx`: uitleg in vier stappen (het blok veiligheid en de tweede startknop zijn 02-11-2026 vervallen; de voorbeelden uit het lab staan sinds 02-11-2026 niet meer op de pagina; de actie `voorbeeld` in de Edge Function en `LAB_VOORBEELDEN` bestaan nog), "Uw ideeën" en "Mail mijn links". `/lab/` staat in de sitemap; alleen `/lab/beheer/` is uitgesloten in robots.txt.
- Hulpvragen (29-10-2026): op `/start/` de knop "Help mij mijn idee scherper te maken" (`src/LabVragen.tsx`). Een klein AI-model (actie `vragen`, standaard `claude-haiku-5-5`, instelbaar met `LAB_MODEL_VRAGEN`) stelt 3-5 vragen met keuzes die bij het getypte idee passen; lukt dat niet, dan algemene vragen (`STANDAARD_VRAGEN` in `src/lab.ts`). De vragen verschijnen één voor één (voortgang "1 van 4", Vorige/Volgende of Overslaan; bij één mogelijke keuze vanzelf door). De antwoorden komen als tekst in het ideevak en tellen niet als prompt.
- Bestanden toevoegen (29-10-2026): bij Start en bij "Maak het nauwkeuriger" kan de bezoeker tot drie Excel- (.xlsx) of CSV-bestanden kiezen. `src/labBestanden.ts` leest ze in de browser; alleen de opbouw (bladnamen, kolomnamen, soort per kolom, aantal rijen) gaat mee, nooit de inhoud en niet de bestandsnaam. De bezoeker ziet vooraf wat er meegaat (`src/LabBestanden.tsx`).
- Vaste app-stijl voor alle ontwerpen en apps: `docs/app-stijl.md`.

## Vindbaarheid (01-11-2026)
- `scripts/prerender.mjs` zet op elke pagina bedrijfsgegevens voor zoekmachines (JSON-LD Organization + WebSite: Datawerf, ook "Datawerf Software", Baboon B.V., KvK, logo, LinkedIn) en `og:url`.
- `index.html`: deelbeeld `og:image` = `public/deelbeeld.jpg` (slotbeeld van de Qfleetz-animatie); logo voor Google: `public/logo.png` (512 × 512).
- Voet: link naar de LinkedIn-pagina Datawerf Software.
- De apps (Aardappelmonitor, Dagplanning, Wielen, Qtyrez) linken onderaan terug naar datawerf.com ("Gemaakt met Datawerf").
