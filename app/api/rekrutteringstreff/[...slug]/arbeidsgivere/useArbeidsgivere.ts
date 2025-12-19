'use client';

import { arbeidsgivereMock } from './arbeidsgivereMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

export const ArbeidsgiverSchema = z.object({
  arbeidsgiverTreffId: z.string().optional(),
  organisasjonsnummer: z.string(),
  navn: z.string(),
  status: z.string(),
  gateadresse: z.string().nullable(),
  postnummer: z.string().nullable(),
  poststed: z.string().nullable(),
});

export const ArbeidsgivereSchema = z.array(ArbeidsgiverSchema);

// DTOs
export type ArbeidsgiverDTO = z.infer<typeof ArbeidsgiverSchema>;
export type ArbeidsgivereDTO = z.infer<typeof ArbeidsgivereSchema>;

export const rekrutteringstreffArbeidsgivereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/arbeidsgiver`;

export const useRekrutteringstreffArbeidsgivere = (id: string) => {
  return useSWRGet(
    rekrutteringstreffArbeidsgivereEndepunkt(id),
    ArbeidsgivereSchema,
  );
};

export const rekrutteringstreffArbeidsgivereMSWHandler = http.get(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  () => HttpResponse.json(arbeidsgivereMock()),
);
