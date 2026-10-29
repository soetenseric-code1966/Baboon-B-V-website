// Datawerf lab (besluit 29-10-2026): "Start gratis" → idee → direct een eerste ontwerp, 10 prompts per idee.
// De achterkant is de Supabase Edge Function `datawerf-lab` (broncode in supabase/lab/). Hier staan alleen openbare
// gegevens: het adres van de functie en de openbare sleutel van de robotcontrole (Cloudflare Turnstile).
export const LAB_URL = 'https://wmqofgxvwasvjlejxjji.supabase.co/functions/v1/datawerf-lab';
// Openbare site key van Cloudflare Turnstile. Leeg = geen robotcontrole in beeld (de functie controleert alleen als
// TURNSTILE_SECRET is ingesteld).
export const TURNSTILE_SITEKEY = '0x4AAAAAAFrXtRgfM6V-VSEQ';

export type LabPrompt = { nr: number; tekst: string; status: 'bezig' | 'klaar' | 'fout'; samenvatting: string | null; duur_ms: number | null };
export type LabStand = {
  idee: { id: string; titel: string | null; idee: string; taal: 'nl' | 'en'; status: string };
  prompts: LabPrompt[];
  ontwerp: { nr: number; html: string } | null;
  gebruikt: number; max: number; bezig: boolean; waarde: number; minuten: number;
};

// Zelfde kop als BESTANDEN_KOP in supabase/lab/functions/datawerf-lab/regels.ts (test controleert dat).
export const BESTANDEN_KOP = "\n\n[Bijgevoegde bestanden: alleen de opbouw, geen inhoud]\n";
/** Tekst van een idee of vraag zonder het blok met de opbouw van bijgevoegde bestanden. */
export function zonderBijlage(tekst: string): { tekst: string; bijlage: boolean } {
  const i = tekst.indexOf(BESTANDEN_KOP);
  return i < 0 ? { tekst, bijlage: false } : { tekst: tekst.slice(0, i), bijlage: true };
}

export async function labApi<T = unknown>(body: Record<string, unknown>, beheer?: string): Promise<T> {
  const r = await fetch(LAB_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(beheer ? { 'X-Lab-Beheer': beheer } : {}) },
    body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(j?.fout || 'Er ging iets mis. Probeer het zo opnieuw.'), { status: r.status, data: j });
  return j as T;
}

// De ideeën van deze bezoeker, in deze browser (de link zelf is de toegang; de sleutel wordt niet op de server bewaard).
type Bewaard = { id: string; sleutel: string; titel: string; datum: string };
const SLOT = 'dw-lab-ideeen';
export function bewaardeIdeeen(): Bewaard[] {
  try { return JSON.parse(localStorage.getItem(SLOT) || '[]'); } catch { return []; }
}
export function bewaarIdee(b: Bewaard) {
  try {
    const lijst = bewaardeIdeeen().filter((x) => x.id !== b.id);
    localStorage.setItem(SLOT, JSON.stringify([b, ...lijst].slice(0, 20)));
  } catch { /* geen opslag: de link blijft werken */ }
}

