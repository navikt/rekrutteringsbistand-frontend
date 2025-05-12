import { getSingleKandidatDataSchema } from '../../../mocks/kandidat.mock';
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchemaEs } from '../fetcher';
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
  return server.post(kandidatinformasjonEndepunkt, (_: any, request: any) => {
    const body = JSON.parse(request.requestBody);
    const arenaKandidatnrFromRequest = body.kandidatnr;

    const parts = arenaKandidatnrFromRequest.split('-');
    const seedString = parts[parts.length - 1];
    const seed = parseInt(seedString, 10);

    const kandidatData = getSingleKandidatDataSchema(seed);

    return {
      hits: {
        hits: [
          {
            _source: kandidatData,
          },
        ],
      },
    };
  });
};
