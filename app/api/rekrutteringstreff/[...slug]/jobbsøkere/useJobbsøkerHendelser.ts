'use client';

import { jobbsøkerHendelserMock } from './jobbsøkerHendelserMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import {
  AktørType as AktørTypeConst,
  JobbsøkerHendelsestype as JobbsøkerHendelsestypeConst,
} from '@/app/rekrutteringstreff/_types/constants';
import { http, HttpResponse } from 'msw';
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
  fornavn: z.string().optional(),
  etternavn: z.string().optional(),
  personTreffId: z.string(),
  hendelseData: z.any().optional(),
});

const JobbsøkerHendelserSchema = z.array(JobbsøkerHendelseSchema);

export type JobbsøkerHendelseDTO = z.infer<typeof JobbsøkerHendelseSchema>;
export type JobbsøkerHendelserDTO = z.infer<typeof JobbsøkerHendelserSchema>;

export const useJobbsøkerHendelser = (id: string) => {
  return useSWRGet(jobbsøkerHendelserEndepunkt(id), JobbsøkerHendelserSchema);
};

export const jobbsøkerHendelserMSWHandler = http.get(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/hendelser`,
  () => HttpResponse.json(jobbsøkerHendelserMock()),
);
