// Kant-en-klare apps van Datawerf (tabblad Apps, besluit 29-10-2026).
// Alleen eigen apps van Baboon B.V. `demo` = "Probeer de demo" (fictieve gegevens), `login` = inlog voor klanten
// (ook gebruikt op de pagina Inloggen). Prijs: een tekst ("Op aanvraag" tot er een prijs is besloten). Niets is gratis (besluit 01-11-2026).
type T = { nl: string; en: string };
export type AppItem = {
  key: string;
  name: T;
  kind: T;
  price: T;
  free: boolean;
  text: T;
  /** Eén regel voor de tegel op Inloggen. */
  short: T;
  points: { nl: string[]; en: string[] };
  screen?: string;
  demo?: string;
  login?: string;
  soon?: boolean;
};

export const APPS: AppItem[] = [
  {
    key: 'dagplanning',
    name: { nl: 'Dagplanning wagenpark', en: 'Daily fleet planning' },
    kind: { nl: 'Busvervoer · vlootbeheer', en: 'Bus operations · fleet management' },
    price: { nl: 'Op aanvraag', en: 'On request' },
    free: false,
    text: {
      nl: 'Elke ochtend het juiste aantal bussen van het juiste type op elke stalling. Het planbord zet de telling van de stallingen tegen de dienstregeling, stelt verplaatsingen voor en volgt bussen bij de onderhoudspartijen. Vlootbeheerder, wagenparkbeheerder, stalling en onderhoudspartij werken elk vanuit hun eigen scherm.',
      en: 'Every morning the right number of buses of the right type at every depot. The planning board sets the depot counts against the timetable, suggests transfers and tracks buses at the maintenance partners. Fleet manager, fleet supervisor, depot and maintenance partner each work from their own screen.',
    },
    short: { nl: 'Elke ochtend de juiste bussen op elke stalling: telling, planbord en verplaatsingen.', en: 'The right buses at every depot each morning: count, planning board and transfers.' },
    points: {
      nl: ['Planbord per stalling: nodig volgens dienstregeling tegenover inzetbaar', 'Voorstel voor verplaatsingen; met één klik een opdracht geven', 'Onderhoud volgen per partij: wacht, gestart, gereed', 'Werkt samen met Wielen natrekken'],
      en: ['Planning board per depot: needed by timetable versus available', 'Suggested transfers; issue the order in one click', 'Maintenance tracked per partner: waiting, started, ready', 'Works together with Wheel re-torquing'],
    },
    screen: '/showcase/dagplanning.jpg',
    demo: 'https://dagplanning.datawerf.com/dagplanning/demo',
    login: 'https://dagplanning.datawerf.com/dagplanning/login',
  },
  {
    key: 'wielen',
    name: { nl: 'Wielen natrekken', en: 'Wheel re-torquing' },
    kind: { nl: 'Busvervoer · veiligheid', en: 'Bus operations · safety' },
    price: { nl: 'Op aanvraag', en: 'On request' },
    free: false,
    text: {
      nl: 'Na een wielwissel moeten de wielmoeren op tijd worden nagetrokken. De app houdt per bus bij welke natrekopdrachten openstaan en wanneer ze zijn uitgevoerd, en toont dat op het planbord van de dagplanning.',
      en: 'After a wheel change, the wheel nuts must be re-torqued in time. The app tracks per bus which re-torque orders are open and when they were carried out, and shows it on the planning board of the daily planning.',
    },
    short: { nl: 'Natrekopdrachten per bus geven en op de telefoon afmelden, met logboek.', en: 'Issue re-torque orders per bus and sign them off on the phone, with a log.' },
    points: {
      nl: ['Openstaande natrekopdrachten per bus', 'Status per opdracht: open of uitgevoerd', 'Zichtbaar op het planbord van de dagplanning'],
      en: ['Open re-torque orders per bus', 'Status per order: open or done', 'Visible on the planning board of the daily planning'],
    },
    login: 'https://wielen.datawerf.com/',
  },
  {
    key: 'qtyrez',
    name: { nl: 'Qtyrez bandenmonitor', en: 'Qtyrez tyre monitor' },
    kind: { nl: 'Vervoer · banden en kosten', en: 'Transport · tyres and costs' },
    price: { nl: 'Op aanvraag', en: 'On request' },
    free: false,
    text: {
      nl: 'Wat kosten uw banden echt, per voertuig, vestiging en bandpositie? Qtyrez leest de facturen van de bandenleverancier, de km-standen en het budget, en rekent de kosten per km en per mm profiel uit. Zo ziet u welke band het voordeligst is en waar iets afwijkt.',
      en: 'What do your tyres really cost, per vehicle, depot and tyre position? Qtyrez reads the tyre supplier’s invoices, the odometer readings and the budget, and calculates the cost per km and per mm of tread. So you see which tyre is the most economical and where something is off.',
    },
    short: { nl: 'Bandkosten per km en per mm profiel, afwijkingen en vervangplanning.', en: 'Tyre cost per km and per mm of tread, anomalies and replacement planning.' },
    points: {
      nl: ['Kosten per km en per mm, per merk, maat, positie en voertuig', 'Afwijkingen: te vroeg vervangen, prijs boven prijslijst, ongelijke slijtage', 'Budget tegen werkelijk, vervangplanning en prognose', 'Facturen, km-standen en budget uploaden vanuit Excel; export naar Excel'],
      en: ['Cost per km and per mm, by brand, size, position and vehicle', 'Anomalies: replaced too early, price above price list, uneven wear', 'Budget versus actual, replacement planning and forecast', 'Upload invoices, odometer readings and budget from Excel; export to Excel'],
    },
    screen: '/showcase/qtyrez.jpg',
    demo: 'https://qtyrez.datawerf.com/demo',
    login: 'https://qtyrez.datawerf.com/',
  },
  {
    key: 'uren',
    name: { nl: 'Urenregistratie voor zzp’ers', en: 'Time tracking for freelancers' },
    kind: { nl: 'Zzp · uren en facturen', en: 'Freelance · hours and invoices' },
    price: { nl: 'Binnenkort', en: 'Coming soon' },
    free: false,
    soon: true,
    text: {
      nl: 'Voor zzp’ers die de hele dag achter de computer werken. De app ziet welk programma en bestand openstaat en zet de tijd automatisch op het juiste project. Eén keer per dag goedkeuren, en de uren staan klaar voor de factuur.',
      en: 'For freelancers who work at a computer all day. The app sees which program and file are open and puts the time on the right project automatically. Approve once a day and the hours are ready for the invoice.',
    },
    short: { nl: 'Automatische urenregistratie voor zzp’ers, klaar voor de factuur.', en: 'Automatic time tracking for freelancers, ready for the invoice.' },
    points: {
      nl: ['Tijdlijn van de werkdag per project', 'AI-voorstel als een activiteit niet herkend wordt', 'Goedgekeurde uren direct klaar voor de factuur'],
      en: ['Timeline of the working day per project', 'AI suggestion when an activity is not recognised', 'Approved hours ready for the invoice'],
    },
    screen: '/showcase/uren.jpg',
    demo: 'https://uren.datawerf.com',
  },
];

