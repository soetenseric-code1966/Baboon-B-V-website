// Homepage, "Van idee tot live" (besluit 30-10-2026): de vier processtappen bovenin lopen mee met de animatie van
// Qfleetz. Klik op een stap = de animatie springt naar het begin van die stap. Links de tekst
// bij de stap, rechts de animatie; afspelen/pauzeren en geluid aan/uit. Vervangt het oude voorbeeldscherm per stap.
// De video heeft in deze versie geen eigen fasebalk (die zit hier bovenin als knoppen).
import React, { useEffect, useRef, useState } from 'react';
import type { Lang } from './routes';

// Begin van elke processtap in de video (seconden): Idee, Lab, Preview (bouwen en controle), Live (live en groeien).
const START = [0, 5.2, 10.8, 18.0];
const SRC = '/video/qfleetz-van-idee-tot-live.mp4';

const T = {
  nl: {
    bij: 'Bij Qfleetz',
    qf: [
      '“Ik wil per voertuig zien wat het echt kost: lease, onderhoud, reparatie, banden en schade.”',
      'Binnen minuten een klikbaar overzicht van de kosten per voertuig, met verzonnen gegevens.',
      'Facturen gaan de Qfleetz data engine in en worden per voertuig ingedeeld. Elke stap getest en gecontroleerd voordat het live gaat.',
      'TCO, ROI, reparatie en onderhoud per voertuig, tegen de norm. Elke volgende wens wordt een nieuwe module.',
    ],
    over: 'Qfleetz: wagenpark- en vlootbeheer.', link: 'Bekijk qfleetz.nl',
    pauze: 'Pauzeer', speel: 'Speel af', aan: 'Geluid aan', uit: 'Geluid uit', label: 'Animatie: Qfleetz van idee tot live',
  },
  en: {
    bij: 'At Qfleetz',
    qf: [
      '“I want to see what each vehicle really costs: lease, maintenance, repairs, tyres and damage.”',
      'Within minutes a clickable overview of costs per vehicle, with made-up data.',
      'Invoices go into the Qfleetz data engine and are sorted per vehicle. Every step tested and checked before it goes live.',
      'TCO, ROI, repairs and maintenance per vehicle, against the norm. Every next request becomes a new module.',
    ],
    over: 'Qfleetz: fleet management.', link: 'Visit qfleetz.nl',
    pauze: 'Pause', speel: 'Play', aan: 'Sound on', uit: 'Sound off', label: 'Animation: Qfleetz from idea to live',
  },
};

type Fase = [string, string, string, string];

