import { putApi } from '../../fetcher';
import { stillingMock } from '../rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import { StillingsDataDTO } from '../rekrutteringsbistandstilling/[slug]/stilling.dto';

const opprettNyStillingEndepunkt = '/api/stilling/oppdater-stilling';

export const oppdaterStilling = (stillingData: StillingsDataDTO) => {
  return putApi(opprettNyStillingEndepunkt, stillingData);
};

export const oppdaterStillingMirage = (server: any) => {
  return server.put(opprettNyStillingEndepunkt, () => stillingMock);
};
