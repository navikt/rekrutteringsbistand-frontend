'use client';

import { jobbsøkereMock } from './mocks/jobbsøkereMock';
import { OpprettJobbsøkerDTO, OpprettJobbsøkereDTO } from './schemas';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { postApi } from '@/app/api/fetcher';

export type { OpprettJobbsøkerDTO, OpprettJobbsøkereDTO };

const rekrutteringstreffJobbsøkereEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}/jobbsoker`;

export const opprettJobbsøkere = (
  id: string,
  kandidater: OpprettJobbsøkereDTO,
) => postApi(rekrutteringstreffJobbsøkereEndepunkt(id), kandidater);

export const opprettJobbsøkereMirage = (server: any) => {
  return server.post(
    rekrutteringstreffJobbsøkereEndepunkt(
      'd6a587cd-8797-4b9a-a68b-575373f16d65',
    ),
    () => jobbsøkereMock[0],
  );
};
