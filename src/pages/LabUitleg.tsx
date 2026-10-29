// Tabblad Lab (besluit 29-10-2026): /lab/ zonder idee in het adres. Uitleg, voorbeelden uit het lab (vaste ontwerpen
// via de actie "voorbeeld"), veiligheid, de ideeën uit deze browser en "Mail mijn links". Op het homepagesjabloon.
// Een eigen idee staat op /lab/#id.sleutel (dat deel ziet Google niet) en wordt getoond door Lab.tsx.
import React, { useEffect, useState } from 'react';
import { Lang, href } from '../routes';
import { LAB_INFO, LAB_TEXT, LAB_VOORBEELDEN, bewaardeIdeeen, labApi } from '../lab';
import LabLinks from '../LabLinks';

const mono: React.CSSProperties = { fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' };
const pil = (bg: string, fg: string, border = bg): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 24px', borderRadius: 999,
  background: bg, color: fg, border: `2px solid ${border}`, fontWeight: 700, textDecoration: 'none', fontSize: 16, cursor: 'pointer',
});
const h2: React.CSSProperties = { margin: '10px 0 0', fontSize: 44, lineHeight: 1.05, letterSpacing: '-1.4px', fontWeight: 700 };

type Voorbeeld = { html: string; samenvatting: string | null } | 'fout' | undefined;

