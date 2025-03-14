import { LeggTilNyArbeidsgiverDTO } from './dto';
import { postApi } from '@/app/api/fetcher';

const leggtilNyArbeidsgiverEndepunkt = '/api/rekrutteringstreff/arbeidsgiver';

export const leggtilNyArbeidsgiver = async (
  rekrutteringstreff: LeggTilNyArbeidsgiverDTO,
) => {
  return await postApi(leggtilNyArbeidsgiverEndepunkt, rekrutteringstreff);
};

export const leggtilNyArbeidsgiverMirage = (server: any) => {
  return server.post(leggtilNyArbeidsgiverEndepunkt, () => ({
    organisasjonsnummer: 123456789,
    navn: 'Winwin AS',
    status: 'Foreslått',
  }));
};
