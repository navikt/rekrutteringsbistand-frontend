'use client';

import { arbeidsgivereMock } from './mocks/arbeidsgivereMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import useSWR from 'swr';
import { z } from 'zod';

export const rekrutteringstreffArbeidsgivereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/arbeidsgiver`;

const ArbeidsgiverHendelseSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: z.string(),
  opprettetAvAktørType: z.string(),
  aktøridentifikasjon: z.string(),
  orgnr: z.string(),
  orgnavn: z.string(),
});

const RekrutteringstreffArbeidsgiverSchema = z.object({
  organisasjonsnummer: z.string(),
  navn: z.string(),
  status: z.string().optional(),
  hendelser: z.array(ArbeidsgiverHendelseSchema),
});

const RekrutteringstreffArbeidsgivereSchema = z.array(
  RekrutteringstreffArbeidsgiverSchema,
);

export type ArbeidsgiverDTO = z.infer<
  typeof RekrutteringstreffArbeidsgiverSchema
>;
export type ArbeidsgivereDTO = z.infer<
  typeof RekrutteringstreffArbeidsgivereSchema
>;

export const useRekrutteringstreffArbeidsgivere = (id: string) => {
  return useSWR(
    rekrutteringstreffArbeidsgivereEndepunkt(id),
    getAPIwithSchema(RekrutteringstreffArbeidsgivereSchema),
  );
};

export const rekruteringstreffArbeidsgivereMirage = (server: any) => {
  return server.get(rekrutteringstreffArbeidsgivereEndepunkt('*'), () =>
    arbeidsgivereMock(),
  );
};
