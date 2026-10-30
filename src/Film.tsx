// Getekende animatie als video (besluit 30-10-2026). Speelt zonder geluid in een lus zodra hij in beeld komt; laadt
// pas dan (scheelt data op de telefoon). MP4 (H.264) met WebM (VP9) als tweede bron. Knop voor geluid aan/uit. Bij "beweging beperken": niet vanzelf afspelen,
// wel de afspeelknoppen van de browser.
import React, { useEffect, useRef, useState } from 'react';
import type { Lang } from './routes';

const T = {
  nl: { aan: 'Geluid aan', uit: 'Geluid uit' },
  en: { aan: 'Sound on', uit: 'Sound off' },
};

export default function Film({ lang, src, poster, label, signal, rond = 14 }: { lang: Lang; src: string; poster: string; label: string; signal: string; rond?: number }) {
  const v = useRef<HTMLVideoElement>(null);
  const [stil, setStil] = useState(true);
  const [rustig, setRustig] = useState(false);
  const [zichtbaar, setZichtbaar] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setRustig(mq.matches);
    const el = v.current;
    if (!el || !('IntersectionObserver' in window)) { setZichtbaar(true); return; }
    const io = new IntersectionObserver(([e]) => setZichtbaar(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = v.current;
    if (!el || rustig) return;
    if (zichtbaar) el.play().catch(() => { /* afspelen geweigerd: de poster blijft staan */ });
    else el.pause();
  }, [zichtbaar, rustig]);

  function geluid() {
    const el = v.current; if (!el) return;
    el.muted = !el.muted; setStil(el.muted);
    if (!el.muted) { el.currentTime = 0; el.play().catch(() => {}); }
  }

  return (
    <div style={{ position: 'relative', borderRadius: rond, overflow: 'hidden', background: '#14213D', aspectRatio: '16 / 9', maxWidth: '100%' }}>
      <video ref={v} poster={poster} muted loop playsInline preload="none" controls={rustig}
        aria-label={label} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}>
        <source src={src} type="video/mp4" />
        <source src={src.replace(/\.mp4$/, '.webm')} type="video/webm" />
      </video>
      {!rustig ? (
        <button type="button" onClick={geluid} aria-pressed={!stil}
          style={{ position: 'absolute', right: 12, top: 12, padding: '7px 14px', borderRadius: 999, border: 0, background: stil ? 'rgba(20,33,61,.82)' : signal, color: '#FFFFFF', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          {stil ? T[lang].aan : T[lang].uit}
        </button>
      ) : null}
    </div>
  );
}
