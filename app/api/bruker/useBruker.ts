'use client';

/**
 * Endepunkt /bruker
 */
import { brukerMock } from './mocks/useBrukerMock';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Server } from 'miragejs';
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

export const brukerMirage = (server: Server) => {
  return server.get(brukerEndepunkt, () => {
    const rolle =
      localStorage.getItem('DEV-ROLLE') ||
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER;

    const bruker = localStorage.getItem('DEV-BRUKER') || 'TestIdent';

    return {
      ...brukerMock,
      roller: [rolle],
      navIdent: bruker,
    };
  });
};
