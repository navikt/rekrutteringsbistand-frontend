'use client';

import { useSWRGet } from '@/app/api/useSWRGet';
import { Roller } from '@/components/tilgangskontroll/roller';
import { z } from 'zod';

/**
 * Endepunkt /bruker
 */

const brukerEndepunkt = '/api/bruker';

const brukerSchema = z.object({
  navIdent: z.string(),
  roller: z.array(z.nativeEnum(Roller)),
});

export type BrukerDTO = z.infer<typeof brukerSchema>;

export const useBruker = () => useSWRGet(brukerEndepunkt, brukerSchema);
