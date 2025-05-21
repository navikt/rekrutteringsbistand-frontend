import { putApi } from '../../fetcher';
import { mockBaseStilling } from '../rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import { StillingsDataDTO } from '../rekrutteringsbistandstilling/[slug]/stilling.dto';
import { Server } from 'miragejs';

export const oppdaterStillingEndepunkt = '/api/stilling/oppdater-stilling';

export interface StillingBrukerInfo {
  eierNavident?: string;
  eierNavn?: string;
  eierNavKontorEnhetId?: string;
}

export const oppdaterStilling = (
  stillingsData: StillingsDataDTO,
  brukerInfo: StillingBrukerInfo,
) => {
  return putApi(oppdaterStillingEndepunkt, {
    ...stillingsData,
    stillingsinfo: {
      ...stillingsData.stillingsinfo,
      eierNavident: brukerInfo.eierNavident ?? null,
      eierNavn: brukerInfo.eierNavn ?? null,
      eierNavKontorEnhetId: brukerInfo.eierNavKontorEnhetId ?? null,
    },
    stilling: {
      ...stillingsData.stilling,
      administration: {
        ...stillingsData.stilling.administration,
        navIdent: brukerInfo.eierNavident ?? null,
        reportee: brukerInfo.eierNavn ?? null,
      },
    },
  });
};

export const oppdaterStillingMirage = (server: Server) => {
  return server.put(oppdaterStillingEndepunkt, () => mockBaseStilling);
};
