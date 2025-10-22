'use client';

import { kandidatlisteSchema } from './schema.zod';
import { KandidatAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import { mockKandidatliste } from '@/mocks/kandidatliste.mock';
import { http, HttpResponse } from 'msw';
import useSWRImmutable from 'swr/immutable';

export const kandidatlisteEndepunkt = (stillingsId?: string) =>
  stillingsId
    ? `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatliste`
    : undefined;

export const useKandidatlisteForEier = (
  stillingsData:
    | RekrutteringsbistandStillingSchemaDTO
    | StillingsDataDTO
    | undefined,
  erEier: boolean | undefined,
) => {
  const kanHenteKandidatliste =
    erEier &&
    stillingsData?.stilling.uuid &&
    stillingsData?.stilling?.publishedByAdmin;

  return useSWRImmutable(
    kanHenteKandidatliste
      ? kandidatlisteEndepunkt(stillingsData?.stilling.uuid)
      : null,
    getAPIwithSchema(kandidatlisteSchema, { skjulFeilmelding: true }),
    {
      // Unngå uendelig retry ved 404-feil
      shouldRetryOnError: (error) => {
        // Ikke retry ved 404-feil (kandidatliste slettet)
        if (error?.status === 404) return false;
        // Ikke retry ved andre client-feil (4xx)
        if (error?.status >= 400 && error?.status < 500) return false;
        return true;
      },
      errorRetryCount: 2,
      errorRetryInterval: 5000,
    },
  );
};

export const kandidatlisteMSWHandler = http.get(
  `${KandidatAPI.internUrl}/veileder/stilling/*/kandidatliste`,
  () => HttpResponse.json(mockKandidatliste),
);
