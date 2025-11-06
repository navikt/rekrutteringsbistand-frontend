'use client';

import { arbeidsgivereMock } from './arbeidsgivereMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';

export const ArbeidsgiverSchema = z.object({
  arbeidsgiverTreffId: z.string().optional(),
  organisasjonsnummer: z.string(),
  navn: z.string(),
  status: z.string(),
});

export const ArbeidsgivereSchema = z.array(ArbeidsgiverSchema);

// DTOs
export type ArbeidsgiverDTO = z.infer<typeof ArbeidsgiverSchema>;
export type ArbeidsgivereDTO = z.infer<typeof ArbeidsgivereSchema>;

export const rekrutteringstreffArbeidsgivereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/arbeidsgiver`;

export const useRekrutteringstreffArbeidsgivere = (id: string) => {
  return useSWR(
    rekrutteringstreffArbeidsgivereEndepunkt(id),
    getAPIwithSchema(ArbeidsgivereSchema),
  );
};

export const rekrutteringstreffArbeidsgivereMSWHandler = http.get(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  () => HttpResponse.json(arbeidsgivereMock()),
);
