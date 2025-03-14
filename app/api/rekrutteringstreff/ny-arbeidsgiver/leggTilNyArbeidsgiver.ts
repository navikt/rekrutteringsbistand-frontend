import { LeggTilNyArbeidsgiverDTO } from './dto';
import { postApi } from '@/app/api/fetcher';

const leggtilNyArbeidsgiverEndepunkt = (id: string) => {
  return `/api/rekrutteringstreff/${id}/arbeidsgiver`;
};

export const leggtilNyArbeidsgiver = async (
  leggTilNyArbeidsgiver: LeggTilNyArbeidsgiverDTO,
  id: string,
) => {
  console.log('leggTilNyArbeidsgiver', leggTilNyArbeidsgiver, 'id', id);
  return await postApi(
    leggtilNyArbeidsgiverEndepunkt(id),
    leggTilNyArbeidsgiver,
  );
};

export const leggtilNyArbeidsgiverMirage = (server: any) => {
  return server.post(
    leggtilNyArbeidsgiverEndepunkt('d6a587cd-8797-4b9a-a68b-575373f16d65'),
    () => ({
      organisasjonsnummer: '123456789',
      navn: 'Winwin AS',
      status: 'Foreslått',
    }),
  );
};
