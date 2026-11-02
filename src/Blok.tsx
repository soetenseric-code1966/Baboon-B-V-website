// Bouwstenen voor handgeschreven pagina's (02-11-2026: Over ons en Veiligheid opnieuw opgezet).
// Zelfde maten als de rest van de site: label in IBM Plex Mono 13 px oranje, kop 1 64 px in twee kleuren,
// kop 2 48 px, inleiding 20 px, kaarten lichtgrijs #F3F5F8 met radius 20 px en geen rand.
import React from 'react';
import { kop } from './Kop';

export const NAVY = '#14213D';
export const GRIJS = '#F3F5F8';
export const TEKST = '#3A4258';
export const GROEN = '#0F7A55';

export const mono: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
};

export function Pagina({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", color: NAVY, background: '#FFFFFF', lineHeight: 1.5 }}>{children}</div>;
}

export function Opening({ eb, h1, sub, signal, rechts }: { eb: string; h1: string; sub: string; signal: string; rechts?: React.ReactNode }) {
  const tekst = (
    <div>
      <div style={{ ...mono, color: signal }}>{eb}</div>
      <h1 style={{ margin: '16px 0 0', fontSize: 64, lineHeight: 1, letterSpacing: '-2.4px', fontWeight: 700, maxWidth: 980 }}>{kop(h1, signal)}</h1>
      <p style={{ margin: '20px 0 0', fontSize: 20, lineHeight: 1.55, color: TEKST, maxWidth: 680 }}>{sub}</p>
    </div>
  );
  if (!rechts) return <section className="dw-sec" style={{ padding: '80px 48px 56px' }}>{tekst}</section>;
  return (
    <section className="dw-sec" style={{ padding: '72px 48px 56px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(460px,1fr))', gap: 48, alignItems: 'center' }}>
      {tekst}
      <div>{rechts}</div>
    </section>
  );
}

export function Deel({ eb, h2, sub, signal, children, id }: { eb: string; h2: string; sub?: string; signal: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="dw-sec" style={{ padding: '56px 48px' }}>
      <div style={{ ...mono, color: signal }}>{eb}</div>
      <h2 style={{ margin: '10px 0 0', fontSize: 48, letterSpacing: '-1.6px', lineHeight: 1.05, maxWidth: 900 }}>{h2}</h2>
      {sub ? <p style={{ margin: '16px 0 0', fontSize: 19, lineHeight: 1.55, color: TEKST, maxWidth: 780 }}>{sub}</p> : null}
      <div style={{ marginTop: 36 }}>{children}</div>
    </section>
  );
}

export function Raster({ min = 300, children }: { min?: number; children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(${min}px,1fr))`, gap: 20, alignItems: 'stretch' }}>{children}</div>;
}

export function Kaart({ donker, children, style }: { donker?: boolean; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: donker ? NAVY : GRIJS, color: donker ? '#FFFFFF' : NAVY, borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      {children}
    </div>
  );
}

export function Label({ children, donker }: { children: React.ReactNode; donker?: boolean }) {
  return <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, textTransform: 'uppercase', color: donker ? '#C7CEDB' : '#5C6378' }}>{children}</div>;
}

export function Titel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.2 }}>{children}</div>;
}

export function Tekst({ children, donker }: { children: React.ReactNode; donker?: boolean }) {
  return <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: donker ? '#DCE1EA' : TEKST }}>{children}</p>;
}

export function Vinkjes({ items, signal, kruis, donker }: { items: string[]; signal: string; kruis?: boolean; donker?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
      {items.map((x, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 16, lineHeight: 1.45, color: donker ? '#FFFFFF' : NAVY }}>
          <span aria-hidden="true" style={{ width: 22, height: 22, borderRadius: '50%', flex: 'none', marginTop: 1, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, color: '#FFFFFF', background: kruis ? '#9AA3B5' : donker ? signal : GROEN }}>{kruis ? '×' : '✓'}</span>
          <span>{x}</span>
        </div>
      ))}
    </div>
  );
}

export function Pijllink({ href, children, signal, donker }: { href: string; children: React.ReactNode; signal: string; donker?: boolean }) {
  return <a href={href} style={{ marginTop: 'auto', paddingTop: 8, fontWeight: 700, fontSize: 16, color: donker ? '#FFFFFF' : signal, textDecoration: 'none' }}>{children} →</a>;
}
