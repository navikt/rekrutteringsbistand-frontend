'use client';

/**
 * Endepunkt /useModiaAktivBruker
 */
import { ModiaDecoratorAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { Server } from 'miragejs';
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

export const modiaAktivBrukerMirage = (server: Server) => {
  server.get(modiaAktivBrukerEndepunkt, () => {
    return { aktivBruker: '16828397901' };
  });
};
