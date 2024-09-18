import useSWRImmutable from 'swr/immutable';
import { getAPIwithSchema } from '../../api/fetcher';
import { kandidatlisteSchema } from './typer/kandidatliste.zod';

const useKandidatliste = (stillingsId?: string) => {
  return useSWRImmutable(
    stillingsId
      ? `/api/kandidat-api/veileder/stilling/${stillingsId}/kandidatliste`
      : undefined,
    getAPIwithSchema(kandidatlisteSchema),
  );
};

export default useKandidatliste;
