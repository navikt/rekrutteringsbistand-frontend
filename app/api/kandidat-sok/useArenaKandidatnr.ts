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
          options: { skjulFeilmelding: [404, 403] },
        }
      : null,
    (data) => {
      return postApiWithSchema(arenaKandidatnrSchema)(data);
    },
  );
};

export const arenaKandidatnrMSWHandler = http.post(
  hentArenaKandidatnrEndepunkt,
  async ({ request }) => {
    const raw = await request.json().catch(() => undefined);
    const fodselsnummer = (raw && (raw as any).fodselsnummer) as
      | string
      | undefined;
    if (!fodselsnummer) return new Response(null, { status: 400 });

    if (fodselsnummer === '16828397901') {
      return HttpResponse.json({ arenaKandidatnr: null });
    }
    if (fodselsnummer === '16828397900') {
      return HttpResponse.json({ arenaKandidatnr: 'test-arena-kandidatnr' });
    }
    const parts = fodselsnummer.split('-');
    if (parts.length >= 3) {
      const seed = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(seed)) {
        const kandidatData = getSingleKandidatDataSchema(seed);
        return HttpResponse.json({
          arenaKandidatnr: kandidatData.arenaKandidatnr,
        });
      }
    }
    return HttpResponse.json(null);
  },
);
