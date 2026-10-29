// Lab-beheer (alleen voor Datawerf, niet in menu of sitemap): alle ideeën met prompts, tijd en kosten.
// Toegang met de beheersleutel (LAB_BEHEER_SLEUTEL in Supabase); die blijft alleen in deze browsersessie.
import React, { useEffect, useState } from 'react';
import { Lang } from '../routes';
import { labApi } from '../lab';

type Prompt = { nr: number; tekst: string; status: string; kosten: number | null; duur_ms: number | null };
type Idee = { id: string; aangemaakt: string; naam: string; email: string; bedrijf: string | null; titel: string | null; idee: string; status: string;
  prompts: number; kosten: number; duur_ms: number; tokens_in: number; tokens_uit: number; lijst: Prompt[] };
type Overzicht = { ideeen: Idee[]; vandaag: number; daglimiet: number; model: string; open: boolean; robot: boolean };

const SLOT = 'dw-lab-beheer';
const eur = (n: number) => '€ ' + n.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const th: React.CSSProperties = { textAlign: 'left', fontSize: 12, color: '#5C6378', padding: '8px 10px', borderBottom: '1px solid #D5DAE3', whiteSpace: 'nowrap' };
const td: React.CSSProperties = { padding: '8px 10px', borderBottom: '1px solid #E3E7EE', verticalAlign: 'top' };

