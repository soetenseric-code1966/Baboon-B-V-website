import React, { useEffect, useRef, useState } from 'react';
import { SHOWCASE, SHOWCASE_TEXT, SHOWCASE_INTERVAL } from './showcase';
import type { Lang } from './routes';

const MONO = "'IBM Plex Mono',monospace";
const BARS = [[40, 62, 48, 80, 56, 90, 70, 100], [30, 45, 70, 52, 88, 64, 76, 95], [70, 55, 85, 60, 92, 50, 78, 100], [50, 72, 44, 86, 66, 58, 94, 100]];

// Carrousel met opgeleverde projecten. Draait vanzelf (pauzeert bij muis erop, focus,
// een verborgen tabblad of "beweging beperken"); klik op het scherm opent de oplossing.
export default function Showcase({ lang, signal, title, sub }: { lang: Lang; signal: string; title: string; sub: string }) {
  const T = SHOWCASE_TEXT[lang];
  const n = SHOWCASE.length;
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hold, setHold] = useState(false);
  const [reduced, setReduced] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const upd = () => setReduced(mq.matches);
    upd();
    mq.addEventListener('change', upd);
    return () => mq.removeEventListener('change', upd);
  }, []);

  useEffect(() => {
    if (!playing || hold || reduced) return;
    const id = window.setInterval(() => { if (!document.hidden) setI((k) => (k + 1) % n); }, SHOWCASE_INTERVAL);
    return () => window.clearInterval(id);
  }, [playing, hold, reduced, n]);

  const go = (k: number) => setI(((k % n) + n) % n);
  const it = SHOWCASE[i];
  const name = it.name[lang];
  const auto = playing && !reduced;

  const screen = it.screen ? (
    <img src={it.screen} alt={`${name}: ${lang === 'nl' ? 'schermafbeelding' : 'screenshot'}`} width={1920} height={1200}
      loading={i === 0 ? 'eager' : 'lazy'} decoding="async" style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' }} />
  ) : (
    <div style={{ background: '#FFFFFF', padding: 18, display: 'flex', flexDirection: 'column', gap: 12, aspectRatio: '16 / 10' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong style={{ fontSize: 15 }}>{name}</strong>
        <span style={{ fontFamily: MONO, fontSize: 11, padding: '3px 8px', borderRadius: 999, background: '#FFF0E8', color: '#9A3412' }}>{T.example}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8 }}>
        <div style={{ height: 52, background: '#F7F8FA', borderRadius: 8 }} /><div style={{ height: 52, background: '#F7F8FA', borderRadius: 8 }} /><div style={{ height: 52, background: '#FFF0E8', borderRadius: 8 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, flex: 1, minHeight: 80 }}>
        {BARS[i % BARS.length].map((h, k, a) => <div key={k} style={{ flex: 1, borderRadius: 4, height: `${h}%`, background: k === a.length - 1 ? signal : '#D5DAE3' }} />)}
      </div>
      <div style={{ height: 26, border: '1px solid #EEF0F4', borderRadius: 6 }} />
    </div>
  );

  const frame = (
    <div className="sc-frame" style={{ borderRadius: 14, overflow: 'hidden', background: '#1E2D50', boxShadow: '0 24px 48px -24px rgba(0,0,0,0.6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 12px' }}>
        <i style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} /><i style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} /><i style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
        <span style={{ marginLeft: 10, fontFamily: MONO, fontSize: 12, color: '#C7CEDB', background: '#14213D', borderRadius: 6, padding: '3px 10px', flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{it.host || name.toLowerCase()}</span>
      </div>
      <div key={i} className="sc-fade">{screen}</div>
    </div>
  );

  return (
    <section id="werk" style={{ padding: '0 48px 88px' }} aria-roledescription="carousel" aria-label={title}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
        <div>
          <h2 style={{ margin: '10px 0 0', fontSize: 48, letterSpacing: '-1.6px', lineHeight: 1.05, maxWidth: 900 }}>{title}</h2>
          <p style={{ margin: '16px 0 0', fontSize: 19, lineHeight: 1.55, color: '#3A4258', maxWidth: 780 }}>{sub}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: MONO, fontSize: 13, color: '#5C6378' }} aria-hidden="true">{i + 1} / {n}</span>
          <button type="button" className="sc-btn" aria-label={auto ? T.pause : T.play} aria-pressed={!auto} onClick={() => setPlaying((p) => !p)} disabled={reduced}
            style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid #D5DAE3', background: '#FFFFFF', color: '#14213D', cursor: reduced ? 'default' : 'pointer', fontSize: 14, opacity: reduced ? 0.4 : 1 }}>{auto ? '❚❚' : '▶'}</button>
          <button type="button" className="sc-btn" aria-label={T.prev} onClick={() => go(i - 1)} style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #14213D', background: '#FFFFFF', fontSize: 20, cursor: 'pointer', color: '#14213D' }}>←</button>
          <button type="button" className="sc-btn" aria-label={T.next} onClick={() => go(i + 1)} style={{ width: 52, height: 52, borderRadius: '50%', border: 0, background: signal, color: '#FFFFFF', fontSize: 20, cursor: 'pointer' }}>→</button>
        </div>
      </div>

      <div ref={box} className="sc-grid" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)} onBlur={(e) => { if (!box.current?.contains(e.relatedTarget as Node)) setHold(false); }}
        style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.25fr)', borderRadius: 24, overflow: 'hidden', border: '1px solid #D5DAE3' }}>
        <div className="sc-text" style={{ padding: 44, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} aria-live={auto && !hold ? 'off' : 'polite'}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: '#14213D', color: '#FFFFFF', textTransform: 'uppercase' }}>{it.kind[lang]}</span>
            <span style={{ fontFamily: MONO, fontSize: 12, color: '#5C6378' }}>{it.stage[lang]}</span>
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-1.2px', marginTop: 14, lineHeight: 1.05 }}>{name}</div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#3A4258', margin: '12px 0 0' }}>{it.text[lang]}</p>
          {it.url ? (
            <a href={it.url} target="_blank" rel="noopener" style={{ alignSelf: 'flex-start', marginTop: 18, fontWeight: 700, color: signal, textDecoration: 'none' }}>{T.open} {it.host} ↗</a>
          ) : null}
          <div style={{ display: 'flex', gap: 6, marginTop: 26 }}>
            {SHOWCASE.map((x, k) => (
              <button key={k} type="button" aria-label={x.name[lang]} aria-current={k === i ? 'true' : undefined} onClick={() => go(k)}
                style={{ height: 10, border: 0, borderRadius: 5, padding: 0, cursor: 'pointer', width: k === i ? 28 : 10, background: k === i ? signal : '#C7CEDB', transition: 'width .3s' }} />
            ))}
          </div>
        </div>
        <div style={{ background: '#14213D', padding: 32, display: 'flex', alignItems: 'center', minHeight: 320 }}>
          {it.url ? (
            <a href={it.url} target="_blank" rel="noopener" className="sc-link" aria-label={`${T.open} ${name} (${it.host})`} style={{ display: 'block', width: '100%', position: 'relative', textDecoration: 'none' }}>
              {frame}
              <span className="sc-hint" style={{ position: 'absolute', right: 14, bottom: 14, padding: '8px 14px', borderRadius: 999, background: signal, color: '#FFFFFF', fontWeight: 700, fontSize: 14 }}>{T.open} {it.host} ↗</span>
            </a>
          ) : (
            <div style={{ width: '100%' }}>{frame}</div>
          )}
        </div>
      </div>
    </section>
  );
}
