// Homepage, blok "Van idee tot live": de getekende animatie van Qfleetz (besluit 30-10-2026), het grootste project
// van Datawerf. Verzonnen voertuigen en bedragen; geen "AI" in beeld (de verwerking heet "Qfleetz data engine").
import React from 'react';
import type { Lang } from './routes';
import Film from './Film';

const T = {
  nl: {
    eb: 'Zo ging het bij Qfleetz', t: 'Van idee tot live platform voor wagenpark- en vlootbeheer',
    s: 'Ons grootste project. Per voertuig inzicht in TCO, ROI, reparatie en onderhoud, tegen de norm. Facturen, leasecontracten en km-standen gaan als upload de Qfleetz data engine in en komen per voertuig terug. En de bouwplaats blijft open: elke wens wordt een nieuwe module.',
    link: 'Bekijk qfleetz.nl', label: 'Animatie: Qfleetz van idee tot live',
  },
  en: {
    eb: 'How it went with Qfleetz', t: 'From idea to live platform for fleet management',
    s: 'Our largest project. Per vehicle insight into TCO, ROI, repairs and maintenance, against the norm. Invoices, lease contracts and odometer readings go into the Qfleetz data engine as uploads and come back per vehicle. And the building site stays open: every wish becomes a new module.',
    link: 'Visit qfleetz.nl', label: 'Animation: Qfleetz from idea to live',
  },
};

export default function IdeeTotLiveFilm({ lang, signal }: { lang: Lang; signal: string }) {
  const t = T[lang];
  return (
    <div className="dw-film" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)', gap: 32, alignItems: 'center', marginTop: 56, paddingTop: 40, borderTop: '1px solid #EEF0F4' }}>
      <div>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: signal, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{t.eb}</div>
        <h3 style={{ margin: '10px 0 0', fontSize: 32, letterSpacing: '-1px', lineHeight: 1.1 }}>{t.t}</h3>
        <p style={{ margin: '14px 0 0', fontSize: 17, lineHeight: 1.6, color: '#3A4258' }}>{t.s}</p>
        <a href="https://www.qfleetz.nl" target="_blank" rel="noopener" style={{ display: 'inline-block', marginTop: 18, fontWeight: 700, color: signal, textDecoration: 'none' }}>{t.link} ↗</a>
      </div>
      <Film lang={lang} src="/video/qfleetz-van-idee-tot-live.mp4" poster="/video/qfleetz-van-idee-tot-live.jpg" label={t.label} signal={signal} rond={20} />
    </div>
  );
}
