'use client';

import { alleHendelserMock } from './mocks/alleHendelserMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import useSWR from 'swr';
import { z } from 'zod';

export const alleHendelserEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/allehendelser`;

const HendelseSchema = z.object({
  id: z.string(),
  ressurs: z.enum(['REKRUTTERINGSTREFF', 'JOBBSØKER', 'ARBEIDSGIVER']),
  tidspunkt: z.string(),
  hendelsestype: z.string(),
  opprettetAvAktørType: z.string(),
  aktørIdentifikasjon: z.string().nullable(),
});

export const AlleHendelserSchema = z.array(HendelseSchema);
export type AlleHendelserDTO = z.infer<typeof AlleHendelserSchema>;

export const useAlleHendelser = (id: string) =>
  useSWR(alleHendelserEndepunkt(id), getAPIwithSchema(AlleHendelserSchema));

export const alleHendelserMirage = (server: any) =>
  server.get(alleHendelserEndepunkt('*'), () => alleHendelserMock());
