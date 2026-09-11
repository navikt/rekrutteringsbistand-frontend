'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { deleteApi, postApi } from '@/app/api/fetcher';
import { NæringskodeDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';

// DTOs
export type OpprettArbeidsgiverDTO = {
  organisasjonsnummer: string;
  navn: string;
  næringskoder: Array<NæringskodeDTO> | null | undefined;
  gateadresse: string | null | undefined;
  postnummer: string | null | undefined;
  poststed: string | null | undefined;
};

const rekrutteringstreffArbeidsgiverEndepunkt = (
  rekrutteringstreffId: string,
) => `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/arbeidsgiver`;

const rekrutteringstreffEnkeltArbeidsgiverEndepunkt = (
  rekrutteringstreffId: string,
  arbeidsgiverId: string,
) =>
  `${RekrutteringstreffAPI.internUrl}/${rekrutteringstreffId}/arbeidsgiver/${arbeidsgiverId}`;

export const opprettArbeidsgiver = async (
  id: string,
  arbeidsgiver: OpprettArbeidsgiverDTO,
  oppdaterCache: () => Promise<void>,
) => {
  const opprettet = await postApi(
    rekrutteringstreffArbeidsgiverEndepunkt(id),
    arbeidsgiver,
  );
  await oppdaterCache();
  return opprettet;
};

export const slettArbeidsgiver = async (
  rekrutteringstreffId: string,
  arbeidsgiverId: string,
  oppdaterCache: () => Promise<void>,
) => {
  await deleteApi(
    rekrutteringstreffEnkeltArbeidsgiverEndepunkt(
      rekrutteringstreffId,
      arbeidsgiverId,
    ),
  );
  await oppdaterCache();
};
