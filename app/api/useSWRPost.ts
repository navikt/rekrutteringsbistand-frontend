'use client';

import {
  fetchOptions,
  getAPIwithSchema,
  postApiWithSchemaEs,
} from '@/app/api/fetcher';
import useSWR, { type SWRConfiguration } from 'swr';
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
  // Lag en unik cache-nøkkel ved å kombinere endepunkt med stringifisert body
  // Hvis body er null, bruk null som nøkkel for å forhindre fetching
  const cacheKey = body ? [endpoint, JSON.stringify(body)] : null;

  const fetcher = () =>
    body && endpoint
      ? config?.elastic
        ? postApiWithSchemaEs(schema)({
            url: endpoint,
            body,
          })
        : getAPIwithSchema(schema, config?.fetchOptions)(endpoint)
      : null;

  const { nonImmutable, ...swrConfig } = config || {};

  // Slå sammen konfigurasjon med immutable-innstillinger
  // (deaktiver revalidering) med mindre nonImmutable er true
  const finalConfig: SWRConfiguration = nonImmutable
    ? swrConfig
    : {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        ...swrConfig,
      };

  return useSWR(cacheKey, fetcher, finalConfig);
}
