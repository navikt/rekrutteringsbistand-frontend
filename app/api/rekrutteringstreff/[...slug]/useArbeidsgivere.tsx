'use client';

/**
 * Endepunkt /useRekrutteringstreffArbeidsgivere
 */
import { RekrutteringstreffAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { arbeidsgivereMock } from './mocks/arbeidsgivereMock';
import useSWR from 'swr';
import { z } from 'zod';

export const rekrutteringstreffArbeidsgivereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/arbeidsgiver`;

const RekrutteringstreffArbeidsgivereSchema = z.array(
  z.object({
    organisasjonsnummer: z.string(),
    navn: z.string(),
    status: z.string(),
  }),
);

export type ArbeidsgivereDTO = z.infer<
  typeof RekrutteringstreffArbeidsgivereSchema
>;

export const fetchRekrutteringstreffArbeidsgivere = async (url: string) => {
  return await getAPIwithSchema(RekrutteringstreffArbeidsgivereSchema)(url);
};

export const useRekrutteringstreffArbeidsgivere = (id: string) => {
  return useSWR(
    rekrutteringstreffArbeidsgivereEndepunkt(id),
    getAPIwithSchema(RekrutteringstreffArbeidsgivereSchema),
  );
};

export const rekruteringstreffArbeidsgivereMirage = (server: any) => {
  return server.get(
    rekrutteringstreffArbeidsgivereEndepunkt('*'),
    () => arbeidsgivereMock,
  );
};
