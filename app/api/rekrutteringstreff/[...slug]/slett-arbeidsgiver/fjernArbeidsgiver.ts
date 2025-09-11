import { deleteApi } from '@/app/api/fetcher';

const fjernArbeidsgiverEndepunkt = (
  treffId: string,
  organisasjonsnummer: string,
) => {
  return `/api/rekrutteringstreff/${treffId}/arbeidsgiver/${organisasjonsnummer}`;
};

export const fjernArbeidsgiver = async (
  treffId: string,
  organisasjonsnummer: string,
) => {
  const endepunkt = fjernArbeidsgiverEndepunkt(treffId, organisasjonsnummer);
  return deleteApi(endepunkt);
};

export const fjernArbeidsgiverMirage = (server: any) => {
  return server.delete(
    fjernArbeidsgiverEndepunkt(
      'd6a587cd-8797-4b9a-a68b-575373f16d65',
      '999999999',
    ),
    () => undefined,
  );
};
