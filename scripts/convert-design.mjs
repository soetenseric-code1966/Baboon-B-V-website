// Zet de ontwerppagina's (.dc.html uit het Design-canvas) om naar React-componenten.
// Gebruik: node scripts/convert-design.mjs <map-met-dc.html> <uitvoermap>
import fs from 'node:fs';
import path from 'node:path';
import { parseDocument } from 'htmlparser2';

const [, , SRC, OUT] = process.argv;
const PAGES = ['Global', 'Etalage', 'Prijslijst', 'OverOns', 'Contact', 'Juridisch', 'Inloggen'];

// Plaatshouders uit het ontwerp vervangen door echte of neutrale tekst.
const REPLACE = [
  ['[E-MAILADRES]', 'info@datawerf.com'],
  ['<span>[TELEFOONNUMMER]</span>', ''],
  ['KvK [KVK-NUMMER]', 'KvK 70420874'],
  ['Chamber of Commerce [KVK-NUMMER]', 'Chamber of Commerce 70420874'],
  ['Zolang u klant bent; aanmeldingen zonder vervolg na [TERMIJN] verwijderd.', 'Zolang u klant bent. De termijn voor aanmeldingen zonder vervolg volgt in de volledige privacyverklaring.'],
  ['As long as you are a customer; sign-ups without follow-up deleted after [TERM].', 'As long as you are a customer. The period for sign-ups without follow-up will be set out in the full privacy statement.'],
  ['[NOG UIT TE WERKEN]', 'Wordt uitgewerkt in de volledige algemene voorwaarden.'],
  ['[TO BE WORKED OUT]', 'Set out in the full terms and conditions.'],
  ['Melding binnen [TERMIJN] na ontdekking.', 'Melding zonder onnodige vertraging na ontdekking.'],
  ['Notification within [TERM] of discovery.', 'Notification without undue delay after discovery.'],
  ['Concept: deze teksten laten toetsen door een jurist voordat de site live gaat.', 'Samenvatting in gewone taal. De volledige teksten volgen.'],
  ['Draft: have these texts reviewed by a lawyer before the site goes live.', 'Summary in plain language. The full texts will follow.'],
  ['datawerf.com · datawerf.nl · ', 'datawerf.com · '],
  ['Vul uw zakelijke e-mailadres in. U ontvangt een inloglink, zonder wachtwoord.', 'Hier logt u straks in op uw eigen bouwplaats.'],
  ['Enter your business email. You will receive a login link, no password needed.', 'This is where you will log in to your own build site.'],
];

// Aanpassingen per pagina na het omzetten (het ontwerp is een mockup; dit maakt het werkend).
const NOTICE = {
  nl: 'Het klantportaal opent binnenkort. Al klant of een vraag over uw platform? Mail ons, dan helpen wij u direct.',
  en: 'The customer portal opens soon. Already a customer or a question about your platform? Email us and we will help you right away.',
};
const PATCH = {
  Contact: {
    extra: `
  const sendMail = (e) => {
    e.preventDefault();
    const v = Array.from(e.currentTarget.querySelectorAll('input,textarea')).map((x) => x.value.trim());
    const topic = ($v?.topics || []).find((x) => x.on === 'true')?.label || '';
    const L = lang === 'en'
      ? ['Name', 'Company', 'Email', 'Phone', 'Message']
      : ['Naam', 'Bedrijf', 'E-mail', 'Telefoon', 'Bericht'];
    const body = L.map((k, i) => (i === 4 ? '\\n' + v[i] : k + ': ' + (v[i] || '-'))).join('\\n');
    window.location.href = 'mailto:info@datawerf.com?subject=' + encodeURIComponent('Datawerf – ' + topic) + '&body=' + encodeURIComponent(body);
  };`,
    edits: [
      ['<form style=', '<form onSubmit={sendMail} style='],
      ['<input type="email"', '<input type="email" required autoComplete="email"'],
      ['<button type="button" style={css(`align-self:flex-start', '<button type="submit" style={css(`align-self:flex-start'],
      ['href={H("#")}', 'href={"mailto:info@datawerf.com?subject=" + encodeURIComponent(lang === "en" ? "Datawerf – introduction" : "Datawerf – kennismaking")}'],
    ],
  },
  Inloggen: {
    edits: [
      [/<label [^\n]*?\{\$v\?\.t\?\.email\}[\s\S]*?<\/details>/, `<p style={css("margin:0;font-size:17px;line-height:1.55;color:#3A4258")}>{lang === 'en' ? ${JSON.stringify(NOTICE.en)} : ${JSON.stringify(NOTICE.nl)}}</p>
<a href="mailto:info@datawerf.com" style={css("display:flex;align-items:center;justify-content:center;min-height:52px;border-radius:999px;background:#14213D;color:#FFFFFF;font-weight:700;text-decoration:none")}>info@datawerf.com</a>`],
    ],
  },
};

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const ATTR = { class: 'className', for: 'htmlFor', tabindex: 'tabIndex', onclick: 'onClick', readonly: 'readOnly', maxlength: 'maxLength', autocomplete: 'autoComplete', viewbox: 'viewBox', colspan: 'colSpan', rowspan: 'rowSpan' };
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function cut(html, open, close) {
  // Verwijdert het eerste element dat begint met `open` tot en met `close` (niet genest).
  const a = html.indexOf(open);
  if (a < 0) return html;
  const b = html.indexOf(close, a);
  return html.slice(0, a) + html.slice(b + close.length);
}

