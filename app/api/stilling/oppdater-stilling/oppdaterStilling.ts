import { putApi } from '../../fetcher';
import { mockBaseStilling } from '../rekrutteringsbistandstilling/[slug]/mocks/stillingMock';

export const oppdaterStillingEndepunkt = '/api/stilling/oppdater-stilling';

export const oppdaterStilling = (stillingData: any) => {
  return putApi(oppdaterStillingEndepunkt, stillingData);
};

export const oppdaterStillingMirage = (server: any) => {
  return server.put(oppdaterStillingEndepunkt, () => mockBaseStilling);
};
