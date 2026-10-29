// Tests voor de pure regels van het Datawerf lab (supabase/lab/functions/datawerf-lab/regels.ts).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as r from '../supabase/lab/functions/datawerf-lab/regels.ts';

test('startformulier: nette waarden en meldingen in gewone taal', () => {
  const ok = r.controleerStart({ naam: ' Eric ', email: 'A@B.NL', idee: 'Een bandenmonitor per voertuig', taal: 'nl' });
  assert.equal(ok.ok, true); assert.equal(ok.naam, 'Eric'); assert.equal(ok.email, 'a@b.nl'); assert.equal(ok.bedrijf, null);
  assert.equal(r.controleerStart({ naam: '', email: 'a@b.nl', idee: 'x'.repeat(20) }).fout, 'Vul uw naam in.');
  assert.equal(r.controleerStart({ naam: 'a', email: 'geen-mail', idee: 'x'.repeat(20) }).ok, false);
  assert.equal(r.controleerStart({ naam: 'a', email: 'a@b.nl', idee: 'kort' }).ok, false);
  assert.equal(r.controleerStart({ naam: 'a', email: 'a@b.nl', idee: 'x'.repeat(4001) }).ok, false);
  assert.match(r.controleerStart({ naam: '', email: 'a@b.nl', idee: 'x'.repeat(20), taal: 'en' }).fout, /name/);
});

test('vervolgvraag: 2 tot 4000 tekens', () => {
  assert.equal(r.controleerVraag(' x '), null);
  assert.equal(r.controleerVraag('Voeg kosten per km toe'), 'Voeg kosten per km toe');
  assert.equal(r.controleerVraag('x'.repeat(4001)), null);
});

test('kosten in euro en waarde van het werk', () => {
  assert.equal(r.kostenEur(30000, 20000, 3, 15, 0.9), 0.351);
  assert.equal(r.waardeEur(2 * 60_000), 21); // 2 minuten × 5 × € 125
  assert.equal(r.MAX_PROMPTS, 10);
});

test('ontwerp uit het antwoord halen, ook met ```html eromheen', () => {
  const html = '<!doctype html>\n<!-- titel: Bandenmonitor -->\n<!-- samenvatting: Een overzicht. -->\n<html><body>' + 'x'.repeat(300) + '</body></html>';
  const a = r.leesOntwerp(html); assert.equal(a.titel, 'Bandenmonitor'); assert.equal(a.samenvatting, 'Een overzicht.');
  const b = r.leesOntwerp('Hier is het:\n```html\n' + html + '\n```\nVeel plezier'); assert.ok(b.html.startsWith('<!doctype html>')); assert.ok(b.html.endsWith('</html>'));
  assert.equal(r.leesOntwerp('Sorry, dat kan ik niet.'), null);
});

test('daglimiet begint om middernacht Nederlandse tijd', () => {
  assert.equal(r.begintVandaag(new Date('2026-10-29T15:00:00Z')), '2026-10-28T23:00:00.000Z'); // wintertijd
  assert.equal(r.begintVandaag(new Date('2026-07-01T10:00:00Z')), '2026-06-30T22:00:00.000Z'); // zomertijd
  assert.equal(r.begintVandaag(new Date('2026-10-29T23:30:00Z')), '2026-10-29T23:00:00.000Z'); // net na middernacht
});

test('alleen datawerf.com, previews en localhost mogen de functie aanroepen', () => {
  assert.equal(r.toegestaneHerkomst('https://datawerf.com'), 'https://datawerf.com');
  assert.equal(r.toegestaneHerkomst('https://deploy-preview-14--datawerf-website.netlify.app'), 'https://deploy-preview-14--datawerf-website.netlify.app');
  assert.equal(r.toegestaneHerkomst('https://datawerf.com.kwaad.nl'), null);
  assert.equal(r.toegestaneHerkomst('https://kwaad.nl'), null);
});

test('de opdracht aan de AI eist verzonnen gegevens en één HTML-document', () => {
  const s = r.SYSTEEM('nl');
  assert.match(s, /VERZONNEN/); assert.match(s, /Noem nooit echte bedrijven/); assert.match(s, /<!doctype html>/); assert.match(s, /Nederlands/);
  assert.match(r.SYSTEEM('en'), /Engels/);
});

