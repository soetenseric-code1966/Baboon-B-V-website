// Start gratis (lab, besluit 29-10-2026): idee invoeren; daarna door naar /lab/ waar het ontwerp verschijnt.
import React, { useEffect, useRef, useState } from 'react';
import { Lang, href } from '../routes';
import { LAB_TEXT, TURNSTILE_SITEKEY, bewaarIdee, labApi } from '../lab';

const mono: React.CSSProperties = { fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' };
const veld: React.CSSProperties = { width: '100%', border: '1px solid #D5DAE3', borderRadius: 12, padding: '12px 14px', font: "16px 'Space Grotesk',system-ui,sans-serif", color: '#14213D', background: '#FFFFFF' };
const label: React.CSSProperties = { display: 'grid', gap: 6, fontSize: 15, fontWeight: 600 };

declare global { interface Window { turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id?: string) => void } } }

export default function Start({ lang, signal }: { lang: Lang; signal: string }) {
  const t = LAB_TEXT[lang];
  const [idee, setIdee] = useState(''); const [naam, setNaam] = useState(''); const [email, setEmail] = useState(''); const [bedrijf, setBedrijf] = useState('');
  const [bezig, setBezig] = useState(false); const [fout, setFout] = useState<string | null>(null);
  const robot = useRef<HTMLDivElement>(null); const robotToken = useRef<string>(''); const widget = useRef<string | undefined>();

  useEffect(() => {
    if (!TURNSTILE_SITEKEY || !robot.current) return;
    const toon = () => { if (window.turnstile && robot.current && !widget.current) widget.current = window.turnstile.render(robot.current, { sitekey: TURNSTILE_SITEKEY, language: lang, callback: (tok: string) => { robotToken.current = tok; } }); };
    if (window.turnstile) return toon();
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; s.async = true; s.onload = toon;
    document.head.appendChild(s);
  }, [lang]);

  async function verstuur(e: React.FormEvent) {
    e.preventDefault(); setFout(null); setBezig(true);
    try {
      const r = await labApi<{ id: string; sleutel: string }>({ actie: 'start', idee, naam, email, bedrijf, taal: lang, robot: robotToken.current });
      bewaarIdee({ id: r.id, sleutel: r.sleutel, titel: idee.slice(0, 60), datum: new Date().toISOString() });
      window.location.href = href('Lab', lang) + '#' + r.id + '.' + r.sleutel;
    } catch (err) {
      setFout((err as Error).message); setBezig(false);
      if (widget.current && window.turnstile) { window.turnstile.reset(widget.current); robotToken.current = ''; }
    }
  }

  return (
    <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", color: '#14213D', background: '#FFFFFF', lineHeight: 1.5 }}>
      <section className="dw-sec" style={{ padding: '72px 48px 32px' }}>
        <div style={{ ...mono, color: signal }}>{t.eb} · {t.tegoed}</div>
        <h1 className="dw-h1" style={{ margin: '16px 0 0', fontSize: 64, lineHeight: 1, letterSpacing: '-2.4px', fontWeight: 700 }}>{t.h1}</h1>
        <p style={{ margin: '16px 0 0', fontSize: 20, lineHeight: 1.55, color: '#3A4258', maxWidth: 780 }}>{t.sub}</p>
      </section>
      <section className="dw-sec" style={{ padding: '0 48px 88px' }}>
        <form onSubmit={verstuur} style={{ border: '2px solid #14213D', borderRadius: 20, padding: 28, display: 'grid', gap: 18, maxWidth: 880 }}>
          <label style={label} htmlFor="lab-idee">{t.idee}
            <textarea id="lab-idee" required minLength={10} maxLength={4000} rows={7} value={idee} onChange={(e) => setIdee(e.target.value)} placeholder={t.ideeHint}
              style={{ ...veld, resize: 'vertical', lineHeight: 1.5 }}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) (e.currentTarget.form as HTMLFormElement).requestSubmit(); }} />
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
            <label style={label} htmlFor="lab-naam">{t.naam}<input id="lab-naam" required maxLength={120} value={naam} onChange={(e) => setNaam(e.target.value)} autoComplete="name" style={veld} /></label>
            <label style={label} htmlFor="lab-email">{t.email}<input id="lab-email" type="email" required maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" style={veld} /></label>
            <label style={label} htmlFor="lab-bedrijf">{t.bedrijf}<input id="lab-bedrijf" maxLength={160} value={bedrijf} onChange={(e) => setBedrijf(e.target.value)} autoComplete="organization" style={veld} /></label>
          </div>
          <div ref={robot} />
          {fout ? <p role="alert" style={{ margin: 0, padding: '10px 14px', borderRadius: 12, background: '#FFF1EB', color: '#B23C0E', fontWeight: 600 }}>{fout}</p> : null}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <button type="submit" disabled={bezig} style={{ padding: '16px 28px', borderRadius: 999, border: 0, background: signal, color: '#FFFFFF', fontWeight: 700, fontSize: 17, cursor: bezig ? 'wait' : 'pointer' }}>{bezig ? t.bezig : t.start + ' →'}</button>
            <p style={{ margin: 0, fontSize: 14, color: '#5C6378', maxWidth: 520 }}>{t.privacy}</p>
          </div>
        </form>
      </section>
    </div>
  );
}
