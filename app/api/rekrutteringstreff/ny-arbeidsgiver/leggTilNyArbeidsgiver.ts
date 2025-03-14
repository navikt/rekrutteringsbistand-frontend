import { LeggTilNyArbeidsgiverDTO } from './dto';
import { postApi } from '@/app/api/fetcher';

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

export const leggtilNyArbeidsgiverMirage = (server: any) => {
  return server.post(leggtilNyArbeidsgiverEndepunkt, () => ({
    organisasjonsnummer: '123456789',
    navn: 'Winwin AS',
    status: 'Foreslått',
  }));
};
