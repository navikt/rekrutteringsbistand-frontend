import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';

export const erEditMode = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'edit') {
      return true;
    }

    return window.location.pathname.includes('/rediger');
  } catch {
    return false;
  }
};

export const erPublisert = (status: RekrutteringstreffStatusType): boolean => {
  return (
    status === RekrutteringstreffStatus.PUBLISERT ||
    status === RekrutteringstreffStatus.FULLFØRT
  );
};

export const skalHindreAutosave = (status?: RekrutteringstreffStatusType) => {
  if (!status) return false;
  return erPublisert(status) && erEditMode();
};

export const skalStanseAutosavePgaKi = (
  overstyrKiFeil: boolean,
  endrerFelt: boolean,
  kiFeil: boolean,
  kiSjekket: boolean,
): boolean => {
  if (overstyrKiFeil) return false;
  if (!endrerFelt) return false;
  return !kiSjekket || kiFeil;
};
