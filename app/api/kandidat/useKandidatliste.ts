import { mockKandidatliste } from '../../../mocks/kandidatliste.mock';
import { getAPIwithSchema } from '../../api/fetcher';
import { KandidatAPI } from '../api-routes';
import { StillingsDataDTO } from '../stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekrutteringsbistandStillingSchemaDTO } from '../stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import { kandidatlisteSchema } from './schema.zod';
import useSWRImmutable from 'swr/immutable';

export const kandidatlisteEndepunkt = (stillingsId?: string) =>
  stillingsId
    ? `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatliste`
    : undefined;

export const useKandidatliste = (
  stillingsData:
    | RekrutteringsbistandStillingSchemaDTO
    | StillingsDataDTO
    | undefined,
  erEier: boolean | undefined,
) => {
  const kanHenteKandidatliste =
    erEier &&
    stillingsData?.stilling.uuid &&
    stillingsData?.stilling?.publishedByAdmin;

  return useSWRImmutable(
    kanHenteKandidatliste
      ? kandidatlisteEndepunkt(stillingsData?.stilling.uuid)
      : null,
    getAPIwithSchema(kandidatlisteSchema, { skjulFeilmelding: true }),
  );
};

export const kandidatlisteMirage = (server: any) => {
  return server.get(kandidatlisteEndepunkt('*'), () => {
    return mockKandidatliste;
  });
};
