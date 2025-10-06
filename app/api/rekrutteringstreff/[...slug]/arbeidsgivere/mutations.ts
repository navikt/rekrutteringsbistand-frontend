'use client';

import { deleteApi, postApi } from '@/app/api/fetcher';
import { z } from 'zod';

const arbeidsgiverEndepunkt = (rekrutteringstreffId: string) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/arbeidsgiver`;

const enkeltArbeidsgiverEndepunkt = (
  rekrutteringstreffId: string,
  arbeidsgiverId: string,
) =>
  `/api/rekrutteringstreff/${rekrutteringstreffId}/arbeidsgiver/${arbeidsgiverId}`;

export const LeggTilNyArbeidsgiverSchema = z.object({
  organisasjonsnummer: z.string(),
  navn: z.string(),
});

export type LeggTilNyArbeidsgiverDTO = z.infer<
  typeof LeggTilNyArbeidsgiverSchema
>;

export const leggTilNyArbeidsgiver = async (
  leggTilNyArbeidsgiver: LeggTilNyArbeidsgiverDTO,
  id: string,
) => {
  return await postApi(arbeidsgiverEndepunkt(id), leggTilNyArbeidsgiver);
};

export const fjernArbeidsgiver = async (
  rekrutteringstreffId: string,
  arbeidsgiverId: string,
) => {
  return await deleteApi(
    enkeltArbeidsgiverEndepunkt(rekrutteringstreffId, arbeidsgiverId),
  );
};

export const arbeidsgiverMutationsMirage = async (server: any) => {
  const { arbeidsgivereMock } = await import('./mocks/arbeidsgivereMock');

  server.post(
    arbeidsgiverEndepunkt('d6a587cd-8797-4b9a-a68b-575373f16d65'),
    () => arbeidsgivereMock()[0],
  );

  server.delete(
    enkeltArbeidsgiverEndepunkt(
      'd6a587cd-8797-4b9a-a68b-575373f16d65',
      '53dbc8c2-fc62-4c1a-a95c-53d97e7e1c01',
    ),
    () => undefined,
  );
};
