import { postApi } from '@/app/api/fetcher';
import { z } from 'zod';

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

export const OpprettNyttRekrutteringstreffSchema = z.object({
  opprettetAvNavkontorEnhetId: z.string().nullable(),
});

export type OpprettNyttRekrutteringstreffDTO = z.infer<
  typeof OpprettNyttRekrutteringstreffSchema
>;
