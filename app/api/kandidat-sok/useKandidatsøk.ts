'use client';
/**
 * Endepunkt /minebrukere
 */
import useSWRImmutable from 'swr/immutable';
import { KandidatSøkPortefølje } from '../../kandidat-sok/components/PorteføljeTabs';
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchema } from '../fetcher';
import { kandidatSøkMock } from './mocks/kandidatsøkMock';
import { kandidatSokSchema } from './types';

const kandidatSokEndepunkt = (type: KandidatSøkPortefølje | '*') =>
  `${KandidatSøkAPI.internUrl}/kandidatsok/${type}`;

export const useKandidatsøk = (type: KandidatSøkPortefølje, payload: any) =>
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
