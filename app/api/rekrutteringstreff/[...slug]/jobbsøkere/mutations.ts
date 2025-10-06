'use client';

import { jobbsøkereMock } from './mocks/jobbsøkereMock';
import { postApi } from '@/app/api/fetcher';
import { z } from 'zod';

const leggTilNyJobbsøkerEndepunkt = (id: string) =>
  `/api/rekrutteringstreff/${id}/jobbsoker`;

export const NyJobbsøkerSchema = z.object({
  fødselsnummer: z.string(),
  fornavn: z.string().nullish(),
  etternavn: z.string().nullish(),
  kandidatnummer: z.string().nullable(),
  navkontor: z.string().nullish(),
  veilederNavn: z.string().nullish(),
  veilederNavIdent: z.string(),
});

export const LeggTilNyeJobbsøkereSchema = z.array(NyJobbsøkerSchema);

export type NyJobbsøkerDTO = z.infer<typeof NyJobbsøkerSchema>;
export type LeggTilNyeJobbsøkereDTO = NyJobbsøkerDTO[];

export const leggTilNyeJobbsøkere = (
  kandidater: LeggTilNyeJobbsøkereDTO,
  id: string,
) => postApi(leggTilNyJobbsøkerEndepunkt(id), kandidater);

export const leggTilNyJobbsøkerMirage = (server: any) => {
  return server.post(
    leggTilNyJobbsøkerEndepunkt('d6a587cd-8797-4b9a-a68b-575373f16d65'),
    () => jobbsøkereMock[0],
  );
};
