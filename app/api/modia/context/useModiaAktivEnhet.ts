'use client';

/**
 * Endepunkt /useModiaAktivEnhet
 */
import { ModiaDecoratorAPI } from '@/app/api/api-routes';
import { useSWRGet } from '@/app/api/useSWRGet';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

const modiaAktivEnhetEndepunkt = `${ModiaDecoratorAPI.internUrl}/context/v2/aktivenhet`;

const ModiaAktivEnhetSchema = z.object({ aktivEnhet: z.string() });

export type ModiaAktivEnhetDTO = z.infer<typeof ModiaAktivEnhetSchema>;

export const useModiaAktivEnhet = () =>
  useSWRGet(modiaAktivEnhetEndepunkt, ModiaAktivEnhetSchema);

export const modiaAktivEnhetMSWHandler = http.get(
  modiaAktivEnhetEndepunkt,
  () => HttpResponse.json({ aktivEnhet: '1337' }),
);
