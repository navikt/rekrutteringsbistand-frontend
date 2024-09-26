'use client';
/**
 * Endepunkt /minebrukere
 */
import useSWRImmutable from 'swr/immutable';
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchema } from '../fetcher';
import { kandidatSøkMock } from './mocks/kandidatsøkMock';
import { kandidatSokSchema } from './types';

export enum KandidatsøkTyper {
  MINE_BRUKERE = 'minebrukere',
  MITT_KONTOR = 'mittkontor',
  MINE_KONTOR = 'minekontor',
  ALLE_KONTOR = 'allekontor',
}

const kandidatSokEndepunkt = (type: KandidatsøkTyper | '*') =>
  `${KandidatSøkAPI.internUrl}/${type}`;

export const useKandidatsøk = (type: KandidatsøkTyper, payload: any) =>
  useSWRImmutable(
    {
      url: kandidatSokEndepunkt(type),
      body: payload,
    },
    (data) => {
      return postApiWithSchema(kandidatSokSchema)(data);
    },
  );

export const kandidatSokMirage = (server: any) => {
  return server.post(kandidatSokEndepunkt('*'), () => kandidatSøkMock);
};
