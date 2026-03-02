'use client';

import { KandidatSøkAPI } from '@/app/api/api-routes';
import { useSWRPost } from '@/app/api/useSWRPost';
import { z } from 'zod';

/**
 * Endepunkt /useKandidatStillingssøk
 */

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
  useSWRPost(
    kandidatId ? kandidatStillingssøkEndepunkt : null,
    kandidatStillingssøkDTOSchema,
    {
      kandidatnr: kandidatId,
    },
    { elastic: true },
  );