export default function LabBeheer({ signal }: { lang: Lang; signal: string }) {
  const [sleutel, setSleutel] = useState(''); const [data, setData] = useState<Overzicht | null>(null);
  const [fout, setFout] = useState<string | null>(null); const [open, setOpen] = useState<string | null>(null);
  const [ontwerp, setOntwerp] = useState<string | null>(null);

  async function laad(k: string) {
    try { setData(await labApi<Overzicht>({ actie: 'overzicht' }, k)); setFout(null); try { sessionStorage.setItem(SLOT, k); } catch { /* */ } }
    catch (e) { setFout((e as Error).message); setData(null); }
  }
  useEffect(() => { try { const k = sessionStorage.getItem(SLOT); if (k) { setSleutel(k); laad(k); } } catch { /* */ } }, []);
  async function toon(id: string, nr: number) {
    const r = await labApi<{ html: string | null }>({ actie: 'ontwerp', id, nr }, sleutel).catch(() => ({ html: null }));
    setOntwerp(r.html);
  }

  const tot = data ? data.ideeen.reduce((s, i) => ({ kosten: s.kosten + i.kosten, prompts: s.prompts + i.prompts, duur: s.duur + i.duur_ms }), { kosten: 0, prompts: 0, duur: 0 }) : null;
  return (
    <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", color: '#14213D', background: '#FFFFFF' }}>
      <section className="dw-sec" style={{ padding: '56px 48px 88px', display: 'grid', gap: 18 }}>
        <h1 style={{ margin: 0, fontSize: 40, letterSpacing: '-1.2px' }}>Lab-beheer</h1>
        <form onSubmit={(e) => { e.preventDefault(); laad(sleutel); }} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <label htmlFor="lab-beheer" style={{ position: 'absolute', left: -9999 }}>Beheersleutel</label>
          <input id="lab-beheer" type="password" value={sleutel} onChange={(e) => setSleutel(e.target.value)} placeholder="Beheersleutel" autoComplete="current-password"
            style={{ border: '1px solid #D5DAE3', borderRadius: 12, padding: '10px 14px', font: 'inherit', minWidth: 0, flex: '1 1 240px', maxWidth: 360 }} />
          <button style={{ border: 0, borderRadius: 999, padding: '10px 22px', background: '#14213D', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}>Toon</button>
        </form>
        {fout ? <p role="alert" style={{ margin: 0, color: '#B23C0E', fontWeight: 600 }}>{fout}</p> : null}
        {data && tot ? <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
            {[['Ideeën', String(data.ideeen.length)], ['Prompts', String(tot.prompts)], ['AI-kosten', eur(tot.kosten)], ['Vandaag', `${data.vandaag} / ${data.daglimiet}`],
              ['Lab', data.open ? 'open' : 'dicht (geen sleutel)'], ['Robotcontrole', data.robot ? 'aan' : 'uit']].map(([k, v]) => (
              <div key={k} style={{ background: '#F7F8FA', borderRadius: 16, padding: 16 }}><div style={{ fontSize: 12, color: '#5C6378', fontFamily: "'IBM Plex Mono',monospace", textTransform: 'uppercase' }}>{k}</div><div style={{ fontSize: 24, fontWeight: 700 }}>{v}</div></div>))}
          </div>
          <p style={{ margin: 0, fontSize: 13, color: '#5C6378' }}>Model {data.model}. Kosten zijn berekend uit de tokens en de ingestelde prijzen; de factuur in de Claude Console is leidend.</p>
          <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead><tr><th style={th}>Datum</th><th style={th}>Idee</th><th style={th}>Wie</th><th style={th}>Prompts</th><th style={th}>Minuten</th><th style={th}>Kosten</th><th style={th}>Status</th></tr></thead>
            <tbody>{data.ideeen.map((i) => <React.Fragment key={i.id}>
              <tr onClick={() => { setOpen(open === i.id ? null : i.id); setOntwerp(null); }} style={{ cursor: 'pointer' }}>
                <td style={td}>{new Date(i.aangemaakt).toLocaleString('nl-NL', { dateStyle: 'short', timeStyle: 'short' })}</td>
                <td style={td}><strong>{i.titel || '—'}</strong><div style={{ color: '#5C6378', maxWidth: 420 }}>{i.idee.slice(0, 120)}{i.idee.length > 120 ? '…' : ''}</div></td>
                <td style={td}>{i.naam}<div style={{ color: '#5C6378' }}>{i.email}{i.bedrijf ? ' · ' + i.bedrijf : ''}</div></td>
                <td style={td}>{i.prompts}/10</td><td style={td}>{(i.duur_ms / 60000).toLocaleString('nl-NL', { maximumFractionDigits: 1 })}</td>
                <td style={td}>{eur(i.kosten)}<div style={{ color: '#5C6378', fontSize: 12 }}>{i.tokens_in.toLocaleString('nl-NL')} in · {i.tokens_uit.toLocaleString('nl-NL')} uit</div></td>
                <td style={td}><span style={{ padding: '2px 10px', borderRadius: 999, background: i.status === 'start platform' ? signal : '#E3E7EE', color: i.status === 'start platform' ? '#FFFFFF' : '#14213D', fontWeight: 600, fontSize: 12 }}>{i.status}</span></td>
              </tr>
              {open === i.id ? <tr><td colSpan={7} style={{ ...td, background: '#F7F8FA' }}>
                <ol style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 6 }}>{i.lijst.map((p) => <li key={p.nr}>
                  {p.tekst.slice(0, 200)} <span style={{ color: '#5C6378' }}>· {p.status} · {p.kosten != null ? eur(Number(p.kosten)) : '—'} · {p.duur_ms ? Math.round(p.duur_ms / 1000) + ' s' : '—'}</span>
                  {p.status === 'klaar' ? <button type="button" onClick={() => toon(i.id, p.nr)} style={{ marginLeft: 8, border: '1px solid #14213D', borderRadius: 999, background: '#FFFFFF', padding: '2px 10px', cursor: 'pointer' }}>Bekijk ontwerp</button> : null}
                </li>)}</ol>
                {ontwerp ? <iframe title="Ontwerp" srcDoc={ontwerp} sandbox="allow-scripts allow-forms" style={{ width: '100%', height: 640, border: '1px solid #D5DAE3', borderRadius: 12, marginTop: 12, background: '#FFFFFF' }} /> : null}
              </td></tr> : null}
            </React.Fragment>)}</tbody></table></div>
        </> : null}
      </section>
    </div>
  );
}
