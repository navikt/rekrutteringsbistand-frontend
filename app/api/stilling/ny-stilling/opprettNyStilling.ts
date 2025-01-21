import { OpprettNyStillingDTO } from './dto';

import { postApi } from '../../fetcher';
import { stillingMock } from '../rekrutteringsbistandstilling/[slug]/mocks/stillingMock';

const opprettNyStillingEndepunkt = '/api/stilling/ny-stilling';

export const opprettNyStilling = (stilling: OpprettNyStillingDTO) => {
  return postApi(opprettNyStillingEndepunkt, stilling);
};

export const opprettNyStillingMirage = (server: any) => {
  return server.post(opprettNyStillingEndepunkt, () => stillingMock);
};
