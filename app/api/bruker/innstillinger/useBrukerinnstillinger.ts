'use client';

import { BrukerAPI } from '@/app/api/api-routes';
import { putApi } from '@/app/api/fetcher';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const brukerinnstillingerEndepunkt = `${BrukerAPI.internUrl}/innstillinger`;

const brukerinnstillingerSchema = z.object({
  antallLesteNyheter: z.number().int().nonnegative(),
  darkMode: z.boolean(),
  windowMode: z.boolean(),
  tekststørrelse: z.enum(['liten', 'standard', 'stor', 'ekstra-stor']),
});

export type BrukerinnstillingerDTO = z.infer<typeof brukerinnstillingerSchema>;

export const useBrukerinnstillinger = () =>
  useSWRGet(brukerinnstillingerEndepunkt, brukerinnstillingerSchema);

export const oppdaterBrukerinnstillinger = async (
  innstillinger: BrukerinnstillingerDTO,
) =>
  brukerinnstillingerSchema.parse(
    await putApi(brukerinnstillingerEndepunkt, innstillinger),
  );
