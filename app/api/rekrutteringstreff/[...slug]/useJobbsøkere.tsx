'use client';

/**
 * Endepunkt /useJobbsøkere
 */
import { RekrutteringstreffAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { arbeidsgivereMock } from './mocks/arbeidsgivereMock';
import { jobbsøkereMock } from './mocks/jobbsøkereMock';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

export const jobbsøkereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsøkere`;

const JobbsøkereSchema = z.array(
  z.object({
    fødselsnummer: z.string(),
    /*kandidatnummer: z.string(),*/
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

export const useJobbsøkere = (id: string) =>
  useSWRImmutable(jobbsøkereEndepunkt(id), getAPIwithSchema(JobbsøkereSchema));

export const jobbsøkereMirage = (server: any) => {
  return server.get(jobbsøkereEndepunkt('*'), () => jobbsøkereMock);
};
