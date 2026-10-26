// Opgeleverde projecten die live in gebruik zijn en die we mogen tonen.
// Alleen eigen producten of klantprojecten met akkoord van de klant.
export const LIVE = [
  {
    name: 'Qfleetz',
    url: 'https://www.qfleetz.com',
    host: 'qfleetz.com',
    status: 'live',
    kind: { nl: 'Platform · vlootbeheer', en: 'Platform · fleet management' },
    text: {
      nl: 'Fleetmanagementplatform dat facturen voor onderdelen, brandstof, onderhoud en banden omzet in realtime inzicht: wat de vloot kost, en wat het zou moeten kosten.',
      en: 'Fleet management platform that turns invoices for parts, fuel, maintenance and tyres into real-time insight: what the fleet costs, and what it should cost.',
    },
    points: {
      nl: ['Factuurregels automatisch gekoppeld aan voertuigen', 'Controle op prijsafspraken', 'Kosten per kilometer en vergelijking tussen vloten'],
      en: ['Invoice lines matched to vehicles automatically', 'Checks against price agreements', 'Cost per kilometre and benchmarking across fleets'],
    },
  },
  {
    name: 'Qeldr',
    url: 'https://qeldr.nl',
    host: 'qeldr.nl',
    screen: '/showcase/qeldr.jpg',
    status: 'live',
    kind: { nl: 'Business-idee · website en app', en: 'Business idea · website and app' },
    text: {
      nl: 'Een eigen wijnkelder, zonder de kelder. Leden ontdekken met een korte smaaktest wat ze lekker vinden en krijgen elke maand wijn van kleine wijnmakers, thuis bezorgd of bewaard in hun eigen vak in het gewelf. Wij werkten het idee uit tot merk, website en app, om het te toetsen bij de eerste leden.',
      en: 'Your own wine cellar, without the cellar. Members find out what they like with a short taste test and receive wine from small winemakers every month, delivered at home or kept in their own space in the vault. We turned the idea into a brand, website and app, to test it with the first members.',
    },
    points: {
      nl: ['Merk, verhaal en website', 'Klikbare app met smaaktest', 'Wachtlijst voor de eerste leden'],
      en: ['Brand, story and website', 'Clickable app with a taste test', 'Waiting list for the first members'],
    },
  },
  {
    name: 'Urenregistratie',
    title: { nl: 'Urenregistratie voor zzp’ers', en: 'Time tracking for freelancers' },
    url: 'https://uren.datawerf.com',
    host: 'uren.datawerf.com',
    screen: '/showcase/uren.jpg',
    status: 'demo',
    kind: { nl: 'App · urenregistratie', en: 'App · time tracking' },
    text: {
      nl: 'Voor zzp’ers die de hele dag achter de computer werken en hun uren kwijtraken. De app ziet welk programma en bestand openstaat en zet de tijd automatisch op het juiste project; bij twijfel doet hij een voorstel. Eén keer per dag goedkeuren, en de uren staan klaar voor de factuur.',
      en: 'For freelancers who work at a computer all day and lose track of their hours. The app sees which program and file are open and puts the time on the right project automatically; when in doubt it makes a suggestion. Approve once a day and the hours are ready for the invoice.',
    },
    points: {
      nl: ['Tijdlijn van de werkdag per project', 'AI-voorstel als een activiteit niet herkend wordt', 'Goedgekeurde uren direct klaar voor de factuur'],
      en: ['Timeline of the working day per project', 'AI suggestion when an activity is not recognised', 'Approved hours ready for the invoice'],
    },
  },
] as const;

export const LIVE_TEXT = {
  nl: { eb: 'Live in gebruik', t: 'Opgeleverd en in gebruik', s: 'Deze projecten bouwden we en ze draaien echt. Klik door naar de live omgeving of de demo.', open: 'Bekijk live', demo: 'Bekijk de demo' },
  en: { eb: 'Live in use', t: 'Delivered and in use', s: 'We built these projects and they are running for real. Click through to the live site or the demo.', open: 'View live', demo: 'View the demo' },
};

export function liveUrl(name?: string) {
  return LIVE.find((p) => p.name === name)?.url;
}
