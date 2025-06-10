import { mockKandidatliste } from '../../../mocks/kandidatliste.mock';
import { getAPIwithSchema } from '../../api/fetcher';
import { KandidatAPI } from '../api-routes';
import { kandidatlisteSchema } from './schema.zod';
import useSWRImmutable from 'swr/immutable';

export const kandidatlisteEndepunkt = (stillingsId?: string) =>
  stillingsId
    ? `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatliste`
    : undefined;

export const useKandidatliste = (
  stillingsId: string | undefined,
  erEier: boolean | undefined,
) => {
  return useSWRImmutable(
    erEier && stillingsId ? kandidatlisteEndepunkt(stillingsId) : null,
    getAPIwithSchema(kandidatlisteSchema, true),
  );
};

export const kandidatlisteMirage = (server: any) => {
  return server.get(kandidatlisteEndepunkt('*'), () => {
    return mockKandidatliste;
  });
};
