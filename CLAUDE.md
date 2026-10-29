# Datawerf-website – afspraken voor de bouwagent

- Bron van waarheid voor alle besluiten: de besluitenlijst in het claude.ai-project ("datawerf/besluitenlijst.md"). Bij twijfel geldt die lijst.
- Vóór elke opdracht eerst lezen: de besluitenlijst, deze `CLAUDE.md` en `README.md`. Bij strijdigheid eerst Eric vragen.
- Elk nieuw besluit of nieuwe afspraak direct vastleggen, met datum.
- Elke pull request werkt in dezelfde wijziging bij wat erdoor verandert: `CLAUDE.md`, `README.md` en zo nodig de besluitenlijst. Een wijziging zonder bijgewerkte afspraken is niet af.
- Nooit zelf naar `main` pushen: werk op een branch en open een pull request.
- Netlify alleen voor statische hosting: geen Netlify Functions, geen Edge Functions, geen Netlify Database, geen Netlify Forms.
- Alles nieuw in React (Vite + TypeScript), in de huisstijl: donkerblauw #14213D, oranje #FF5A1F, Space Grotesk en IBM Plex Mono, ronde knoppen.
- Altijd Nederlands én Engels; een nieuwe pagina volgt het sjabloon van de homepage (zelfde kop en voet uit `src/Layout.tsx`).
- Website-regels: nooit "gebouwd in Europa" of "uw gegevens verlaten de EU niet"; geen persoonsnamen; geen klantlogo's zonder akkoord; developers niet bij naam of locatie noemen.
- Apps (besluit 29-10-2026): kant-en-klare apps staan in `src/apps.ts` en verschijnen op de pagina Apps en bij Inloggen. Inloggen (29-10-2026) toont direct een tegel per app met korte omschrijving en de knoppen Inloggen en Demo: één klik naar de app, geen tussenscherm. Alleen eigen apps van Baboon B.V.; demo's alleen met fictieve gegevens; geen klantnaam.
- Lab (besluit 29-10-2026): "Start gratis" gaat naar het lab (`/start/`, `/lab/`). Achterkant in `supabase/lab/` (Edge Function `datawerf-lab` en schema `lab` in het Supabase-project Aardappelmonitor, tijdelijk). Max. 10 prompts per idee, alleen verzonnen gegevens, ontwerp in een afgesloten kader. Geen sleutels in de code; geheimen alleen in Supabase. Wijzig je de functie: `npm test` en opnieuw uitrollen met beide bestanden.
