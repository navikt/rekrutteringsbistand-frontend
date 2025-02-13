'use client';
/**
 * Endepunkt /FinnArbeidsgiver
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { geografiSchema } from '../../../../types/stilling/geografi';
import { getMiljø, Miljø } from '../../../../util/miljø';
import { StillingAPI } from '../../api-routes';
import { postApiWithSchema } from '../../fetcher';
import devVirksomheter from './mocks/devVirksomheter';

const finnArbeidsgiverEndepunkt = () => {
  return `${StillingAPI.internUrl}/finn-arbeidsgiver`;
};

const FinnArbeidsgiverSchema = z.object({
  location: geografiSchema,
  name: z.string(),
  orgnr: z.string().nullable(),
});
const FinnArbeidsgiverSchemaDTO = z.array(FinnArbeidsgiverSchema);

export type FinnArbeidsgiverDTO = z.infer<typeof FinnArbeidsgiverSchema>;

const devMiljø = getMiljø() !== Miljø.ProdGcp;

export const useFinnArbeidsgiverOld = (orgnr: string) => {
  const søkeOrd = devMiljø ? 'dev-gcp' : orgnr;

  return useSWRImmutable(
    {
      url: finnArbeidsgiverEndepunkt(),
      body: søkeOrd.replace(/\s/g, ''),
    },
    (data) => {
      return postApiWithSchema(FinnArbeidsgiverSchemaDTO)(data);
    },
  );
};

export const finnArbeidsgiverMirageOld = (server: any) => {
  return server.post(finnArbeidsgiverEndepunkt(), () => devVirksomheter);
};
