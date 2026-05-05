'use client';

import { KandidatAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

export const kandidatnrIListeEndepunkt = (stillingsId: string) =>
  `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatnr`;

const KandidatnrIListeSchema = z.object({
  kandidatnr: z.array(z.string()),
});

export type KandidatnrIListeDTO = z.infer<typeof KandidatnrIListeSchema>;

export const useKandidatnrIListe = (
  stillingsId?: string | null,
  erEier?: boolean,
) =>
  useSWRGet(
    stillingsId && erEier ? kandidatnrIListeEndepunkt(stillingsId) : null,
    KandidatnrIListeSchema,
    {
      fetchOptions: { skjulFeilmelding: true },
    },
  );
