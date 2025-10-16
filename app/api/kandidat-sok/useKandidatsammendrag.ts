import { KandidatSøkAPI } from '@/app/api/api-routes';
import { postApiWithSchemaEs } from '@/app/api/fetcher';
import { getSingleKandidatSammendrag } from '@/mocks/kandidat.mock';
import { http, HttpResponse } from 'msw';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const kandidatsammendragEndepunkt = `${KandidatSøkAPI.internUrl}/kandidatsammendrag`;

export const kandidatsammendragSchema = z.object({
  orgenhet: z.string().nullable(),
  adresselinje1: z.string().nullable(),
  fornavn: z.string(),
  poststed: z.string().nullable(),
  fodselsdato: z.string(),
  etternavn: z.string(),
  epostadresse: z.string().nullable(),
  postnummer: z.string().nullable(),
  telefon: z.string().nullable(),
  veilederIdent: z.string().nullable(),
  veilederEpost: z.string().nullable(),
  veilederVisningsnavn: z.string().nullable(),
  arenaKandidatnr: z.string(),
  fodselsnummer: z.string(),
});

export type KandidatsammendragDTO = z.infer<typeof kandidatsammendragSchema>;

export interface KandidatsammendragProps {
  kandidatnr: string;
}

export const useKandidatsammendrag = (kandidatnr: string) =>
  useSWRImmutable(
    {
      url: kandidatsammendragEndepunkt,
      body: { kandidatnr },
    },
    (data) => {
      return postApiWithSchemaEs(kandidatsammendragSchema)(data);
    },
  );

export const kandidatsammendragMSWHandler = http.post(
  kandidatsammendragEndepunkt,
  async ({ request }) => {
    const raw = await request.json().catch(() => undefined);
    const kandidatnr = (raw && (raw as any).kandidatnr) as string | undefined;
    if (!kandidatnr) return new Response(null, { status: 400 });
    const parts = kandidatnr.split('-');
    const seed = parseInt(parts[parts.length - 1], 10);
    const sammendrag = getSingleKandidatSammendrag(seed);
    return HttpResponse.json({
      hits: { hits: [{ _source: sammendrag }] },
    });
  },
);
