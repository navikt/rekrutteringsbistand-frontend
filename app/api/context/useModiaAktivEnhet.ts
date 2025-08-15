'use client';

/**
 * Endepunkt /useModiaAktivEnhet
 */
import { ModiaDecoratorAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import { Server } from 'miragejs';
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

export const modiaAktivEnhetMirage = (server: Server) => {
  server.get(modiaAktivEnhetEndepunkt, () => {
    return { aktivEnhet: '1337' };
  });
};
