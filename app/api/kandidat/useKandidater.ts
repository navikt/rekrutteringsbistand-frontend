'use client';

import { kandidaterPaginertSchema } from './schema.zod';
import { KandidatAPI } from '@/app/api/api-routes';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import { useSWRGet } from '@/app/api/useSWRGet';

export const kandidaterEndepunkt = (
  stillingsId: string,
  side: number,
  antall: number,
) =>
  `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidater?side=${side}&antall=${antall}`;

export const useKandidater = (
  stillingsData:
    | RekrutteringsbistandStillingSchemaDTO
    | StillingsDataDTO
    | undefined,
  erEier: boolean | undefined,
  side: number = 1,
  antall: number = 25,
) => {
  const kanHenteKandidater: boolean = Boolean(
    erEier &&
    stillingsData?.stilling.uuid &&
    stillingsData?.stilling?.publishedByAdmin,
  );

  return useSWRGet(
    kanHenteKandidater
      ? kandidaterEndepunkt(stillingsData!.stilling.uuid!, side, antall)
      : null,
    kandidaterPaginertSchema,
    {
      shouldRetryOnError: (error) => {
        if (error?.status === 404) return false;
        return !(error?.status >= 400 && error?.status < 500);
      },
      errorRetryCount: 2,
      errorRetryInterval: 5000,
      fetchOptions: { skjulFeilmelding: true },
    },
  );
};
