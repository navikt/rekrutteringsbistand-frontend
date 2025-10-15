import { AktivtSteg } from '@/app/rekrutteringstreff/_types/constants';
import { getActiveStepFromHendelser } from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';

export const erEditMode = (): boolean => {
  try {
    return (
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('mode') === 'edit'
    );
  } catch {
    return false;
  }
};

export const erPublisert = (treff: any): boolean => {
  const step = getActiveStepFromHendelser(treff?.hendelser);
  return step === AktivtSteg.INVITERE || step === AktivtSteg.FULLFØRE;
};

export const skalHindreAutosave = (treff: any): boolean => {
  return erPublisert(treff) && erEditMode();
};
