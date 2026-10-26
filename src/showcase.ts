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
    stage: { nl: 'idee → merk, website en app', en: 'idea → brand, website and app' },
    text: {
      nl: 'Een eigen wijnkelder, zonder de kelder. Leden ontdekken met een korte smaaktest wat ze lekker vinden; elke maand komt er wijn van kleine wijnmakers bij, thuis bezorgd of bewaard in een eigen vak in het gewelf. Van idee tot merk, verhaal, website en app met smaaktest en wachtlijst, om het te toetsen bij de eerste leden.',
      en: 'Your own wine cellar, without the cellar. Members find out what they like with a short taste test; every month new wine from small winemakers is added, delivered at home or kept in their own space in the vault. From idea to brand, story, website and an app with a taste test and waiting list, to test it with the first members.',
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
    stage: { nl: 'live', en: 'live' },
    text: {
      nl: 'Prijzen, oogst, weer en gewasconditie in Noordwest-Europa, met een prijsvoorspelling op basis van data.',
      en: 'Prices, harvest, weather and crop condition in north-west Europe, with a data-driven price forecast.',
    },
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
