import { ArbeidsgiverDTO as PamArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import type { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { getSessionStorage, setSessionStorage } from '@/util/sessionStorage';

export interface EtterregistreringPrefyllKandidat {
  fnr: string;
  fornavn: string | null;
  etternavn: string | null;
}

export interface EtterregistreringPrefyll {
  stillingsId: string;
  arbeidsgiver: PamArbeidsgiverDTO;
  kandidater: EtterregistreringPrefyllKandidat[];
  /**
   * Forhåndsfylte verdier samlet inn i wizard-modalen som skal settes inn i
   * skjemaet på rediger-siden (yrkestittel, sektor, omfang osv.).
   */
  formVerdier?: Partial<StillingAdminDTO>;
}

const PREFYLL_KEY = 'etterregistrering-prefyll';

export const lagrePrefyll = (prefyll: EtterregistreringPrefyll) => {
  setSessionStorage(PREFYLL_KEY, prefyll);
};

export const hentPrefyll = (
  stillingsId: string,
): EtterregistreringPrefyll | null => {
  const lagret = getSessionStorage(
    PREFYLL_KEY,
  ) as EtterregistreringPrefyll | null;
  if (!lagret || lagret.stillingsId !== stillingsId) return null;
  return lagret;
};

export const fjernPrefyll = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(PREFYLL_KEY);
  }
};
