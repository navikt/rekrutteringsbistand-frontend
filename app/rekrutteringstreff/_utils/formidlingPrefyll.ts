import { ArbeidsgiverDTO as PamArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import type { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { getSessionStorage, setSessionStorage } from '@/util/sessionStorage';

export interface FormidlingPrefyllKandidat {
  fnr: string;
  fornavn: string | null;
  etternavn: string | null;
}

export interface FormidlingPrefyll {
  stillingsId: string;
  arbeidsgiver: PamArbeidsgiverDTO;
  kandidater: FormidlingPrefyllKandidat[];
  /**
   * Forhåndsfylte verdier samlet inn i wizard-modalen som skal settes inn i
   * skjemaet på rediger-siden (yrkestittel, sektor, omfang osv.).
   */
  formVerdier?: Partial<StillingAdminDTO>;
}

const PREFYLL_KEY = 'formidling-prefyll';

export const lagrePrefyll = (prefyll: FormidlingPrefyll) => {
  setSessionStorage(PREFYLL_KEY, prefyll);
};

export const hentPrefyll = (stillingsId: string): FormidlingPrefyll | null => {
  const lagret = getSessionStorage(PREFYLL_KEY) as FormidlingPrefyll | null;
  if (!lagret || lagret.stillingsId !== stillingsId) return null;
  return lagret;
};

export const fjernPrefyll = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(PREFYLL_KEY);
  }
};
