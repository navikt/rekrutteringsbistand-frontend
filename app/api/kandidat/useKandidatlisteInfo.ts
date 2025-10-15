'use client';

/**
 * Endepunkt /useKandidatlisteInfo
 */
import { KandidatAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';

export const kandidatlisteInfoEndepunkt = (stillingsId: string) =>
  `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatlisteinfo`;

const KandidatlisteInfoSchema = z.object({
  kandidatlisteId: z.string(),
  antallKandidater: z.number(),
  kandidatlisteStatus: z.string(),
});

export type KandidatlisteInfoDTO = z.infer<typeof KandidatlisteInfoSchema>;

export const useKandidatlisteInfo = (stillingsId?: string | null) => {
  const kandidatlisteHook = useSWR(
    stillingsId ? kandidatlisteInfoEndepunkt(stillingsId) : null,
    getAPIwithSchema(KandidatlisteInfoSchema, { skjulFeilmelding: true }),
    {
      errorRetryCount: 3,
      errorRetryInterval: 3000,
      revalidateOnFocus: false, // Ikke revalider ved fokus
      dedupingInterval: 2000, // Dedupliser requests innen 2 sekunder
    },
  );

  return kandidatlisteHook;
};

export const kandidatlisteInfoMSWHandler = http.get(
  kandidatlisteInfoEndepunkt('*'),
  () =>
    HttpResponse.json({
      kandidatlisteId: 'kandidatlisteId',
      antallKandidater: 10,
      kandidatlisteStatus: 'ÅPEN',
    }),
);
