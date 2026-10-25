import React from 'react';
import { href, PAGES, PageName, Lang } from './routes';
import { useFooterTexts } from './pages/Global';

const NAV: PageName[] = ['Etalage', 'Global', 'Prijslijst', 'OverOns', 'Contact'];
const NAV_HASH: Partial<Record<PageName, string>> = { Global: '#hoe' };

function Logo({ color, signal, size }: { color: string; signal: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="4 4 56 56" aria-hidden="true">
      <rect x="10" y="8" width="12" height="12" rx="2" fill={color} />
      <rect x="24" y="8" width="12" height="12" rx="2" fill={color} />
      <rect x="10" y="22" width="12" height="12" rx="2" fill={color} />
      <rect x="42" y="22" width="12" height="12" rx="2" fill={color} />
      <rect x="10" y="36" width="12" height="12" rx="2" fill={color} />
      <rect x="42" y="36" width="12" height="12" rx="2" fill={color} opacity="0.35" />
      <rect x="10" y="50" width="12" height="6" rx="2" fill={color} />
      <rect x="24" y="50" width="12" height="6" rx="2" fill={color} />
      <rect x="38" y="8" width="12" height="12" rx="2" fill={signal} />
    </svg>
  );
}

export default function Layout({ page, lang, signal, children }: { page: PageName; lang: Lang; signal: string; children: React.ReactNode }) {
  const f = useFooterTexts(lang);
  const other: Lang = lang === 'nl' ? 'en' : 'nl';
  const footLink = { color: '#C7CEDB', textDecoration: 'none' };
  const footHead: React.CSSProperties = { color: '#FFFFFF', fontSize: 13, fontFamily: "'IBM Plex Mono',monospace" };

  return (
    <div className="dw" style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", color: '#14213D', background: '#FFFFFF', lineHeight: 1.5 }}>
      <a className="skip" href="#inhoud">{lang === 'nl' ? 'Naar de inhoud' : 'Skip to content'}</a>
      <header className="dw-head">
        <a href={href('Global', lang)} className="dw-brand" aria-label="Datawerf – home">
          <Logo color="#14213D" signal={signal} size={34} />
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.8px' }}>Datawerf</span>
        </a>
        <nav aria-label="Menu" className="dw-nav">
          {NAV.map((p, i) => {
            const on = p === page && p !== 'Global';
            return (
              <a key={p} href={href(p, lang, NAV_HASH[p] || '')} aria-current={on ? 'page' : undefined}
                style={{ textDecoration: 'none', color: on ? '#14213D' : '#3A4258', fontWeight: on ? 700 : 400, boxShadow: on ? `inset 0 -2px 0 ${signal}` : undefined }}>
                {f.nav[i]}
              </a>
            );
          })}
        </nav>
        <div className="dw-tools">
          <div role="group" aria-label="Taal / Language" style={{ display: 'flex', border: '1px solid #D5DAE3', borderRadius: 999, padding: 3 }}>
            {(['nl', 'en'] as Lang[]).map((k) => (
              <a key={k} href={k === lang ? PAGES[page][k] : PAGES[page][other]} hrefLang={k} lang={k} aria-current={k === lang ? 'true' : undefined}
                style={{ borderRadius: 999, padding: '6px 12px', font: "600 13px 'Space Grotesk', sans-serif", textDecoration: 'none', background: k === lang ? '#14213D' : 'transparent', color: k === lang ? '#FFFFFF' : '#3A4258' }}>
                {k.toUpperCase()}
              </a>
            ))}
          </div>
          <a href={href('Inloggen', lang)} style={{ fontSize: 15, fontWeight: 600, color: '#14213D', textDecoration: 'none' }}>{f.login}</a>
          <a href={href('Contact', lang)} style={{ padding: '11px 18px', borderRadius: 999, background: '#14213D', color: '#FFFFFF', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>{f.cta}</a>
        </div>
      </header>

      <main id="inhoud">{children}</main>

      <footer style={{ background: '#14213D', color: '#C7CEDB' }}>
        <div className="dw-foot">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#FFFFFF' }}>
              <Logo color="#FFFFFF" signal={signal} size={30} />
              <strong style={{ fontSize: 22, letterSpacing: '-0.6px' }}>Datawerf</strong>
            </span>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: '#FFFFFF' }}>where ideas are built and launched.</span>
            <span style={{ fontSize: 14 }}>Driven by data. Powered by cooperation.</span>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: signal }}>{f.eu}</span>
          </div>
          <nav aria-label="Product" style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <strong style={footHead}>PRODUCT</strong>
            <a href={href('Etalage', lang)} style={footLink}>{f.n1}</a>
            <a href={href('Global', lang, '#hoe')} style={footLink}>{f.n2}</a>
            <a href={href('Prijslijst', lang)} style={footLink}>{f.n3}</a>
            <a href={href('Contact', lang)} style={footLink}>{f.cta}</a>
          </nav>
          <nav aria-label={lang === 'nl' ? 'Bedrijf' : 'Company'} style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <strong style={footHead}>{f.company}</strong>
            <a href={href('OverOns', lang)} style={footLink}>{f.n4}</a>
            <a href={href('Contact', lang)} style={footLink}>{f.n5}</a>
            <a href={href('Inloggen', lang)} style={footLink}>{f.login}</a>
          </nav>
          <nav aria-label={lang === 'nl' ? 'Juridisch' : 'Legal'} style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <strong style={footHead}>{f.legal}</strong>
            <a href={href('Juridisch', lang, '#privacy')} style={footLink}>{f.l1}</a>
            <a href={href('Juridisch', lang, '#voorwaarden')} style={footLink}>{f.l2}</a>
            <a href={href('Juridisch', lang, '#verwerkers')} style={footLink}>{f.l3}</a>
            <a href={href('Juridisch', lang, '#cookies')} style={footLink}>{f.l4}</a>
          </nav>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <strong style={footHead}>CONTACT</strong>
            <a href="mailto:info@datawerf.com" style={footLink}>info@datawerf.com</a>
            <span>Esbeek</span>
          </div>
        </div>
        <div className="dw-foot-bar">
          <span>{f.trade}</span>
          <span style={{ marginLeft: 'auto' }}>datawerf.com · {f.gdpr}</span>
        </div>
      </footer>
    </div>
  );
}
