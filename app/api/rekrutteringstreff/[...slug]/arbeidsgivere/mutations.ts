'use client';

import { arbeidsgivereMock } from './mocks/arbeidsgivereMock';
import { deleteApi, postApi } from '@/app/api/fetcher';
import { z } from 'zod';

const rekrutteringstreffArbeidsgiverEndepunkt = (
  rekrutteringstreffId: string,
) => `/api/rekrutteringstreff/${rekrutteringstreffId}/arbeidsgiver`;

const rekrutteringstreffEnkeltArbeidsgiverEndepunkt = (
  rekrutteringstreffId: string,
  arbeidsgiverId: string,
) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/arbeidsgiver/${arbeidsgiverId}`;

export const OpprettArbeidsgiverSchema = z.object({
  organisasjonsnummer: z.string(),
  navn: z.string(),
});

export type OpprettArbeidsgiverDTO = z.infer<typeof OpprettArbeidsgiverSchema>;

export const opprettArbeidsgiver = async (
  arbeidsgiver: OpprettArbeidsgiverDTO,
  id: string,
) => {
  return await postApi(
    rekrutteringstreffArbeidsgiverEndepunkt(id),
    arbeidsgiver,
  );
};

export const slettArbeidsgiver = async (
  rekrutteringstreffId: string,
  arbeidsgiverId: string,
) => {
  return await deleteApi(
    rekrutteringstreffEnkeltArbeidsgiverEndepunkt(
      rekrutteringstreffId,
      arbeidsgiverId,
    ),
  );
};

export const arbeidsgiverMutationsMirage = (server: any) => {
  server.post(
    rekrutteringstreffArbeidsgiverEndepunkt(
      'd6a587cd-8797-4b9a-a68b-575373f16d65',
    ),
    () => arbeidsgivereMock()[0],
  );

  server.delete(
    rekrutteringstreffEnkeltArbeidsgiverEndepunkt(
      'd6a587cd-8797-4b9a-a68b-575373f16d65',
      '53dbc8c2-fc62-4c1a-a95c-53d97e7e1c01',
    ),
    () => undefined,
  );
};
