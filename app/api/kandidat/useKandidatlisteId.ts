import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { getAPIwithSchema } from '../../api/fetcher';
import { KandidatAPI } from '../api-routes';

export const kandidatlisteIdSchema = z.object({ kandidatlisteId: z.string() });

export const kandidatListeIdEndepunkt = (stillingsId?: string) =>
  stillingsId
    ? `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatlisteid`
    : undefined;

export const useKandidatlisteId = (stillingsId?: string) => {
  return useSWRImmutable(
    stillingsId ? kandidatListeIdEndepunkt(stillingsId) : undefined,
    getAPIwithSchema(kandidatlisteIdSchema),
  );
};

export const kandidatlisteIdMirage = (server: any) => {
  return server.get(kandidatListeIdEndepunkt('*'), () => ({
    kandidatlisteId: 'test-kandidatliste-id',
  }));
};
