'use client';

import { alleHendelserMock } from '../mocks/alleHendelserMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import {
  AktørType as AktørTypeConst,
  ArbeidsgiverHendelsestype as ArbeidsgiverHendelsestypeConst,
  JobbsøkerHendelsestype as JobbsøkerHendelsestypeConst,
  RekrutteringstreffHendelsestype as RekrutteringstreffHendelsestypeConst,
} from '@/app/rekrutteringstreff/_domain/constants';
import useSWR from 'swr';
import { z } from 'zod';

const enumFromConstObject = <T extends Record<string, string>>(obj: T) =>
  z.enum(Object.values(obj) as [T[keyof T], ...T[keyof T][]]);

export const alleHendelserEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/allehendelser`;

const HendelseSchema = z.object({
  id: z.string(),
  ressurs: z.enum(['REKRUTTERINGSTREFF', 'JOBBSØKER', 'ARBEIDSGIVER']),
  tidspunkt: z.string(),
  // Tillat alle kjente hendelsestyper på tvers av ressurs-typene
  hendelsestype: z.union([
    enumFromConstObject(RekrutteringstreffHendelsestypeConst),
    enumFromConstObject(JobbsøkerHendelsestypeConst),
    enumFromConstObject(ArbeidsgiverHendelsestypeConst),
  ]),
  opprettetAvAktørType: enumFromConstObject(AktørTypeConst),
  aktørIdentifikasjon: z.string().nullable(),
});

export const AlleHendelserSchema = z.array(HendelseSchema);
export type AlleHendelserDTO = z.infer<typeof AlleHendelserSchema>;

export const useAlleHendelser = (id: string) =>
  useSWR(alleHendelserEndepunkt(id), getAPIwithSchema(AlleHendelserSchema));

export const alleHendelserMirage = (server: any) =>
  server.get(alleHendelserEndepunkt('*'), () => alleHendelserMock());
