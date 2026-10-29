// Vaste app-stijl van Datawerf (besluit 29-10-2026): alle ontwerpen en apps die we opleveren zien eruit zoals de
// Dagplanning en Wielen natrekken. Uitleg voor mensen: docs/app-stijl.md. Deze CSS gaat letterlijk mee in de opdracht
// aan de AI van het lab; wijzig je hier iets, werk dan ook docs/app-stijl.md bij.

export const APP_FONTS =
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Roboto:wght@400;500&display=swap">';

export const APP_STIJL = `
:root{
  --merk:#0062a3;--merk-diep:#004e8f;--merk-licht:#2493ea;--merk-vlak:#e6eff9;
  --accent:#f77800;--accent-vlak:#fff2e7;
  --canvas:#eef3f8;--vlak:#ffffff;--vlak-2:#f8fafc;--vlak-3:#f1f5f9;
  --lijn:#e2e8f0;--lijn-sterk:#cbd5e1;
  --inkt:#0f172a;--inkt-zacht:#475569;--inkt-zachter:#64748b;
  --positief:#047857;--positief-vlak:#ecfdf5;--negatief:#b3261e;--negatief-vlak:#fef2f2;
  --letter:"Montserrat",ui-sans-serif,-apple-system,"Segoe UI",Arial,sans-serif;
  --cijfers:"Roboto",ui-sans-serif,-apple-system,"Segoe UI",Arial,sans-serif;
  --r-mini:8px;--r-klein:12px;--r:16px;--r-groot:20px;
  --schaduw-1:0 1px 2px rgb(15 23 42/.06);--schaduw-2:0 1px 2px rgb(15 23 42/.04),0 10px 28px -16px rgb(15 23 42/.3);
  --ring:0 0 0 3px rgb(0 98 163/.28);--marge:clamp(16px,3vw,34px);
}
*{box-sizing:border-box}
body{margin:0;background:var(--canvas);color:var(--inkt);font:14.5px/1.55 var(--letter);-webkit-font-smoothing:antialiased}
button,input,select,textarea{font:inherit;color:inherit}
:focus-visible{outline:none;box-shadow:var(--ring)}
.ds-app{display:grid;grid-template-columns:250px minmax(0,1fr);min-height:100dvh}
.ds-rail{position:sticky;top:0;height:100dvh;display:flex;flex-direction:column;gap:24px;padding:16px 12px;background:var(--vlak);border-right:1px solid var(--lijn);overflow:auto}
.ds-merk{display:flex;align-items:center;gap:10px;padding:4px 8px;font-weight:700;font-size:17px}
.ds-merk small{display:block;font:500 10.5px var(--cijfers);letter-spacing:.08em;text-transform:uppercase;color:var(--inkt-zachter)}
.ds-merkteken{display:grid;place-items:center;width:36px;height:36px;border-radius:var(--r-klein);background:var(--merk);color:#fff;font-weight:700}
.ds-menu{display:flex;flex-direction:column;gap:4px;margin:0;padding:0;list-style:none}
.ds-menu__kop{padding:12px 12px 4px;font:500 10.5px var(--cijfers);letter-spacing:.08em;text-transform:uppercase;color:var(--inkt-zachter)}
.ds-menu__item{display:flex;align-items:center;gap:12px;min-height:40px;padding:9px 12px;font-size:13.5px;font-weight:600;color:var(--inkt-zacht);text-decoration:none;background:none;border:0;border-radius:var(--r-klein);cursor:pointer;width:100%;text-align:left}
.ds-menu__item:hover{color:var(--inkt);background:var(--vlak-3)}
.ds-menu__item[aria-current="page"]{color:#fff;background:var(--merk);box-shadow:inset 2px 0 0 var(--accent)}
.ds-menu__badge{margin-left:auto;min-width:20px;height:20px;padding:0 6px;display:inline-grid;place-items:center;border-radius:999px;background:var(--negatief);color:#fff;font:500 10.5px var(--cijfers)}
.ds-gebruiker{margin-top:auto;padding:12px;border-top:1px solid var(--lijn);font-size:12.5px;color:var(--inkt-zacht)}
.ds-gebruiker strong{display:block;color:var(--inkt);font-size:13.5px}
.ds-hoofd{display:flex;flex-direction:column;min-width:0}
.ds-kop{position:sticky;top:0;z-index:10;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:16px var(--marge);background:rgb(255 255 255/.9);backdrop-filter:blur(14px);border-bottom:1px solid var(--lijn);box-shadow:var(--schaduw-1)}
.ds-kop__titel{margin:0;font-size:21px;font-weight:600;line-height:1.2;letter-spacing:-.01em}
.ds-kop__meta{margin:2px 0 0;font-size:12px;color:var(--inkt-zachter)}
.ds-filters{display:flex;flex-wrap:wrap;gap:8px}
.ds-inhoud{display:flex;flex-direction:column;gap:24px;padding:24px var(--marge) 48px}
.ds-tegels{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(210px,100%),1fr));gap:16px}
.ds-tegel{position:relative;display:flex;flex-direction:column;gap:8px;padding:16px 16px 16px 20px;overflow:hidden;background:var(--vlak-2);border:1px solid var(--lijn);border-radius:var(--r)}
.ds-tegel::before{content:"";position:absolute;inset:0 auto 0 0;width:3px;background:var(--lijn-sterk)}
.ds-tegel[data-delta="positief"]::before{background:var(--positief)}
.ds-tegel[data-delta="negatief"]::before{background:var(--negatief)}
.ds-tegel__label{color:var(--inkt-zachter);font-size:13px}
.ds-tegel__waarde{font:500 clamp(23px,2.6vw,29px)/1.1 var(--cijfers);font-variant-numeric:tabular-nums}
.ds-tegel__delta{font:12px var(--cijfers);color:var(--inkt-zachter)}
.ds-paneel{padding:24px;background:var(--vlak);border-radius:var(--r-groot);box-shadow:var(--schaduw-2);min-width:0}
.ds-paneel__titel{margin:0 0 12px;font-size:16px;font-weight:600}
.ds-raster{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr));gap:24px}
.ds-tabelvak{min-width:0;overflow-x:auto}
.ds-tabel{width:100%;border-collapse:collapse;font-size:14px}
.ds-tabel th,.ds-tabel td{padding:8px 12px;text-align:left;border-bottom:1px solid var(--lijn);white-space:nowrap}
.ds-tabel thead th{font:500 10.5px var(--cijfers);letter-spacing:.08em;text-transform:uppercase;color:var(--inkt-zachter);background:var(--vlak-2);border-bottom-color:var(--lijn-sterk)}
.ds-tabel tbody tr:hover{background:color-mix(in srgb,var(--merk) 8%,transparent)}
.ds-tabel .ds-getal{font-family:var(--cijfers);font-variant-numeric:tabular-nums;text-align:right}
.ds-tabel tfoot td{font-weight:600;background:var(--vlak-2);border-top:1px solid var(--lijn-sterk)}
.ds-link{font-weight:600;color:var(--merk-diep);background:none;border:0;padding:0;cursor:pointer;text-decoration:none}
.ds-link:hover{text-decoration:underline}
.ds-knop{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:9px 16px;font-size:13.5px;font-weight:600;color:#fff;background:var(--merk);border:0;border-radius:var(--r-klein);cursor:pointer}
.ds-knop:hover:not(:disabled){background:var(--merk-diep)}
.ds-knop--licht{color:var(--inkt-zacht);background:var(--vlak-3)}
.ds-knop--licht:hover:not(:disabled){color:var(--inkt);background:var(--lijn-sterk)}
.ds-knop--accent{background:var(--accent)}
.ds-pil{display:inline-flex;align-items:center;gap:6px;padding:2px 10px;border-radius:999px;font-size:12px;font-weight:600;background:var(--vlak-3);color:var(--inkt-zacht)}
.ds-pil--goed{background:var(--positief-vlak);color:var(--positief)}
.ds-pil--let{background:var(--accent-vlak);color:#9a4a00}
.ds-pil--fout{background:var(--negatief-vlak);color:var(--negatief)}
.ds-pil--info{background:var(--merk-vlak);color:var(--merk-diep)}
.ds-veld{display:grid;gap:6px;font-size:13px;font-weight:600}
.ds-invoer,.ds-veld input,.ds-veld select,.ds-filters select{min-height:40px;padding:8px 12px;border:1px solid var(--lijn-sterk);border-radius:var(--r-klein);background:var(--vlak)}
.ds-invoer:focus,.ds-veld input:focus,.ds-veld select:focus{border-color:var(--merk);box-shadow:var(--ring)}
.ds-upload{display:grid;gap:8px;place-items:center;padding:24px;border:2px dashed var(--lijn-sterk);border-radius:var(--r);color:var(--inkt-zacht);text-align:center}
.ds-upload[data-over="true"]{border-color:var(--merk);background:var(--merk-vlak)}
.ds-login{display:grid;grid-template-columns:minmax(0,.86fr) minmax(0,1.14fr);min-height:100dvh}
.ds-login__merkvlak{display:flex;flex-direction:column;justify-content:space-between;gap:32px;padding:48px clamp(28px,4.5vw,60px);color:#fff;background:radial-gradient(90% 70% at 0% 100%,rgb(255 90 31/.22),transparent 60%),#14213D}
.ds-login__leus{margin:0;font-size:clamp(24px,3vw,34px);font-weight:700;line-height:1.15}
.ds-login__vlak{display:grid;place-items:center;padding:32px var(--marge);background:var(--vlak-2)}
.ds-loginkaart{display:flex;flex-direction:column;gap:16px;width:min(392px,100%);padding:clamp(24px,3vw,34px);background:var(--vlak);border:2px solid #14213D;border-radius:var(--r-groot)}
.ds-loginkaart .ds-knop{justify-content:center;border-radius:999px;background:#14213D}
.ds-loginkaart .ds-knop:hover{background:#FF5A1F}
.ds-proef{padding:6px var(--marge);font:500 11px var(--cijfers);letter-spacing:.06em;text-transform:uppercase;color:#9a4a00;background:var(--accent-vlak);border-bottom:1px solid var(--lijn)}
@media (max-width:760px){
  .ds-app{grid-template-columns:minmax(0,1fr)}
  .ds-rail{position:static;height:auto;flex-direction:row;flex-wrap:wrap;align-items:center;gap:8px;border-right:0;border-bottom:1px solid var(--lijn)}
  .ds-menu{flex-direction:row;overflow-x:auto;flex-basis:100%}
  .ds-menu__item{width:auto;white-space:nowrap}
  .ds-gebruiker{display:none}
  .ds-login{grid-template-columns:minmax(0,1fr)}
  .ds-login__merkvlak{padding:28px var(--marge)}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`.trim();

