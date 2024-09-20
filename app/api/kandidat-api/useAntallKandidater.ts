import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { KandidatAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';

export const antallKandidaterSchema = z.object({
  antallKandidater: z.number(),
});

const useAntallKandidater = (stillingsId?: string) => {
  return useSWRImmutable(
    stillingsId
      ? `${KandidatAPI.internUrl}/veileder/kandidatlister/${stillingsId}/antallKandidater`
      : undefined,
    getAPIwithSchema(antallKandidaterSchema),
  );
};

export default useAntallKandidater;
