'use client';

import { KandidatSøkAPI } from '@/app/api/api-routes';
import { postApiWithSchemaEs } from '@/app/api/fetcher';
import { getSingleKandidatStillingssøk } from '@/mocks/kandidat.mock';
import { Server } from 'miragejs';
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

export const kandidatStillingsSøkMirage = (server: Server) => {
  return server.post(kandidatStillingssøkEndepunkt, (_, request) => {
    const body = JSON.parse(request.requestBody);
    const arenaKandidatnrFromRequest = body.kandidatnr;

    // Handle special test cases if needed
    if (arenaKandidatnrFromRequest === 'utenTilgang') {
      return {
        yrkeJobbonskerObj: [],
        geografiJobbonsker: [],
        kommunenummerstring: null,
        kommuneNavn: null,
      };
    }

    // Extract seed from arenaKandidatnr
    const parts = arenaKandidatnrFromRequest.split('-');
    const seedString = parts[parts.length - 1];
    const seed = parseInt(seedString, 10);

    // Get stillingssøk data using the seed
    const stillingssøkData = getSingleKandidatStillingssøk(seed);

    return {
      hits: {
        hits: [
          {
            _source: stillingssøkData,
          },
        ],
      },
    };
  });
};
