// Tabblad Apps (besluit 29-10-2026): kant-en-klare apps van Datawerf, met "Probeer de demo".
// Handgeschreven op het homepagesjabloon (zelfde kop, voet, labels, ronde knoppen en kaarten als Wat we bouwen).
import React from 'react';
import { Lang, href } from '../routes';
import { APPS, APPS_TEXT } from '../apps';

const mono: React.CSSProperties = { fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' };
const pill = (bg: string, fg: string, border = bg): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 22px', borderRadius: 999,
  background: bg, color: fg, border: `2px solid ${border}`, fontWeight: 700, textDecoration: 'none', fontSize: 16,
});

export default function Apps({ lang, signal }: { lang: Lang; signal: string }) {
  const t = APPS_TEXT[lang];
  return (
    <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", color: '#14213D', background: '#FFFFFF', lineHeight: 1.5 }}>
      <section className="dw-sec" style={{ padding: '80px 48px 48px' }}>
        <div style={{ ...mono, color: signal }}>{t.eb}</div>
        <h1 className="dw-h1" style={{ margin: '16px 0 0', fontSize: 64, lineHeight: 1, letterSpacing: '-2.4px', fontWeight: 700, maxWidth: 980 }}>{t.h1}</h1>
        <p style={{ margin: '20px 0 0', fontSize: 20, lineHeight: 1.5, color: '#3A4258', maxWidth: 760 }}>{t.sub}</p>
      </section>

      <section className="dw-sec" style={{ padding: '0 48px 72px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))', gap: 24, alignItems: 'stretch' }}>
        {APPS.map((a) => (
          <article key={a.key} style={{ border: '2px solid #14213D', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {a.screen ? (
              <a href={a.demo} target="_blank" rel="noopener" className="sc-link" aria-label={`${t.demo}: ${a.name[lang]}`}
                style={{ display: 'block', margin: '-12px -12px 4px', borderRadius: 14, overflow: 'hidden', background: '#14213D', padding: 10 }}>
                <span className="sc-frame" style={{ display: 'block', borderRadius: 8, overflow: 'hidden' }}>
                  <img src={a.screen} alt="" width={1600} height={1000} loading="lazy" decoding="async"
                    style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '16/10', objectFit: 'cover', objectPosition: 'top' }} />
                </span>
              </a>
            ) : null}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: '#14213D', color: '#FFFFFF', textTransform: 'uppercase' }}>{a.kind[lang]}</span>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: a.free ? '#E7F6EF' : '#FFF1EB', color: a.free ? '#0F7A55' : '#B23C0E' }}>{a.price[lang]}</span>
            </div>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, letterSpacing: '-0.8px' }}>{a.name[lang]}</h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: '#3A4258' }}>{a.text[lang]}</p>
            <div>
              {a.points[lang].map((x) => (
                <div key={x} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #E3E7EE', fontSize: 15 }}>
                  <span aria-hidden="true" style={{ color: signal }}>✓</span>{x}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 8 }}>
              {a.demo ? <a href={a.demo} target="_blank" rel="noopener" style={pill(signal, '#FFFFFF')}>{t.demo} →</a> : null}
              <a href={href('Contact', lang)} style={pill('#FFFFFF', '#14213D', '#14213D')}>{a.soon ? t.list : t.ask}</a>
            </div>
            {a.demo ? <p style={{ margin: 0, fontSize: 13, color: '#5C6378' }}>{t.demoNote}</p> : null}
          </article>
        ))}
      </section>

      <section className="dw-sec" style={{ padding: '0 48px 72px' }}>
        <div style={{ background: '#F7F8FA', borderRadius: 20, padding: 32, display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ ...mono, color: '#5C6378' }}>{t.moreEb}</div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.6px', marginTop: 6 }}>{t.moreT}</div>
            <p style={{ margin: '8px 0 0', fontSize: 17, color: '#3A4258' }}>{t.moreS}</p>
          </div>
          <a href={href('Inloggen', lang)} style={pill('#14213D', '#FFFFFF')}>{t.login} →</a>
        </div>
      </section>

      <section className="dw-sec" style={{ padding: '0 48px 88px' }}>
        <div style={{ background: signal, color: '#FFFFFF', borderRadius: 20, padding: 40, display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-1px' }}>{t.endT}</div>
            <p style={{ margin: '8px 0 0', fontSize: 18 }}>{t.endS}</p>
          </div>
          <a href={href('Etalage', lang)} style={pill('#FFFFFF', '#14213D')}>{t.endB} →</a>
        </div>
      </section>
    </div>
  );
}
