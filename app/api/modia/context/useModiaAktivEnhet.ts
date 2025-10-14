'use client';

/**
 * Endepunkt /useModiaAktivEnhet
 */
import { ModiaDecoratorAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const modiaAktivEnhetEndepunkt = `${ModiaDecoratorAPI.internUrl}/context/v2/aktivenhet`;

const ModiaAktivEnhetSchema = z.object({ aktivEnhet: z.string() });

export type ModiaAktivEnhetDTO = z.infer<typeof ModiaAktivEnhetSchema>;

export const useModiaAktivEnhet = () =>
  useSWRImmutable(
    modiaAktivEnhetEndepunkt,
    getAPIwithSchema(ModiaAktivEnhetSchema),
  );

export const modiaAktivEnhetMSWHandler = http.get(
  modiaAktivEnhetEndepunkt,
  () => HttpResponse.json({ aktivEnhet: '1337' }),
);
