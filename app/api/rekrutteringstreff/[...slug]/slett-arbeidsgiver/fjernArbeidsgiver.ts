import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { deleteApi } from '@/app/api/fetcher';

const fjernArbeidsgiverEndepunkt = (
  treffId: string,
  arbeidsgiverId: string,
) => {
  return `${RekrutteringstreffAPI.internUrl}/${treffId}/arbeidsgiver/${arbeidsgiverId}`;
};

export const fjernArbeidsgiver = async (
  treffId: string,
  arbeidsgiverId: string,
) => {
  const endepunkt = fjernArbeidsgiverEndepunkt(treffId, arbeidsgiverId);
  return deleteApi(endepunkt);
};

export const fjernArbeidsgiverMirage = (server: any) => {
  return server.delete(
    `${RekrutteringstreffAPI.internUrl}/:treffId/arbeidsgiver/:arbeidsgiverId`,
    () => undefined,
  );
};
