// Hulpvragen bij het idee (besluit 29-10-2026): de AI stelt 3-5 vragen met keuzes die bij het getypte idee passen
// (actie "vragen"); lukt dat niet, dan algemene vragen. Eén vraag tegelijk (besluit 29-10-2026), met Vorige/Volgende;
// bij één mogelijke keuze gaat hij na het kiezen vanzelf door. De antwoorden komen als tekst in het ideevak.
import React, { useState } from 'react';
import { Lang } from './routes';
import { LAB_TEXT, LabAntwoord, LabVraag, STANDAARD_VRAGEN, antwoordenTekst, labApi } from './lab';

export default function LabVragen({ lang, signal, idee, zetIdee }: { lang: Lang; signal: string; idee: string; zetIdee: (t: string) => void }) {
  const t = LAB_TEXT[lang];
  const [open, setOpen] = useState(false); const [bezig, setBezig] = useState(false); const [standaard, setStandaard] = useState(false);
  const [vragen, setVragen] = useState<LabVraag[]>([]); const [antwoorden, setAntwoorden] = useState<LabAntwoord[]>([]);
  const [melding, setMelding] = useState<string | null>(null);
  const [stap, setStap] = useState(0);

  async function haal() {
    if (idee.trim().length < 10) { setMelding(t.hulpKort); return; }
    setMelding(null); setOpen(true); setBezig(true);
    let v: LabVraag[] | null = null;
    try { v = (await labApi<{ vragen: LabVraag[] | null }>({ actie: 'vragen', idee, taal: lang })).vragen; } catch { v = null; }
    const lijst = v && v.length ? v : STANDAARD_VRAGEN[lang];
    setStandaard(!(v && v.length)); setStap(0); setVragen(lijst); setAntwoorden(lijst.map(() => ({ gekozen: [], anders: '' }))); setBezig(false);
  }
  function kies(i: number, k: string) {
    const aan = antwoorden[i]?.gekozen.includes(k) ?? false;
    setAntwoorden((a) => a.map((x, j) => (j !== i ? x
      : { ...x, gekozen: vragen[i].meerdere ? (aan ? x.gekozen.filter((y) => y !== k) : [...x.gekozen, k]) : (aan ? [] : [k]) })));
    // Eén keuze mogelijk: na het kiezen vanzelf door naar de volgende vraag.
    if (!vragen[i].meerdere && !aan && i < vragen.length - 1) window.setTimeout(() => setStap(i + 1), 250);
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
        {vragen[stap] ? (() => { const v = vragen[stap], i = stap, laatste = stap === vragen.length - 1; const ingevuld = (antwoorden[i]?.gekozen.length ?? 0) > 0 || !!antwoorden[i]?.anders.trim(); return (
          <fieldset key={i} className="lab-vraag" style={{ border: 0, margin: 0, padding: 0, display: 'grid', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }} aria-hidden="true">
              {vragen.map((_, j) => <i key={j} style={{ width: 28, height: 6, borderRadius: 3, background: j <= stap ? signal : '#E3E7EE' }} />)}
              <span style={{ fontSize: 13, color: '#5C6378', marginLeft: 4 }}>{stap + 1} {t.hulpVan} {vragen.length}</span>
            </div>
            <legend style={{ fontWeight: 700, fontSize: 18, padding: 0, marginBottom: 4 }}>{v.vraag}</legend>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {v.keuzes.map((k) => { const aan = antwoorden[i]?.gekozen.includes(k) ?? false; return (
                <button key={k} type="button" aria-pressed={aan} onClick={() => kies(i, k)} style={chip(aan)}>{k}</button>); })}
            </div>
            <input value={antwoorden[i]?.anders ?? ''} maxLength={200} placeholder={t.hulpAnders} aria-label={`${v.vraag} ${t.hulpAnders}`}
              onChange={(e) => setAntwoorden((a) => a.map((x, j) => (j === i ? { ...x, anders: e.target.value } : x)))}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (laatste) zet(); else setStap(i + 1); } }}
              style={{ border: '1px solid #D5DAE3', borderRadius: 12, padding: '10px 12px', font: "15px 'Space Grotesk',system-ui,sans-serif", maxWidth: 520 }} />
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginTop: 6 }}>
              {stap > 0 ? <button type="button" onClick={() => setStap(stap - 1)} style={{ padding: '10px 18px', borderRadius: 999, border: '2px solid #14213D', background: '#FFFFFF', color: '#14213D', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>← {t.hulpVorige}</button> : null}
              {laatste
                ? <button type="button" onClick={zet} style={{ padding: '12px 22px', borderRadius: 999, border: 0, background: '#14213D', color: '#FFFFFF', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>{t.hulpZet} →</button>
                : <button type="button" onClick={() => setStap(i + 1)} style={{ padding: '12px 22px', borderRadius: 999, border: 0, background: '#14213D', color: '#FFFFFF', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>{ingevuld ? t.hulpVolgende : t.hulpOverslaan} →</button>}
            </div>
          </fieldset>); })() : null}
      </>}
    </div>
  );
}