export default function ProcesFilm({ lang, signal, phases }: { lang: Lang; signal: string; phases: Fase[] }) {
  const t = T[lang];
  const v = useRef<HTMLVideoElement>(null);
  const balk = useRef<(HTMLSpanElement | null)[]>([]);
  const zoek = useRef<number | null>(null);
  const [fase, setFase] = useState(0);
  const [speelt, setSpeelt] = useState(false);
  const [stil, setStil] = useState(true);
  const [rustig, setRustig] = useState(false);
  const [gestopt, setGestopt] = useState(false); // door de bezoeker gepauzeerd: niet vanzelf weer starten

  // Welke stap hoort bij een tijd in de video.
  const faseBij = (s: number) => { let i = START.length - 1; while (i > 0 && s < START[i]) i--; return i; };

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setRustig(mq.matches);
    const el = v.current;
    if (!el || mq.matches || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!gestoptRef.current) el.play().catch(() => {}); } else el.pause();
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const gestoptRef = useRef(false);
  useEffect(() => { gestoptRef.current = gestopt; }, [gestopt]);

  // Voortgang: stap en balkje in de stapknop meelopen met de video.
  useEffect(() => {
    let id = 0;
    const tik = () => {
      const el = v.current;
      if (el && el.duration) {
        const s = el.currentTime, i = faseBij(s);
        setFase((f) => (f === i ? f : i));
        const eind = i < START.length - 1 ? START[i + 1] : el.duration;
        balk.current.forEach((b, k) => { if (b) b.style.transform = `scaleX(${k < i ? 1 : k > i ? 0 : Math.min(1, (s - START[i]) / (eind - START[i]))})`; });
      }
      id = requestAnimationFrame(tik);
    };
    id = requestAnimationFrame(tik);
    return () => cancelAnimationFrame(id);
  }, []);

  function naar(i: number) {
    const el = v.current; if (!el) return;
    setFase(i); setGestopt(false);
    if (el.readyState >= 1) el.currentTime = START[i]; else zoek.current = START[i];
    el.play().catch(() => {});
  }
  function speelPauze() {
    const el = v.current; if (!el) return;
    if (el.paused) { setGestopt(false); el.play().catch(() => {}); } else { setGestopt(true); el.pause(); }
  }
  function geluid() {
    const el = v.current; if (!el) return;
    el.muted = !el.muted; setStil(el.muted);
    if (!el.muted && el.paused) { setGestopt(false); el.play().catch(() => {}); }
  }

  const knop = (actief: boolean): React.CSSProperties => ({ padding: '10px 18px', borderRadius: 999, border: '2px solid #14213D', background: actief ? '#14213D' : '#FFFFFF', color: actief ? '#FFFFFF' : '#14213D', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' });

  return (
    <>
      <div role="tablist" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10, marginTop: 36 }} className="pf-stappen">
        {phases.map((p, i) => {
          const on = i === fase;
          const kleur = on ? (i === 2 ? signal : '#14213D') : '#FFFFFF';
          return (
            <button key={i} type="button" role="tab" aria-selected={on} onClick={() => naar(i)}
              style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, padding: '18px 20px', borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', background: kleur, color: on ? '#FFFFFF' : '#14213D', border: `2px solid ${on ? kleur : '#D5DAE3'}` }}>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, opacity: 0.8 }}>{p[0]}</span>
              <span style={{ fontSize: 22, fontWeight: 700 }}>{p[1]}</span>
              <span aria-hidden="true" ref={(el) => { balk.current[i] = el; }}
                style={{ position: 'absolute', left: 0, bottom: 0, height: 4, width: '100%', transformOrigin: '0 50%', transform: 'scaleX(0)', background: on ? 'rgba(255,255,255,.75)' : signal }} />
            </button>
          );
        })}
      </div>

      <div className="pf-raster" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)', gap: 32, marginTop: 24, alignItems: 'start' }}>
        <div style={{ padding: '8px 0' }} aria-live="polite">
          <p style={{ margin: 0, fontSize: 22, lineHeight: 1.45, fontWeight: 500 }}>{phases[fase]?.[2]}</p>
          <div style={{ marginTop: 26, background: '#F7F8FA', borderRadius: 16, padding: '20px 22px' }}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: signal, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.bij}</div>
            <div style={{ fontSize: 18, lineHeight: 1.5, marginTop: 6 }}>{t.qf[fase]}</div>
          </div>
          <p style={{ margin: '18px 0 0', fontSize: 15, color: '#3A4258' }}>{t.over} <a href="https://www.qfleetz.nl" target="_blank" rel="noopener" style={{ fontWeight: 700, color: signal, textDecoration: 'none' }}>{t.link} ↗</a></p>
        </div>
        <div>
          <div style={{ borderRadius: 20, overflow: 'hidden', background: '#14213D', aspectRatio: '16 / 9' }}>
            <video ref={v} poster="/video/qfleetz-van-idee-tot-live.jpg" muted loop playsInline preload="none" controls={rustig} aria-label={t.label}
              onPlay={() => setSpeelt(true)} onPause={() => setSpeelt(false)}
              onLoadedMetadata={() => { const el = v.current; if (el && zoek.current != null) { el.currentTime = zoek.current; zoek.current = null; } }}
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}>
              <source src={SRC} type="video/mp4" />
              <source src={SRC.replace(/\.mp4$/, '.webm')} type="video/webm" />
            </video>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
            <button type="button" onClick={speelPauze} style={knop(!speelt)}>{speelt ? t.pauze : t.speel}</button>
            <button type="button" onClick={geluid} aria-pressed={!stil} style={knop(!stil)}>{stil ? t.aan : t.uit}</button>
          </div>
        </div>
      </div>
    </>
  );
}
