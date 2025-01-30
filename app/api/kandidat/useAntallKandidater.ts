import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { KandidatAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';

export const antallKandidaterSchema = z.object({
  antallKandidater: z.number(),
});

const antallKandidaterEndepunkt = (kandidatlisteId: string | null) =>
  kandidatlisteId
    ? `${KandidatAPI.internUrl}/veileder/kandidatlister/${kandidatlisteId}/antallKandidater`
    : undefined;

export const useAntallKandidater = (kandidatlisteId: string | null) => {
  return useSWRImmutable(
    antallKandidaterEndepunkt(kandidatlisteId),
    getAPIwithSchema(antallKandidaterSchema),
  );
};

export const antallKandidaterMirage = (server: any) => {
  return server.get(antallKandidaterEndepunkt('*'), () => ({
    antallKandidater: 13,
  }));
};
