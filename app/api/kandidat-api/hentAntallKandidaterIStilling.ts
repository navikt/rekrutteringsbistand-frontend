/**
 * Endepunkt /kandidatsok-api/veileder/kandidatlister/:kandidatlisteId/antallKandidater
 */
import useSWRImmutable from 'swr';
import { z } from 'zod';
import { getAPIwithSchema } from '../fetcher';

const kandidatlisterEndepunkt = '/kandidat-api/veileder/kandidatlister';

export const antallKandidaterSchema = z.object({
  antallKandidater: z.number().nullable(),
});

export interface hentAntallKandidaterIListeProps {
  kandidatlisteId: string;
}

export const useHentAntallKandidaterIStilling = (
  props: hentAntallKandidaterIListeProps,
) => {
  return useSWRImmutable(
    `${kandidatlisterEndepunkt}/${props.kandidatlisteId}/antallKandidater`,
    getAPIwithSchema(antallKandidaterSchema),
  );
};
