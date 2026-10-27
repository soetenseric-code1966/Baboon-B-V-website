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
