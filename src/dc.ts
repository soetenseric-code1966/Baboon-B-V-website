// Kleine runtime om de ontwerpcomponenten uit het Design-canvas in React te draaien.
import { useReducer, useRef } from 'react';
import { href } from './routes';

export class DCLogic {
  props: Record<string, unknown>;
  state: Record<string, unknown>;
  _rerender?: () => void;
  constructor(props: Record<string, unknown>) {
    this.props = props;
    this.state = {};
  }
  setState(patch: Record<string, unknown> | ((s: Record<string, unknown>) => Record<string, unknown>)) {
    const p = typeof patch === 'function' ? patch(this.state) : patch;
    this.state = { ...this.state, ...p };
    this._rerender?.();
  }
}

export function useDC(Cls: any, lang: string, signal = '#FF5A1F') {
  const [, force] = useReducer((x: number) => x + 1, 0);
  const ref = useRef<any>(null);
  if (!ref.current) {
    ref.current = new Cls({ signal });
    ref.current._rerender = force;
  }
  const inst = ref.current;
  inst.props = { signal };
  inst.state.lang = lang;
  return inst.renderVals();
}

// CSS-tekst uit het ontwerp → React-stijlobject
const cache = new Map<string, Record<string, string>>();
export function css(s: string | undefined | null) {
  if (!s) return undefined;
  const hit = cache.get(s);
  if (hit) return hit;
  const out: Record<string, string> = {};
  let depth = 0, buf = '';
  const parts: string[] = [];
  for (const ch of s) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ';' && depth === 0) { parts.push(buf); buf = ''; } else buf += ch;
  }
  parts.push(buf);
  for (const part of parts) {
    const i = part.indexOf(':');
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    if (!k || !v) continue;
    const key = k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = v;
  }
  cache.set(s, out);
  return out;
}

// Links uit het ontwerp (Pagina.dc.html#anker) → echte adressen in de huidige taal
let currentLang = 'nl';
export function setLinkLang(l: string) { currentLang = l; }
export function H(v: string | undefined | null) {
  if (!v) return v ?? undefined;
  const m = v.match(/^([A-Za-z]+)\.dc\.html(#.*)?$/);
  if (!m) return v;
  return href(m[1], currentLang, m[2] || '');
}
