// Alle pagina's en hun adressen per taal.
export type Lang = 'nl' | 'en';

export const PAGES = {
  Global: { nl: '/', en: '/en/' },
  Etalage: { nl: '/wat-we-bouwen/', en: '/en/what-we-build/' },
  Prijslijst: { nl: '/prijzen/', en: '/en/pricing/' },
  OverOns: { nl: '/over-ons/', en: '/en/about/' },
  Contact: { nl: '/contact/', en: '/en/contact/' },
  Juridisch: { nl: '/juridisch/', en: '/en/legal/' },
  Inloggen: { nl: '/inloggen/', en: '/en/login/' },
} as const;

export type PageName = keyof typeof PAGES;

// Pagina's uit het ontwerp die nog niet bestaan, wijzen naar een bestaande pagina.
const ALIAS: Record<string, PageName> = {
  Aanmelden: 'Contact', // "Start gratis": het lab is nog niet live
  Start: 'Contact',
  Contract: 'Contact',
  Main: 'Contact', // "Demo openen": demo's op aanvraag zolang het portaal niet live is
};

export function href(name: string, lang: string, hash = '') {
  const page = (PAGES as Record<string, { nl: string; en: string }>)[name] ? (name as PageName) : ALIAS[name] || 'Global';
  return PAGES[page][lang === 'en' ? 'en' : 'nl'] + hash;
}

export function findPage(pathname: string): { page: PageName; lang: Lang } {
  const p = pathname.endsWith('/') ? pathname : pathname + '/';
  for (const [name, paths] of Object.entries(PAGES)) {
    if (paths.nl === p) return { page: name as PageName, lang: 'nl' };
    if (paths.en === p) return { page: name as PageName, lang: 'en' };
  }
  return { page: 'Global', lang: p.startsWith('/en/') ? 'en' : 'nl' };
}

export const TITLES: Record<PageName, { nl: string; en: string }> = {
  Global: { nl: 'Datawerf – Uw vakkennis. Draaiend als software.', en: 'Datawerf – Your know-how. Running as software.' },
  Etalage: { nl: 'Wat we bouwen – Datawerf', en: 'What we build – Datawerf' },
  Prijslijst: { nl: 'Prijzen – Datawerf', en: 'Pricing – Datawerf' },
  OverOns: { nl: 'Over ons – Datawerf', en: 'About – Datawerf' },
  Contact: { nl: 'Contact – Datawerf', en: 'Contact – Datawerf' },
  Juridisch: { nl: 'Juridisch – Datawerf', en: 'Legal – Datawerf' },
  Inloggen: { nl: 'Inloggen – Datawerf', en: 'Log in – Datawerf' },
};

export const DESCRIPTION = {
  nl: 'Datawerf bouwt uw idee als software: uw praktische branchekennis plus onze AI-kennis, platform en developers. Nederlandse regie, data in Europa, één factuur per maand.',
  en: 'Datawerf builds your idea as software: your hands-on industry knowledge plus our AI expertise, platform and developers. Dutch-led, data in Europe, one invoice per month.',
};
