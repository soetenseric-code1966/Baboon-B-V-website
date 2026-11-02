// Veiligheid (opnieuw opgezet 02-11-2026, op verzoek van Eric los van de vorige versie).
// Eén vraag: is mijn applicatie en zijn mijn gegevens veilig, ook al is het met AI gebouwd?
// Opbouw: opening met lagenbeeld, drie lagen (data, AI, software), losse AI-tool tegenover Datawerf,
// elke wijziging gecontroleerd, afspraken en beheer. Alleen beloftes die ook elders op de site staan.
// Nooit "gebouwd in Europa" of "uw gegevens verlaten de EU niet" (CLAUDE.md).
import React from 'react';
import { Lang } from '../routes';
import { Pagina, Opening, Deel, Raster, Kaart, Label, Titel, Vinkjes, NAVY, GRIJS, TEKST, GROEN, mono } from '../Blok';

const T = {
  nl: {
    eb: 'Veiligheid',
    h1: 'Snel gebouwd met AI.|Veilig in gebruik.',
    sub: 'AI bouwt snel, maar dat mag nooit ten koste gaan van uw gegevens. Daarom draait elke applicatie in een eigen, beveiligde omgeving, controleren developers elke stap en bepaalt u zelf waar AI uw gegevens gebruikt.',
    chips: ['AVG', 'Back-ups', 'Toegang per rol', 'Logboek'],
    lagen: ['Data in Europa', 'Uw eigen, beveiligde omgeving', 'Uw eigen database', 'Uw gegevens'],
    dl_eb: 'Drie lagen',
    dl_h2: 'Zo houden we het veilig.',
    dl: [
      ['01 · Uw data', 'Uw gegevens blijven van u', ['Database in Frankfurt; uw gegevens worden in de EU opgeslagen', 'Elke klant een eigen database, gescheiden van anderen', 'Altijd te exporteren in een standaardformaat']],
      ['02 · AI onder controle', 'U bepaalt waar AI meekijkt', ['AI werkt alleen op uw gegevens waar u dat zelf aanzet', 'Uw gegevens worden nooit gebruikt om AI te trainen', 'Uw gegevens worden nooit openbaar']],
      ['03 · Gecontroleerde software', 'Elke regel code nagekeken', ['Automatische tests bij elke wijziging', 'Door AI geschreven code, gecontroleerd door developers', 'Niets gaat live zonder uw akkoord']],
    ],
    vs_eb: 'Losse AI-tool of Datawerf',
    vs_h2: 'Het verschil zit in alles na het bouwen.',
    vs_sub: 'Met een losse AI-tool heeft u snel iets dat lijkt te werken. Maar waar staan uw gegevens, wie controleert het en wat als het misgaat?',
    los: 'Losse AI-tool',
    losL: ['Gegevens geplakt in privé-chats en openbare AI-tools', 'Elke keer een ander antwoord, niet te controleren', 'Kennis zit in de chat van één medewerker', 'Geen tests, geen versies, geen back-ups'],
    dw: 'Applicatie van Datawerf',
    dwL: ['Eén eigen database in Europa: één bron van waarheid', 'Altijd dezelfde, controleerbare uitkomst', 'Meerdere gebruikers, met rollen en rechten', 'Elke versie vastgelegd en terug te draaien, met back-ups'],
    st_eb: 'Elke wijziging',
    st_h2: 'Niets gaat live zonder controle.',
    st: [['AI-agent bouwt', 'in een aparte testversie'], ['Automatische tests', 'rekenregels en rechten'], ['Developer controleert', 'kwaliteit en veiligheid'], ['U keurt goed', 'op uw eigen bouwplaats'], ['Live', 'vorige versie blijft terug te zetten']],
    af_eb: 'Afspraken en beheer',
    af_h2: 'Geregeld en vastgelegd.',
    af: [['Verwerkersovereenkomst', 'Standaard bij elke opdracht, volgens de AVG.'], ['Versleuteling', 'Gegevens versleuteld opgeslagen en verstuurd.'], ['Toegang per rol', 'Iedereen ziet alleen wat bij zijn werk hoort.'], ['Logboek', 'Wijzigingen worden vastgelegd: wie, wat en wanneer.'], ['Dagelijkse back-ups', 'Van uw eigen omgeving, met herstel van elke versie.'], ['Maandelijks onderhoud', 'Updates en beveiliging blijven bij, ook na de livegang.']],
  },
  en: {
    eb: 'Security',
    h1: 'Built fast with AI.|Secure in use.',
    sub: 'AI builds fast, but never at the expense of your data. That is why every application runs in its own secure environment, developers check every step and you decide where AI uses your data.',
    chips: ['GDPR', 'Backups', 'Access per role', 'Audit log'],
    lagen: ['Data in Europe', 'Your own secure environment', 'Your own database', 'Your data'],
    dl_eb: 'Three layers',
    dl_h2: 'How we keep it secure.',
    dl: [
      ['01 · Your data', 'Your data stays yours', ['Database in Frankfurt; your data is stored in the EU', 'Every customer has its own database, separate from others', 'Always exportable in a standard format']],
      ['02 · AI under control', 'You decide where AI looks', ['AI only works on your data where you switch it on', 'Your data is never used to train AI', 'Your data is never made public']],
      ['03 · Checked software', 'Every line of code reviewed', ['Automated tests with every change', 'Code written by AI, checked by developers', 'Nothing goes live without your approval']],
    ],
    vs_eb: 'Loose AI tool or Datawerf',
    vs_h2: 'The difference is everything after the build.',
    vs_sub: 'With a loose AI tool you quickly have something that seems to work. But where is your data, who checks it and what if it goes wrong?',
    los: 'Loose AI tool',
    losL: ['Data pasted into private chats and public AI tools', 'A different answer every time, impossible to check', 'Knowledge lives in one employee’s chat', 'No tests, no versions, no backups'],
    dw: 'Application by Datawerf',
    dwL: ['One own database in Europe: a single source of truth', 'Always the same, verifiable outcome', 'Multiple users, with roles and permissions', 'Every version recorded and reversible, with backups'],
    st_eb: 'Every change',
    st_h2: 'Nothing goes live without a check.',
    st: [['AI agent builds', 'in a separate test version'], ['Automated tests', 'business rules and permissions'], ['Developer checks', 'quality and security'], ['You approve', 'on your own building site'], ['Live', 'previous version can be restored']],
    af_eb: 'Agreements and management',
    af_h2: 'Arranged and on record.',
    af: [['Data processing agreement', 'Standard with every project, in line with the GDPR.'], ['Encryption', 'Data stored and sent encrypted.'], ['Access per role', 'Everyone sees only what belongs to their work.'], ['Audit log', 'Changes are recorded: who, what and when.'], ['Daily backups', 'Of your own environment, with restore of every version.'], ['Monthly maintenance', 'Updates and security stay current, also after go-live.']],
  },
};

