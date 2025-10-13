import { KandidatSøkAPI } from '@/app/api/api-routes';
import { postApiWithSchema } from '@/app/api/fetcher';
import { getSingleKandidatDataSchema } from '@/mocks/kandidat.mock';
import { http, HttpResponse } from 'msw';
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

export const kandidatNavnMSWHandler = http.post(
  hentNavnEndepunkt,
  async ({ request }) => {
    const raw = await request.json().catch(() => undefined);
    const fodselsnummer = (raw && (raw as any).fodselsnummer) as
      | string
      | undefined;
    if (!fodselsnummer) {
      return new Response(null, { status: 400 });
    }
    switch (fodselsnummer) {
      case '16828397900':
        return HttpResponse.json({
          fornavn: 'TestFornavn',
          etternavn: 'TestEtternavn',
          kilde: KandidatKilde.REKRUTTERINGSBISTAND,
        });
      case '30081879652':
        return HttpResponse.json({
          fornavn: 'Usynlig',
          etternavn: 'Kandidat',
          kilde: KandidatKilde.PDL,
        });
      case '26040282334':
        return new Response(null, { status: 403 });
      case '22034609946':
        return new Response(null, { status: 404 });
      default: {
        const parts = fodselsnummer?.split('-');
        if (parts && parts.length >= 3) {
          const seedString = parts[parts.length - 1];
          const seed = parseInt(seedString, 10);
          if (!isNaN(seed)) {
            const kandidatData = getSingleKandidatDataSchema(seed);
            return HttpResponse.json({
              fornavn: kandidatData.fornavn,
              etternavn: kandidatData.etternavn,
              kilde: KandidatKilde.REKRUTTERINGSBISTAND,
            });
          }
        }
        return HttpResponse.json({
          fornavn: 'Heldig',
          etternavn: 'Tomat',
          kilde: KandidatKilde.REKRUTTERINGSBISTAND,
        });
      }
    }
  },
);
