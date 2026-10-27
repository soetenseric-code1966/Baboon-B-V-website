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
    url: 'https://aardappelmonitor.netlify.app',
    host: 'aardappelmonitor.netlify.app',
    screen: '/showcase/aardappelmonitor.jpg',
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
    name: { nl: 'Verzekeringsportaal', en: 'Insurance portal' },
    kind: { nl: 'Mockup', en: 'Mockup' },
    stage: { nl: 'klikbaar ontwerp', en: 'clickable design' },
    text: {
      nl: 'Een klikbare mockup voor een tussenpersoon: eerst laten zien en verkopen, daarna pas bouwen.',
      en: 'A clickable mockup for a broker: show and sell first, build later.',
    },
  },
];

export const SHOWCASE_TEXT = {
  nl: { prev: 'Vorig project', next: 'Volgend project', pause: 'Carrousel pauzeren', play: 'Carrousel afspelen', open: 'Bekijk', example: 'voorbeeld' },
  en: { prev: 'Previous project', next: 'Next project', pause: 'Pause carousel', play: 'Play carousel', open: 'Open', example: 'example' },
};

export const SHOWCASE_INTERVAL = 6000; // ms per project
