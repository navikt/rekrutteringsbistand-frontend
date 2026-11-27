import { putApi } from '@/app/api/fetcher';
import { mockBaseStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import {
  StillingMutasjonResponsSchema,
  StillingsDataDTO,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { normaliserPropertiesTilStrenger } from '@/app/stilling/_util/normaliserStillingProperties';
import { putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const oppdaterStillingEndepunkt = '/api/stilling/oppdater-stilling';

export interface StillingBrukerInfo {
  eierNavident?: string;
  eierNavn?: string;
  eierNavKontorEnhetId?: string;
}

export const oppdaterStilling = async (
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
      ...(sanitizedProperties ? { properties: sanitizedProperties } : {}),
    },
  };

  if (stillingsData.stillingsinfo) {
    body = {
      ...body,
      stillingsinfo: {
        ...stillingsData.stillingsinfo,
        eierNavKontorEnhetId: brukerInfo.eierNavKontorEnhetId ?? null,
      },
    };
  }

  const response = await putApi(oppdaterStillingEndepunkt, body);
  return StillingMutasjonResponsSchema.parse(response);
};

export const oppdaterStillingMSWHandler = putMock(
  oppdaterStillingEndepunkt,
  async () => HttpResponse.json(mockBaseStilling),
);
