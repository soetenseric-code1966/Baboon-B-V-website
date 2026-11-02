// Veiligheid (opnieuw opgezet 02-11-2026; compacter gemaakt 02-11-2026 op verzoek van Eric: alles één keer).
// Eén vraag: is mijn applicatie en zijn mijn gegevens veilig, ook al is het met AI gebouwd?
// Opbouw in drie blokken: opening met lagenbeeld · losse AI-tool tegenover Datawerf · drie lagen (uw data,
// AI onder controle, gecontroleerde software) met alle afspraken één keer. Alleen beloftes die ook elders op de
// site staan. Nooit "gebouwd in Europa" of "uw gegevens verlaten de EU niet" (CLAUDE.md).
import React from 'react';
import { Lang } from '../routes';
import { Pagina, Opening, Deel, Raster, Kaart, Label, Titel, Vinkjes, NAVY, GRIJS, TEKST, mono } from '../Blok';

const T = {
  nl: {
    eb: 'Veiligheid',
    h1: 'Snel gebouwd met AI.|Veilig in gebruik.',
    sub: 'AI bouwt snel, maar dat mag nooit ten koste gaan van uw gegevens. Daarom draait elke applicatie in een eigen, beveiligde omgeving, controleren developers elke stap en bepaalt u zelf waar AI uw gegevens gebruikt.',
    lagen: ['Data in Europa', 'Uw eigen, beveiligde omgeving', 'Uw eigen database', 'Uw gegevens'],
    dl_eb: 'Drie lagen',
    dl_h2: 'Zo houden we het veilig.',
    dl: [
      ['01 · Uw data', 'Uw gegevens blijven van u', ['Database in Frankfurt; uw gegevens worden in de EU opgeslagen', 'Elke klant een eigen database, gescheiden van anderen', 'Versleuteld opgeslagen en verstuurd', 'Dagelijkse back-ups van uw eigen omgeving', 'Altijd te exporteren in een standaardformaat']],
      ['02 · AI onder controle', 'U bepaalt waar AI meekijkt', ['AI werkt alleen op uw gegevens waar u dat zelf aanzet', 'Uw gegevens worden nooit gebruikt om AI te trainen', 'Uw gegevens worden nooit openbaar', 'Toegang per rol: iedereen ziet alleen wat bij zijn werk hoort', 'Logboek: wie wat wanneer wijzigde']],
      ['03 · Gecontroleerde software', 'Elke regel code nagekeken', ['Automatische tests bij elke wijziging', 'Door AI geschreven code, gecontroleerd door developers', 'Niets gaat live zonder uw akkoord', 'Elke versie vastgelegd en terug te zetten', 'Maandelijks onderhoud, ook na de livegang']],
    ],
    avg: 'Verwerkersovereenkomst volgens de AVG standaard bij elke opdracht.',
    vs_eb: 'Losse AI-tool of Datawerf',
    vs_h2: 'Het verschil zit in alles na het bouwen.',
    los: 'Losse AI-tool',
    losL: ['Gegevens geplakt in privé-chats en openbare AI-tools', 'Elke keer een ander antwoord, niet te controleren', 'Kennis zit in de chat van één medewerker'],
    dw: 'Applicatie van Datawerf',
    dwL: ['Eén eigen database: één bron van waarheid', 'Altijd dezelfde, controleerbare uitkomst', 'Het hele team werkt erin, met rollen en rechten'],
  },
  en: {
    eb: 'Security',
    h1: 'Built fast with AI.|Secure in use.',
    sub: 'AI builds fast, but never at the expense of your data. That is why every application runs in its own secure environment, developers check every step and you decide where AI uses your data.',
    lagen: ['Data in Europe', 'Your own secure environment', 'Your own database', 'Your data'],
    dl_eb: 'Three layers',
    dl_h2: 'How we keep it secure.',
    dl: [
      ['01 · Your data', 'Your data stays yours', ['Database in Frankfurt; your data is stored in the EU', 'Every customer has its own database, separate from others', 'Stored and sent encrypted', 'Daily backups of your own environment', 'Always exportable in a standard format']],
      ['02 · AI under control', 'You decide where AI looks', ['AI only works on your data where you switch it on', 'Your data is never used to train AI', 'Your data is never made public', 'Access per role: everyone sees only what belongs to their work', 'Audit log: who changed what and when']],
      ['03 · Checked software', 'Every line of code reviewed', ['Automated tests with every change', 'Code written by AI, checked by developers', 'Nothing goes live without your approval', 'Every version recorded and reversible', 'Monthly maintenance, also after go-live']],
    ],
    avg: 'A data processing agreement in line with the GDPR is standard with every project.',
    vs_eb: 'Loose AI tool or Datawerf',
    vs_h2: 'The difference is everything after the build.',
    los: 'Loose AI tool',
    losL: ['Data pasted into private chats and public AI tools', 'A different answer every time, impossible to check', 'Knowledge lives in one employee’s chat'],
    dw: 'Application by Datawerf',
    dwL: ['One own database: a single source of truth', 'Always the same, verifiable outcome', 'The whole team works in it, with roles and permissions'],
  },
};

// Beeld bij de opening: uw gegevens in lagen, van buiten (Europa) naar binnen (uw gegevens).
function Lagen({ lagen, signal }: { lagen: string[]; signal: string }) {
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
  return laag(0);
}

export default function Veiligheid({ lang, signal }: { lang: Lang; signal: string }) {
  const t = T[lang];
  return (
    <Pagina>
      <Opening eb={t.eb} h1={t.h1} sub={t.sub} signal={signal} rechts={<Lagen lagen={t.lagen} signal={signal} />} />

      <Deel eb={t.vs_eb} h2={t.vs_h2} signal={signal}>
        <Raster min={380}>
          <Kaart><Label>{t.los}</Label><Vinkjes items={t.losL} signal={signal} kruis /></Kaart>
          <Kaart donker><Label donker>{t.dw}</Label><Vinkjes items={t.dwL} signal={signal} donker /></Kaart>
        </Raster>
      </Deel>

      <Deel eb={t.dl_eb} h2={t.dl_h2} signal={signal} laatste>
        <Raster>
          {t.dl.map(([l, k, items], i) => (
            <Kaart key={i}><Label>{l as string}</Label><Titel>{k as string}</Titel><Vinkjes items={items as string[]} signal={signal} /></Kaart>
          ))}
        </Raster>
        <p style={{ margin: '20px 0 0', fontSize: 16, color: TEKST }}>{t.avg}</p>
      </Deel>
    </Pagina>
  );
}
