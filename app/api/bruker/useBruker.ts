'use client';

import { brukerMock } from './mocks/useBrukerMock';
import { useSWRGet } from '@/app/api/useSWRGet';
/**
 * Endepunkt /bruker
 */
import { Roller } from '@/components/tilgangskontroll/roller';
import { http, HttpResponse } from 'msw';
import { z } from 'zod';

const brukerEndepunkt = '/api/bruker';

const brukerSchema = z.object({
  navIdent: z.string(),
  roller: z.array(z.nativeEnum(Roller)),
});

export type BrukerDTO = z.infer<typeof brukerSchema>;

export const useBruker = () => useSWRGet(brukerEndepunkt, brukerSchema);

export const brukerMSWHandler = http.get(brukerEndepunkt, () => {
  const rolle =
    (typeof window !== 'undefined' && localStorage.getItem('DEV-ROLLE')) ||
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER;

  const bruker =
    (typeof window !== 'undefined' && localStorage.getItem('DEV-BRUKER')) ||
    'TestIdent';

  return HttpResponse.json({
    ...brukerMock,
    roller: [rolle as Roller],
    navIdent: bruker,
  });
});
