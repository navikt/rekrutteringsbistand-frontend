'use client';

import { kandidatlisteSchema } from './schema.zod';
import { KandidatAPI } from '@/app/api/api-routes';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import { useSWRGet } from '@/app/api/useSWRGet';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { mockKandidatliste } from '@/mocks/kandidatliste.mock';
import { http, HttpResponse } from 'msw';

export const kandidatlisteEndepunkt = (stillingsId?: string) =>
  stillingsId
    ? `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatliste`
    : null;

export const useKandidatlisteForEier = (
  stillingsData:
    | RekrutteringsbistandStillingSchemaDTO
    | StillingsDataDTO
    | undefined,
  erEier: boolean | undefined,
) => {
  const kanHenteKandidatliste: boolean = Boolean(
    erEier &&
    stillingsData?.stilling.uuid &&
    stillingsData?.stilling?.publishedByAdmin,
  );

  return useSWRGet(
    kanHenteKandidatliste
      ? kandidatlisteEndepunkt(stillingsData?.stilling.uuid)
      : null,
    kandidatlisteSchema,
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
      fetchOptions: { skjulFeilmelding: true },
    },
  );
};

export const kandidatlisteMSWHandler = http.get(
  `${KandidatAPI.internUrl}/veileder/stilling/*/kandidatliste`,
  ({ params }) => {
    const stillingsId =
      typeof params === 'object' && '0' in params ? String(params['0']) : '';

    // Fullført-banner: besatt (minst én med FATT_JOBBEN)
    if (stillingsId === 'fullfortBesattLast') {
      return HttpResponse.json({
        ...mockKandidatliste,
        kandidater: mockKandidatliste.kandidater.map((k, i) =>
          i === 0
            ? { ...k, utfall: KandidatutfallTyper.FATT_JOBBEN, arkivert: false }
            : { ...k, utfall: KandidatutfallTyper.IKKE_PRESENTERT },
        ),
      });
    }

    // Fullført-banner: ikke besatt (ingen med FATT_JOBBEN)
    if (
      stillingsId === 'fullfortIkkeBesattIkkeLast' ||
      stillingsId === 'fullfortIkkeBesattLast'
    ) {
      return HttpResponse.json({
        ...mockKandidatliste,
        kandidater: mockKandidatliste.kandidater.map((k) => ({
          ...k,
          utfall: KandidatutfallTyper.IKKE_PRESENTERT,
        })),
        formidlingerAvUsynligKandidat:
          mockKandidatliste.formidlingerAvUsynligKandidat.map((k) => ({
            ...k,
            utfall: KandidatutfallTyper.IKKE_PRESENTERT,
          })),
      });
    }

    return HttpResponse.json(mockKandidatliste);
  },
);
