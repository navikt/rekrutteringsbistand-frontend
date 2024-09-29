import { putApi } from '../../fetcher';
import { stillingMock } from '../rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import { stillingsDTO } from '../rekrutteringsbistandstilling/[slug]/zod';

const opprettNyStillingEndepunkt = '/api/stilling/ny-stilling';

export const oppdaterStilling = (stillingData: stillingsDTO) => {
  return putApi(opprettNyStillingEndepunkt, stillingData);
};

export const oppdaterStillingMirage = (server: any) => {
  return server.put(opprettNyStillingEndepunkt, () => stillingMock);
};
