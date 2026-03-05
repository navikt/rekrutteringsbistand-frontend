'use client';

/**
 * Endepunkt /useModiaAktivBruker
 */
import { ModiaDecoratorAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

const modiaAktivBrukerEndepunkt = `${ModiaDecoratorAPI.internUrl}/context/v2/aktivbruker`;

const ModiaAktivBrukerSchema = z.object({ aktivBruker: z.string().nullable() });

export type ModiaAktivBrukerDTO = z.infer<typeof ModiaAktivBrukerSchema>;

export const useModiaAktivBruker = () =>
  useSWRGet(modiaAktivBrukerEndepunkt, ModiaAktivBrukerSchema);
