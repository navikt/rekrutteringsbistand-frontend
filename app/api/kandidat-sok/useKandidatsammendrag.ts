import { KandidatSøkAPI } from '@/app/api/api-routes';
import { getSingleKandidatSammendrag } from '@/app/api/kandidat-sok/mocks/kandidat.mock';
import { useSWRPost } from '@/app/api/useSWRPost';
import { postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
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
  useSWRPost(
    kandidatsammendragEndepunkt,
    kandidatsammendragSchema,
    {
      kandidatnr,
    },
    { elastic: true },
  );

export const kandidatsammendragMSWHandler = postMock(
  kandidatsammendragEndepunkt,
  async ({ request }) => {
    const raw = (await request.json().catch(() => undefined)) as
      | { kandidatnr?: string }
      | undefined;
    const kandidatnr = raw?.kandidatnr;
    if (!kandidatnr) return new Response(null, { status: 400 });
    const parts = kandidatnr.split('-');
    const seed = parseInt(parts[parts.length - 1], 10);
    const sammendrag = getSingleKandidatSammendrag(seed);
    return HttpResponse.json({
      hits: { hits: [{ _source: sammendrag }] },
    });
  },
);
