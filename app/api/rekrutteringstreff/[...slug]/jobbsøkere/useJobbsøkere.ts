'use client';

import { jobbsøkereMock } from './mocks/jobbsøkereMock';
import { JobbsøkerDTO, JobbsøkereDTO, JobbsøkereSchema } from './schemas';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { HendelseDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import useSWR from 'swr';

export type { JobbsøkerDTO, JobbsøkereDTO };

export const jobbsøkereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker`;

export type JobbsøkerHendelseDTO = HendelseDTO;

export const useJobbsøkere = (id?: string) => {
  const key = id ? jobbsøkereEndepunkt(id) : null;
  return useSWR(key, getAPIwithSchema(JobbsøkereSchema));
};

export const jobbsøkereMirage = (server: any) => {
  return server.get(jobbsøkereEndepunkt('*'), () => jobbsøkereMock);
};
