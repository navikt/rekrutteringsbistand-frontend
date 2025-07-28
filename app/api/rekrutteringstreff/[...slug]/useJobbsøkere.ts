'use client';

import { RekrutteringstreffAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { jobbsøkereMock } from './mocks/jobbsøkereMock';
import useSWR from 'swr';
import { z } from 'zod';

export const jobbsøkereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker`;

const HendelseSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: z.string(),
  opprettetAvAktørType: z.string(),
  aktørIdentifikasjon: z.string(),
});

const JobbsøkerSchema = z.object({
  personTreffId: z.string(),
  fødselsnummer: z.string(),
  kandidatnummer: z.string().nullable(),
  fornavn: z.string(),
  etternavn: z.string(),
  navkontor: z.string(),
  veilederNavn: z.string(),
  veilederNavIdent: z.string(),
  hendelser: z.array(HendelseSchema),
});

const JobbsøkereSchema = z.array(JobbsøkerSchema);

export type JobbsøkereDTO = z.infer<typeof JobbsøkereSchema>;
export type JobbsøkerDTO = z.infer<typeof JobbsøkerSchema>;

export const useJobbsøkere = (id: string) => {
  return useSWR(jobbsøkereEndepunkt(id), getAPIwithSchema(JobbsøkereSchema));
};

export const jobbsøkereMirage = (server: any) => {
  return server.get(jobbsøkereEndepunkt('*'), () => jobbsøkereMock);
};
