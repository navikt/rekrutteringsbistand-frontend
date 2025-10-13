'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import {
  AktørType as AktørTypeConst,
  JobbsøkerHendelsestype as JobbsøkerHendelsestypeConst,
} from '@/app/rekrutteringstreff/_types/constants';
import useSWR from 'swr';
import { z } from 'zod';

const enumFromConstObject = <T extends Record<string, string>>(obj: T) =>
  z.enum(Object.values(obj) as [T[keyof T], ...T[keyof T][]]);

export const jobbsøkerHendelserEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/hendelser`;

const JobbsøkerHendelseSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: enumFromConstObject(JobbsøkerHendelsestypeConst),
  opprettetAvAktørType: enumFromConstObject(AktørTypeConst),
  aktørIdentifikasjon: z.string().optional(),
  fødselsnummer: z.string().optional(),
  kandidatnummer: z.string().optional(),
  fornavn: z.string().optional(),
  etternavn: z.string().optional(),
  personTreffId: z.string(),
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
