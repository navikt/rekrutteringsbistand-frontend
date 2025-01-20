import { putApi } from '../../fetcher';
import { stillingMock } from '../rekrutteringsbistandstilling/[slug]/mocks/stillingMock';

const opprettNyStillingEndepunkt = '/api/stilling/oppdater-stilling';

export const oppdaterStilling = async (stillingData: any) => {
  return await putApi(opprettNyStillingEndepunkt, stillingData);
};

export const oppdaterStillingMirage = (server: any) => {
  return server.put(opprettNyStillingEndepunkt, () => stillingMock);
};
