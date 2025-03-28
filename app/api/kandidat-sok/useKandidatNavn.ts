import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchema } from '../fetcher';
import { Response as MirageResponse, Server } from 'miragejs';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

export enum KandidatKilde {
  REKRUTTERINGSBISTAND = 'REKRUTTERINGSBISTAND',
  PDL = 'PDL',
}

export const hentNavnEndepunkt = `${KandidatSøkAPI.internUrl}/navn`;

export const navnSchema = z.object({
  fornavn: z.string().nullable(),
  etternavn: z.string().nullable(),
  kilde: z.nativeEnum(KandidatKilde),
});

export type Kandidatnavn = z.infer<typeof navnSchema>;

export const useKandidatNavn = (fødselsnummer: string | null) => {
  return useSWRImmutable(
    fødselsnummer
      ? {
          url: hentNavnEndepunkt,
          body: { fodselsnummer: fødselsnummer },
        }
      : null,
    (data) => {
      return postApiWithSchema(navnSchema)(data);
    },
  );
};

export const kandidatNavnMirage = (server: Server) => {
  server.post(hentNavnEndepunkt, (schema, request) => {
    const body = JSON.parse(request.requestBody);

    switch (body.fodselsnummer) {
      case '30081879652':
        return {
          fornavn: 'Usynlig',
          etternavn: 'Tomat',
          kilde: 'PDL',
        };
      case '26040282334':
        return new MirageResponse(403, {});
      case '22034609946':
        return new MirageResponse(404, {});
      default:
        return {
          fornavn: 'Heldig',
          etternavn: 'Tomat',
          kilde: 'REKRUTTERINGSBISTAND',
        };
    }
  });
};
