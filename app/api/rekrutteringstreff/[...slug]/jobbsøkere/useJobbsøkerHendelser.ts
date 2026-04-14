import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { parseHendelseData } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useSWRGet } from '@/app/api/useSWRGet';
import {
  AktørType as AktørTypeConst,
  JobbsøkerHendelsestype as JobbsøkerHendelsestypeConst,
} from '@/app/rekrutteringstreff/_types/constants';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';
import { jobbsøkerHendelserMock } from './mocks/jobbsøkerHendelserMock';

const enumFromConstObject = <T extends Record<string, string>>(obj: T) =>
  z.enum(Object.values(obj) as [T[keyof T], ...T[keyof T][]]);

export const jobbsøkerHendelserEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker/hendelser`;

const JobbsøkerHendelseRawSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: enumFromConstObject(JobbsøkerHendelsestypeConst),
  opprettetAvAktørType: enumFromConstObject(AktørTypeConst),
  aktørIdentifikasjon: z.string().optional(),
  fødselsnummer: z.string().optional(),
  fornavn: z.string().optional(),
  etternavn: z.string().optional(),
  personTreffId: z.string(),
  hendelseData: z.unknown().optional(),
});

const JobbsøkerHendelseSchema = JobbsøkerHendelseRawSchema.transform((h) => ({
  ...h,
  hendelseData: parseHendelseData(h.hendelsestype, h.hendelseData),
}));

const JobbsøkerHendelserSchema = z.array(JobbsøkerHendelseSchema);

export type JobbsøkerHendelseDTO = z.output<typeof JobbsøkerHendelseSchema>;
export type JobbsøkerHendelserDTO = z.output<typeof JobbsøkerHendelserSchema>;

export const useJobbsøkerHendelser = (id: string) => {
  return useSWRGet(jobbsøkerHendelserEndepunkt(id), JobbsøkerHendelserSchema);
};

export const jobbsøkerHendelserMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/hendelser`,
  () => HttpResponse.json(jobbsøkerHendelserMock()),
);
