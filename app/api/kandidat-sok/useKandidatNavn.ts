import { KandidatSøkAPI } from '@/app/api/api-routes';
import { postApiWithSchema } from '@/app/api/fetcher';
import { getSingleKandidatDataSchema } from '@/mocks/kandidat.mock';
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
          options: { skjulFeilmelding: [404, 403] },
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
    const fodselsnummer = body.fodselsnummer;

    // Keep special test cases
    switch (fodselsnummer) {
      case '16828397900':
        return {
          fornavn: 'TestFornavn',
          etternavn: 'TestEtternavn',
          kilde: KandidatKilde.REKRUTTERINGSBISTAND,
        };
      case '30081879652':
        return {
          fornavn: 'Usynlig',
          etternavn: 'Kandidat',
          kilde: KandidatKilde.PDL,
        };
      case '26040282334':
        return new MirageResponse(403, {});
      case '22034609946':
        return new MirageResponse(404, {});
      default:
        // For normal cases, use the mock generator
        // Parse seed from fodselsnummer format 'kandidat-fnr-{seed}'
        const parts = fodselsnummer?.split('-');

        if (parts && parts.length >= 3) {
          const seedString = parts[parts.length - 1];
          const seed = parseInt(seedString, 10);

          if (!isNaN(seed)) {
            // Get mock data with this seed for consistent values
            const kandidatData = getSingleKandidatDataSchema(seed);

            // Return the name data from our mock
            return {
              fornavn: kandidatData.fornavn,
              etternavn: kandidatData.etternavn,
              kilde: KandidatKilde.REKRUTTERINGSBISTAND,
            };
          }
        }

        return {
          fornavn: 'Heldig',
          etternavn: 'Tomat',
          kilde: KandidatKilde.REKRUTTERINGSBISTAND,
        };
    }
  });
};
