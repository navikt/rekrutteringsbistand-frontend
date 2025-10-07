'use client';

import { jobbsøkereMock } from './mocks/jobbsøkereMock';
import { postApi } from '@/app/api/fetcher';
import { z } from 'zod';

const opprettJobbsøkereEndepunkt = (id: string) =>
  `/api/rekrutteringstreff/${id}/jobbsoker`;

export const OpprettJobbsøkerSchema = z.object({
  fødselsnummer: z.string(),
  fornavn: z.string().nullish(),
  etternavn: z.string().nullish(),
  kandidatnummer: z.string().nullable(),
  navkontor: z.string().nullish(),
  veilederNavn: z.string().nullish(),
  veilederNavIdent: z.string(),
});

export const OpprettJobbsøkereSchema = z.array(OpprettJobbsøkerSchema);

export type OpprettJobbsøkerDTO = z.infer<typeof OpprettJobbsøkerSchema>;
export type OpprettJobbsøkereDTO = OpprettJobbsøkerDTO[];

export const opprettJobbsøkere = (
  kandidater: OpprettJobbsøkereDTO,
  id: string,
) => postApi(opprettJobbsøkereEndepunkt(id), kandidater);

export const opprettJobbsøkereMirage = (server: any) => {
  return server.post(
    opprettJobbsøkereEndepunkt('d6a587cd-8797-4b9a-a68b-575373f16d65'),
    () => jobbsøkereMock[0],
  );
};
