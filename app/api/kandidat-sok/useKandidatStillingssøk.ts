'use client';

/**
 * Endepunkt /useKandidatStillingssøk
 */
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchema } from '../fetcher';
import { mockKandidatStillingssøk } from './mocks/kandidatStillingssøk';
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
      ? postApiWithSchema(kandidatStillingssøkDTOSchema)({
          url,
          body: { kandidatnr: kandidatId },
        })
      : null,
  );

export const kandidatStillingsSøkMirage = (server: any) => {
  return server.post(
    kandidatStillingssøkEndepunkt,
    () => mockKandidatStillingssøk,
  );
};
