// Inloggen in het lab zonder account: e-mailadres invullen, de links naar alle ideeën komen per mail.
// Gebruikt op Inloggen en op /lab/ (zonder idee in het adres).
import React, { useState } from 'react';
import { Lang } from './routes';
import { LAB_TEXT, vraagLinks } from './lab';

export default function LabLinks({ lang, signal, donker = false }: { lang: Lang; signal: string; donker?: boolean }) {
  const t = LAB_TEXT[lang];
  const [email, setEmail] = useState(''); const [bezig, setBezig] = useState(false);
  const [melding, setMelding] = useState<string | null>(null); const [fout, setFout] = useState<string | null>(null);
  async function stuur(e: React.FormEvent) {
    e.preventDefault(); setBezig(true); setFout(null); setMelding(null);
    try { setMelding(await vraagLinks(email, lang)); } catch (err) { setFout((err as Error).message); }
    setBezig(false);
  }
  const kleur = donker ? '#FFFFFF' : '#14213D';
  return (
    <form onSubmit={stuur} style={{ display: 'grid', gap: 10 }}>
      <label htmlFor={'lab-links-' + lang} style={{ fontSize: 15, color: donker ? '#C7CEDB' : '#3A4258' }}>{t.linksS}</label>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input id={'lab-links-' + lang} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="naam@bedrijf.nl"
          style={{ flex: '1 1 220px', minWidth: 0, border: '1px solid #D5DAE3', borderRadius: 999, padding: '11px 16px', font: "15px 'Space Grotesk',system-ui,sans-serif", color: '#14213D' }} />
        <button disabled={bezig} style={{ border: 0, borderRadius: 999, padding: '11px 20px', background: signal, color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}>{bezig ? t.bezig : t.linksB}</button>
      </div>
      {melding ? <p role="status" style={{ margin: 0, fontWeight: 600, color: kleur }}>{melding}</p> : null}
      {fout ? <p role="alert" style={{ margin: 0, fontWeight: 600, color: donker ? '#FFB49A' : '#B23C0E' }}>{fout}</p> : null}
    </form>
  );
}
