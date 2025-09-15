import { kandidatlisteSchema } from './schema.zod';
import { KandidatAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import { mockKandidatliste } from '@/mocks/kandidatliste.mock';
import useSWRImmutable from 'swr/immutable';

export const kandidatlisteEndepunkt = (stillingsId?: string) =>
  stillingsId
    ? `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatliste`
    : undefined;

export const useKandidatlisteForEier = (
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
