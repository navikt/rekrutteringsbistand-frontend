'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

export const kandidatnummerEndepunkt = (personTreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/jobbsoker/${personTreffId}/kandidatnummer`;

const KandidatnummerSchema = z.object({
  kandidatnummer: z.string(),
});

export type KandidatnummerDTO = z.infer<typeof KandidatnummerSchema>;

export const useKandidatnummer = (personTreffId: string | null) => {
  const swrKey = personTreffId ? kandidatnummerEndepunkt(personTreffId) : null;
  return useSWRGet(swrKey, KandidatnummerSchema);
};

export const kandidatnummerMSWHandler = http.get(
  `${RekrutteringstreffAPI.internUrl}/jobbsoker/:personTreffId/kandidatnummer`,
  () => HttpResponse.json({ kandidatnummer: 'PAM0123ABCDE' }),
);
