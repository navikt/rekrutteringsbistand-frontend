'use client';

/**
 * Endepunkt /useModiaAktivBruker
 */
import { ModiaDecoratorAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const modiaAktivBrukerEndepunkt = `${ModiaDecoratorAPI.internUrl}/context/v2/aktivbruker`;

const ModiaAktivBrukerSchema = z.object({ aktivBruker: z.string().nullable() });

export type ModiaAktivBrukerDTO = z.infer<typeof ModiaAktivBrukerSchema>;

export const useModiaAktivBruker = () =>
  useSWRImmutable(
    modiaAktivBrukerEndepunkt,
    getAPIwithSchema(ModiaAktivBrukerSchema),
  );

export const modiaAktivBrukerMSWHandler = http.get(
  modiaAktivBrukerEndepunkt,
  () => HttpResponse.json({ aktivBruker: '16828397901' }),
);
