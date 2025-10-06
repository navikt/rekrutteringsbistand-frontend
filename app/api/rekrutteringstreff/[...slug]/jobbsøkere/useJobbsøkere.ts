'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { HendelseSchema } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import useSWR from 'swr';
import { z } from 'zod';

export const jobbsøkereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker`;

export const JobbsøkerSchema = z.object({
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

export const JobbsøkereSchema = z.array(JobbsøkerSchema);

export type JobbsøkerDTO = z.infer<typeof JobbsøkerSchema>;
export type JobbsøkereDTO = z.infer<typeof JobbsøkereSchema>;
export type JobbsøkerHendelseDTO = z.infer<typeof HendelseSchema>;

export const useJobbsøkere = (id?: string) => {
  const key = id ? jobbsøkereEndepunkt(id) : null;
  return useSWR(key, getAPIwithSchema(JobbsøkereSchema));
};

export const jobbsøkereMirage = async (server: any) => {
  const { jobbsøkereMock } = await import('./mocks/jobbsøkereMock');
  return server.get(jobbsøkereEndepunkt('*'), () => jobbsøkereMock);
};
