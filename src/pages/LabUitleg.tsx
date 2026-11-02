// Tabblad Lab (besluit 29-10-2026): /lab/ zonder idee in het adres. Uitleg, veiligheid (voorbeelden uit het lab vervallen
// 02-11-2026: we tonen gerealiseerde projecten bij Wat we bouwen), de ideeën uit deze browser en "Mail mijn links". Op het homepagesjabloon.
// Een eigen idee staat op /lab/#id.sleutel (dat deel ziet Google niet) en wordt getoond door Lab.tsx.
import React, { useEffect, useState } from 'react';
import { kop } from '../Kop';
import { Lang, href } from '../routes';
import { LAB_INFO, LAB_TEXT, bewaardeIdeeen } from '../lab';
import LabLinks from '../LabLinks';

const mono: React.CSSProperties = { fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' };
const pil = (bg: string, fg: string, border = bg): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 24px', borderRadius: 999,
  background: bg, color: fg, border: `2px solid ${border}`, fontWeight: 700, textDecoration: 'none', fontSize: 16, cursor: 'pointer',
});
const h2: React.CSSProperties = { margin: '10px 0 0', fontSize: 44, lineHeight: 1.05, letterSpacing: '-1.4px', fontWeight: 700 };

export default function LabUitleg({ lang, signal }: { lang: Lang; signal: string }) {
  const t = LAB_INFO[lang];
  const [mijn, setMijn] = useState<ReturnType<typeof bewaardeIdeeen>>([]);

  useEffect(() => { setMijn(bewaardeIdeeen()); }, []);

  return (
    <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", color: '#14213D', background: '#FFFFFF', lineHeight: 1.5 }}>
      <section className="dw-sec" style={{ padding: '88px 48px 56px' }}>
        <div style={{ ...mono, color: signal }}>{t.eb}</div>
        <h1 className="dw-h1" style={{ margin: '16px 0 0', fontSize: 64, lineHeight: 1, letterSpacing: '-2.4px', fontWeight: 700, maxWidth: 900 }}>{kop(t.h1, signal)}</h1>
        <p style={{ margin: '20px 0 0', fontSize: 20, lineHeight: 1.55, color: '#3A4258', maxWidth: 780 }}>{t.sub}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
          <a href={href('Start', lang)} style={pil(signal, '#FFFFFF')}>{t.start} →</a>
          <a href={href('Etalage', lang)} style={pil('#FFFFFF', '#14213D', '#14213D')}>{t.bekijk}</a>
        </div>
      </section>

      <section className="dw-sec" style={{ padding: '0 48px 72px' }}>
        <div style={{ ...mono, color: '#5C6378' }}>{t.stappenEb}</div>
        <ol style={{ listStyle: 'none', margin: '16px 0 0', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(230px,100%),1fr))', gap: 20 }}>
          {t.stappen.map((s, i) => (
            <li key={i} style={{ borderRadius: 20, padding: 24, display: 'grid', gap: 8, alignContent: 'start', background: i === 3 ? '#14213D' : '#F3F5F8', color: i === 3 ? '#FFFFFF' : '#14213D' }}>
              <span style={{ ...mono, color: signal }}>0{i + 1}</span>
              <strong style={{ fontSize: 22, letterSpacing: '-0.4px' }}>{s.t}</strong>
              <span style={{ fontSize: 16, color: i === 3 ? '#C7CEDB' : '#3A4258' }}>{s.s}</span>
            </li>
          ))}
        </ol>
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
    </div>
  );
}
