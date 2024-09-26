import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { KandidatAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';

export const antallKandidaterSchema = z.object({
  antallKandidater: z.number(),
});

const antallKandidaterEndepunkt = (stillingsId?: string) =>
  stillingsId
    ? `${KandidatAPI.internUrl}/veileder/kandidatlister/${stillingsId}/antallKandidater`
    : undefined;

export const useAntallKandidater = (stillingsId?: string) => {
  return useSWRImmutable(
    antallKandidaterEndepunkt(stillingsId),
    getAPIwithSchema(antallKandidaterSchema),
  );
};

export const antallKandidaterMirage = (server: any) => {
  return server.get(antallKandidaterEndepunkt('*'), () => ({
    antallKandidater: 13,
  }));
};
