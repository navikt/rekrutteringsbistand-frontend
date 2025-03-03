import { postApi } from '../../fetcher';
import { mockBaseStilling } from '../rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import { OpprettNyStillingDTO } from './dto';

const opprettNyStillingEndepunkt = '/api/stilling/ny-stilling';

export const opprettNyStilling = async (stilling: OpprettNyStillingDTO) => {
  return await postApi(opprettNyStillingEndepunkt, stilling);
};

export const opprettNyStillingMirage = (server: any) => {
  return server.post(opprettNyStillingEndepunkt, () => mockBaseStilling);
};
