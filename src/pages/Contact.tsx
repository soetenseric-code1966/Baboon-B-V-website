// @ts-nocheck
// Gegenereerd uit het Design-canvas (Contact.dc.html) door scripts/convert-design.mjs.
import React from 'react';
import { DCLogic, css, H, useDC } from '../dc';


const TXT = {"nl": {"eb": "Contact", "h1": "Even sparren over uw idee?", "sub": "Stuur ons een bericht of plan direct een kennismaking van 30 minuten. Wij reageren binnen één werkdag.", "topicL": "Waar gaat het over?", "topics": ["Kennismaking", "Vraag over prijzen", "Bestaand platform", "Website op aanvraag", "Iets anders"], "name": "Naam", "company": "Bedrijf", "email": "Zakelijk e-mailadres", "phone": "Telefoon (optioneel)", "msg": "Uw bericht", "send": "Verstuur bericht", "priv": "Wij gebruiken uw gegevens alleen om op uw bericht te reageren. Zie de privacyverklaring.", "mt_eb": "Kennismaking", "mt_t": "30 minuten, vrijblijvend", "mt_s": "We bespreken uw idee, laten zien wat er al bestaat en leggen uit hoe de prijs voor u werkt.", "mt_b": "Kies een moment", "cust": "Al klant? Een storing of vraag over uw platform meldt u het snelst op uw eigen bouwplaats.", "cust_b": "Inloggen", "_f": {"nav": ["Wat we bouwen", "Hoe het werkt", "Prijzen", "Over ons", "Contact"], "login": "Inloggen", "cta": "Start gratis", "eu": "Nederlandse regie · data in Europa", "company": "BEDRIJF", "legal": "JURIDISCH", "n1": "Wat we bouwen", "n2": "Hoe het werkt", "n3": "Prijzen", "n4": "Over ons", "n5": "Contact", "l1": "Privacyverklaring", "l2": "Algemene voorwaarden", "l3": "Verwerkersovereenkomst", "l4": "Cookies", "trade": "Datawerf is een handelsnaam van Baboon B.V.", "gdpr": "Data in Europa · AVG-conform"}}, "en": {"eb": "Contact", "h1": "Want to talk through your idea?", "sub": "Send us a message or book a 30-minute introduction right away. We reply within one working day.", "topicL": "What is it about?", "topics": ["Introduction", "Pricing question", "Existing platform", "Website on request", "Something else"], "name": "Name", "company": "Company", "email": "Business email", "phone": "Phone (optional)", "msg": "Your message", "send": "Send message", "priv": "We only use your details to reply to your message. See the privacy statement.", "mt_eb": "Introduction", "mt_t": "30 minutes, no strings attached", "mt_s": "We discuss your idea, show what already exists and explain how pricing works for you.", "mt_b": "Pick a time", "cust": "Already a customer? Report an incident or question about your platform fastest on your own build site.", "cust_b": "Log in", "_f": {"nav": ["What we build", "How it works", "Pricing", "About", "Contact"], "login": "Log in", "cta": "Start free", "eu": "Dutch-led · data in Europe", "company": "COMPANY", "legal": "LEGAL", "n1": "What we build", "n2": "How it works", "n3": "Pricing", "n4": "About", "n5": "Contact", "l1": "Privacy statement", "l2": "Terms and conditions", "l3": "Data processing agreement", "l4": "Cookies", "trade": "Datawerf is a trade name of Baboon B.V.", "gdpr": "Data in Europe · GDPR compliant"}}};
const NAVH = ["Etalage.dc.html", "Global.dc.html#hoe", "Prijslijst.dc.html", "OverOns.dc.html", "Contact.dc.html"];
class Component extends DCLogic {
  constructor(props) { super(props); this.state = { lang: 'nl', f: 0, i: 0, t: 0 }; }
  renderVals() {
    const signal = this.props.signal ?? '#FF5A1F';
    const L = this.state.lang; const t = TXT[L]; const f = t._f;
    const langs = ['nl', 'en'].map((k) => { const on = k === L; return { label: k.toUpperCase(), on: on ? 'true' : 'false', pick: () => this.setState({ lang: k }), style: 'border:0;border-radius:999px;padding:6px 12px;font:600 13px Space Grotesk, sans-serif;cursor:pointer;' + (on ? 'background:#14213D;color:#FFFFFF' : 'background:transparent;color:#3A4258') }; });
    const navs = f.nav.map((label, k) => ({ label, href: NAVH[k], style: 'text-decoration:none;' + (NAVH[k] === 'Contact.dc.html' ? 'color:#14213D;font-weight:700;box-shadow:inset 0 -2px 0 ' + signal : 'color:#3A4258') }));
    const out = { signal, t, f, langs, navs };
    out.topics = t.topics.map((label, i) => { const on = i === this.state.t; return { label, on: on ? 'true' : 'false', pick: () => this.setState({ t: i }), style: 'min-height:42px;padding:0 16px;border-radius:999px;font-family:inherit;font-weight:600;cursor:pointer;' + (on ? 'background:#14213D;color:#FFFFFF;border:2px solid #14213D' : 'background:#FFFFFF;color:#14213D;border:2px solid #D5DAE3') }; });
    return out;
  }
}

