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

export const opprettArbeidsgiver = (
  id: string,
  arbeidsgiver: OpprettArbeidsgiverDTO,
) => postApi(rekrutteringstreffArbeidsgiverEndepunkt(id), arbeidsgiver);

export const slettArbeidsgiver = (
  rekrutteringstreffId: string,
  arbeidsgiverId: string,
) =>
  deleteApi(
    rekrutteringstreffEnkeltArbeidsgiverEndepunkt(
      rekrutteringstreffId,
      arbeidsgiverId,
    ),
  );
