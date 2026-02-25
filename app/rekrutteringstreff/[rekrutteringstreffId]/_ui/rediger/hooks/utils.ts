import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';

export const erEditMode = (): boolean => {
  try {
    return (
      typeof window !== 'undefined' &&
      window.location.pathname.includes('/rediger')
    );
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
