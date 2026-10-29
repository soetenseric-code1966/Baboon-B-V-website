// Lab (besluit 29-10-2026): het ontwerp van een idee in een afgesloten kader, met de teller (x van 10), de
// doorgestreepte waarde en "Maak het nauwkeuriger". Het adres is /lab/#<id>.<sleutel>; de sleutel blijft in de browser.
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Lang, href } from '../routes';
import { LAB_TEXT, LabStand, bewaarIdee, bewaardeIdeeen, labApi } from '../lab';

const mono: React.CSSProperties = { fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' };
const pil = (bg: string, fg: string, border = bg): React.CSSProperties => ({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '10px 20px', borderRadius: 999, background: bg, color: fg, border: `2px solid ${border}`, fontWeight: 700, textDecoration: 'none', fontSize: 15, cursor: 'pointer' });

function leesHash(): { id: string; sleutel: string } | null {
  const m = window.location.hash.slice(1).match(/^([0-9a-f-]{36})\.([A-Za-z0-9_-]{20,})$/);
  return m ? { id: m[1], sleutel: m[2] } : null;
}

export default function Lab({ lang, signal }: { lang: Lang; signal: string }) {
  const t = LAB_TEXT[lang];
  const [toegang, setToegang] = useState<{ id: string; sleutel: string } | null>(null);
  const [geladen, setGeladen] = useState(false);
  const [stand, setStand] = useState<LabStand | null>(null);
  const [fout, setFout] = useState<string | null>(null);
  const [vraag, setVraag] = useState(''); const [stuurt, setStuurt] = useState(false);
  const [platform, setPlatform] = useState(false); const [gekopieerd, setGekopieerd] = useState(false);
  const timer = useRef<number | undefined>();

  const laad = useCallback(async (k: { id: string; sleutel: string }) => {
    try {
      const s = await labApi<LabStand>({ actie: 'stand', ...k });
      setStand(s); setFout(null);
      bewaarIdee({ id: k.id, sleutel: k.sleutel, titel: s.idee.titel || s.idee.idee.slice(0, 60), datum: new Date().toISOString() });
      window.clearTimeout(timer.current);
      if (s.bezig) timer.current = window.setTimeout(() => laad(k), 4000);
    } catch (e) { setFout((e as { status?: number }).status === 404 ? t.nietGevonden : (e as Error).message); }
  }, [t.nietGevonden]);

  useEffect(() => {
    const k = leesHash(); setToegang(k); setGeladen(true);
    if (k) laad(k);
    const opHash = () => { const n = leesHash(); setToegang(n); setStand(null); if (n) laad(n); };
    window.addEventListener('hashchange', opHash);
    return () => { window.removeEventListener('hashchange', opHash); window.clearTimeout(timer.current); };
  }, [laad]);

  async function stuur(e: React.FormEvent) {
    e.preventDefault(); if (!toegang || !vraag.trim()) return;
    setStuurt(true); setFout(null);
    try { await labApi({ actie: 'vraag', ...toegang, tekst: vraag }); setVraag(''); await laad(toegang); }
    catch (err) { setFout((err as Error).message); await laad(toegang); }
    setStuurt(false);
  }
  async function opnieuw() { if (!toegang) return; try { await labApi({ actie: 'opnieuw', ...toegang }); await laad(toegang); } catch (err) { setFout((err as Error).message); } }
  async function startPlatform() { if (!toegang) return; try { await labApi({ actie: 'platform', ...toegang }); setPlatform(true); } catch (err) { setFout((err as Error).message); } }
  async function kopieer() {
    try { await navigator.clipboard.writeText(window.location.href); setGekopieerd(true); window.setTimeout(() => setGekopieerd(false), 2000); } catch { /* selecteren mag ook */ }
  }

  const wrap: React.CSSProperties = { fontFamily: "'Space Grotesk',system-ui,sans-serif", color: '#14213D', background: '#FFFFFF', lineHeight: 1.5 };

  // Zonder idee in het adres: de ideeën uit deze browser.
  if (!geladen || !toegang) {
    const mijn = geladen ? bewaardeIdeeen() : [];
    return (
      <div style={wrap}><section className="dw-sec" style={{ padding: '72px 48px 88px', display: 'grid', gap: 18 }}>
        <div style={{ ...mono, color: signal }}>{t.eb}</div>
        <h1 className="dw-h1" style={{ margin: 0, fontSize: 48, letterSpacing: '-1.6px' }}>{t.mijn}</h1>
        {mijn.length ? <div style={{ display: 'grid', gap: 10, maxWidth: 760 }}>{mijn.map((m) => (
          <a key={m.id} href={'#' + m.id + '.' + m.sleutel} style={{ ...pil('#FFFFFF', '#14213D', '#14213D'), justifyContent: 'space-between' }}><span>{m.titel}</span><span aria-hidden="true">→</span></a>))}</div>
          : <p style={{ margin: 0, color: '#3A4258', fontSize: 18 }}>{t.geen}</p>}
        <a href={href('Start', lang)} style={{ ...pil(signal, '#FFFFFF'), justifySelf: 'start' }}>{t.nieuw} →</a>
      </section></div>
    );
  }

  const op = stand ? stand.gebruikt >= stand.max && !stand.bezig : false;
  const laatste = stand?.prompts[stand.prompts.length - 1];
  return (
    <div style={wrap}>
      <section className="dw-sec" style={{ padding: '32px 48px 16px', display: 'grid', gap: 14 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', alignItems: 'center' }}>
          <span style={{ ...mono, color: signal }}>{t.eb}</span>
          {stand ? <>
            <span aria-label={`${stand.gebruikt} / ${stand.max}`} style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
              {Array.from({ length: stand.max }, (_, i) => <i key={i} style={{ width: 11, height: 11, borderRadius: 3, background: i < stand.gebruikt ? signal : '#E3E7EE' }} />)}
              <span style={{ marginLeft: 8, fontWeight: 700 }}>{stand.gebruikt}/{stand.max}</span></span>
            <span style={{ fontSize: 15, color: '#3A4258' }}>{t.waarde} <s>€ {stand.waarde.toLocaleString('nl-NL')}</s> · <strong style={{ color: '#0F7A55' }}>{t.geenKosten}</strong> · {stand.minuten.toLocaleString('nl-NL')} {t.minuten}</span>
          </> : null}
        </div>
        <h1 style={{ margin: 0, fontSize: 36, letterSpacing: '-1px' }}>{stand?.idee.titel || (stand ? stand.idee.idee.slice(0, 70) : '…')}</h1>
        {fout ? <p role="alert" style={{ margin: 0, padding: '10px 14px', borderRadius: 12, background: '#FFF1EB', color: '#B23C0E', fontWeight: 600 }}>{fout}</p> : null}
      </section>

      <section className="dw-sec" style={{ padding: '0 48px 24px' }}>
        <div style={{ border: '2px solid #14213D', borderRadius: 20, overflow: 'hidden', background: '#F7F8FA', minHeight: 420, display: 'grid' }}>
          {stand?.bezig ? (
            <div style={{ display: 'grid', placeItems: 'center', padding: 40, textAlign: 'center', gap: 12, borderBottom: stand.ontwerp ? '1px solid #D5DAE3' : 0 }}>
              <div className="lab-laden" aria-hidden="true" style={{ width: 44, height: 44, borderRadius: '50%', border: `4px solid #E3E7EE`, borderTopColor: signal }} />
              <p style={{ margin: 0, maxWidth: 480, color: '#3A4258' }}>{t.maken}</p>
            </div>
          ) : null}
          {laatste?.status === 'fout' ? (
            <div style={{ padding: 24, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', borderBottom: '1px solid #D5DAE3' }}>
              <span style={{ color: '#B23C0E', fontWeight: 600 }}>{t.fout}</span><button type="button" onClick={opnieuw} style={pil('#14213D', '#FFFFFF')}>{t.opnieuw}</button></div>
          ) : null}
          {stand?.ontwerp ? (
            <iframe title={stand.idee.titel || 'Ontwerp'} srcDoc={stand.ontwerp.html} sandbox="allow-scripts allow-forms"
              style={{ width: '100%', height: 'min(78vh, 900px)', border: 0, background: '#FFFFFF' }} />
          ) : null}
        </div>
        {stand?.prompts.find((p) => p.nr === stand.ontwerp?.nr)?.samenvatting ? <p style={{ margin: '12px 0 0', color: '#3A4258', maxWidth: 900 }}>{stand.prompts.find((p) => p.nr === stand.ontwerp?.nr)?.samenvatting}</p> : null}
      </section>

      <section className="dw-sec" style={{ padding: '0 48px 88px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 24, alignItems: 'start' }}>
        {op ? (
          <div style={{ background: '#14213D', color: '#FFFFFF', borderRadius: 20, padding: 28, display: 'grid', gap: 10 }}>
            <div style={{ ...mono, color: signal }}>{t.op}</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{t.platformT}</div>
            <p style={{ margin: 0, color: '#C7CEDB' }}>{t.platformS}</p>
            {platform ? <p style={{ margin: 0, fontWeight: 700 }}>{t.platformOk}</p> : <button type="button" onClick={startPlatform} style={{ ...pil(signal, '#FFFFFF'), justifySelf: 'start' }}>{t.platformB} →</button>}
          </div>
        ) : (
          <form onSubmit={stuur} style={{ border: '2px solid #14213D', borderRadius: 20, padding: 24, display: 'grid', gap: 12 }}>
            <label htmlFor="lab-vraag" style={{ fontSize: 20, fontWeight: 700 }}>{t.nauwkeuriger}</label>
            <textarea id="lab-vraag" rows={3} maxLength={4000} value={vraag} onChange={(e) => setVraag(e.target.value)} placeholder={t.nauwHint} disabled={!stand || stand.bezig}
              style={{ border: '1px solid #D5DAE3', borderRadius: 12, padding: '12px 14px', font: "16px 'Space Grotesk',system-ui,sans-serif", resize: 'vertical' }}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); (e.currentTarget.form as HTMLFormElement).requestSubmit(); } }} />
            <button type="submit" disabled={!stand || stand.bezig || stuurt || !vraag.trim()} style={{ ...pil(signal, '#FFFFFF'), justifySelf: 'start', opacity: !stand || stand.bezig || !vraag.trim() ? 0.5 : 1 }}>{stuurt ? t.bezig : t.verstuur + ' →'}</button>
            {!op && stand ? <a href={href('Contact', lang)} style={{ fontSize: 14, color: '#3A4258' }}>{t.platformT} →</a> : null}
          </form>
        )}
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ background: '#F7F8FA', borderRadius: 20, padding: 22, display: 'grid', gap: 10 }}>
            <p style={{ margin: 0, fontSize: 15 }}>{t.link}</p>
            <button type="button" onClick={kopieer} style={{ ...pil('#FFFFFF', '#14213D', '#14213D'), justifySelf: 'start' }}>{gekopieerd ? t.gekopieerd : t.kopieer}</button>
          </div>
          {stand?.prompts.length ? (
            <div style={{ background: '#F7F8FA', borderRadius: 20, padding: 22 }}>
              <div style={{ ...mono, color: '#5C6378' }}>{t.geschiedenis}</div>
              <ol style={{ margin: '8px 0 0', paddingLeft: 20, display: 'grid', gap: 6 }}>
                {stand.prompts.map((p) => <li key={p.nr} style={{ color: p.status === 'fout' ? '#B23C0E' : '#14213D' }}>{p.tekst.length > 140 ? p.tekst.slice(0, 140) + '…' : p.tekst}</li>)}
              </ol>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