export default function Page({ lang, signal }) {
  const $v = useDC(Component, lang, signal);
  const sendMail = (e) => {
    e.preventDefault();
    const v = Array.from(e.currentTarget.querySelectorAll('input,textarea')).map((x) => x.value.trim());
    const topic = ($v?.topics || []).find((x) => x.on === 'true')?.label || '';
    const L = lang === 'en'
      ? ['Name', 'Company', 'Email', 'Phone', 'Message']
      : ['Naam', 'Bedrijf', 'E-mail', 'Telefoon', 'Bericht'];
    const body = L.map((k, i) => (i === 4 ? '\n' + v[i] : k + ': ' + (v[i] || '-'))).join('\n');
    window.location.href = 'mailto:info@datawerf.com?subject=' + encodeURIComponent('Datawerf – ' + topic) + '&body=' + encodeURIComponent(body);
  };
  return (
    <>
<div style={css("font-family:'Space Grotesk',system-ui,sans-serif;color:#14213D;background:#FFFFFF;line-height:1.5")}>
<section style={css("padding:80px 48px 64px")}><div style={css(`font-family:'IBM Plex Mono',monospace;font-size:13px;color:${$v?.signal ?? ""};font-weight:600;letter-spacing:0.5px;text-transform:uppercase`)}>{$v?.t?.eb}</div><h1 style={css("margin:16px 0 0;font-size:64px;line-height:1;letter-spacing:-2.4px;font-weight:700;max-width:980px")}>{$v?.t?.h1}</h1><p style={css("margin:16px 0 0;font-size:19px;line-height:1.55;color:#3A4258;max-width:780px;font-size:20px")}>{$v?.t?.sub}</p></section>
<section style={css("padding:0 48px 88px;display:grid;grid-template-columns:repeat(auto-fit,minmax(460px,1fr));gap:28px;align-items:start")}>
<form onSubmit={sendMail} style={css("border:1px solid #D5DAE3;border-radius:20px;padding:24px;padding:32px;display:flex;flex-direction:column;gap:18px")}>
<div style={css("display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:600")}>{$v?.t?.topicL}<div role="radiogroup" style={css("display:flex;flex-wrap:wrap;gap:8px")}>{($v?.topics || []).map((x, x__i) => <React.Fragment key={x__i}><button type="button" role="radio" aria-checked={x?.on} onClick={x?.pick} style={css(x?.style)}>{x?.label}</button></React.Fragment>)}</div></div>
<div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px")}>
<label style={css("display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:600")}>{$v?.t?.name}<input type="text" style={css("min-height:48px;border:1.5px solid #D5DAE3;border-radius:12px;padding:0 14px;font-weight:400;background:#FAFBFC")} /></label><label style={css("display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:600")}>{$v?.t?.company}<input type="text" style={css("min-height:48px;border:1.5px solid #D5DAE3;border-radius:12px;padding:0 14px;font-weight:400;background:#FAFBFC")} /></label>
<label style={css("display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:600")}>{$v?.t?.email}<input type="email" required autoComplete="email" style={css("min-height:48px;border:1.5px solid #D5DAE3;border-radius:12px;padding:0 14px;font-weight:400;background:#FAFBFC")} /></label><label style={css("display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:600")}>{$v?.t?.phone}<input type="tel" style={css("min-height:48px;border:1.5px solid #D5DAE3;border-radius:12px;padding:0 14px;font-weight:400;background:#FAFBFC")} /></label>
</div>
<label style={css("display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:600")}>{$v?.t?.msg}<textarea rows="5" style={css("border:1.5px solid #D5DAE3;border-radius:12px;padding:12px 14px;font-weight:400;background:#FAFBFC;resize:vertical")}></textarea></label>
<button type="submit" style={css(`align-self:flex-start;min-height:52px;padding:0 28px;border:0;border-radius:999px;background:${$v?.signal ?? ""};color:#FFFFFF;font-weight:700;font-size:16px;cursor:pointer`)}>{$v?.t?.send}</button>
<p style={css("margin:0;font-size:13px;color:#5C6378")}><a href={H("Juridisch.dc.html#privacy")} style={css("color:#5C6378")}>{$v?.t?.priv}</a></p>
</form>
<aside style={css("display:flex;flex-direction:column;gap:16px")}>
<div style={css("background:#14213D;color:#FFFFFF;border-radius:20px;padding:28px")}><div style={css(`font-family:'IBM Plex Mono',monospace;font-size:13px;color:${$v?.signal ?? ""};font-weight:600;letter-spacing:0.5px;text-transform:uppercase`)}>{$v?.t?.mt_eb}</div><div style={css("font-size:26px;font-weight:700;margin-top:8px")}>{$v?.t?.mt_t}</div><p style={css("margin:8px 0 18px;color:#C7CEDB;font-size:16px;line-height:1.5")}>{$v?.t?.mt_s}</p><a href={"mailto:info@datawerf.com?subject=" + encodeURIComponent(lang === "en" ? "Datawerf – introduction" : "Datawerf – kennismaking")} style={css(`display:inline-block;padding:14px 24px;border-radius:999px;background:${$v?.signal ?? ""};color:#FFFFFF;font-weight:700;text-decoration:none`)}>{$v?.t?.mt_b} →</a></div>
<div style={css("border:1px solid #D5DAE3;border-radius:20px;padding:24px;display:flex;flex-direction:column;gap:6px;font-size:16px")}><span style={css("display:inline-flex;align-items:center;gap:8px;color:#14213D")}><svg width="30" height="30" viewBox="4 4 56 56" aria-hidden="true"><rect x="10" y="8" width="12" height="12" rx="2" fill="#14213D"></rect><rect x="24" y="8" width="12" height="12" rx="2" fill="#14213D"></rect><rect x="10" y="22" width="12" height="12" rx="2" fill="#14213D"></rect><rect x="42" y="22" width="12" height="12" rx="2" fill="#14213D"></rect><rect x="10" y="36" width="12" height="12" rx="2" fill="#14213D"></rect><rect x="42" y="36" width="12" height="12" rx="2" fill="#14213D" opacity="0.35"></rect><rect x="10" y="50" width="12" height="6" rx="2" fill="#14213D"></rect><rect x="24" y="50" width="12" height="6" rx="2" fill="#14213D"></rect><rect x="38" y="8" width="12" height="12" rx="2" fill={$v?.signal}></rect></svg><strong style={css("font-size:24px;letter-spacing:-0.6px")}>Datawerf</strong></span><span style={css("color:#5C6378;font-size:14px")}>{$v?.f?.trade}</span><span>info@datawerf.com</span><span>Esbeek</span><span style={css("color:#5C6378;font-size:14px")}>KvK 70420874</span></div>
<div style={css("background:#F7F8FA;border-radius:20px;padding:22px;font-size:15px;line-height:1.5;color:#3A4258")}>{$v?.t?.cust} <a href={H("Inloggen.dc.html")} style={css("font-weight:700;color:#14213D")}>{$v?.t?.cust_b} →</a></div>
</aside>
</section>
</div>
    </>
  );
}

export function useFooterTexts(lang) { return TXT[lang]?._f; }
