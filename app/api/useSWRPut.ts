'use client';

import { fetchOptions, putApi } from '@/app/api/fetcher';
import useSWR, { type SWRConfiguration } from 'swr';
import { type z } from 'zod';

/**
 * Tilpasset SWR-hook for PUT-forespørsler som inkluderer body-data i cache-nøkkelen.
 * Dette sikrer at forskjellige PUT-bodies resulterer i separate cache-innlegg.
 *
 * Bruker immutable-modus som standard siden PUT-responser typisk er immutable
 * for samme input. PUT-data endres vanligvis ikke, så automatisk revalidering
 * er deaktivert.
 *
 * Merk: PUT-forespørsler via SWR er noe uvanlig siden PUT typisk brukes
 * for mutasjoner. Vurder å bruke mutasjonsfunksjoner istedenfor hvis du trenger å trigge
 * oppdateringer manuelt.
 *
 * @param endpoint - API-endepunkt URL
 * @param schema - Zod-skjema for respons-validering
 * @param body - Request body (blir inkludert i cache-nøkkelen)
 * @param config - Valgfri SWR-konfigurasjon
 * @param nonImmutable - Sett til true for å aktivere automatisk revalidering
 *
 * @example
 * ```typescript
 * const { data } = useSWRPut(
 *   '/api/kandidat/123',
 *   kandidatSchema,
 *   { navn: 'John Doe', email: 'john@example.com' },
 * );
 *
 * // Med automatisk revalidering
 * const { data } = useSWRPut(
 *   '/api/live-update',
 *   resultSchema,
 *   { status: 'active' },
 *   { nonImmutable: true },
 * );
 * ```
 */
export function useSWRPut<SchemaType>(
  endpoint: string | null,
  schema: z.ZodType<SchemaType>,
  body: Record<string, any> | null,
  config?: SWRConfiguration & {
    nonImmutable?: boolean;
    fetchOptions?: fetchOptions;
  },
) {
  // Lag en unik cache-nøkkel ved å kombinere endepunkt med stringifisert body
  // Hvis body er null, bruk null som nøkkel for å forhindre fetching
  const cacheKey = body ? [endpoint, 'PUT', JSON.stringify(body)] : null;

  const fetcher = async () => {
    if (!body || !endpoint) return null;

    const response = await putApi(endpoint, body, config?.fetchOptions);
    return schema.parse(response);
  };

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
