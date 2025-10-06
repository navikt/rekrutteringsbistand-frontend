'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import useSWR from 'swr';
import { z } from 'zod';

export const rekrutteringstreffArbeidsgivereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/arbeidsgiver`;

export const ArbeidsgiverHendelseSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: z.string(),
  opprettetAvAktørType: z.string(),
  aktøridentifikasjon: z.string(),
  orgnr: z.string(),
  orgnavn: z.string(),
});

export const ArbeidsgiverSchema = z.object({
  arbeidsgiverTreffId: z.string().optional(),
  organisasjonsnummer: z.string(),
  navn: z.string(),
  status: z.string().optional(),
  hendelser: z.array(ArbeidsgiverHendelseSchema),
});

export const ArbeidsgivereSchema = z.array(ArbeidsgiverSchema);

export type ArbeidsgiverDTO = z.infer<typeof ArbeidsgiverSchema>;
export type ArbeidsgivereDTO = z.infer<typeof ArbeidsgivereSchema>;
export type ArbeidsgiverHendelseDTO = z.infer<
  typeof ArbeidsgiverHendelseSchema
>;

export const useRekrutteringstreffArbeidsgivere = (id: string) => {
  return useSWR(
    rekrutteringstreffArbeidsgivereEndepunkt(id),
    getAPIwithSchema(ArbeidsgivereSchema),
  );
};

export const rekruteringstreffArbeidsgivereMirage = async (server: any) => {
  const { arbeidsgivereMock } = await import('./mocks/arbeidsgivereMock');
  return server.get(rekrutteringstreffArbeidsgivereEndepunkt('*'), () =>
    arbeidsgivereMock(),
  );
};
