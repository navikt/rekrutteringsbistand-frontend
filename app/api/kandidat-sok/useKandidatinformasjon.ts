import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchemaEs } from '../fetcher';
import { kandidatInformasjonMock } from './mocks/kandidatinformasjonMock';
import { KandidatDataSchema } from './schema/cvSchema.zod';
import useSWRImmutable from 'swr/immutable';

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