export const APP_OPBOUW = `
Opbouw met deze klassen (gebruik ze, verzin geen andere stijl):
- Inlogscherm: <div class="ds-login"><section class="ds-login__merkvlak">appnaam + korte leus (ds-login__leus)</section><main class="ds-login__vlak"><form class="ds-loginkaart">…velden met .ds-veld…<button class="ds-knop">Inloggen</button></form></main></div>
- App: <div class="ds-app"><aside class="ds-rail"><div class="ds-merk"><span class="ds-merkteken">eerste letter</span><span>Appnaam<small>onderdeel</small></span></div><nav><ul class="ds-menu"><li><button class="ds-menu__item" aria-current="page">…</button></li></ul></nav><div class="ds-gebruiker"><strong>Naam</strong>rol</div></aside><div class="ds-hoofd"><div class="ds-proef">Eerste ontwerp · verzonnen gegevens</div><header class="ds-kop"><div><h1 class="ds-kop__titel">Scherm</h1><p class="ds-kop__meta">toelichting</p></div><div class="ds-filters">…</div></header><main class="ds-inhoud">…</main></div></div>
- Kerncijfers: .ds-tegels met .ds-tegel (+ data-delta="positief|negatief"), .ds-tegel__label, .ds-tegel__waarde, .ds-tegel__delta.
- Blokken: .ds-paneel met .ds-paneel__titel; twee naast elkaar in .ds-raster.
- Tabellen: .ds-tabelvak > table.ds-tabel; getallen in td.ds-getal; klikbare naam als button.ds-link.
- Status: .ds-pil met --goed, --let, --fout of --info. Knoppen: .ds-knop, .ds-knop--licht, .ds-knop--accent.
- Upload: .ds-upload (data-over="true" bij slepen).
- Grafieken: eenvoudige inline SVG met var(--merk) als hoofdkleur, var(--accent) voor de tweede reeks en var(--negatief) voor normen/grenzen; aslabels in var(--inkt-zachter), lettertype var(--cijfers).
`.trim();
