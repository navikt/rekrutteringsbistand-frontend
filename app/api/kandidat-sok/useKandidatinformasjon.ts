import useSWRImmutable from 'swr/immutable';
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchemaEs } from '../fetcher';
import { kandidatInformasjonMock } from './mocks/kandidatinformasjonMock';
import { KandidatDataSchema } from './schema/cvSchema.zod';

const kandidatinformasjonEndepunkt = `${KandidatSøkAPI.internUrl}/lookup-cv`;

export interface kandidatinformasjonProps {
  kandidatnr: string;
}

export const useKandidatinformasjon = (kandidatnr: string) =>
  useSWRImmutable(
    {
      url: kandidatinformasjonEndepunkt,
      body: { kandidatnr },
    },
    (data) => {
      return postApiWithSchemaEs(KandidatDataSchema)(data);
    },
  );

export const kandidatinformasjonMirage = (server: any) => {
  return server.post(
    kandidatinformasjonEndepunkt,
    () => kandidatInformasjonMock,
  );
};
