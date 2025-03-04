import { postApi } from '@/app/api/fetcher';
import { OpprettNyttRekrutteringstreffDTO } from './dto';
import { randomUUID } from 'crypto';

const opprettNyttRekrutteringstreffEndepunkt = '/api/rekrutteringstreff';

export const opprettNyttRekrutteringstreff = async (rekrutteringstreff: OpprettNyttRekrutteringstreffDTO) => {
  return await postApi(opprettNyttRekrutteringstreffEndepunkt, rekrutteringstreff);
};

export const opprettNyttRekrutteringstreffMirage = (server: any) => {
  return server.post(opprettNyttRekrutteringstreffEndepunkt, () => randomUUID);
};