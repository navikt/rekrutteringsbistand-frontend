'use client';

import { jobbsøkereMock } from './jobbsøkereMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import {
  HendelseDTO,
  HendelseSchema,
} from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { http, HttpResponse } from 'msw';
import useSWR from 'swr';
import { z } from 'zod';

// Schemas
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

// DTOs
export type JobbsøkerDTO = z.infer<typeof JobbsøkerSchema>;
export type JobbsøkereDTO = z.infer<typeof JobbsøkereSchema>;
export type JobbsøkerHendelseDTO = HendelseDTO;

export const jobbsøkereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker`;

export const useJobbsøkere = (id?: string) => {
  const key = id ? jobbsøkereEndepunkt(id) : null;
  return useSWR(key, getAPIwithSchema(JobbsøkereSchema));
};

export const jobbsøkereMSWHandler = http.get(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker`,
  () => HttpResponse.json(jobbsøkereMock()),
);
