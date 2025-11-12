'use client';

/**
 * Endepunkt /usePamPostdata
 */
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

const pamPostdataEndepunkt = (postnummer: string | null) =>
  postnummer ? `/api/pam-geografi/postdata/${postnummer}` : null;

const PostdataSchema = z.object({
  postkode: z.string(),
  by: z.string(),
  kommune: z.object({
    kommunenummer: z.string(),
    navn: z.string(),
    fylkesnummer: z.string(),
    korrigertNavn: z.string(),
  }),
  fylke: z.object({
    fylkesnummer: z.string(),
    navn: z.string(),
    korrigertNavn: z.string(),
  }),
  korrigertNavnBy: z.string(),
});

export type PamPostdataDTO = z.infer<typeof PostdataSchema>;

export const usePamPostdata = (postnummer: string) => {
  const riktigPostnummer = postnummer.length === 4 ? postnummer : null;

  return useSWRGet(
    riktigPostnummer ? pamPostdataEndepunkt(riktigPostnummer) : null,
    PostdataSchema,
  );
};

export const pamPostdataMSWHandler = http.get(
  '/api/pam-geografi/postdata/:postnummer',
  ({ params }) =>
    HttpResponse.json({
      postkode: (params.postnummer as string) || '1234',
      by: 'KRISTIANSAND S',
      kommune: {
        kommunenummer: '4204',
        navn: 'KRISTIANSAND',
        fylkesnummer: '42',
        korrigertNavn: 'Kristiansand',
      },
      fylke: {
        fylkesnummer: '42',
        navn: 'AGDER',
        korrigertNavn: 'Agder',
      },
      korrigertNavnBy: 'Kristiansand S',
    }),
);
