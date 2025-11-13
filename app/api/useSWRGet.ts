'use client';

import {
  fetchOptions,
  getAPIwithSchema,
  getApiWithSchemaEs,
} from '@/app/api/fetcher';
import useSWR, { type SWRConfiguration } from 'swr';
import { type z } from 'zod';

/**
 * Tilpasset SWR-hook for GET-forespørsler med Zod-skjema-validering.
 *
 * Bruker immutable-modus som standard siden GET-responser typisk er immutable.
 * Data caches og blir ikke automatisk revalidert.
 *
 * @param endpoint - API-endepunkt URL (send null for å deaktivere fetching)
 * @param schema - Zod-skjema for respons-validering
 * @param config - Valgfri SWR-konfigurasjon
 * @param nonImmutable - Sett til true for å aktivere automatisk revalidering
 *
 * @example
 * ```typescript
 * const { data, error, isLoading } = useSWRGet(
 *   '/api/kandidat/123',
 *   kandidatSchema,
 * );
 *
 * // Betinget fetching
 * const { data } = useSWRGet(
 *   kandidatId ? `/api/kandidat/${kandidatId}` : null,
 *   kandidatSchema,
 * );
 *
 * // Med automatisk revalidering
 * const { data } = useSWRGet(
 *   '/api/live-data',
 *   liveDataSchema,
 *   { nonImmutable: true },
 * );
 * ```
 */
export function useSWRGet<SchemaType>(
  endpoint: string | null,
  schema: z.ZodType<SchemaType>,
  config?: SWRConfiguration & {
    nonImmutable?: boolean;
    elastic?: boolean;
    fetchOptions?: fetchOptions;
  },
) {
  const fetcher = endpoint
    ? () =>
        config?.elastic
          ? getApiWithSchemaEs(schema)({ url: endpoint })
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

  return useSWR(endpoint, fetcher, finalConfig);
}
