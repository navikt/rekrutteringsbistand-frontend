import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchema } from '../fetcher';
import { Server } from 'miragejs';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

export enum KandidatKilde {
  REKRUTTERINGSBISTAND = 'REKRUTTERINGSBISTAND',
  PDL = 'PDL',
}

export const hentArenaKandidatnrEndepunkt = `${KandidatSøkAPI.internUrl}/arena-kandidatnr`;

export const arenaKandidatnrSchema = z.object({
  arenaKandidatnr: z.string().nullable(),
});
export type ArenaKandidatnr = z.infer<typeof arenaKandidatnrSchema>;

export const useArenaKandidatnr = (fødselsnummer: string | null) => {
  return useSWRImmutable(
    fødselsnummer
      ? {
          url: hentArenaKandidatnrEndepunkt,
          body: { fodselsnummer: fødselsnummer },
        }
      : null,
    (data) => {
      return postApiWithSchema(arenaKandidatnrSchema)(data);
    },
  );
};

export const arenaKandidatnrMirage = (server: Server) => {
  server.post(hentArenaKandidatnrEndepunkt, (schema, request) => {
    const body = JSON.parse(request.requestBody);

    switch (body.fodselsnummer) {
      case 'testKandidat-Frn-1':
        return null;
      default:
        return {
          arenaKandidatnr: '1234567890',
        };
    }
  });
};
