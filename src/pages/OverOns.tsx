// Over ons (opnieuw opgezet 02-11-2026, op verzoek van Eric los van de vorige versie).
// Eén vraag: wie is Datawerf en waarom bestaat het? Opbouw: opening met "samenkomen"-beeld, visie en strategie, wie er aan uw idee werkt, waar wij voor staan. Geen persoonsnamen, developers niet bij
// naam of locatie, geen afsluitblok met "Start gratis". Veiligheid staat op een eigen tabblad (alleen een link).
import React from 'react';
import { Lang, href } from '../routes';
import { Pagina, Opening, Deel, Raster, Kaart, Label, Titel, Tekst, Pijllink, NAVY, GRIJS, TEKST, mono } from '../Blok';

const T = {
  nl: {
    eb: 'Over ons',
    h1: 'Software uit de praktijk.|Gebouwd met de snelheid van AI.',
    sub: 'Datawerf is ontstaan uit de praktijk. In elk bedrijf zien we hetzelfde: veel tijd gaat verloren aan Excel, losse systemen en overtypen, terwijl de kennis om het beter te doen er al is. Die kennis zetten we om in software, voor elk vakgebied.',
    beeld: [['Praktijk', 'Uw vakkennis'], ['AI-agents', 'Bouwen snel'], ['Developers', 'Controleren elke stap']],
    beeldUit: 'Uw eigen applicatie',
    beeldOnder: 'Elke dag in gebruik',
    vs_eb: 'Visie en strategie',
    vs_h2: 'Waar wij in geloven.',
    vs: [
      ['Visie', 'De beste software komt uit de praktijk', 'Vakmensen kennen hun werk het best, maar lopen vaak vast in Excel, mailboxen en losse systemen. Die kennis maken wij tot software die het hele team elke dag gebruikt.'],
      ['Strategie', 'Kennis combineren', 'Uw vakkennis, AI-agents die snel bouwen en developers die elke stap controleren, in een eigen, beveiligde omgeving. Dat werkt in elk vakgebied: logistiek, techniek, handel, landbouw of dienstverlening.'],
      ['Ambitie', 'Minder werkdruk, minder fouten', 'Processen die nu handwerk zijn, worden eenvoudig, controleerbaar en voor iedereen in uw bedrijf te gebruiken. Dat bespaart tijd en kosten, elke dag opnieuw.'],
    ],
    vs_link: 'Bekijk wat we bouwen',
    tm_eb: 'Wie er aan uw idee werkt',
    tm_h2: 'Vier partijen, één team.',
    tm: [
      ['U', 'U en uw team', 'U weet hoe het werk echt gaat. U geeft de wensen, test wat er gebouwd is en beslist wat live gaat.'],
      ['D', 'Datawerf', 'Vertaalt uw praktijk naar duidelijke opdrachten, bewaakt de opbouw van uw applicatie en is uw vaste aanspreekpunt.'],
      ['AI', 'AI-agents', 'Gespecialiseerde AI-programmeurs voor schermen, rekenregels en koppelingen. Zij bouwen snel; wij sturen.'],
      ['</>', 'Developers', 'Ervaren developers controleren elke stap op kwaliteit en veiligheid, en nemen het over waar AI vastloopt.'],
    ],
    st_eb: 'Waar wij voor staan',
    st_h2: 'Onze afspraken.',
    st: [
      ['Eerlijk', 'U ziet bij elke stap wat er gebouwd is en wat het kost.'],
      ['Gecontroleerd', 'Niets gaat live zonder tests, controle door een developer en uw akkoord.'],
      ['Veilig', 'Een eigen omgeving per klant, met uw data in Europa.'],
      ['Betaalbaar', 'De snelheid van AI betekent minder uren, en dus lagere kosten.'],
    ],
    st_link: 'Lees meer over veiligheid',
  },
  en: {
    eb: 'About us',
    h1: 'Software from practice.|Built at the speed of AI.',
    sub: 'Datawerf grew out of practice. In every company we see the same thing: a lot of time is lost to Excel, separate systems and retyping, while the knowledge to do it better is already there. We turn that knowledge into software, for every field.',
    beeld: [['Practice', 'Your expertise'], ['AI agents', 'Build fast'], ['Developers', 'Check every step']],
    beeldUit: 'Your own application',
    beeldOnder: 'In use every day',
    vs_eb: 'Vision and strategy',
    vs_h2: 'What we believe in.',
    vs: [
      ['Vision', 'The best software comes from practice', 'Professionals know their work best, but often get stuck in Excel, mailboxes and separate systems. We turn that knowledge into software the whole team uses every day.'],
      ['Strategy', 'Combining knowledge', 'Your expertise, AI agents that build fast and developers who check every step, in your own secure environment. It works in every field: logistics, engineering, trade, agriculture or services.'],
      ['Ambition', 'Less pressure, fewer mistakes', 'Processes that are manual work today become simple, verifiable and usable by everyone in your company. That saves time and money, every day.'],
    ],
    vs_link: 'See what we build',
    tm_eb: 'Who works on your idea',
    tm_h2: 'Four parties, one team.',
    tm: [
      ['U', 'You and your team', 'You know how the work really goes. You give the wishes, test what has been built and decide what goes live.'],
      ['D', 'Datawerf', 'Translates your practice into clear instructions, guards how your application is built and is your fixed point of contact.'],
      ['AI', 'AI agents', 'Specialised AI programmers for screens, business rules and integrations. They build fast; we steer.'],
      ['</>', 'Developers', 'Experienced developers check every step for quality and security, and take over where AI gets stuck.'],
    ],
    st_eb: 'What we stand for',
    st_h2: 'Our commitments.',
    st: [
      ['Honest', 'At every step you see what has been built and what it costs.'],
      ['Checked', 'Nothing goes live without tests, a developer’s review and your approval.'],
      ['Secure', 'Your own environment per customer, with your data in Europe.'],
      ['Affordable', 'The speed of AI means fewer hours, and therefore lower costs.'],
    ],
    st_link: 'Read more about security',
  },
};

