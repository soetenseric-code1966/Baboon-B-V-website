// Over ons (opnieuw opgezet 02-11-2026, op verzoek van Eric los van de vorige versie).
// Eén vraag: wie is Datawerf en waarom bestaat het? Opbouw: opening met "samenkomen"-beeld, ons verhaal,
// visie en strategie, wie er aan uw idee werkt, waar wij voor staan. Geen persoonsnamen, developers niet bij
// naam of locatie, geen afsluitblok met "Start gratis". Veiligheid staat op een eigen tabblad (alleen een link).
import React from 'react';
import { Lang, href } from '../routes';
import { Pagina, Opening, Deel, Raster, Kaart, Label, Titel, Tekst, Pijllink, NAVY, GRIJS, TEKST, mono } from '../Blok';

const T = {
  nl: {
    eb: 'Over ons',
    h1: 'Software uit de praktijk.|Gebouwd met de snelheid van AI.',
    sub: 'Datawerf is ontstaan op de werkvloer van wagenparken en werkplaatsen. Daar zagen we hoeveel tijd verloren gaat aan Excel, losse systemen en overtypen. Die kennis zetten we nu om in software: voor ons eigen werk, en voor dat van u.',
    beeld: [['Praktijk', 'Uw vakkennis'], ['AI-agents', 'Bouwen snel'], ['Developers', 'Controleren elke stap']],
    beeldUit: 'Uw eigen applicatie',
    beeldOnder: 'Elke dag in gebruik',
    vh_eb: 'Ons verhaal',
    vh_h2: 'Eerst voor onszelf gebouwd.',
    vh: [
      'Wij komen niet uit de softwarewereld, maar uit de praktijk: aftersales, onderdelen en wagenparkbeheer. We kennen de vragen waar een planner, werkplaats of wagenparkbeheerder elke dag mee zit, omdat we ze zelf hadden.',
      'Met AI konden we die vragen eindelijk zelf oplossen, snel en zonder groot IT-project. Zo ontstonden onze eerste applicaties: voor vlootkosten, dagplanning en banden. Ze draaien elke dag, worden getest en zijn nagekeken door developers.',
      'Diezelfde werkwijze en bouwstenen zetten we nu in voor andere bedrijven. Daarom heet het Datawerf: een werf is de plek waar iets gebouwd wordt en daarna te water gaat.',
    ],
    vh_link: 'Bekijk wat we bouwen',
    cijfers: [['25+', 'jaar praktijk in aftersales, onderdelen en wagenpark'], ['6', 'projecten opgeleverd en in gebruik'], ['1', 'werkwijze: AI bouwt, developers controleren, u beslist']],
    vs_eb: 'Visie en strategie',
    vs_h2: 'Waar wij in geloven.',
    vs: [
      ['Visie', 'De beste software komt uit de praktijk', 'Wie het werk elke dag doet, weet wat er beter moet. Die kennis zit nu vaak in Excel, in mailboxen of in het hoofd van één medewerker. Wij maken er software van die het hele team elke dag gebruikt.'],
      ['Strategie', 'Kennis combineren', 'Uw vakkennis, AI-agents die snel bouwen en developers die elke stap controleren. Zo krijgt u de snelheid van AI met de zekerheid van vakwerk, in een eigen, beveiligde omgeving.'],
      ['Ambitie', 'Minder werkdruk, minder fouten', 'Processen die nu handwerk zijn, worden eenvoudig, controleerbaar en voor iedereen in uw bedrijf te gebruiken. Dat bespaart tijd en kosten, elke dag opnieuw.'],
    ],
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
    sub: 'Datawerf grew out of the shop floor of fleets and workshops. There we saw how much time is lost to Excel, separate systems and retyping. We now turn that knowledge into software: for our own work, and for yours.',
    beeld: [['Practice', 'Your expertise'], ['AI agents', 'Build fast'], ['Developers', 'Check every step']],
    beeldUit: 'Your own application',
    beeldOnder: 'In use every day',
    vh_eb: 'Our story',
    vh_h2: 'First built for ourselves.',
    vh: [
      'We do not come from the software world but from practice: aftersales, parts and fleet management. We know the questions a planner, workshop or fleet manager faces every day, because they were our own.',
      'With AI we could finally solve those questions ourselves, quickly and without a large IT project. That is how our first applications came about: for fleet costs, daily planning and tyres. They run every day, are tested and reviewed by developers.',
      'We now use the same way of working and building blocks for other companies. Hence the name Datawerf: a "werf" is a shipyard, the place where something is built and then launched.',
    ],
    vh_link: 'See what we build',
    cijfers: [['25+', 'years of practice in aftersales, parts and fleets'], ['6', 'projects delivered and in use'], ['1', 'way of working: AI builds, developers check, you decide']],
    vs_eb: 'Vision and strategy',
    vs_h2: 'What we believe in.',
    vs: [
      ['Vision', 'The best software comes from practice', 'Whoever does the work every day knows what needs to improve. That knowledge often lives in Excel, in mailboxes or in one person’s head. We turn it into software the whole team uses every day.'],
      ['Strategy', 'Combining knowledge', 'Your expertise, AI agents that build fast and developers who check every step. You get the speed of AI with the certainty of craftsmanship, in your own secure environment.'],
      ['Ambition', 'Less pressure, fewer mistakes', 'Processes that are manual work today become simple, verifiable and usable by everyone in your company. That saves time and money, every day.'],
    ],
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

      <Deel eb={t.vh_eb} h2={t.vh_h2} signal={signal}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(420px,1fr))', gap: 20, alignItems: 'stretch' }}>
          <Kaart>
            {t.vh.map((p, i) => <Tekst key={i}>{p}</Tekst>)}
            <Pijllink href={href('Etalage', lang)} signal={signal}>{t.vh_link}</Pijllink>
          </Kaart>
          <Kaart donker style={{ justifyContent: 'center', gap: 0 }}>
            {t.cijfers.map(([g, s], i) => (
              <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '18px 0', borderTop: i ? '1px solid rgba(255,255,255,0.14)' : 'none' }}>
                <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-1.6px', color: signal, minWidth: 96 }}>{g}</div>
                <div style={{ fontSize: 17, lineHeight: 1.45, color: '#DCE1EA' }}>{s}</div>
              </div>
            ))}
          </Kaart>
        </div>
      </Deel>

      <Deel eb={t.vs_eb} h2={t.vs_h2} signal={signal}>
        <Raster>
          {t.vs.map(([l, k, s], i) => (
            <Kaart key={i}><Label>{l}</Label><Titel>{k}</Titel><Tekst>{s}</Tekst></Kaart>
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
