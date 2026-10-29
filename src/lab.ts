// Datawerf lab (besluit 29-10-2026): "Start gratis" → idee → direct een eerste ontwerp, 10 prompts per idee.
// De achterkant is de Supabase Edge Function `datawerf-lab` (broncode in supabase/lab/). Hier staan alleen openbare
// gegevens: het adres van de functie en de openbare sleutel van de robotcontrole (Cloudflare Turnstile).
export const LAB_URL = 'https://wmqofgxvwasvjlejxjji.supabase.co/functions/v1/datawerf-lab';
// Openbare site key van Cloudflare Turnstile. Leeg = geen robotcontrole in beeld (de functie controleert alleen als
// TURNSTILE_SECRET is ingesteld).
export const TURNSTILE_SITEKEY = '';

export type LabPrompt = { nr: number; tekst: string; status: 'bezig' | 'klaar' | 'fout'; samenvatting: string | null; duur_ms: number | null };
export type LabStand = {
  idee: { id: string; titel: string | null; idee: string; taal: 'nl' | 'en'; status: string };
  prompts: LabPrompt[];
  ontwerp: { nr: number; html: string } | null;
  gebruikt: number; max: number; bezig: boolean; waarde: number; minuten: number;
};

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
  },
};
