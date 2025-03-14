'use client';

/**
 * Endepunkt /useArbeidsgivere
 */
import { RekrutteringstreffAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { arbeidsgivereMock } from './mocks/arbeidsgivereMock';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

export const arbeidsgivereEndepunkt = () =>
  `${RekrutteringstreffAPI.internUrl}`;

const ArbeidsgivereSchema = z.array(
  z.object({
    organisasjonsnummer: z.string(),
    navn: z.string(),
    status: z.string(),
  }),
);

export type ArbeidsgivereDTO = z.infer<typeof ArbeidsgivereSchema>;

export const useArbeidsgivere = () =>
  useSWRImmutable(
    arbeidsgivereEndepunkt(),
    getAPIwithSchema(ArbeidsgivereSchema),
  );

export const arbeidsgivereMirage = (server: any) => {
  return server.get(arbeidsgivereEndepunkt(), () => arbeidsgivereMock);
};
