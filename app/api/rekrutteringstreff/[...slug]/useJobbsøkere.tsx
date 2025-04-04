'use client';

/**
 * Endepunkt /useJobbsøkere
 */
import { RekrutteringstreffAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { jobbsøkereMock } from './mocks/jobbsøkereMock';
import useSWR, { mutate } from 'swr';
import { z } from 'zod';

export const jobbsøkereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker`;

const JobbsøkereSchema = z.array(
  z.object({
    fødselsnummer: z.string(),
    kandidatnummer: z.string().nullable(),
    fornavn: z.string(),
    etternavn: z.string(),
    /*navKontor: z.string(),
    veileder: z.object({
      navn: z.string(),
      navIdent: z.string(),
      navKontor: z.string(),
    }),
    status: z.string(),*/
  }),
);

export type JobbsøkereDTO = z.infer<typeof JobbsøkereSchema>;

export const useJobbsøkere = (id: string) => {
  const endpoint = jobbsøkereEndepunkt(id);
  const hook = useSWR(endpoint, getAPIwithSchema(JobbsøkereSchema));

  return {
    ...hook,
    mutate: () => mutate(endpoint),
  };
};

export const jobbsøkereMirage = (server: any) => {
  return server.get(jobbsøkereEndepunkt('*'), () => jobbsøkereMock);
};
