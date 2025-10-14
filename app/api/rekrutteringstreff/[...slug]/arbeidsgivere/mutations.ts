'use client';

import { arbeidsgivereMock } from './arbeidsgivereMock';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { deleteApi, postApi } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';

// DTOs
export type OpprettArbeidsgiverDTO = {
  organisasjonsnummer: string;
  navn: string;
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

export const opprettArbeidsgiverMSWHandler = http.post(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  () => HttpResponse.json(arbeidsgivereMock()[0]),
);

export const slettArbeidsgiverMSWHandler = http.delete(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver/:arbeidsgiverId`,
  () => new HttpResponse(null, { status: 204 }),
);
