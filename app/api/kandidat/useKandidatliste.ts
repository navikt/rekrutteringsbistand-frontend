import useSWRImmutable from 'swr/immutable';
import { getAPIwithSchema } from '../../api/fetcher';
import { KandidatAPI } from '../api-routes';
import { kandidatlisetMock } from './mocks/kandidatlisteMock';
import { kandidatlisteSchema } from './schema.zod';

export const kandidatlisteEndepunkt = (stillingsId?: string) =>
  stillingsId
    ? `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatliste`
    : undefined;

export const useKandidatliste = (stillingsId?: string) => {
  return useSWRImmutable(
    stillingsId ? kandidatlisteEndepunkt(stillingsId) : null,
    getAPIwithSchema(kandidatlisteSchema),
  );
};

export const kandidatlisteMirage = (server: any) => {
  return server.get(kandidatlisteEndepunkt('*'), () => kandidatlisetMock);
};
