import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { getAPIwithSchema } from '../../api/fetcher';
import { KandidatAPI } from '../api-routes';

export const kandidatlisteIdSchema = z.object({ kandidatlisteId: z.string() });

const useKandidatlisteId = (stillingsId?: string) => {
  return useSWRImmutable(
    stillingsId
      ? `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatlisteid`
      : undefined,
    getAPIwithSchema(kandidatlisteIdSchema),
  );
};
export default useKandidatlisteId;