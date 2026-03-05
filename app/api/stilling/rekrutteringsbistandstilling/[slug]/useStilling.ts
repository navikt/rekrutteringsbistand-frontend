'use client';

import { StillingDataSchema } from './stilling.dto';
import { StillingAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';

/**
 * Endepunkt /useStilling
 */

export const stillingEndepunkt = (stillingsId: string) =>
  `${StillingAPI.internUrl}/rekrutteringsbistandstilling/${stillingsId}`;

export const useStilling = (stillingsId?: string | null) =>
  useSWRGet(
    stillingsId ? stillingEndepunkt(stillingsId) : null,
    StillingDataSchema,
    {
      revalidateOnFocus: false,
      // Bruker default SWR-oppførsel for revalidateOnMount (false når data finnes i cache)
    },
  );
