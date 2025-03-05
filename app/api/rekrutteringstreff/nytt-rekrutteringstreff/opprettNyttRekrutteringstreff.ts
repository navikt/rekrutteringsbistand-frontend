import { OpprettNyttRekrutteringstreffDTO } from './dto';
import { postApi } from '@/app/api/fetcher';

const opprettNyttRekrutteringstreffEndepunkt = '/api/rekrutteringstreff';

export const opprettNyttRekrutteringstreff = async (
  rekrutteringstreff: OpprettNyttRekrutteringstreffDTO,
) => {
  return await postApi(
    opprettNyttRekrutteringstreffEndepunkt,
    rekrutteringstreff,
  );
};

export const opprettNyttRekrutteringstreffMirage = (server: any) => {
  return server.post(opprettNyttRekrutteringstreffEndepunkt, () => ({
    id: '1231-1234-1234-1234',
  }));
};
