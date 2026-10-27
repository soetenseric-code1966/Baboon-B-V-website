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
      nl: 'Jouw privé wijnkelder die zichzelf bijvult: een abonnement op kwaliteitswijn naar jouw smaak, elke maand gratis thuisbezorgd. Met smaaktest, een overzicht van al je flessen thuis en in het gewelf, en bieden en inschrijven op wijn. Van idee tot merk, website en app.',
      en: 'Your private wine cellar that refills itself: a subscription to quality wine matched to your taste, delivered free every month. With a taste test, an overview of all your bottles at home and in the vault, and bidding and subscribing to wine. From idea to brand, website and app.',
    },
    points: {
      nl: ['Abonnement met smaaktest en drie smaakprofielen', 'Mijn Qeldr: alle flessen thuis en in het gewelf', 'Bieden en inschrijven op wijn'],
      en: ['Subscription with taste test and three taste profiles', 'My Qeldr: all bottles at home and in the vault', 'Bidding and subscribing to wine'],
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
  {
    name: 'Aardappelmonitor',
    title: { nl: 'Aardappelmonitor', en: 'Potato monitor' },
    url: 'https://aardappelmonitor.datawerf.com',
    host: 'aardappelmonitor.datawerf.com',
    screen: '/showcase/aardappelmonitor.jpg',
    status: 'live',
    kind: { nl: 'Monitor · markt en prijsverwachting', en: 'Monitor · market and price forecast' },
    text: {
      nl: 'Openbare monitor voor de markt van fritesaardappelen in Noordwest-Europa. Prijzen, oogst, handel, weer en gewasconditie uit vele bronnen, elke nacht automatisch bijgewerkt, met een prijsverwachting voor het seizoen. Van losse Excel-lijsten en websites naar één scherm dat een teler of handelaar helpt kiezen wanneer hij verkoopt.',
      en: 'Public monitor for the processing potato market in north-west Europe. Prices, harvest, trade, weather and crop condition from many sources, updated automatically every night, with a price forecast for the season. From scattered spreadsheets and websites to one screen that helps a grower or trader decide when to sell.',
    },
    points: {
      nl: ['Vrije markt en contractprijzen uit NL, BE, DE en FR', 'Weer en neerslagtekort; gewasconditie via satellietbeelden', 'Prijsverwachting per seizoen, getoetst op eerdere jaren', 'Inzicht in het verkoopmoment, met uitleg van begrippen'],
      en: ['Free-market and contract prices from NL, BE, DE and FR', 'Weather and rainfall deficit; crop condition from satellite images', 'Seasonal price forecast, tested against previous years', 'Insight into when to sell, with explanations of terms'],
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
