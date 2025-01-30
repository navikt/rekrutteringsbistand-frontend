import { putApi } from '../../fetcher';
import { brukerStandardSøkEndepunkt } from './useBrukersStandardsøk';

export const setNyttStandardsøk = (søk: string) => {
  return putApi(brukerStandardSøkEndepunkt, { søk });
};
