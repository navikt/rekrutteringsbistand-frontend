'use client';

import { jobbsøkereMock } from './jobbsøkereMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';

// DTOs
export type OpprettJobbsøkerDTO = {
  fødselsnummer: string;
  fornavn?: string | null;
  etternavn?: string | null;
  kandidatnummer: string | null;
  navkontor?: string | null;
  veilederNavn?: string | null;
  veilederNavIdent: string;
};
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
