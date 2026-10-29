// Datawerf lab: bestanden (Excel of CSV) lezen IN DE BROWSER van de bezoeker. Alleen de opbouw gaat naar het lab:
// bestandsnaam, bladnamen, kolomnamen, soort per kolom (tekst/getal/ja-nee) en het aantal rijen. Nooit de inhoud.
// Werkt zonder extra pakketten: een .xlsx is een zip met XML; uitpakken met DecompressionStream (browser en Node).

export type Kolom = { naam: string; soort: 'tekst' | 'getal' | 'ja/nee' | 'leeg' };
export type Blad = { naam: string; rijen: number; kolommen: Kolom[] };
export type Opbouw = { naam: string; bladen: Blad[] };

export const MAX_BESTANDEN = 3;
export const MAX_BESTAND_MB = 15;
const MAX_BLADEN = 10;
const MAX_KOLOMMEN = 60;
const MAX_NAAM = 60;

const netjes = (s: string, max = MAX_NAAM) => s.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);

// ---------- zip ----------
type ZipBestand = { naam: string; methode: number; grootte: number; start: number; lengte: number };
function zipInhoud(b: Uint8Array): ZipBestand[] {
  const v = new DataView(b.buffer, b.byteOffset, b.byteLength);
  let eocd = -1;
  for (let i = b.length - 22; i >= Math.max(0, b.length - 70000); i--) if (v.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error('geen zip');
  const aantal = v.getUint16(eocd + 10, true);
  let p = v.getUint32(eocd + 16, true);
  const dec = new TextDecoder();
  const lijst: ZipBestand[] = [];
  for (let n = 0; n < aantal && p + 46 <= b.length; n++) {
    if (v.getUint32(p, true) !== 0x02014b50) break;
    const methode = v.getUint16(p + 10, true), lengte = v.getUint32(p + 20, true), grootte = v.getUint32(p + 24, true);
    const nl = v.getUint16(p + 28, true), el = v.getUint16(p + 30, true), cl = v.getUint16(p + 32, true), lokaal = v.getUint32(p + 42, true);
    const naam = dec.decode(b.subarray(p + 46, p + 46 + nl));
    const start = lokaal + 30 + v.getUint16(lokaal + 26, true) + v.getUint16(lokaal + 28, true);
    lijst.push({ naam, methode, grootte, start, lengte });
    p += 46 + nl + el + cl;
  }
  return lijst;
}
async function pakUit(b: Uint8Array, z: ZipBestand): Promise<string> {
  if (z.grootte > 80 * 1024 * 1024) throw new Error('te groot');
  const ruw = b.subarray(z.start, z.start + z.lengte);
  if (z.methode === 0) return new TextDecoder().decode(ruw);
  if (z.methode !== 8) throw new Error('onbekende inpakking');
  const s = new Blob([ruw]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  return await new Response(s).text();
}

// ---------- xml ----------
const ontsnap = (s: string) => s.replace(/&(lt|gt|amp|quot|apos|#x?[0-9a-f]+);/gi, (m, e: string) => {
  const k = e.toLowerCase();
  if (k === 'lt') return '<'; if (k === 'gt') return '>'; if (k === 'amp') return '&'; if (k === 'quot') return '"'; if (k === 'apos') return "'";
  const c = k.startsWith('#x') ? parseInt(k.slice(2), 16) : parseInt(k.slice(1), 10);
  return Number.isFinite(c) ? String.fromCodePoint(c) : m;
});
const attr = (tag: string, a: string) => tag.match(new RegExp(`\\s${a}="([^"]*)"`))?.[1];
const teksten = (xml: string) => [...xml.matchAll(/<(?:\w+:)?t(?:\s[^>]*)?>([\s\S]*?)<\/(?:\w+:)?t>/g)].map((m) => ontsnap(m[1])).join('');

function kolomNr(ref: string): number {
  const l = ref.match(/^[A-Z]+/)?.[0] ?? 'A';
  let n = 0; for (const c of l) n = n * 26 + (c.charCodeAt(0) - 64);
  return n - 1;
}
const kolomLetter = (n: number) => { let s = ''; n++; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };

type Cel = { soort: 'tekst' | 'getal' | 'ja/nee'; tekst: string };
type Rij = Map<number, Cel>;

function leesRijen(xml: string, gedeeld: string[], max: number): { rijen: Rij[]; totaal: number } {
  const rijen: Rij[] = [];
  let totaal = 0;
  for (const m of xml.matchAll(/<(?:\w+:)?row\b([^>]*?)(?:\/>|>([\s\S]*?)<\/(?:\w+:)?row>)/g)) {
    totaal++;
    if (rijen.length >= max) continue;
    const rij: Rij = new Map();
    let volg = 0;
    for (const c of (m[2] ?? '').matchAll(/<(?:\w+:)?c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/(?:\w+:)?c>)/g)) {
      const kop = c[1], binnen = c[2] ?? '';
      const ref = attr(kop, 'r'); const nr = ref ? kolomNr(ref) : volg; volg = nr + 1;
      const t = attr(kop, 't');
      const waarde = binnen.match(/<(?:\w+:)?v>([\s\S]*?)<\/(?:\w+:)?v>/)?.[1];
      let cel: Cel | null = null;
      if (t === 's' && waarde != null) cel = { soort: 'tekst', tekst: gedeeld[Number(waarde)] ?? '' };
      else if (t === 'inlineStr') cel = { soort: 'tekst', tekst: teksten(binnen) };
      else if (t === 'str' || t === 'e') cel = { soort: 'tekst', tekst: ontsnap(waarde ?? '') };
      else if (t === 'b') cel = { soort: 'ja/nee', tekst: '' };
      else if (waarde != null && waarde !== '') cel = { soort: 'getal', tekst: '' };
      if (cel && (cel.soort !== 'tekst' || cel.tekst.trim())) rij.set(nr, cel);
    }
    rijen.push(rij);
  }
  return { rijen, totaal };
}

/** Kies de kopregel (de regel met de meeste tekstcellen in de eerste 15) en bepaal per kolom de soort. */
export function bladOpbouw(naam: string, rijen: Rij[], totaal: number): Blad {
  let kop = -1, best = 1;
  rijen.slice(0, 15).forEach((r, i) => {
    const tekst = [...r.values()].filter((c) => c.soort === 'tekst').length;
    if (tekst > best && tekst >= r.size * 0.6) { best = tekst; kop = i; }
  });
  if (kop < 0) return { naam: netjes(naam), rijen: totaal, kolommen: [] };
  const onder = rijen.slice(kop + 1, kop + 51);
  const nrs = new Set<number>(rijen[kop].keys());
  for (const r of onder) for (const k of r.keys()) nrs.add(k);
  const kolommen: Kolom[] = [...nrs].sort((a, b) => a - b).slice(0, MAX_KOLOMMEN).map((nr) => {
    const kopCel = rijen[kop].get(nr);
    const soorten = onder.map((r) => r.get(nr)?.soort).filter(Boolean) as Kolom['soort'][];
    const tel = (s: string) => soorten.filter((x) => x === s).length;
    const soort: Kolom['soort'] = !soorten.length ? 'leeg' : tel('getal') >= soorten.length / 2 ? 'getal' : tel('ja/nee') >= soorten.length / 2 ? 'ja/nee' : 'tekst';
    return { naam: netjes(kopCel?.soort === 'tekst' ? kopCel.tekst : '') || `(kolom ${kolomLetter(nr)})`, soort };
  }).filter((k) => !(k.soort === 'leeg' && k.naam.startsWith('(kolom')));
  return { naam: netjes(naam), rijen: Math.max(0, totaal - kop - 1), kolommen };
}

export async function leesXlsx(naam: string, b: Uint8Array): Promise<Opbouw> {
  const zip = zipInhoud(b);
  const vind = (n: string) => zip.find((z) => z.naam.replace(/^\//, '').toLowerCase() === n.toLowerCase());
  const wb = vind('xl/workbook.xml');
  if (!wb) throw new Error('geen werkmap');
  const workbook = await pakUit(b, wb);
  const relsZ = vind('xl/_rels/workbook.xml.rels');
  const rels = relsZ ? await pakUit(b, relsZ) : '';
  const doelen = new Map([...rels.matchAll(/<Relationship\b[^>]*>/g)].map((m) => [attr(m[0], 'Id') ?? '', attr(m[0], 'Target') ?? '']));
  const ssZ = vind('xl/sharedStrings.xml');
  const gedeeld = ssZ ? [...(await pakUit(b, ssZ)).matchAll(/<(?:\w+:)?si>([\s\S]*?)<\/(?:\w+:)?si>/g)].map((m) => teksten(m[1])) : [];
  const bladen: Blad[] = [];
  for (const s of [...workbook.matchAll(/<(?:\w+:)?sheet\b[^>]*>/g)].slice(0, MAX_BLADEN)) {
    if (attr(s[0], 'state') === 'hidden' || attr(s[0], 'state') === 'veryHidden') continue;
    const doel = doelen.get(attr(s[0], 'r:id') ?? '') ?? '';
    const pad = doel.startsWith('/') ? doel.slice(1) : 'xl/' + doel.replace(/^\.\//, '');
    const z = vind(pad);
    if (!z) continue;
    const { rijen, totaal } = leesRijen(await pakUit(b, z), gedeeld, 70);
    bladen.push(bladOpbouw(ontsnap(attr(s[0], 'name') ?? 'Blad'), rijen, totaal));
  }
  return { naam: netjes(naam, 80), bladen };
}

/** CSV/TXT: scheidingsteken raden (; , of tab), aanhalingstekens respecteren. */
export function leesCsv(naam: string, tekst: string): Opbouw {
  const regels = tekst.replace(/^﻿/, '').split(/\r?\n/);
  const eerste = regels.find((r) => r.trim()) ?? '';
  const scheid = [';', ',', '\t'].map((s) => [s, eerste.split(s).length] as const).sort((a, b) => b[1] - a[1])[0][0];
  const splits = (r: string) => {
    const uit: string[] = []; let cel = '', q = false;
    for (let i = 0; i < r.length; i++) {
      const c = r[i];
      if (q) { if (c === '"' && r[i + 1] === '"') { cel += '"'; i++; } else if (c === '"') q = false; else cel += c; }
      else if (c === '"') q = true; else if (c === scheid) { uit.push(cel); cel = ''; } else cel += c;
    }
    uit.push(cel); return uit;
  };
  const isGetal = (s: string) => /^-?[€$]?\s?\d[\d.,\s]*%?$/.test(s.trim());
  const gevuld = regels.filter((r) => r.trim());
  const rijen: Rij[] = gevuld.slice(0, 70).map((r) => new Map(splits(r).map((c, i) => [i, { soort: isGetal(c) ? 'getal' : 'tekst', tekst: c } as Cel]).filter(([, c]) => c.tekst.trim())));
  return { naam: netjes(naam, 80), bladen: [bladOpbouw(naam.replace(/\.[^.]+$/, ''), rijen, gevuld.length)] };
}

export async function leesBestand(f: File): Promise<Opbouw> {
  if (f.size > MAX_BESTAND_MB * 1024 * 1024) throw new Error(`te groot (max. ${MAX_BESTAND_MB} MB)`);
  const ext = f.name.toLowerCase().split('.').pop();
  if (ext === 'xlsx' || ext === 'xlsm') return leesXlsx(f.name, new Uint8Array(await f.arrayBuffer()));
  if (ext === 'csv' || ext === 'txt') return leesCsv(f.name, await f.text());
  throw new Error(ext === 'xls' ? 'oud Excel-formaat: sla op als .xlsx' : 'alleen Excel (.xlsx) of CSV');
}
