'use client';

import { arbeidsgiverHendelserMock } from './mocks/arbeidsgiverHendelserMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import {
  AktørType as AktørTypeConst,
  ArbeidsgiverHendelsestype as ArbeidsgiverHendelsestypeConst,
} from '@/app/rekrutteringstreff/_domain/constants';
import useSWR from 'swr';
import { z } from 'zod';

const enumFromConstObject = <T extends Record<string, string>>(obj: T) =>
  z.enum(Object.values(obj) as [T[keyof T], ...T[keyof T][]]);

export const arbeidsgiverHendelserEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/arbeidsgiver/hendelser`;

const ArbeidsgiverHendelseSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: enumFromConstObject(ArbeidsgiverHendelsestypeConst),
  opprettetAvAktørType: enumFromConstObject(AktørTypeConst),
  aktøridentifikasjon: z.string(),
  orgnr: z.string(),
  orgnavn: z.string(),
});

const ArbeidsgiverHendelserSchema = z.array(ArbeidsgiverHendelseSchema);

export type ArbeidsgiverHendelseDTO = z.infer<
  typeof ArbeidsgiverHendelseSchema
>;
export type ArbeidsgiverHendelserDTO = z.infer<
  typeof ArbeidsgiverHendelserSchema
>;

export const useArbeidsgiverHendelser = (id: string) => {
  return useSWR(
    arbeidsgiverHendelserEndepunkt(id),
    getAPIwithSchema(ArbeidsgiverHendelserSchema),
  );
};

export const arbeidsgiverHendelserMirage = (server: any) => {
  return server.get(arbeidsgiverHendelserEndepunkt('*'), () =>
    arbeidsgiverHendelserMock(),
  );
};
