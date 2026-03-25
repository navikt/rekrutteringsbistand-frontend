'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { deleteApi, postApi } from '@/app/api/fetcher';

// DTOs
export type OpprettJobbsøkerDTO = {
  fødselsnummer: string;
  fornavn?: string | null;
  etternavn?: string | null;
  navkontor?: string | null;
  veilederNavn?: string | null;
  veilederNavIdent?: string | null;
  innsatsgruppe?: string | null;
  fylke?: string | null;
  kommune?: string | null;
  poststed?: string | null;
};
export type OpprettJobbsøkereDTO = OpprettJobbsøkerDTO[];

const rekrutteringstreffJobbsøkereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker`;

export const opprettJobbsøkere = (
  id: string,
  kandidater: OpprettJobbsøkereDTO,
) => postApi(rekrutteringstreffJobbsøkereEndepunkt(id), kandidater);

const slettJobbsøkerEndepunkt = (
  rekrutteringstreffId: string,
  jobbsøkerId: string,
) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/jobbsoker/${jobbsøkerId}/slett`;

export const slettJobbsøker = (
  rekrutteringstreffId: string,
  jobbsøkerId: string,
) => deleteApi(slettJobbsøkerEndepunkt(rekrutteringstreffId, jobbsøkerId));
