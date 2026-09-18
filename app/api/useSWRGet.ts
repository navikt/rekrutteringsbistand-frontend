'use client';

import {
  fetchOptions,
  getAPIwithSchema,
  getApiWithSchemaEs,
} from '@/app/api/fetcher';
import { useSWRGet as pakkeUseSWRGet } from '@navikt/toi-next-frontend/swr';
import { type SWRConfiguration } from 'swr';
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
  const { elastic, ...pakkeConfig } = config ?? {};

  return pakkeUseSWRGet<SchemaType, fetchOptions>(
    endpoint,
    schema,
    ({ endpoint: url, schema: skjema, fetchOptions: valg }) =>
      elastic
        ? getApiWithSchemaEs(skjema)({ url })
        : getAPIwithSchema(skjema, valg)(url),
    pakkeConfig,
  );
}
