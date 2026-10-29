// Kant-en-klare apps van Datawerf (tabblad Apps, besluit 29-10-2026).
// Alleen eigen apps van Baboon B.V. `demo` = "Probeer de demo" (fictieve gegevens), `login` = inlog voor klanten
// (ook gebruikt op de pagina Inloggen). Prijs: `gratis`, of een tekst zodra er een prijs is besloten.
type T = { nl: string; en: string };
export type AppItem = {
  key: string;
  name: T;
  kind: T;
  price: T;
  free: boolean;
  text: T;
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
    price: { nl: 'Gratis', en: 'Free' },
    free: true,
    text: {
      nl: 'Elke ochtend het juiste aantal bussen van het juiste type op elke stalling. Het planbord zet de telling van de stallingen tegen de dienstregeling, stelt verplaatsingen voor en volgt bussen bij de onderhoudspartijen. Vlootbeheerder, wagenparkbeheerder, stalling en onderhoudspartij werken elk vanuit hun eigen scherm.',
      en: 'Every morning the right number of buses of the right type at every depot. The planning board sets the depot counts against the timetable, suggests transfers and tracks buses at the maintenance partners. Fleet manager, fleet supervisor, depot and maintenance partner each work from their own screen.',
    },
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
    price: { nl: 'Gratis', en: 'Free' },
    free: true,
    text: {
      nl: 'Na een wielwissel moeten de wielmoeren op tijd worden nagetrokken. De app houdt per bus bij welke natrekopdrachten openstaan en wanneer ze zijn uitgevoerd, en toont dat op het planbord van de dagplanning.',
      en: 'After a wheel change, the wheel nuts must be re-torqued in time. The app tracks per bus which re-torque orders are open and when they were carried out, and shows it on the planning board of the daily planning.',
    },
    points: {
      nl: ['Openstaande natrekopdrachten per bus', 'Status per opdracht: open of uitgevoerd', 'Zichtbaar op het planbord van de dagplanning'],
      en: ['Open re-torque orders per bus', 'Status per order: open or done', 'Visible on the planning board of the daily planning'],
    },
    login: 'https://wielen.datawerf.com/',
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
  nl: { eb: 'Naar uw app', t: 'Al een app van Datawerf?', s: 'Kies uw app en log in met uw eigen gegevens. Later logt u hier één keer in voor al uw apps.' },
  en: { eb: 'To your app', t: 'Already using a Datawerf app?', s: 'Choose your app and log in with your own details. Later you will log in here once for all your apps.' },
};
