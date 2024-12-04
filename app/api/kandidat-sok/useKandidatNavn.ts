import { Server } from 'miragejs';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchema } from '../fetcher';

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

export const useKandidatNavn = (fødselsnummer: String | null) => {
  return useSWRImmutable(
    fødselsnummer
      ? {
          url: hentNavnEndepunkt,
          body: { fodselsnumme: fødselsnummer },
        }
      : null,
    (data) => {
      return postApiWithSchema(navnSchema)(data);
    },
  );
};

export const kandidatNavnMirage = (server: Server) => {
  server.post(hentNavnEndepunkt, () => {
    return {
      fornavn: 'Heldig',
      etternavn: 'Tomat',
      kilde: 'REKRUTTERINGSBISTAND',
    };
  });
};
