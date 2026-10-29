// Datawerf lab: bestanden toevoegen. Het bestand wordt in de browser gelezen (src/labBestanden.ts); alleen de opbouw
// (bladen, kolomnamen, soort, aantal rijen) gaat mee naar het lab. De bezoeker ziet precies wat er meegaat.
import React, { useState } from 'react';
import { Lang } from './routes';
import { LAB_TEXT } from './lab';
import { MAX_BESTANDEN, Opbouw, leesBestand } from './labBestanden';

export default function LabBestanden({ lang, waarde, wijzig, uit }: { lang: Lang; waarde: Opbouw[]; wijzig: (b: Opbouw[]) => void; uit?: boolean }) {
  const t = LAB_TEXT[lang];
  const [bezig, setBezig] = useState(false); const [fout, setFout] = useState<string | null>(null); const [over, setOver] = useState(false);

  async function voegToe(lijst: FileList | null) {
    if (!lijst?.length) return;
    setFout(null); setBezig(true);
    const nieuw = [...waarde];
    for (const f of Array.from(lijst)) {
      if (nieuw.length >= MAX_BESTANDEN) break;
      try { nieuw.push(await leesBestand(f)); } catch (e) { setFout(`${t.bestFout}: ${f.name} (${(e as Error).message})`); }
    }
    wijzig(nieuw); setBezig(false);
  }

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <div style={{ fontSize: 15, fontWeight: 600 }}>{t.bestT}</div>
      <label onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); if (!uit) voegToe(e.dataTransfer.files); }}
        style={{ position: 'relative', display: 'grid', gap: 4, placeItems: 'center', padding: 18, border: `2px dashed ${over ? '#FF5A1F' : '#C9D0DC'}`, borderRadius: 14, background: over ? '#FFF1EB' : '#F7F8FA', cursor: uit || waarde.length >= MAX_BESTANDEN ? 'not-allowed' : 'pointer', textAlign: 'center', opacity: uit ? 0.5 : 1 }}>
        <span style={{ fontWeight: 700 }}>{bezig ? t.bestLezen : t.bestKies}</span>
        <span style={{ fontSize: 13, color: '#5C6378', maxWidth: 560 }}>{t.bestS}</span>
        <input type="file" multiple accept=".xlsx,.xlsm,.csv,.txt" disabled={uit || bezig || waarde.length >= MAX_BESTANDEN}
          onChange={(e) => { voegToe(e.target.files); e.target.value = ''; }} style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} />
      </label>
      {fout ? <p role="alert" style={{ margin: 0, color: '#B23C0E', fontSize: 14, fontWeight: 600 }}>{fout}</p> : null}
      {waarde.map((b, i) => (
        <div key={i} style={{ border: '1px solid #D5DAE3', borderRadius: 12, padding: '10px 14px', display: 'grid', gap: 4, fontSize: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <strong style={{ overflowWrap: 'anywhere' }}>{b.naam}</strong>
            <button type="button" onClick={() => wijzig(waarde.filter((_, j) => j !== i))} style={{ border: 0, background: 'none', color: '#B23C0E', fontWeight: 600, cursor: 'pointer' }}>{t.bestWeg}</button>
          </div>
          {b.bladen.map((bl, j) => (
            <div key={j} style={{ color: '#3A4258' }}>
              <span style={{ fontWeight: 600 }}>{bl.naam}</span> · {bl.rijen.toLocaleString('nl-NL')} {t.bestRijen} · {bl.kolommen.length} {t.bestKolommen}
              {bl.kolommen.length ? <span style={{ color: '#5C6378' }}>: {bl.kolommen.filter((k) => !k.naam.startsWith('(kolom')).slice(0, 12).map((k) => k.naam).join(', ')}{bl.kolommen.length > 12 ? ', …' : ''}</span> : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