test('vaste app-stijl: wordt in <head> gezet en voor de vervolgvraag weer weggehaald', async () => {
  const s = await import('../supabase/lab/functions/datawerf-lab/stijl.ts');
  const html = '<!doctype html><html><head><title>x</title></head><body><div class="ds-app"></div></body></html>';
  const met = r.voegStijlToe(html);
  assert.match(met, /<style id="ds-stijl">/); assert.match(met, /Montserrat/); assert.match(met, /--merk:#0062a3/);
  assert.ok(met.indexOf('ds-stijl') < met.indexOf('<title>'));
  assert.equal(r.zonderStijl(met).includes('ds-stijl'), false);
  assert.match(r.voegStijlToe('<!doctype html><html><body></body></html>'), /<head>\n<link/);
  assert.match(s.APP_OPBOUW, /ds-login/); assert.match(r.SYSTEEM('nl'), /Neem ze NIET zelf op/);
});

test('mails: link naar het idee, ontsnapte tekst, Engels waar gevraagd', () => {
  const m = r.mailKlaar('nl', 'Banden <monitor>', 'https://datawerf.com/lab/#id.sleutel');
  assert.match(m.onderwerp, /staat klaar/); assert.match(m.tekst, /https:\/\/datawerf\.com\/lab\/#id\.sleutel/);
  assert.match(m.html, /Banden &lt;monitor&gt;/); assert.doesNotMatch(m.html, /<monitor>/);
  const l = r.mailLinks('en', [{ titel: 'A', link: 'https://datawerf.com/en/lab/#a.b' }, { titel: 'B', link: 'https://datawerf.com/en/lab/#c.d' }]);
  assert.match(l.onderwerp, /Your ideas/); assert.equal((l.html.match(/href=/g) || []).length, 2);
});

test('ontwerp zonder afsluitende ``` wordt toch gelezen; opdracht vraagt om een compact document', () => {
  const html = '```html\n<!doctype html>\n<!-- titel: X -->\n<html><body>' + 'y'.repeat(300) + '</body></html>';
  const a = r.leesOntwerp(html); assert.ok(a); assert.ok(a.html.startsWith('<!doctype html>'));
  assert.match(r.SYSTEEM('nl'), /40\.000 tekens/);
});

// ---- Bijgevoegde bestanden: alleen de opbouw gaat mee (besluit 29-10-2026) ----
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as lab from '../src/lab.ts';
import * as b from '../src/labBestanden.ts';

test('xlsx: bladnamen, kopregel onder een titel, soort per kolom, verborgen blad overgeslagen', async () => {
  const pad = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'lab-voorbeeld.xlsx');
  const o = await b.leesXlsx('lab-voorbeeld.xlsx', new Uint8Array(readFileSync(pad)));
  assert.equal(o.bladen.length, 1);
  const bl = o.bladen[0];
  assert.equal(bl.naam, 'Banden'); assert.equal(bl.rijen, 12);
  assert.deepEqual(bl.kolommen.map((k) => `${k.naam}:${k.soort}`), ['Voertuig:tekst', 'Positie:tekst', 'Merk:tekst', 'Profiel mm:getal', 'Prijs:getal', 'Actief:ja/nee']);
  assert.ok(!JSON.stringify(o).includes('BUS-10'), 'geen inhoud in de opbouw');
});

test('csv: scheidingsteken raden en aanhalingstekens', () => {
  const o = b.leesCsv('lijst.csv', 'Maat;"Prijs; bruto";Merk\n315/80R22.5;"1.234,50";Merkloos\n295/60R22.5;999;Ander\n');
  assert.deepEqual(o.bladen[0].kolommen.map((k) => `${k.naam}:${k.soort}`), ['Maat:tekst', 'Prijs; bruto:getal', 'Merk:tekst']);
  assert.equal(o.bladen[0].rijen, 2);
});

test('opbouw naar tekst: geen bestandsnaam, kolommen zonder naam geteld, grenzen', () => {
  assert.equal(r.bestandenTekst(undefined), ''); assert.equal(r.bestandenTekst([]), '');
  assert.equal(r.bestandenTekst('x'), null); assert.equal(r.bestandenTekst([{}, {}, {}, {}]), null);
  const t = r.bestandenTekst([{ naam: 'Leverancier_X_prijslijst.xlsx', bladen: [{ naam: 'Prijzen', rijen: 40, kolommen: [{ naam: 'Maat', soort: 'tekst' }, { naam: 'Prijs', soort: 'getal' }, { naam: '(kolom C)', soort: 'getal' }, { naam: 'X', soort: 'raar' }] }] }]);
  assert.equal(t, 'Bestand 1 (.xlsx)\n- Blad "Prijzen", ca. 40 rijen: Maat (tekst), Prijs (getal), X (tekst); plus 1 kolommen zonder naam');
  assert.ok(!t.includes('Leverancier'));
  assert.equal(lab.BESTANDEN_KOP, r.BESTANDEN_KOP);
  assert.deepEqual(lab.zonderBijlage('Idee' + r.BESTANDEN_KOP + t), { tekst: 'Idee', bijlage: true });
});
