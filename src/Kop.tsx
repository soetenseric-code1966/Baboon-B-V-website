import React from 'react';

// Grote kop bovenaan elke pagina (besluit 02-11-2026): eerste deel donkerblauw, tweede deel oranje op een nieuwe regel,
// zoals "Uw vakkennis. / Draaiend als software." op de homepage. In de tekst scheidt "|" de twee delen.
export function kop(tekst: string | undefined | null, signal?: string) {
  const [a, b] = String(tekst ?? '').split('|');
  if (b === undefined) return a;
  return <>{a.trim()}<br /><span style={{ color: signal || '#FF5A1F' }}>{b.trim()}</span></>;
}
