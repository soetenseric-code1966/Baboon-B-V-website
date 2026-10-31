// Carrousel "Wat we bouwen" op de homepage.
// `url` = waar je heen gaat als je op het scherm klikt; `screen` = schermafbeelding in public/showcase/.
// Zonder url of screen toont de carrousel een neutraal voorbeeldscherm.
type T = { nl: string; en: string };
export type ShowcaseItem = {
  name: T;
  kind: T;
  stage: T;
  text: T;
  url?: string;
  host?: string;
  screen?: string;
  // Getekende animatie (30-10-2026): video in plaats van de schermafbeelding; `screen` is dan de poster.
  video?: string;
  // Hoe lang dit project in beeld blijft (ms); standaard SHOWCASE_INTERVAL. Bij een video: de lengte van de video.
  duur?: number;
};

export const SHOWCASE: ShowcaseItem[] = [
  {
    name: { nl: 'Urenregistratie voor zzp’ers', en: 'Time tracking for freelancers' },
    kind: { nl: 'App', en: 'App' },
    stage: { nl: 'demo', en: 'demo' },
    text: {
      nl: 'Voor zzp’ers die de hele dag achter de computer werken en aan het eind van de week niet meer weten waar hun uren zijn gebleven. De app ziet welk programma en welk bestand openstaat en zet de tijd automatisch op het juiste project. Herkent hij iets niet, dan doet hij een voorstel. Eén keer per dag goedkeuren, en de uren staan klaar voor de factuur.',
      en: 'For freelancers who work at a computer all day and lose track of their hours by the end of the week. The app sees which program and file are open and puts the time on the right project automatically. When it does not recognise something, it makes a suggestion. Approve once a day and the hours are ready for the invoice.',
    },
    url: 'https://uren.datawerf.com',
    host: 'uren.datawerf.com',
    screen: '/showcase/uren.jpg',
  },
  {
    name: { nl: 'Qeldr', en: 'Qeldr' },
    kind: { nl: 'Business-idee', en: 'Business idea' },
    stage: { nl: 'live · website en app', en: 'live · website and app' },
    text: {
      nl: 'Jouw privé wijnkelder die zichzelf bijvult. Een abonnement op kwaliteitswijn naar jouw smaak: met een korte smaaktest kies je je profiel en elke maand komt er bijzondere wijn bij die je niet in de supermarkt vindt, gratis thuisbezorgd. In Mijn Qeldr zie je al je flessen, thuis of in het gewelf, en je kunt bieden en inschrijven op wijn. Van idee tot merk, website en app.',
      en: 'Your private wine cellar that refills itself. A subscription to quality wine matched to your taste: a short taste test sets your profile and every month special wine you will not find in the supermarket is added, delivered free. In My Qeldr you see all your bottles, at home or in the vault, and you can bid and subscribe to wine. From idea to brand, website and app.',
    },
    url: 'https://qeldr.nl',
    host: 'qeldr.nl',
    screen: '/showcase/qeldr.jpg',
  },
  {
    name: { nl: 'Dagplanning wagenpark', en: 'Daily fleet planning' },
    kind: { nl: 'Platform', en: 'Platform' },
    stage: { nl: 'demo', en: 'demo' },
    text: {
      nl: 'Het planbord voor busvervoer: per stalling ziet de vlootbeheerder hoeveel bussen van elk type de dienstregeling vraagt en hoeveel er inzetbaar staan. De tellingen van de stallingen komen erbij, het systeem stelt verplaatsingen voor en houdt bij welke bussen bij welke onderhoudspartij staan. In de demo logt u in als vlootbeheerder, wagenparkbeheerder, stalling of onderhoudspartij.',
      en: 'The planning board for bus operations: per depot the fleet manager sees how many buses of each type the timetable needs and how many are available. Depot counts come in, the system suggests transfers and keeps track of which buses are at which maintenance partner. In the demo you log in as fleet manager, fleet supervisor, depot or maintenance partner.',
    },
    url: 'https://dagplanning.datawerf.com/dagplanning/demo',
    host: 'dagplanning.datawerf.com',
    screen: '/showcase/dagplanning.jpg',
  },
  {
    name: { nl: 'Qfleetz', en: 'Qfleetz' },
    kind: { nl: 'Platform', en: 'Platform' },
    stage: { nl: 'live', en: 'live' },
    text: {
      nl: 'Fleetmanagement uit de eigen facturen: wat de vloot kost, en wat het zou moeten kosten.',
      en: 'Fleet management from your own invoices: what the fleet costs, and what it should cost.',
    },
    url: 'https://www.qfleetz.com',
    host: 'qfleetz.com',
  },
  {
    name: { nl: 'Aardappelmonitor', en: 'Potato monitor' },
    kind: { nl: 'Monitor', en: 'Monitor' },
    stage: { nl: 'live · openbaar', en: 'live · public' },
    text: {
      nl: 'Alles over de markt voor fritesaardappelen in Noordwest-Europa op één scherm: vrije-marktprijzen uit Nederland, België, Duitsland en Frankrijk, contractprijzen, oogst, handel, weer en gewasconditie via satellietbeelden. Elke nacht worden de bronnen automatisch bijgewerkt, en een rekenmodel geeft een prijsverwachting voor het seizoen, getoetst op eerdere jaren. Zo kiest een teler of handelaar zijn verkoopmoment op basis van data in plaats van gevoel; indicatief, geen advies.',
      en: 'Everything about the market for processing potatoes in north-west Europe on one screen: free-market prices from the Netherlands, Belgium, Germany and France, contract prices, harvest, trade, weather and crop condition from satellite images. The sources update automatically every night, and a model gives a price forecast for the season, tested against previous years. Growers and traders choose their moment to sell on data instead of gut feeling; indicative, not advice.',
    },
    url: 'https://aardappelmonitor.datawerf.com',
    host: 'aardappelmonitor.datawerf.com',
    screen: '/video/aardappelmonitor.jpg',
    video: '/video/aardappelmonitor.mp4', // getekende animatie (31-10-2026), voorbeeldcijfers
    duur: 40000,
  },
  {
    name: { nl: 'Bidderz', en: 'Bidderz' },
    kind: { nl: 'Platform', en: 'Platform' },
    stage: { nl: 'live · in ontwikkeling', en: 'live · in development' },
    text: {
      nl: 'Aanbod van gebruikte bedrijfsvoertuigen verzameld en ingedeeld, met marktanalyse en waardebepaling.',
      en: 'Used commercial vehicle listings collected and classified, with market analysis and valuation.',
    },
  },
  {
    // Vervangt de mockup "Verzekeringsportaal" (besluit 30-10-2026). Getekende animatie met verzonnen gegevens.
    name: { nl: 'Verzekerings- en schadeportaal', en: 'Insurance and claims portal' },
    kind: { nl: 'Platform', en: 'Platform' },
    stage: { nl: 'verzekeraar · assurantiekantoor · wagenpark', en: 'insurer · broker · fleet' },
    text: {
      nl: 'Schade melden met de mobiele telefoon: de chauffeur of vlootmanager kiest het voertuig, geeft de plek van de schade aan en de melding staat direct klaar. Voor de verzekeraar of het assurantiekantoor wordt elke melding een schadedossier, van beoordeling door de vlootmanager tot gemeld, in behandeling bij de expert, goedgekeurd, uitgekeerd en gereed. Elke statuswijziging zet een taak klaar voor de partij die aan zet is. Het beheer ziet in één oogopslag de openstaande schades, geschatte en uitgekeerde kosten, het eigen risico en de doorlooptijd van melding tot gereed.',
      en: 'Report damage with a mobile phone: the driver or fleet manager picks the vehicle, marks the damaged area and the report is ready right away. For the insurer or broker every report becomes a claim file, from review by the fleet manager to reported, with the assessor, approved, paid and closed. Every status change creates a task for whoever is next. Management sees open claims, estimated and paid costs, the deductible and the lead time from report to closure at a glance.',
    },
    url: 'https://www.qfleetz.nl',
    host: 'qfleetz.nl',
    screen: '/video/schadeportaal.jpg',
    video: '/video/schadeportaal.mp4',
    duur: 33000,
  },
];

export const SHOWCASE_TEXT = {
  nl: { prev: 'Vorig project', next: 'Volgend project', pause: 'Carrousel pauzeren', play: 'Carrousel afspelen', open: 'Bekijk', example: 'voorbeeld' },
  en: { prev: 'Previous project', next: 'Next project', pause: 'Pause carousel', play: 'Play carousel', open: 'Open', example: 'example' },
};

export const SHOWCASE_INTERVAL = 6000; // ms per project
