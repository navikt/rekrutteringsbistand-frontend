'use client';

import { RekrutteringstreffAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { arbeidsgiverHendelserMock } from './mocks/arbeidsgiverHendelserMock';
import useSWR from 'swr';
import { z } from 'zod';

export const arbeidsgiverHendelserEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/arbeidsgiver/hendelser`;

const ArbeidsgiverHendelseSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: z.string(),
  opprettetAvAktørType: z.string(),
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
