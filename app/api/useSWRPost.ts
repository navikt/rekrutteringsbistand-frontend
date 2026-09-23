'use client';

import {
  fetchOptions,
  postApiWithSchema,
  postApiWithSchemaEs,
} from '@/app/api/fetcher';
import { useSWRPost as pakkeUseSWRPost } from '@navikt/toi-next-frontend/swr';
import { type SWRConfiguration } from 'swr';
import { type z } from 'zod';

/**
 * Tilpasset SWR-hook for POST-forespørsler som inkluderer body-data i cache-nøkkelen.
 * Dette sikrer at forskjellige POST-bodies resulterer i separate cache-innlegg.
 *
 * Bruker immutable-modus som standard siden POST-responser typisk er immutable
 * for samme input. POST-data endres vanligvis ikke, så automatisk revalidering
 * er deaktivert.
 *
 * @param endpoint - API-endepunkt URL
 * @param schema - Zod-skjema for respons-validering
 * @param body - Request body (blir inkludert i cache-nøkkelen)
 * @param config - Valgfri SWR-konfigurasjon
 * @param nonImmutable - Sett til true for å aktivere automatisk revalidering
 *
 * @example
 * ```typescript
 * const { data } = useSWRPost(
 *   '/api/kandidat-stillingssok',
 *   kandidatStillingssøkDTOSchema,
 *   { kandidatnr: kandidatId },
 * );
 *
 * // Med automatisk revalidering
 * const { data } = useSWRPost(
 *   '/api/live-search',
 *   searchResultSchema,
 *   { query: searchTerm },
 *   { nonImmutable: true },
 * );
 * ```
 */
export function useSWRPost<SchemaType>(
  endpoint: string | null,
  schema: z.ZodType<SchemaType>,
  body: Record<string, any> | null,
  config?: SWRConfiguration & {
    nonImmutable?: boolean;
    elastic?: boolean;
    fetchOptions?: fetchOptions;
  },
) {
  const { elastic, ...pakkeConfig } = config ?? {};

  return pakkeUseSWRPost<SchemaType, Record<string, any>, fetchOptions>(
    endpoint,
    schema,
    body,
    ({ endpoint: url, schema: skjema, body: data, fetchOptions: valg }) =>
      elastic
        ? postApiWithSchemaEs(skjema)({ url, body: data })
        : postApiWithSchema(skjema)({ url, body: data, options: valg }),
    pakkeConfig,
  );
}