export const LAB_TEXT = {
  nl: {
    eb: 'Datawerf lab', h1: 'Start met uw idee', sub: 'Omschrijf wat u wilt laten bouwen en druk op Start. Binnen een paar minuten staat uw eerste klikbare ontwerp klaar, met verzonnen gegevens. Daarna kunt u het tien keer gratis bijsturen.',
    idee: 'Uw idee', ideeHint: 'Bijvoorbeeld: een overzicht van onze bandenkosten per voertuig en per positie, met afwijkingen en uploads van prijslijsten.',
    naam: 'Naam', email: 'Zakelijk e-mailadres', bedrijf: 'Bedrijf (optioneel)', start: 'Start gratis', bezig: 'Bezig…',
    privacy: 'Gebruik geen echte klant- of persoonsgegevens: het ontwerp werkt altijd met verzonnen gegevens. Uw idee wordt niet gebruikt om AI te trainen.',
    tegoed: '10 prompts gratis per idee', geenKosten: 'u betaalt € 0', waarde: 'Waarde',
    maken: 'Uw ontwerp wordt gemaakt. Dit duurt meestal 1 tot 3 minuten; u kunt deze pagina open laten.',
    nauwkeuriger: 'Maak het nauwkeuriger', nauwHint: 'Wat moet er anders? Bijvoorbeeld: voeg kosten per km toe', verstuur: 'Verstuur',
    fout: 'Dit ontwerp is niet gelukt. Het telt niet mee voor uw tegoed.', opnieuw: 'Probeer opnieuw',
    op: 'Uw tien gratis prompts zijn gebruikt.', platformT: 'Start uw platform', platformS: 'Maak er een echte app van, met uw eigen gegevens, inlog en beheer. U betaalt alleen de bouwtijd, een licentie en de gebruikers die inloggen.',
    platformB: 'Start uw platform', platformOk: 'Dank u. We nemen binnen één werkdag contact met u op.',
    link: 'Bewaar deze link: hiermee komt u later terug bij uw idee.', kopieer: 'Kopieer link', gekopieerd: 'Gekopieerd',
    geschiedenis: 'Uw vragen', mijn: 'Uw ideeën in deze browser', geen: 'Er is hier nog geen idee geopend.', nieuw: 'Nieuw idee',
    nietGevonden: 'Dit idee is niet gevonden. Controleer de link.', minuten: 'min werk',
    mailMelding: 'U hoeft niet te wachten: zodra het ontwerp klaar is, mailen we u de link.',
    bestT: 'Bestanden toevoegen (optioneel)', bestS: 'Excel (.xlsx) of CSV, maximaal drie. Uw bestand wordt in uw eigen browser gelezen; alleen de opbouw (bladen en kolomnamen) gaat mee, nooit de inhoud. Het ontwerp gebruikt verzonnen gegevens.',
    bestKies: 'Kies of sleep bestanden', bestRijen: 'rijen', bestKolommen: 'kolommen', bestWeg: 'Verwijder', bestLezen: 'Bestand lezen…', bestFout: 'Kan dit bestand niet lezen', bestMee: 'met bestanden',
    linksT: 'Terug naar uw ideeën', linksS: 'Vul uw e-mailadres in; we mailen u de links naar al uw ideeën in het lab.', linksB: 'Mail mijn links',
  },
  en: {
    eb: 'Datawerf lab', h1: 'Start with your idea', sub: 'Describe what you want built and press Start. Within a few minutes your first clickable design is ready, with made-up data. You can then refine it ten times for free.',
    idee: 'Your idea', ideeHint: 'For example: an overview of our tyre costs per vehicle and per position, with deviations and price list uploads.',
    naam: 'Name', email: 'Business email', bedrijf: 'Company (optional)', start: 'Start free', bezig: 'Working…',
    privacy: 'Do not use real customer or personal data: the design always works with made-up data. Your idea is not used to train AI.',
    tegoed: '10 free prompts per idea', geenKosten: 'you pay € 0', waarde: 'Value',
    maken: 'Your design is being made. This usually takes 1 to 3 minutes; you can keep this page open.',
    nauwkeuriger: 'Make it more precise', nauwHint: 'What should change? For example: add cost per km', verstuur: 'Send',
    fout: 'This design did not work out. It does not count towards your credit.', opnieuw: 'Try again',
    op: 'Your ten free prompts have been used.', platformT: 'Start your platform', platformS: 'Turn it into a real app, with your own data, login and admin. You only pay for build time, a licence and the users who log in.',
    platformB: 'Start your platform', platformOk: 'Thank you. We will contact you within one working day.',
    link: 'Keep this link: it brings you back to your idea later.', kopieer: 'Copy link', gekopieerd: 'Copied',
    geschiedenis: 'Your requests', mijn: 'Your ideas in this browser', geen: 'No idea has been opened here yet.', nieuw: 'New idea',
    nietGevonden: 'This idea was not found. Check the link.', minuten: 'min of work',
    mailMelding: 'No need to wait: as soon as the design is ready, we email you the link.',
    bestT: 'Add files (optional)', bestS: 'Excel (.xlsx) or CSV, up to three. Your file is read in your own browser; only its structure (sheets and column names) is sent, never the contents. The design uses made-up data.',
    bestKies: 'Choose or drop files', bestRijen: 'rows', bestKolommen: 'columns', bestWeg: 'Remove', bestLezen: 'Reading file…', bestFout: 'Cannot read this file', bestMee: 'with files',
    linksT: 'Back to your ideas', linksS: 'Enter your email address; we will email you the links to all your ideas in the lab.', linksB: 'Email my links',
  },
};

// Pagina Lab (tabblad, besluit 29-10-2026): uitleg, voorbeelden, veiligheid en "uw ideeën".
export const LAB_VOORBEELDEN = [
  { naam: 'bandenmonitor', label: { nl: 'Bandenmonitor', en: 'Tyre monitor' }, idee: { nl: 'Bandenkosten per vestiging, voertuig en bandpositie, met afwijkingen, rollen en uploads van prijslijsten.', en: 'Tyre costs per depot, vehicle and tyre position, with deviations, roles and price list uploads.' } },
  { naam: 'werkorders', label: { nl: 'Werkorders per monteur', en: 'Work orders per mechanic' }, idee: { nl: 'Werkorders in de werkplaats per monteur: open, bezig en klaar, met filters en doorzetten.', en: 'Workshop work orders per mechanic: open, in progress and done, with filters and hand-over.' } },
] as const;

