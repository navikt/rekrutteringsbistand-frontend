'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';
import { z } from 'zod';

const rekrutteringstreffEndepunkt = () => RekrutteringstreffAPI.internUrl;

export const MAX_TITLE_LENGTH = 100;

export const OpprettRekrutteringstreffSchema = z.object({
  opprettetAvNavkontorEnhetId: z.string().nullable(),
  tittel: z.string().min(1).max(MAX_TITLE_LENGTH),
});

export type OpprettRekrutteringstreffDTO = z.infer<
  typeof OpprettRekrutteringstreffSchema
>;

export const opprettRekrutteringstreff = (
  rekrutteringstreff: OpprettRekrutteringstreffDTO,
) => postApi(rekrutteringstreffEndepunkt(), rekrutteringstreff);

export const rekrutteringstreffMutationsMirage = (server: any) => {
  server.post(`${RekrutteringstreffAPI.internUrl}`, () => ({
    id: '1231-1234-1234-1234',
    tittel: 'Treff uten navn',
  }));
};
