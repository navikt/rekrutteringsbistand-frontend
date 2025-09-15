import { brukerStandardSøkEndepunkt } from './useBrukersStandardsøk';
import { putApi } from '@/app/api/fetcher';

export const setNyttStandardsøk = (søk: string) => {
  return putApi(brukerStandardSøkEndepunkt, { søk });
};