export const LAB_INFO = {
  nl: {
    eb: 'Datawerf lab · gratis', h1: 'Zie uw idee werken. Vandaag nog.',
    sub: 'Omschrijf wat u wilt laten bouwen. Binnen een paar minuten klikt u door een eerste ontwerp van uw eigen software, met verzonnen gegevens. Daarna stuurt u het tien keer gratis bij.',
    start: 'Start met uw idee', bekijk: 'Bekijk voorbeelden',
    stappenEb: 'Zo werkt het',
    stappen: [
      { t: 'Omschrijf uw idee', s: 'In gewone taal, zoals u het aan een collega uitlegt. Voeg desgewenst een Excel- of CSV-bestand toe voor de opbouw.' },
      { t: 'Klik door uw ontwerp', s: 'Binnen een paar minuten staat een klikbaar ontwerp klaar, met menu, schermen, filters en voorbeeldgegevens. U krijgt de link ook per mail.' },
      { t: 'Stuur tien keer bij', s: 'Typ wat er anders moet. Elke vraag levert een nieuw ontwerp. U betaalt € 0.' },
      { t: 'Start uw platform', s: 'Goed zo? Dan bouwen we er een echte app van, met uw eigen gegevens, inlog en beheer.' },
    ],
    vbEb: 'Voorbeelden uit het lab', vbH: 'Zo ziet een eerste ontwerp eruit', vbS: 'Echte ontwerpen uit het lab, gemaakt in één prompt. Klik gerust rond: alles is verzonnen en er wordt niets opgeslagen.',
    vbIdee: 'Het idee', vbLaden: 'Ontwerp laden…', vbFout: 'Dit voorbeeld kon niet worden geladen.',
    veiligEb: 'Veilig', veiligH: 'Uw idee blijft van u',
    veilig: [
      { t: 'Alleen verzonnen gegevens', s: 'Het ontwerp gebruikt nooit echte namen, klanten, leveranciers, kentekens of prijzen. Ook niet als u ze noemt.' },
      { t: 'Van uw bestand alleen de opbouw', s: 'Een Excel- of CSV-bestand wordt in uw eigen browser gelezen. Alleen bladnamen en kolomnamen gaan mee, nooit de inhoud.' },
      { t: 'Geen account nodig', s: 'Uw idee staat achter een persoonlijke link. Kwijt? Vul uw e-mailadres in en we mailen u de links.' },
    ],
    mijnH: 'Uw ideeën', slotH: 'Klaar om te beginnen?', slotS: 'Tien prompts gratis per idee. Geen account, geen creditcard.',
  },
  en: {
    eb: 'Datawerf lab · free', h1: 'See your idea work. Today.',
    sub: 'Describe what you want built. Within a few minutes you click through a first design of your own software, with made-up data. Then you refine it ten times for free.',
    start: 'Start with your idea', bekijk: 'See examples',
    stappenEb: 'How it works',
    stappen: [
      { t: 'Describe your idea', s: 'In plain words, as you would explain it to a colleague. Optionally add an Excel or CSV file for the structure.' },
      { t: 'Click through your design', s: 'Within a few minutes a clickable design is ready, with menu, screens, filters and sample data. You also get the link by email.' },
      { t: 'Refine it ten times', s: 'Type what should change. Every request gives a new design. You pay € 0.' },
      { t: 'Start your platform', s: 'Happy with it? We turn it into a real app, with your own data, login and admin.' },
    ],
    vbEb: 'Examples from the lab', vbH: 'What a first design looks like', vbS: 'Real designs from the lab, made in one prompt. Feel free to click around: everything is made up and nothing is saved.',
    vbIdee: 'The idea', vbLaden: 'Loading design…', vbFout: 'This example could not be loaded.',
    veiligEb: 'Safe', veiligH: 'Your idea stays yours',
    veilig: [
      { t: 'Only made-up data', s: 'The design never uses real names, customers, suppliers, number plates or prices. Not even if you mention them.' },
      { t: 'Only the structure of your file', s: 'An Excel or CSV file is read in your own browser. Only sheet and column names are sent, never the contents.' },
      { t: 'No account needed', s: 'Your idea sits behind a personal link. Lost it? Enter your email address and we email you the links.' },
    ],
    mijnH: 'Your ideas', slotH: 'Ready to start?', slotS: 'Ten free prompts per idea. No account, no credit card.',
  },
};

/** Klein formulier: e-mailadres → links naar alle ideeën per mail (inloggen zonder account). */
export async function vraagLinks(email: string, taal: 'nl' | 'en'): Promise<string> {
  const r = await labApi<{ melding: string }>({ actie: 'links', email, taal });
  return r.melding;
}
