// @ts-nocheck
// Gegenereerd uit het Design-canvas (Inloggen.dc.html) door scripts/convert-design.mjs.
import React from 'react';
import { DCLogic, css, H, useDC } from '../dc';

const TXT = {"nl": {"eb": "Inloggen", "h1": "Naar uw bouwplaats", "sub": "Hier logt u straks in op uw eigen bouwplaats.", "steps": ["E-mailadres invullen", "Op de link in uw mail klikken", "U bent op uw bouwplaats"], "email": "Zakelijk e-mailadres", "send": "Stuur mij een inloglink", "pw_s": "Liever met wachtwoord", "pw": "Wachtwoord", "pw_b": "Inloggen", "nw_eb": "Nog geen bouwplaats", "nw_t": "Start gratis met uw idee", "nw_s": "Omschrijf uw idee en druk op Enter: uw eerste ontwerp staat direct klaar. Daarna logt u steeds in met een link per e-mail.", "nw_b": "Start gratis", "dm_eb": "Demo", "dm_t": "Eerst rondkijken?", "dm_b": "Open een demo met verzonnen gegevens", "_f": {"nav": ["Wat we bouwen", "Hoe het werkt", "Prijzen", "Over ons", "Contact"], "login": "Inloggen", "cta": "Start gratis", "eu": "Nederlandse regie · data in Europa", "company": "BEDRIJF", "legal": "JURIDISCH", "n1": "Wat we bouwen", "n2": "Hoe het werkt", "n3": "Prijzen", "n4": "Over ons", "n5": "Contact", "l1": "Privacyverklaring", "l2": "Algemene voorwaarden", "l3": "Verwerkersovereenkomst", "l4": "Cookies", "trade": "Datawerf is een handelsnaam van Baboon B.V.", "gdpr": "Data in Europa · AVG-conform"}}, "en": {"eb": "Log in", "h1": "To your build site", "sub": "This is where you will log in to your own build site.", "steps": ["Enter your email", "Click the link in your mail", "You are on your build site"], "email": "Business email", "send": "Send me a login link", "pw_s": "Prefer a password", "pw": "Password", "pw_b": "Log in", "nw_eb": "No build site yet", "nw_t": "Start free with your idea", "nw_s": "Describe your idea and press Enter: your first design is ready right away. After that you log in with a link by email.", "nw_b": "Start free", "dm_eb": "Demo", "dm_t": "Look around first?", "dm_b": "Open a demo with made-up data", "_f": {"nav": ["What we build", "How it works", "Pricing", "About", "Contact"], "login": "Log in", "cta": "Start free", "eu": "Dutch-led · data in Europe", "company": "COMPANY", "legal": "LEGAL", "n1": "What we build", "n2": "How it works", "n3": "Pricing", "n4": "About", "n5": "Contact", "l1": "Privacy statement", "l2": "Terms and conditions", "l3": "Data processing agreement", "l4": "Cookies", "trade": "Datawerf is a trade name of Baboon B.V.", "gdpr": "Data in Europe · GDPR compliant"}}};
const NAVH = ["Etalage.dc.html", "Global.dc.html#hoe", "Prijslijst.dc.html", "OverOns.dc.html", "Contact.dc.html"];
class Component extends DCLogic {
  constructor(props) { super(props); this.state = { lang: 'nl', f: 0, i: 0, t: 0 }; }
  renderVals() {
    const signal = this.props.signal ?? '#FF5A1F';
    const L = this.state.lang; const t = TXT[L]; const f = t._f;
    const langs = ['nl', 'en'].map((k) => { const on = k === L; return { label: k.toUpperCase(), on: on ? 'true' : 'false', pick: () => this.setState({ lang: k }), style: 'border:0;border-radius:999px;padding:6px 12px;font:600 13px Space Grotesk, sans-serif;cursor:pointer;' + (on ? 'background:#14213D;color:#FFFFFF' : 'background:transparent;color:#3A4258') }; });
    const navs = f.nav.map((label, k) => ({ label, href: NAVH[k], style: 'text-decoration:none;' + (NAVH[k] === '' ? 'color:#14213D;font-weight:700;box-shadow:inset 0 -2px 0 ' + signal : 'color:#3A4258') }));
    const out = { signal, t, f, langs, navs };
    out.steps = t.steps.map((s, i) => ({ n: String(i + 1), t: s }));
    return out;
  }
}

