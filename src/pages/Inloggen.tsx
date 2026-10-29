// Inloggen (besluit 29-10-2026, aangescherpt): direct de apps als tegels, met per app een korte omschrijving en de
// knoppen Inloggen en Demo. Eén klik brengt de klant op het inlogscherm (of de demo) van de app zelf.
// Handgeschreven op het homepagesjabloon (zelfde kop, voet, labels, ronde knoppen en kaarten als Apps).
// Later: één inlog via het klantportaal (blok onderaan).
import React from 'react';
import { Lang, href } from '../routes';
import { APPS, LOGIN_APPS_TEXT } from '../apps';

const mono: React.CSSProperties = { fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' };
const chip: React.CSSProperties = { fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, textTransform: 'uppercase' };
const pill = (bg: string, fg: string, border = bg): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 22px', borderRadius: 999,
  background: bg, color: fg, border: `2px solid ${border}`, fontWeight: 700, textDecoration: 'none', fontSize: 16,
});

export default function Inloggen({ lang, signal }: { lang: Lang; signal: string }) {
  const t = LOGIN_APPS_TEXT[lang];
  return (
    <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", color: '#14213D', background: '#FFFFFF', lineHeight: 1.5 }}>
      <section className="dw-sec" style={{ padding: '80px 48px 40px' }}>
        <div style={{ ...mono, color: signal }}>{t.eb}</div>
        <h1 className="dw-h1" style={{ margin: '16px 0 0', fontSize: 64, lineHeight: 1, letterSpacing: '-2.4px', fontWeight: 700 }}>{t.h1}</h1>
        <p style={{ margin: '16px 0 0', fontSize: 20, lineHeight: 1.55, color: '#3A4258', maxWidth: 780 }}>{t.sub}</p>
      </section>

      <section className="dw-sec" style={{ padding: '0 48px 56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24, alignItems: 'stretch' }}>
        {APPS.map((a) => (
          <article key={a.key} style={{ border: '2px solid #14213D', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 12, opacity: a.soon ? 0.85 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ ...chip, background: '#14213D', color: '#FFFFFF' }}>{a.kind[lang]}</span>
              <span style={{ ...chip, background: a.free ? '#E7F6EF' : '#FFF1EB', color: a.free ? '#0F7A55' : '#B23C0E' }}>{a.price[lang]}</span>
            </div>
            <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.6px' }}>{a.name[lang]}</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: '#3A4258' }}>{a.short[lang]}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 8 }}>
              {a.login ? <a href={a.login} style={pill('#14213D', '#FFFFFF')}>{t.login} →</a> : null}
              {a.demo ? <a href={a.demo} target="_blank" rel="noopener" style={pill('#FFFFFF', '#14213D', '#14213D')}>{t.demo}</a> : null}
              {a.soon && !a.login ? <a href={href('Contact', lang)} style={pill('#FFFFFF', '#14213D', '#14213D')}>{t.list}</a> : null}
            </div>
          </article>
        ))}
      </section>

      <section className="dw-sec" style={{ padding: '0 48px 88px' }}>
        <div style={{ background: '#F7F8FA', borderRadius: 20, padding: 32, display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ ...mono, color: '#5C6378' }}>{t.portalEb}</div>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', marginTop: 6 }}>{t.portalT}</div>
            <p style={{ margin: '8px 0 0', fontSize: 16, color: '#3A4258' }}>{t.portalS}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="mailto:info@datawerf.com" style={pill('#14213D', '#FFFFFF')}>info@datawerf.com</a>
            <a href={href('Aanmelden', lang)} style={pill(signal, '#FFFFFF')}>{t.newB} →</a>
          </div>
        </div>
      </section>
    </div>
  );
}