export const APPS_TEXT = {
  nl: {
    eb: 'Apps', h1: 'Kant-en-klare apps. Direct aan de slag.',
    sub: 'Apps die we zelf bouwden en die u direct kunt gebruiken. Probeer de demo met voorbeeldgegevens, zonder account. Past het niet precies? Dan bouwen we het op maat.',
    demo: 'Probeer de demo', ask: 'Vraag aan', list: 'Zet mij op de lijst', login: 'Inloggen',
    demoNote: 'Demo met fictieve gegevens, elke nacht teruggezet.',
    moreEb: 'Al klant?', moreT: 'Log in op uw app', moreS: 'Gebruikt u al een app van Datawerf? Via Inloggen komt u direct bij uw app.',
    endT: 'Een app op maat?', endS: 'Wij bouwen uw idee als software: uw vakkennis plus onze AI-kennis, platform en developers.', endB: 'Bekijk wat we bouwen',
  },
  en: {
    eb: 'Apps', h1: 'Ready-made apps. Start right away.',
    sub: 'Apps we built ourselves that you can use right away. Try the demo with sample data, no account needed. Not quite the right fit? We will build it to measure.',
    demo: 'Try the demo', ask: 'Request', list: 'Put me on the list', login: 'Log in',
    demoNote: 'Demo with fictitious data, reset every night.',
    moreEb: 'Already a customer?', moreT: 'Log in to your app', moreS: 'Already using a Datawerf app? Log in takes you straight to your app.',
    endT: 'An app built to measure?', endS: 'We build your idea as software: your know-how plus our AI expertise, platform and developers.', endB: 'See what we build',
  },
};

export const LOGIN_APPS_TEXT = {
  nl: {
    eb: 'Inloggen', h1: 'Inloggen.|Kies uw app.', sub: 'Log direct in op uw app, of probeer eerst de demo met verzonnen gegevens.',
    login: 'Inloggen', demo: 'Demo', soon: 'Binnenkort', list: 'Zet mij op de lijst',
    portalEb: 'Klantportaal', portalT: 'Eén inlog voor al uw apps en uw eigen bouwplaats',
    portalS: 'Het klantportaal opent binnenkort. Al klant of een vraag? Mail ons, dan helpen wij u direct.',
    newT: 'Een eigen app laten bouwen?', newB: 'Start gratis met uw idee',
  },
  en: {
    eb: 'Log in', h1: 'Log in.|Choose your app.', sub: 'Log in to your app straight away, or try the demo with made-up data first.',
    login: 'Log in', demo: 'Demo', soon: 'Coming soon', list: 'Put me on the list',
    portalEb: 'Customer portal', portalT: 'One login for all your apps and your own build site',
    portalS: 'The customer portal opens soon. Already a customer or a question? Email us and we will help you right away.',
    newT: 'Want your own app built?', newB: 'Start free with your idea',
  },
};
