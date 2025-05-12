import { getSingleKandidatDataSchema } from '../../../mocks/kandidat.mock';
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
  server.post(hentArenaKandidatnrEndepunkt, (_, request) => {
    const body = JSON.parse(request.requestBody);
    const fodselsnummer = body.fodselsnummer;

    const parts = fodselsnummer?.split('-');

    // Check if the format is as expected
    if (parts && parts.length >= 3) {
      const seedString = parts[parts.length - 1];
      const seed = parseInt(seedString, 10);

      // Only proceed if we can get a valid seed number
      if (!isNaN(seed)) {
        // Get the mock data with this seed to ensure consistent values
        const kandidatData = getSingleKandidatDataSchema(seed);

        // Return the arenaKandidatnr from the mock data
        return {
          arenaKandidatnr: kandidatData.arenaKandidatnr,
        };
      }
    }
    return null;
  });
};