// Beeld bij de opening: uw gegevens in lagen, van buiten (Europa) naar binnen (uw gegevens).
function Lagen({ lagen, chips, signal }: { lagen: string[]; chips: string[]; signal: string }) {
  const kleuren = [GRIJS, '#E6EAF1', NAVY, signal];
  const tekst = [NAVY, NAVY, '#FFFFFF', '#FFFFFF'];
  const laag = (i: number): React.ReactNode => (
    <div style={{ background: kleuren[i], color: tekst[i], borderRadius: 22 - i * 2, padding: i === 3 ? '26px 20px' : '14px 18px 18px', textAlign: i === 3 ? 'center' : 'left' }}>
      <div style={i === 3 ? { fontWeight: 700, fontSize: 22 } : { ...mono, fontSize: 12, color: i === 2 ? '#C7CEDB' : '#5C6378' }}>
        {i === 3 ? <svg aria-hidden="true" width="18" height="20" viewBox="0 0 18 20" style={{ marginRight: 10, verticalAlign: '-2px' }}><rect x="1" y="8" width="16" height="11" rx="3" fill="#FFFFFF" /><path d="M4.5 8V6a4.5 4.5 0 0 1 9 0v2" stroke="#FFFFFF" strokeWidth="2.2" fill="none" /></svg> : null}{lagen[i]}
      </div>
      {i < 3 ? <div style={{ marginTop: 12 }}>{laag(i + 1)}</div> : null}
    </div>
  );
  return (
    <div>
      {laag(0)}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
        {chips.map((x) => (
          <span key={x} style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: '#E7F6EF', color: GROEN, textTransform: 'uppercase' }}>✓ {x}</span>
        ))}
      </div>
    </div>
  );
}

export default function Veiligheid({ lang, signal }: { lang: Lang; signal: string }) {
  const t = T[lang];
  return (
    <Pagina>
      <Opening eb={t.eb} h1={t.h1} sub={t.sub} signal={signal} rechts={<Lagen lagen={t.lagen} chips={t.chips} signal={signal} />} />

      <Deel eb={t.dl_eb} h2={t.dl_h2} signal={signal}>
        <Raster>
          {t.dl.map(([l, k, items], i) => (
            <Kaart key={i}><Label>{l as string}</Label><Titel>{k as string}</Titel><Vinkjes items={items as string[]} signal={signal} /></Kaart>
          ))}
        </Raster>
      </Deel>

      <Deel eb={t.vs_eb} h2={t.vs_h2} sub={t.vs_sub} signal={signal}>
        <Raster min={380}>
          <Kaart><Label>{t.los}</Label><Vinkjes items={t.losL} signal={signal} kruis /></Kaart>
          <Kaart donker><Label donker>{t.dw}</Label><Vinkjes items={t.dwL} signal={signal} donker /></Kaart>
        </Raster>
      </Deel>

      <Deel eb={t.st_eb} h2={t.st_h2} signal={signal}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 12 }}>
          {t.st.map(([k, s], i) => (
            <div key={i} style={{ background: i === t.st.length - 1 ? NAVY : GRIJS, color: i === t.st.length - 1 ? '#FFFFFF' : NAVY, borderRadius: 20, padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ ...mono, fontSize: 12, color: i === t.st.length - 1 ? '#C7CEDB' : signal }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.25 }}>{k}</div>
              <div style={{ fontSize: 15, lineHeight: 1.5, color: i === t.st.length - 1 ? '#DCE1EA' : TEKST }}>{s}</div>
            </div>
          ))}
        </div>
      </Deel>

      <section className="dw-sec" style={{ padding: '56px 48px 96px' }}>
        <div style={{ ...mono, color: signal }}>{t.af_eb}</div>
        <h2 style={{ margin: '10px 0 0', fontSize: 48, letterSpacing: '-1.6px', lineHeight: 1.05 }}>{t.af_h2}</h2>
        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))', gap: '28px 20px' }}>
          {t.af.map(([k, s], i) => (
            <div key={i} style={{ borderTop: `3px solid ${NAVY}`, paddingTop: 16 }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{k}</div>
              <p style={{ margin: '6px 0 0', fontSize: 16, lineHeight: 1.6, color: TEKST }}>{s}</p>
            </div>
          ))}
        </div>
      </section>
    </Pagina>
  );
}
