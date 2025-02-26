'use client';
/**
 * Endepunkt /usePamPostdata
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { getAPIwithSchema } from '../../../fetcher';

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

  return useSWRImmutable(
    pamPostdataEndepunkt(riktigPostnummer),
    getAPIwithSchema(PostdataSchema),
  );
};

export const pamPostdataMirage = (server: any) =>
  server.get(pamPostdataEndepunkt('*'), () => {
    return {
      postkode: '1234',
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
    };
  });
