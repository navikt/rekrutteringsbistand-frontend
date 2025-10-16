'use client';

import { KandidatSøkAPI } from '@/app/api/api-routes';
import { postApiWithSchemaEs } from '@/app/api/fetcher';
import { getSingleKandidatStillingssøk } from '@/mocks/kandidat.mock';
import { http, HttpResponse } from 'msw';
/**
 * Endepunkt /useKandidatStillingssøk
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const kandidatStillingssøkEndepunkt = `${KandidatSøkAPI.internUrl}/kandidat-stillingssok`;

const yrkeJobbonskeSchema = z.object({
  styrkBeskrivelse: z.string(),
  sokeTitler: z.array(z.string()),
  primaertJobbonske: z.boolean(),
  styrkKode: z.string().nullable(),
});

const geografiJobbonskeSchema = z.object({
  geografiKodeTekst: z.string(),
  geografiKode: z.string(),
});

export const kandidatStillingssøkDTOSchema = z.object({
  yrkeJobbonskerObj: z.array(yrkeJobbonskeSchema),
  geografiJobbonsker: z.array(geografiJobbonskeSchema),
  kommunenummerstring: z.string().nullable(),
  kommuneNavn: z.string().nullable(),
});

export type YrkeJobbonskeStillingsSøkDTO = z.infer<typeof yrkeJobbonskeSchema>;
export type KandidatStillingssøkDTO = z.infer<
  typeof kandidatStillingssøkDTOSchema
>;

export const useKandidatStillingssøk = (kandidatId: string | null) =>
  useSWRImmutable(kandidatStillingssøkEndepunkt, (url) =>
    kandidatId
      ? postApiWithSchemaEs(kandidatStillingssøkDTOSchema)({
          url,
          body: { kandidatnr: kandidatId },
        })
      : null,
  );

export const kandidatStillingssøkMSWHandler = http.post(
  kandidatStillingssøkEndepunkt,
  async ({ request }) => {
    const raw = await request.json().catch(() => undefined);
    const kandidatnr = (raw && (raw as any).kandidatnr) as string | undefined;
    if (!kandidatnr) return new Response(null, { status: 400 });
    if (kandidatnr === 'utenTilgang') {
      return HttpResponse.json({
        yrkeJobbonskerObj: [],
        geografiJobbonsker: [],
        kommunenummerstring: null,
        kommuneNavn: null,
      });
    }
    const parts = kandidatnr.split('-');
    const seed = parseInt(parts[parts.length - 1], 10);
    const stillingssokData = getSingleKandidatStillingssøk(seed);
    return HttpResponse.json({
      hits: { hits: [{ _source: stillingssokData }] },
    });
  },
);