export default function LabUitleg({ lang, signal }: { lang: Lang; signal: string }) {
  const t = LAB_INFO[lang];
  const [keuze, setKeuze] = useState<string>(LAB_VOORBEELDEN[0].naam);
  const [voorbeelden, setVoorbeelden] = useState<Record<string, Voorbeeld>>({});
  const [mijn, setMijn] = useState<ReturnType<typeof bewaardeIdeeen>>([]);

  useEffect(() => { setMijn(bewaardeIdeeen()); }, []);
  useEffect(() => {
    if (voorbeelden[keuze]) return;
    labApi<{ html: string; samenvatting: string | null }>({ actie: 'voorbeeld', naam: keuze })
      .then((v) => setVoorbeelden((o) => ({ ...o, [keuze]: v })))
      .catch(() => setVoorbeelden((o) => ({ ...o, [keuze]: 'fout' })));
  }, [keuze, voorbeelden]);

  const gekozen = LAB_VOORBEELDEN.find((v) => v.naam === keuze)!;
  const vb = voorbeelden[keuze];

  return (
    <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", color: '#14213D', background: '#FFFFFF', lineHeight: 1.5 }}>
      <section className="dw-sec" style={{ padding: '88px 48px 56px' }}>
        <div style={{ ...mono, color: signal }}>{t.eb}</div>
        <h1 className="dw-h1" style={{ margin: '16px 0 0', fontSize: 72, lineHeight: 1, letterSpacing: '-2.6px', fontWeight: 700, maxWidth: 900 }}>{t.h1}</h1>
        <p style={{ margin: '20px 0 0', fontSize: 21, lineHeight: 1.55, color: '#3A4258', maxWidth: 780 }}>{t.sub}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
          <a href={href('Start', lang)} style={pil(signal, '#FFFFFF')}>{t.start} →</a>
          <a href="#voorbeelden" style={pil('#FFFFFF', '#14213D', '#14213D')}>{t.bekijk}</a>
        </div>
      </section>

      <section className="dw-sec" style={{ padding: '0 48px 72px' }}>
        <div style={{ ...mono, color: '#5C6378' }}>{t.stappenEb}</div>
        <ol style={{ listStyle: 'none', margin: '16px 0 0', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(230px,100%),1fr))', gap: 20 }}>
          {t.stappen.map((s, i) => (
            <li key={i} style={{ border: '2px solid #14213D', borderRadius: 20, padding: 24, display: 'grid', gap: 8, alignContent: 'start', background: i === 3 ? '#14213D' : '#FFFFFF', color: i === 3 ? '#FFFFFF' : '#14213D' }}>
              <span style={{ ...mono, color: signal }}>0{i + 1}</span>
              <strong style={{ fontSize: 22, letterSpacing: '-0.4px' }}>{s.t}</strong>
              <span style={{ fontSize: 16, color: i === 3 ? '#C7CEDB' : '#3A4258' }}>{s.s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="voorbeelden" className="dw-sec" style={{ padding: '72px 48px', background: '#F7F8FA' }}>
        <div style={{ ...mono, color: signal }}>{t.vbEb}</div>
        <h2 style={h2}>{t.vbH}</h2>
        <p style={{ margin: '14px 0 0', fontSize: 18, color: '#3A4258', maxWidth: 760 }}>{t.vbS}</p>
        <div role="tablist" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
          {LAB_VOORBEELDEN.map((v) => (
            <button key={v.naam} role="tab" type="button" aria-selected={keuze === v.naam} onClick={() => setKeuze(v.naam)}
              style={{ ...pil(keuze === v.naam ? '#14213D' : '#FFFFFF', keuze === v.naam ? '#FFFFFF' : '#14213D', '#14213D'), padding: '10px 20px', fontSize: 15 }}>{v.label[lang]}</button>
          ))}
        </div>
        <p style={{ margin: '16px 0 0', fontSize: 16, color: '#3A4258', maxWidth: 900 }}><strong style={{ color: '#14213D' }}>{t.vbIdee}:</strong> {gekozen.idee[lang]}</p>
        <div role="tabpanel" style={{ marginTop: 16, border: '2px solid #14213D', borderRadius: 20, overflow: 'hidden', background: '#FFFFFF', minHeight: 420, display: 'grid' }}>
          {vb && vb !== 'fout' ? (
            <iframe title={gekozen.label[lang]} srcDoc={vb.html} sandbox="allow-scripts allow-forms"
              style={{ width: '100%', height: 'min(78vh, 860px)', border: 0, background: '#FFFFFF' }} />
          ) : (
            <div style={{ display: 'grid', placeItems: 'center', padding: 40, gap: 12, textAlign: 'center', color: '#3A4258' }}>
              {vb === 'fout' ? <span>{t.vbFout}</span> : <>
                <div className="lab-laden" aria-hidden="true" style={{ width: 40, height: 40, borderRadius: '50%', border: '4px solid #E3E7EE', borderTopColor: signal }} />
                <span>{t.vbLaden}</span></>}
            </div>
          )}
        </div>
        {vb && vb !== 'fout' && vb.samenvatting ? <p style={{ margin: '12px 0 0', color: '#3A4258', maxWidth: 900 }}>{vb.samenvatting}</p> : null}
      </section>

      <section className="dw-sec" style={{ padding: '72px 48px' }}>
        <div style={{ ...mono, color: signal }}>{t.veiligEb}</div>
        <h2 style={h2}>{t.veiligH}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 20, marginTop: 24 }}>
          {t.veilig.map((v, i) => (
            <div key={i} style={{ borderRadius: 20, padding: 24, background: '#F7F8FA', display: 'grid', gap: 8, alignContent: 'start' }}>
              <strong style={{ fontSize: 20 }}>{v.t}</strong>
              <span style={{ fontSize: 16, color: '#3A4258' }}>{v.s}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="dw-sec" style={{ padding: '0 48px 72px' }}>
        <div style={{ background: '#14213D', color: '#FFFFFF', borderRadius: 20, padding: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 28, alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px' }}>{t.mijnH}</div>
            {mijn.length ? mijn.map((m) => (
              <a key={m.id} href={'#' + m.id + '.' + m.sleutel} style={{ ...pil('#FFFFFF', '#14213D'), justifyContent: 'space-between', padding: '12px 20px' }}><span>{m.titel}</span><span aria-hidden="true">→</span></a>
            )) : <p style={{ margin: 0, color: '#C7CEDB' }}>{LAB_TEXT[lang].geen}</p>}
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{LAB_TEXT[lang].linksT}</div>
            <LabLinks lang={lang} signal={signal} donker />
          </div>
        </div>
      </section>

      <section className="dw-sec" style={{ padding: '0 48px 96px' }}>
        <div style={{ background: signal, color: '#FFFFFF', borderRadius: 20, padding: '40px 36px', display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.1 }}>{t.slotH}</div>
            <p style={{ margin: '8px 0 0', fontSize: 18 }}>{t.slotS}</p>
          </div>
          <a href={href('Start', lang)} style={pil('#14213D', '#FFFFFF')}>{t.start} →</a>
        </div>
      </section>
    </div>
  );
}
