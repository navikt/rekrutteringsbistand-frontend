import { OpprettNyStillingDTO } from './dto';
import { postApi } from '@/app/api/fetcher';
import { mockBaseStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';

const opprettNyStillingEndepunkt = '/api/stilling/ny-stilling';

export const opprettNyStilling = async (stilling: OpprettNyStillingDTO) => {
  return await postApi(opprettNyStillingEndepunkt, stilling);
};

export const opprettNyStillingMirage = (server: any) => {
  return server.post(opprettNyStillingEndepunkt, () => mockBaseStilling);
};
