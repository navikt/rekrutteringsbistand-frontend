import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { getAPIwithSchema } from '../../api/fetcher';
import { KandidatsøkAPI } from '../api-routes';

export const antallKandidaterSchema = z.object({
  antallKandidater: z.number(),
});

const useAntallKandidater = (stillingsId?: string) => {
  return useSWRImmutable(
    stillingsId
      ? `${KandidatsøkAPI.internUrl}/veileder/kandidatlister/${stillingsId}/antallKandidater`
      : undefined,
    getAPIwithSchema(antallKandidaterSchema),
  );
};

export default useAntallKandidater;
