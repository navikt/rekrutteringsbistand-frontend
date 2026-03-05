'use client';

/**
 * Endepunkt /usePamPostdata
 */
import { useSWRGet } from '@/app/api/useSWRGet';
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
