'use client';

import { jobbsøkereMock } from './jobbsøkereMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { z } from 'zod';

// Schemas som kun brukes for mutations
const OpprettJobbsøkerSchema = z.object({
  fødselsnummer: z.string(),
  fornavn: z.string().nullish(),
  etternavn: z.string().nullish(),
  kandidatnummer: z.string().nullable(),
  navkontor: z.string().nullish(),
  veilederNavn: z.string().nullish(),
  veilederNavIdent: z.string(),
});

const OpprettJobbsøkereSchema = z.array(OpprettJobbsøkerSchema);

// DTOs
export type OpprettJobbsøkerDTO = z.infer<typeof OpprettJobbsøkerSchema>;
export type OpprettJobbsøkereDTO = OpprettJobbsøkerDTO[];

const rekrutteringstreffJobbsøkereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker`;

export const opprettJobbsøkere = (
  id: string,
  kandidater: OpprettJobbsøkereDTO,
) => postApi(rekrutteringstreffJobbsøkereEndepunkt(id), kandidater);

export const opprettJobbsøkereMirage = (server: any) => {
  return server.post(
    rekrutteringstreffJobbsøkereEndepunkt(
      'd6a587cd-8797-4b9a-a68b-575373f16d65',
    ),
    () => jobbsøkereMock[0],
  );
};
