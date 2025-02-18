import { putApi } from '../../fetcher';
import { mockBaseStilling } from '../rekrutteringsbistandstilling/[slug]/mocks/stillingMock';

export const opprettNyStillingEndepunkt = '/api/stilling/oppdater-stilling';

export const oppdaterStilling = (stillingData: any) => {
  return putApi(opprettNyStillingEndepunkt, stillingData);
};

export const oppdaterStillingMirage = (server: any) => {
  return server.put(opprettNyStillingEndepunkt, () => mockBaseStilling);
};