function convert(name) {
  let raw = fs.readFileSync(path.join(SRC, `${name}.dc.html`), 'utf8');
  for (const [a, b] of REPLACE) raw = raw.split(a).join(b);
  let markup = raw.slice(raw.indexOf('<x-dc>') + 6, raw.indexOf('</x-dc>'));
  markup = cut(markup, '<helmet>', '</helmet>');
  markup = cut(markup, '<header', '</header>');
  markup = cut(markup, '<footer', '</footer>');
  markup = markup.replace(/<div style="background:#FFF4EE;border-bottom:1px solid #FFD9C7[^"]*">[^<]*<\/div>/, '');
  const script = raw.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];

  const doc = parseDocument(markup, { lowerCaseAttributeNames: false, recognizeSelfClosing: true, decodeEntities: false });
  const loopVars = new Set();

  const expr = (e) => {
    e = e.trim();
    const parts = e.split('.');
    if (loopVars.has(parts[0])) return parts.join('?.');
    return ['$v', ...parts].join('?.');
  };
  const interp = (s) => {
    // Gemengde tekst met {{...}} → template literal
    const out = s.replace(/`/g, '\\`').replace(/\$\{/g, '\\${').replace(/\{\{(.*?)\}\}/g, (_, x) => '${' + expr(x) + ' ?? ""}');
    return '`' + out + '`';
  };
  const attrValue = (k, v) => {
    if (v === '' || v == null) return '{true}';
    const only = v.match(/^\{\{(.*?)\}\}$/);
    if (k === 'style') return `{css(${only ? expr(only[1]) : v.includes('{{') ? interp(v) : JSON.stringify(v)})}`;
    if (k === 'href') return `{H(${only ? expr(only[1]) : v.includes('{{') ? interp(v) : JSON.stringify(v)})}`;
    if (only) return `{${expr(only[1])}}`;
    if (v.includes('{{')) return `{${interp(v)}}`;
    return JSON.stringify(v);
  };

  const emit = (node) => {
    if (node.type === 'text') {
      const s = node.data;
      if (!s.trim()) return s.includes('\n') ? '\n' : ' ';
      return s.split(/(\{\{.*?\}\})/).map((p) => {
        const m = p.match(/^\{\{(.*?)\}\}$/);
        if (m) return `{${expr(m[1])}}`;
        if (/[{}<>]/.test(p)) return `{${JSON.stringify(p)}}`;
        return p;
      }).join('');
    }
    if (node.type === 'comment') return '';
    if (node.type !== 'tag' && node.type !== 'script' && node.type !== 'style') return '';
    const tag = node.name;
    if (tag === 'sc-for') {
      const list = node.attribs.list.match(/\{\{(.*?)\}\}/)[1];
      const as = node.attribs.as;
      const listExpr = expr(list);
      loopVars.add(as);
      const inner = node.children.map(emit).join('');
      loopVars.delete(as);
      return `{(${listExpr} || []).map((${as}, ${as}__i) => <React.Fragment key={${as}__i}>${inner}</React.Fragment>)}`;
    }
    if (tag === 'sc-if') {
      const val = node.attribs.value.match(/\{\{(.*?)\}\}/)[1];
      return `{${expr(val)} ? <>${node.children.map(emit).join('')}</> : null}`;
    }
    const attrs = Object.entries(node.attribs || {})
      .filter(([k]) => !k.startsWith('hint-'))
      .map(([k, v]) => {
        let key = ATTR[k] || k;
        if (key.includes('-') && !key.startsWith('aria-') && !key.startsWith('data-')) key = camel(key);
        if (tag === 'input' && key === 'value') key = 'defaultValue';
        if (tag === 'input' && key === 'checked') key = 'defaultChecked';
        return `${key}=${attrValue(k, v)}`;
      }).join(' ');
    const open = `<${tag}${attrs ? ' ' + attrs : ''}`;
    if (VOID.has(tag)) return `${open} />`;
    return `${open}>${node.children.map(emit).join('')}</${tag}>`;
  };

  let jsx = doc.children.map(emit).join('').trim();
  const patch = PATCH[name] || {};
  for (const [a, b] of patch.edits || []) {
    const before = jsx;
    jsx = typeof a === 'string' ? jsx.split(a).join(b) : jsx.replace(a, b);
    if (before === jsx) throw new Error(`${name}: aanpassing vond niets: ${a}`);
  }
  const code = `// @ts-nocheck
// Gegenereerd uit het Design-canvas (${name}.dc.html) door scripts/convert-design.mjs.
import React from 'react';
import { DCLogic, css, H, useDC } from '../dc';

${script.trim()}

export default function Page({ lang, signal }) {
  const $v = useDC(Component, lang, signal);${patch.extra || ''}
  return (
    <>
${jsx}
    </>
  );
}

export function useFooterTexts(lang) { return ${raw.includes('const FTXT') ? 'FTXT[lang]' : 'TXT[lang]?._f'}; }
`;
  fs.writeFileSync(path.join(OUT, `${name}.tsx`), code);
  console.log('omgezet', name);
}

fs.mkdirSync(OUT, { recursive: true });
for (const p of PAGES) convert(p);
