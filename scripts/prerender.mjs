// Maakt per pagina en per taal een statische HTML-pagina (goed voor Google).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, PAGES, TITLES, DESCRIPTION } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const SITE = 'https://datawerf.com';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const urls = [];
// Persoonlijke labpagina's en beheer horen niet in Google.
const NIET_IN_SITEMAP = ['Lab', 'LabBeheer'];
for (const [page, paths] of Object.entries(PAGES)) {
  for (const lang of ['nl', 'en']) {
    const alt = [
      `<link rel="canonical" href="${SITE}${paths[lang]}">`,
      `<link rel="alternate" hreflang="nl" href="${SITE}${paths.nl}">`,
      `<link rel="alternate" hreflang="en" href="${SITE}${paths.en}">`,
      `<link rel="alternate" hreflang="x-default" href="${SITE}${paths.nl}">`,
    ].join('\n');
    const html = template
      .replace('%LANG%', lang)
      .replaceAll('%TITLE%', esc(TITLES[page][lang]))
      .replaceAll('%DESC%', esc(DESCRIPTION[lang]))
      .replace('%ALT%', alt)
      .replace('<!--app-->', render(page, lang));
    const file = path.join(dist, paths[lang], 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
    if (!NIET_IN_SITEMAP.includes(page)) urls.push(SITE + paths[lang]);
    console.log('pagina', paths[lang]);
  }
}

// 404-pagina: de homepage in het Nederlands
fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /lab/\nDisallow: /en/lab/\nSitemap: ${SITE}/sitemap.xml\n`);
fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true });
