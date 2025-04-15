'use client';

import { RekrutteringstreffAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { jobbsøkerHendelserMock } from './mocks/jobbsøkerHendelserMock';
import useSWR from 'swr';
import { z } from 'zod';

export const jobbsøkerHendelserEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/hendelser`;

const JobbsøkerHendelseSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: z.string(),
  opprettetAvAktørType: z.string(),
  aktørIdentifikasjon: z.string().optional(),
});

const JobbsøkerHendelserSchema = z.array(JobbsøkerHendelseSchema);

export type JobbsøkerHendelseDTO = z.infer<typeof JobbsøkerHendelseSchema>;
export type JobbsøkerHendelserDTO = z.infer<typeof JobbsøkerHendelserSchema>;

export const useJobbsøkerHendelser = (id: string) => {
  return useSWR(
    jobbsøkerHendelserEndepunkt(id),
    getAPIwithSchema(JobbsøkerHendelserSchema),
  );
};

export const jobbsøkerHendelserMirage = (server: any) => {
  return server.get(jobbsøkerHendelserEndepunkt('*'), () =>
    jobbsøkerHendelserMock(),
  );
};