// Beeld bij de opening: drie soorten kennis komen samen in één applicatie.
function Samenkomen({ t, signal }: { t: typeof T.nl; signal: string }) {
  return (
    <div style={{ background: GRIJS, borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }} aria-hidden="true">
      <div className="oo-drie" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12 }}>
        {t.beeld.map(([a, b], i) => (
          <div key={i} style={{ background: '#FFFFFF', borderRadius: 16, padding: '16px 14px', textAlign: 'center' }}>
            <div style={{ ...mono, fontSize: 12, color: i === 0 ? signal : '#5C6378' }}>{a}</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginTop: 6, lineHeight: 1.25 }}>{b}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12 }}>
        {[0, 1, 2].map((i) => <div key={i} style={{ height: 28, borderLeft: `2px dashed ${signal}`, marginLeft: '50%' }} />)}
      </div>
      <div style={{ background: NAVY, color: '#FFFFFF', borderRadius: 16, padding: '22px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ fontWeight: 700, fontSize: 22 }}>{t.beeldUit}</div>
        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, padding: '4px 10px', borderRadius: 999, background: '#E7F6EF', color: '#0F7A55', fontWeight: 600, textTransform: 'uppercase' }}>● {t.beeldOnder}</span>
      </div>
    </div>
  );
}

export default function OverOns({ lang, signal }: { lang: Lang; signal: string }) {
  const t = T[lang];
  return (
    <Pagina>
      <Opening eb={t.eb} h1={t.h1} sub={t.sub} signal={signal} rechts={<Samenkomen t={t} signal={signal} />} />

      <Deel eb={t.vs_eb} h2={t.vs_h2} signal={signal}>
        <Raster>
          {t.vs.map(([l, k, s], i) => (
            <Kaart key={i}>
              <Label>{l}</Label><Titel>{k}</Titel><Tekst>{s}</Tekst>
              {i === t.vs.length - 1 ? <Pijllink href={href('Etalage', lang)} signal={signal}>{t.vs_link}</Pijllink> : null}
            </Kaart>
          ))}
        </Raster>
      </Deel>

      <Deel eb={t.tm_eb} h2={t.tm_h2} signal={signal}>
        <Raster min={240}>
          {t.tm.map(([ic, k, s], i) => (
            <Kaart key={i}>
              <span aria-hidden="true" style={{ width: 52, height: 52, borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 17, background: i === 0 ? signal : NAVY, color: '#FFFFFF' }}>{ic}</span>
              <Titel>{k}</Titel>
              <Tekst>{s}</Tekst>
            </Kaart>
          ))}
        </Raster>
      </Deel>

      <section className="dw-sec" style={{ padding: '56px 48px 96px' }}>
        <div style={{ ...mono, color: signal }}>{t.st_eb}</div>
        <h2 style={{ margin: '10px 0 0', fontSize: 48, letterSpacing: '-1.6px', lineHeight: 1.05 }}>{t.st_h2}</h2>
        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
          {t.st.map(([k, s], i) => (
            <div key={i} style={{ borderTop: `3px solid ${i === 2 ? signal : NAVY}`, paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ ...mono, color: '#5C6378', fontSize: 12 }}>0{i + 1}</div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{k}</div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: TEKST }}>{s}</p>
              {i === 2 ? <a href={href('Veiligheid', lang)} style={{ fontWeight: 700, color: signal, textDecoration: 'none', fontSize: 16 }}>{t.st_link} →</a> : null}
            </div>
          ))}
        </div>
      </section>
    </Pagina>
  );
}