export default function Page({ lang, signal }) {
  const $v = useDC(Component, lang, signal);
  return (
    <>
<div style={css("font-family:'Space Grotesk',system-ui,sans-serif;color:#14213D;background:#FFFFFF;line-height:1.5")}>
<section style={css("padding:80px 48px 64px")}><div style={css(`font-family:'IBM Plex Mono',monospace;font-size:13px;color:${$v?.signal ?? ""};font-weight:600;letter-spacing:0.5px;text-transform:uppercase`)}>{$v?.t?.eb}</div><h1 style={css("margin:16px 0 0;font-size:64px;line-height:1;letter-spacing:-2.4px;font-weight:700;max-width:980px")}>{$v?.t?.h1}</h1><p style={css("margin:16px 0 0;font-size:19px;line-height:1.55;color:#3A4258;max-width:780px;font-size:20px")}>{$v?.t?.sub}</p></section>
<section style={css("padding:0 48px 88px;display:grid;grid-template-columns:repeat(auto-fit,minmax(440px,1fr));gap:24px;align-items:stretch")}>
<div style={css("border:1px solid #D5DAE3;border-radius:20px;padding:24px;padding:32px;display:flex;flex-direction:column;gap:16px")}>
<div style={css("display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px")}>{($v?.steps || []).map((s, s__i) => <React.Fragment key={s__i}><div style={css("background:#F7F8FA;border-radius:14px;padding:14px;font-size:14px")}><div style={css(`font-family:'IBM Plex Mono',monospace;font-weight:600;color:${$v?.signal ?? ""}`)}>{s?.n}</div>{s?.t}</div></React.Fragment>)}</div>
<p style={css("margin:0;font-size:17px;line-height:1.55;color:#3A4258")}>{lang === 'en' ? "The customer portal opens soon. Already a customer or a question about your platform? Email us and we will help you right away." : "Het klantportaal opent binnenkort. Al klant of een vraag over uw platform? Mail ons, dan helpen wij u direct."}</p>
<a href="mailto:info@datawerf.com" style={css("display:flex;align-items:center;justify-content:center;min-height:52px;border-radius:999px;background:#14213D;color:#FFFFFF;font-weight:700;text-decoration:none")}>info@datawerf.com</a>
</div>
<div style={css("display:flex;flex-direction:column;gap:16px")}>
<div style={css("flex:1;background:#14213D;color:#FFFFFF;border-radius:20px;padding:32px;display:flex;flex-direction:column;gap:10px")}><div style={css(`font-family:'IBM Plex Mono',monospace;font-size:13px;color:${$v?.signal ?? ""};font-weight:600;letter-spacing:0.5px;text-transform:uppercase`)}>{$v?.t?.nw_eb}</div><div style={css("font-size:30px;font-weight:700;letter-spacing:-0.8px")}>{$v?.t?.nw_t}</div><p style={css("margin:0;color:#C7CEDB;font-size:16px;line-height:1.5")}>{$v?.t?.nw_s}</p><a href={H("Aanmelden.dc.html")} style={css(`margin-top:auto;align-self:flex-start;padding:14px 26px;border-radius:999px;background:${$v?.signal ?? ""};color:#FFFFFF;font-weight:700;text-decoration:none`)}>{$v?.t?.nw_b} →</a></div>
<div style={css("background:#F7F8FA;border-radius:20px;padding:26px")}><div style={css("font-family:'IBM Plex Mono',monospace;font-size:13px;color:#5C6378;font-weight:600;letter-spacing:0.5px;text-transform:uppercase")}>{$v?.t?.dm_eb}</div><div style={css("font-size:22px;font-weight:700;margin-top:6px")}>{$v?.t?.dm_t}</div><a href={H("Etalage.dc.html")} style={css("display:inline-block;margin-top:10px;font-weight:700;color:#14213D")}>{$v?.t?.dm_b} →</a></div>
</div>
</section>
</div>
    </>
  );
}

export function useFooterTexts(lang) { return TXT[lang]?._f; }
