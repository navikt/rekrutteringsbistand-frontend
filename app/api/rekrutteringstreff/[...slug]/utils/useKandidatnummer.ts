'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

export const kandidatnummerEndepunkt = (
  personTreffId: string,
  rekrutteringstreffId: string,
) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/jobbsoker/${personTreffId}/kandidatnummer`;

const KandidatnummerSchema = z.object({
  kandidatnummer: z.string(),
});

export type KandidatnummerDTO = z.infer<typeof KandidatnummerSchema>;

export const useKandidatnummer = (
  personTreffId: string | null,
  rekrutteringstreffId: string | null,
) => {
  const swrKey =
    personTreffId && rekrutteringstreffId
      ? kandidatnummerEndepunkt(personTreffId, rekrutteringstreffId)
      : null;
  return useSWRGet(swrKey, KandidatnummerSchema);
};

export const kandidatnummerMSWHandler = http.get(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/:personTreffId/kandidatnummer`,
  () => HttpResponse.json({ kandidatnummer: 'PAM0123ABCDE' }),
);
