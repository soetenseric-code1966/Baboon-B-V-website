// Hulpvragen bij het idee (besluit 29-10-2026): de AI stelt 3-5 vragen met keuzes die bij het getypte idee passen
// (actie "vragen"); lukt dat niet, dan algemene vragen. De antwoorden komen als tekst in het ideevak.
import React, { useState } from 'react';
import { Lang } from './routes';
import { LAB_TEXT, LabAntwoord, LabVraag, STANDAARD_VRAGEN, antwoordenTekst, labApi } from './lab';

export default function LabVragen({ lang, signal, idee, zetIdee }: { lang: Lang; signal: string; idee: string; zetIdee: (t: string) => void }) {
  const t = LAB_TEXT[lang];
  const [open, setOpen] = useState(false); const [bezig, setBezig] = useState(false); const [standaard, setStandaard] = useState(false);
  const [vragen, setVragen] = useState<LabVraag[]>([]); const [antwoorden, setAntwoorden] = useState<LabAntwoord[]>([]);
  const [melding, setMelding] = useState<string | null>(null);

  async function haal() {
    if (idee.trim().length < 10) { setMelding(t.hulpKort); return; }
    setMelding(null); setOpen(true); setBezig(true);
    let v: LabVraag[] | null = null;
    try { v = (await labApi<{ vragen: LabVraag[] | null }>({ actie: 'vragen', idee, taal: lang })).vragen; } catch { v = null; }
    const lijst = v && v.length ? v : STANDAARD_VRAGEN[lang];
    setStandaard(!(v && v.length)); setVragen(lijst); setAntwoorden(lijst.map(() => ({ gekozen: [], anders: '' }))); setBezig(false);
  }
  function kies(i: number, k: string) {
    setAntwoorden((a) => a.map((x, j) => {
      if (j !== i) return x;
      const aan = x.gekozen.includes(k);
      return { ...x, gekozen: vragen[i].meerdere ? (aan ? x.gekozen.filter((y) => y !== k) : [...x.gekozen, k]) : (aan ? [] : [k]) };
    }));
  }
  function zet() {
    const extra = antwoordenTekst(vragen, antwoorden, lang);
    if (extra) zetIdee((idee.trimEnd() + extra).slice(0, 4000));
    setOpen(false);
  }

  const chip = (aan: boolean): React.CSSProperties => ({ padding: '8px 14px', borderRadius: 999, border: `2px solid ${aan ? '#14213D' : '#D5DAE3'}`, background: aan ? '#14213D' : '#FFFFFF', color: aan ? '#FFFFFF' : '#14213D', fontWeight: 600, fontSize: 14, cursor: 'pointer' });

  if (!open) return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <button type="button" onClick={haal} style={{ padding: '10px 18px', borderRadius: 999, border: `2px solid ${signal}`, background: '#FFF1EB', color: '#B23C0E', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>✦ {t.hulpKnop}</button>
      {melding ? <span role="alert" style={{ color: '#B23C0E', fontSize: 14, fontWeight: 600 }}>{melding}</span> : null}
    </div>
  );

  return (
    <div style={{ border: `2px solid ${signal}`, borderRadius: 16, padding: 20, display: 'grid', gap: 16, background: '#FFFAF7' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
        <strong style={{ fontSize: 17 }}>{t.hulpKnop}</strong>
        <button type="button" onClick={() => setOpen(false)} style={{ border: 0, background: 'none', color: '#5C6378', fontWeight: 600, cursor: 'pointer' }}>{t.hulpWeg}</button>
      </div>
      {bezig ? (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', color: '#3A4258' }}>
          <div className="lab-laden" aria-hidden="true" style={{ width: 24, height: 24, borderRadius: '50%', border: '3px solid #E3E7EE', borderTopColor: signal }} />{t.hulpLaden}
        </div>
      ) : <>
        <p style={{ margin: 0, fontSize: 14, color: '#5C6378' }}>{standaard ? t.hulpStandaard : t.hulpS}</p>
        {vragen.map((v, i) => (
          <fieldset key={i} style={{ border: 0, margin: 0, padding: 0, display: 'grid', gap: 8 }}>
            <legend style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{v.vraag}</legend>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {v.keuzes.map((k) => { const aan = antwoorden[i]?.gekozen.includes(k) ?? false; return (
                <button key={k} type="button" aria-pressed={aan} onClick={() => kies(i, k)} style={chip(aan)}>{k}</button>); })}
            </div>
            <input value={antwoorden[i]?.anders ?? ''} maxLength={200} placeholder={t.hulpAnders} aria-label={`${v.vraag} ${t.hulpAnders}`}
              onChange={(e) => setAntwoorden((a) => a.map((x, j) => (j === i ? { ...x, anders: e.target.value } : x)))}
              style={{ border: '1px solid #D5DAE3', borderRadius: 12, padding: '10px 12px', font: "15px 'Space Grotesk',system-ui,sans-serif", maxWidth: 520 }} />
          </fieldset>
        ))}
        <button type="button" onClick={zet} style={{ justifySelf: 'start', padding: '12px 22px', borderRadius: 999, border: 0, background: '#14213D', color: '#FFFFFF', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>{t.hulpZet} →</button>
      </>}
    </div>
  );
}
