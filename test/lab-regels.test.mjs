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
