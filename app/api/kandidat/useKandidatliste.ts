import useSWRImmutable from 'swr/immutable';
import { getAPIwithSchema } from '../../api/fetcher';
import { KandidatAPI } from '../api-routes';
import { kandidatlisteSchema } from './typer/kandidatliste.zod';

const useKandidatliste = (stillingsId?: string) => {
  return useSWRImmutable(
    stillingsId
      ? `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatliste`
      : undefined,
    getAPIwithSchema(kandidatlisteSchema),
  );
};

export default useKandidatliste;
