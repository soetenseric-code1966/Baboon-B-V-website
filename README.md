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
