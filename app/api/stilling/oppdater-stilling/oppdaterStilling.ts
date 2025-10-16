import { putApi } from '@/app/api/fetcher';
import { mockBaseStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { normaliserPropertiesTilStrenger } from '@/app/stilling/_util/normaliserStillingProperties';
import { http, HttpResponse } from 'msw';

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
  // Sentral normalisering (Map<String,String> backend-kontrakt)
  const sanitizedProperties = normaliserPropertiesTilStrenger(
    stillingsData.stilling?.properties as Record<string, unknown> | undefined,
  );

  let body = {
    ...stillingsData,
    stilling: {
      ...stillingsData.stilling,
      // Overstyr properties med normaliserte verdier hvis de finnes
      ...(sanitizedProperties ? { properties: sanitizedProperties } : {}),
      administration: {
        ...stillingsData.stilling.administration,
        navIdent: brukerInfo.eierNavident ?? null,
        reportee: brukerInfo.eierNavn ?? null,
      },
    },
  };

  if (stillingsData.stillingsinfo) {
    body = {
      ...body,
      stillingsinfo: {
        ...stillingsData.stillingsinfo,
        eierNavident: brukerInfo.eierNavident ?? null,
        eierNavn: brukerInfo.eierNavn ?? null,
        eierNavKontorEnhetId: brukerInfo.eierNavKontorEnhetId ?? null,
      },
    };
  }

  return putApi(oppdaterStillingEndepunkt, body);
};

export const oppdaterStillingMSWHandler = http.put(
  oppdaterStillingEndepunkt,
  async () => HttpResponse.json(mockBaseStilling),
);
