'use client';

/**
 * Endepunkt /bruker
 */
import { brukerMock } from './mocks/useBrukerMock';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { Roller } from '@/components/tilgangskontroll/roller';
import { http, HttpResponse } from 'msw';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const brukerEndepunkt = '/api/bruker';

const BrukerSchema = z.object({
  navIdent: z.string(),
  roller: z.array(z.nativeEnum(Roller)),
});

export type BrukerDTO = z.infer<typeof BrukerSchema>;

export const useBruker = () =>
  useSWRImmutable(brukerEndepunkt, getAPIwithSchema(BrukerSchema));

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
