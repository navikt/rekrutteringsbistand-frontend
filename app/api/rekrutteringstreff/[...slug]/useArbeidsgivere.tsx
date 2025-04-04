'use client';

/**
 * Endepunkt /useRekrutteringstreffArbeidsgivere
 */
import { RekrutteringstreffAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { arbeidsgivereMock } from './mocks/arbeidsgivereMock';
import useSWRImmutable from 'swr/immutable';
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

export const fetchRekrutteringstreffArbeidsgivere = getAPIwithSchema(
  RekrutteringstreffArbeidsgivereSchema,
);

export const useRekrutteringstreffArbeidsgivere = (id: string) =>
  useSWRImmutable(
    rekrutteringstreffArbeidsgivereEndepunkt(id),
    fetchRekrutteringstreffArbeidsgivere,
  );

export const rekruteringstreffArbeidsgivereMirage = (server: any) => {
  return server.get(
    rekrutteringstreffArbeidsgivereEndepunkt('*'),
    () => arbeidsgivereMock,
  );
};
