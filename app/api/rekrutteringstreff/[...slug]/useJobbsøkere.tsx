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
export const fetchJobbsøkere = async (url: string) => {
  const data = await getAPIwithSchema(JobbsøkereSchema)(url);
  return [...data];
};
export const useJobbsøkere = (id: string) => {
  const endpoint = jobbsøkereEndepunkt(id);

  const swr = useSWR(endpoint, fetchJobbsøkere);

  const refresh = async () => {
    console.log('refresh jobbsøkere', endpoint);
    await mutate(endpoint, async () => {
      return await fetchJobbsøkere(endpoint);
    });

    console.log('refresh jobbsøkere ferdig', endpoint);
  };

  return {
    ...swr,
    refresh,
  };
};

export const jobbsøkereMirage = (server: any) => {
  return server.get(jobbsøkereEndepunkt('*'), () => jobbsøkereMock);
};
