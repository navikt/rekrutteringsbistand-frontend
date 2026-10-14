// Legges på 401-svar fra våre API-ruter når brukerens token mangler eller er ugyldig.
// Andre 401-svar (f.eks. feilet OBO-veksling eller 401 fra backend) skal ikke gi utløpt-varsel.
export const SESJON_UTLØPT_KODE = 'SESJON_UTLØPT';

export const erSesjonUtløptSvar = (body: unknown) =>
  typeof body === 'object' &&
  body !== null &&
  (body as { kode?: unknown }).kode === SESJON_UTLØPT_KODE;

let erUtløpt = false;
const lyttere = new Set<() => void>();

const varsle = () => lyttere.forEach((lytter) => lytter());

export const markerSesjonUtløpt = () => {
  // Modulstate deles mellom forespørsler på serveren, så vi markerer kun i nettleseren
  if (typeof window === 'undefined' || erUtløpt) {
    return;
  }
  erUtløpt = true;
  varsle();
};

export const abonnerPåSesjonUtløpt = (lytter: () => void) => {
  lyttere.add(lytter);
  return () => {
    lyttere.delete(lytter);
  };
};

export const erSesjonUtløpt = () => erUtløpt;

export const lagInnloggingsUrl = (redirect: string) =>
  `/oauth2/login?${new URLSearchParams({ redirect })}`;
