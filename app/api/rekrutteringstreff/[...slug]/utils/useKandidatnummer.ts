'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import useSWR from 'swr';
import { z } from 'zod';

export const kandidatnummerEndepunkt = (personTreffId: string) =>
  `${RekrutteringstreffAPI.internUrl}/jobbsoker/${personTreffId}/kandidatnummer`;

const KandidatnummerSchema = z.object({
  kandidatnummer: z.string(),
});

export type KandidatnummerDTO = z.infer<typeof KandidatnummerSchema>;

export const useKandidatnummer = (personTreffId: string | null) => {
  const swrKey = personTreffId ? kandidatnummerEndepunkt(personTreffId) : null;
  return useSWR(swrKey, getAPIwithSchema(KandidatnummerSchema));
};

export const kandidatnummerMirage = (server: any) => {
  server.get(
    `${RekrutteringstreffAPI.internUrl}/jobbsoker/:personTreffId/kandidatnummer`,
    () => {
      return {
        kandidatnummer: 'PAM0123ABCDE',
      };
    },
  );
};
