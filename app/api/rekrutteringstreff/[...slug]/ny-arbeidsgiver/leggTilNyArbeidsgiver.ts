import { arbeidsgivereMock } from '../mocks/arbeidsgivereMock';
import { postApi } from '@/app/api/fetcher';
import { z } from 'zod';

const leggtilNyArbeidsgiverEndepunkt = (id: string) => {
  return `/api/rekrutteringstreff/${id}/arbeidsgiver`;
};

export const leggtilNyArbeidsgiver = async (
  leggTilNyArbeidsgiver: LeggTilNyArbeidsgiverDTO,
  id: string,
) => {
  return await postApi(
    leggtilNyArbeidsgiverEndepunkt(id),
    leggTilNyArbeidsgiver,
  );
};

export const leggTilNyArbeidsgiverMirage = (server: any) => {
  return server.post(
    leggtilNyArbeidsgiverEndepunkt('d6a587cd-8797-4b9a-a68b-575373f16d65'),
    () => arbeidsgivereMock()[0],
  );
};

export const LeggTilNyArbeidsgiverSchema = z.object({
  organisasjonsnummer: z.string(),
  navn: z.string(),
});

export type LeggTilNyArbeidsgiverDTO = z.infer<
  typeof LeggTilNyArbeidsgiverSchema
>;
