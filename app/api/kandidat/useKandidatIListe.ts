'use client';

import { KandidatAPI } from '@/app/api/api-routes';
import { jobbSøkerSchema } from '@/app/api/kandidat/schema.zod';
import { useSWRGet } from '@/app/api/useSWRGet';

export const kandidatIListeEndepunkt = (
  stillingsId: string,
  kandidatnr: string,
) =>
  `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidater/${kandidatnr}`;

export const useKandidatIListe = (
  stillingsId?: string | null,
  kandidatnr?: string | null,
) =>
  useSWRGet(
    stillingsId && kandidatnr
      ? kandidatIListeEndepunkt(stillingsId, kandidatnr)
      : null,
    jobbSøkerSchema,
    {
      fetchOptions: { skjulFeilmelding: true },
    },
  );
