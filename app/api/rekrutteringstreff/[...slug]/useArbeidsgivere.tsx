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
  `${RekrutteringstreffAPI.internUrl}/${id}/arbeidsgivere`;

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

export const useRekrutteringstreffArbeidsgivere = (id: string) =>
  useSWRImmutable(
    rekrutteringstreffArbeidsgivereEndepunkt(id),
    getAPIwithSchema(RekrutteringstreffArbeidsgivereSchema),
  );

export const rekruteringstreffArbeidsgivereMirage = (server: any) => {
  return server.get(
    rekrutteringstreffArbeidsgivereEndepunkt(
      'd6a587cd-8797-4b9a-a68b-575373f16d65',
    ),
    () => arbeidsgivereMock,
  );
};
