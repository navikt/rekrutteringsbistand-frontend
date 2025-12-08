'use client';

import { jobbsøkereMock } from './jobbsøkereMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  HendelseDTO,
  HendelseSchema,
} from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useSWRGet } from '@/app/api/useSWRGet';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

export const JobbsøkerStatusEnum = z.enum(
  Object.values(JobbsøkerStatus) as [string, ...string[]],
);
export type JobbsøkerStatusType = z.infer<typeof JobbsøkerStatusEnum>;

// Schemas
export const JobbsøkerSchema = z.object({
  personTreffId: z.string(),
  fødselsnummer: z.string(),
  kandidatnummer: z.string().nullable(),
  fornavn: z.string(),
  etternavn: z.string(),
  navkontor: z.string().nullable(),
  veilederNavn: z.string().nullable(),
  veilederNavIdent: z.string().nullable(),
  status: JobbsøkerStatusEnum,
  hendelser: z.array(HendelseSchema),
});

export const JobbsøkereSchema = z.array(JobbsøkerSchema);

// DTOs
export type JobbsøkerDTO = z.infer<typeof JobbsøkerSchema>;
export type JobbsøkereDTO = z.infer<typeof JobbsøkereSchema>;
export type JobbsøkerHendelseDTO = HendelseDTO;

export const jobbsøkereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker`;

export const useJobbsøkere = (id?: string, refreshInterval?: number) => {
  const key = id ? jobbsøkereEndepunkt(id) : null;
  return useSWRGet(key, JobbsøkereSchema, {
    nonImmutable: !!refreshInterval,
    refreshInterval,
  });
};

export const jobbsøkereMSWHandler = http.get(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker`,
  () => HttpResponse.json(jobbsøkereMock()),
);
