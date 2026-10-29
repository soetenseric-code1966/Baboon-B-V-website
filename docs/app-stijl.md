# App-stijl van Datawerf

Besluit Eric 29-10-2026: alle ontwerpen en apps die Datawerf oplevert, zien eruit zoals de **Dagplanning** en
**Wielen natrekken**. De website datawerf.com heeft een eigen stijl (Space Grotesk, donkerblauw en oranje); de apps
hebben deze app-stijl. De inlogschermen van de apps sluiten aan op de website.

De techniek staat in `supabase/lab/functions/datawerf-lab/stijl.ts`. Het lab zet dit stylesheet automatisch in elk
ontwerp; de AI gebruikt alleen de klassen en kleuren hieronder. Wijzig je de stijl, werk dan beide bij.

## Lettertypen
- **Montserrat** (500, 600, 700): alle tekst, koppen 600–700.
- **Roboto** (400, 500): cijfers in tegels en tabellen, kleine labels in hoofdletters met wat letterafstand.

## Kleuren
| Rol | Kleur |
|---|---|
| Merk (knoppen, actief menu, links) | `#0062a3`, donker `#004e8f`, vlak `#e6eff9` |
| Accent (streep bij actief menu, tweede reeks) | `#f77800`, vlak `#fff2e7` |
| Achtergrond werkvlak | `#eef3f8`; kaarten wit; lichte vlakken `#f8fafc` en `#f1f5f9` |
| Lijnen | `#e2e8f0`, sterk `#cbd5e1` |
| Tekst | `#0f172a`, zacht `#475569`, zachter `#64748b` |
| Goed / fout | `#047857` op `#ecfdf5` / `#b3261e` op `#fef2f2` |
| Inlogscherm | linkervlak `#14213D` met oranje gloed (`#FF5A1F`), kaart met donkere rand en ronde knop (zoals datawerf.com) |

## Vormen
- Afronding: 8 px (klein), 12 px (knoppen, velden, menu), 16 px (tegels), 20 px (panelen). Statuslabels en de inlogknop rond (pil).
- Schaduw alleen op panelen, zacht. Tegels hebben links een smalle gekleurde streep (grijs, groen of rood).
- Focus: blauwe ring van 3 px.

## Opbouw van een scherm
1. **Menu links** (250 px, wit, rand rechts): merkteken + appnaam, menu-items (actief = blauw met oranje streep), onderaan de gebruiker. Op de telefoon wordt het menu een balk bovenaan.
2. **Kop** (blijft bovenaan staan): titel van het scherm, korte toelichting, filters rechts.
3. **Inhoud**: eerst kerncijfers (tegels), dan panelen met grafiek of tabel, twee naast elkaar waar het past.
4. **Tabellen**: kolomkoppen klein in hoofdletters, getallen rechts uitgelijnd in Roboto, regel licht blauw bij aanwijzen, brede tabellen scrollen binnen hun vak.
5. **Status** met gekleurde labels (goed, let op, fout, info); **knoppen** blauw, licht grijs of oranje (accent).
6. **Uploadvak** met stippellijn; bij slepen blauw.
7. **Grafieken**: blauw voor de hoofdreeks, oranje voor de tweede, rood gestippeld voor normen en budgetten.

## Klassen (voor bouwers en de AI)
`ds-app`, `ds-rail`, `ds-merk`, `ds-merkteken`, `ds-menu`, `ds-menu__item`, `ds-menu__badge`, `ds-gebruiker`,
`ds-hoofd`, `ds-kop`, `ds-kop__titel`, `ds-kop__meta`, `ds-filters`, `ds-inhoud`, `ds-tegels`, `ds-tegel`
(`__label`, `__waarde`, `__delta`, `data-delta`), `ds-paneel`, `ds-paneel__titel`, `ds-raster`, `ds-tabelvak`,
`ds-tabel`, `ds-getal`, `ds-link`, `ds-knop` (`--licht`, `--accent`), `ds-pil` (`--goed`, `--let`, `--fout`,
`--info`), `ds-veld`, `ds-invoer`, `ds-upload`, `ds-login` (`__merkvlak`, `__leus`, `__vlak`), `ds-loginkaart`, `ds-proef`.
