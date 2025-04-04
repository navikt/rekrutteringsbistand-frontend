'use client';

/**
 * Endepunkt /useRekrutteringstreffArbeidsgivere
 */
import { RekrutteringstreffAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { arbeidsgivereMock } from './mocks/arbeidsgivereMock';
import useSWR, { mutate } from 'swr';
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
  const data = await getAPIwithSchema(RekrutteringstreffArbeidsgivereSchema)(
    url,
  );
  return [...data];
};

export const useRekrutteringstreffArbeidsgivere = (id: string) => {
  const endpoint = rekrutteringstreffArbeidsgivereEndepunkt(id);

  const swr = useSWR(endpoint, fetchRekrutteringstreffArbeidsgivere);

  const refresh = async () => {
    console.log('refresh arbeidsgivere', endpoint);
    await mutate(endpoint, async () => {
      return await fetchRekrutteringstreffArbeidsgivere(endpoint);
    });
    console.log('refresh arbeidsgivere ferdig', endpoint);
  };

  return {
    ...swr,
    refresh,
  };
};

export const rekruteringstreffArbeidsgivereMirage = (server: any) => {
  return server.get(
    rekrutteringstreffArbeidsgivereEndepunkt('*'),
    () => arbeidsgivereMock,
  );
};
