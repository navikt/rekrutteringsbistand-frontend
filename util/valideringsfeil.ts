import { RekbisError } from '@/util/rekbisError';

export { erValideringsfeil } from '@/util/rekbisError';

/**
 * Feilkoder rekrutteringstreff-api returnerer med 422 (KiValideringsException)
 * når en tekst ikke kan lagres fordi KI-valideringen mangler eller ikke stemmer.
 */
const KI_FEILMELDINGER: Record<string, string> = {
  KI_VALIDERING_MANGLER:
    'Teksten må sjekkes med KI før den kan lagres. Trykk «Sjekk og lagre».',
  KI_TEKST_ENDRET:
    'Teksten er endret etter KI-sjekken. Sjekk teksten på nytt før du lagrer.',
  KI_KREVER_BEKREFTELSE:
    'KI-sjekken fant mulige brudd på retningslinjene. Bekreft med «Lagre likevel» eller endre teksten.',
  KI_LOGG_ID_UGYLDIG:
    'KI-sjekken av teksten er ikke gyldig. Sjekk teksten på nytt før du lagrer.',
  KI_FEIL_FELT_TYPE:
    'KI-sjekken av teksten er ikke gyldig. Sjekk teksten på nytt før du lagrer.',
  KI_FEIL_TREFF:
    'KI-sjekken av teksten er ikke gyldig. Sjekk teksten på nytt før du lagrer.',
};

export const STANDARD_VALIDERINGSFEILMELDING =
  'Endringene ble avvist fordi noe i skjemaet ikke er gyldig. Kontroller feltene og prøv igjen.';

const VALIDERINGSFEILMELDINGER = new Set([
  ...Object.values(KI_FEILMELDINGER),
  STANDARD_VALIDERINGSFEILMELDING,
]);

const tilObjekt = (detaljer: unknown): Record<string, unknown> | null => {
  if (typeof detaljer === 'object' && detaljer !== null) {
    return detaljer as Record<string, unknown>;
  }
  if (typeof detaljer === 'string') {
    try {
      const parsed = JSON.parse(detaljer);
      return typeof parsed === 'object' && parsed !== null ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
};

export const hentBackendFeilkode = (detaljer: unknown): string | undefined => {
  const feilkode = tilObjekt(detaljer)?.feilkode;
  return typeof feilkode === 'string' ? feilkode : undefined;
};

/** Lager en brukervennlig melding for 422-svar basert på feilkoden fra backend. */
export const lagValideringsfeilmelding = (detaljer: unknown): string => {
  const feilkode = hentBackendFeilkode(detaljer);
  return (
    (feilkode && KI_FEILMELDINGER[feilkode]) || STANDARD_VALIDERINGSFEILMELDING
  );
};

export const erValideringsfeilmelding = (
  melding: string | null | undefined,
): melding is string => !!melding && VALIDERINGSFEILMELDINGER.has(melding);

/** Henter brukermeldingen fra en (eventuelt innpakket) 422-feil. */
export const hentValideringsfeilmelding = (
  error: unknown,
): string | undefined => {
  if (!(error instanceof RekbisError)) return undefined;
  if (error.statuskode === 422) return error.message;
  return hentValideringsfeilmelding(error.originalError);
};
