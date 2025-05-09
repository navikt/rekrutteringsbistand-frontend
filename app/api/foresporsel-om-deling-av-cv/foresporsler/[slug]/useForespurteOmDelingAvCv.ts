'use client';

/**
 * Endepunkt /useForespurteOmDelingAvCv
 */
import { ForespørselDelingAvCvAPI } from '../../../api-routes';
import { getAPIwithSchema } from '../../../fetcher';
import { generateMockForespurteOmDelingAvCv } from './useForespurteOmDelingAvCv.mock';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const ForespurteOmDelingAvCvEndepunkt = (stillingsId: string) => {
  return `${ForespørselDelingAvCvAPI.internUrl}/foresporsler/${stillingsId}`;
};

const forespørselSvar = z.object({
  harSvartJa: z.boolean(),
  svarTidspunkt: z.string(),
  svartAv: z.object({
    ident: z.string(),
    identType: z.string(),
  }),
});

const ForespurtOmDelingSchema = z.object({
  aktørId: z.string(),
  stillingsId: z.string(),
  deltStatus: z.string(),
  deltTidspunkt: z.string(),
  deltAv: z.string(),
  svarfrist: z.string(),
  tilstand: z.string(),
  svar: forespørselSvar.nullable(),
  begrunnelseForAtAktivitetIkkeBleOpprettet: z.null(),
  navKontor: z.string(),
});

const ForespurteOmDelingAvCvSchema = z.record(
  z.string(),
  z.array(ForespurtOmDelingSchema),
);

export type KandidatForespurtOmDelingSchema = z.infer<
  typeof ForespurtOmDelingSchema
>;

export type ForespurteOmDelingAvCvDTO = z.infer<
  typeof ForespurteOmDelingAvCvSchema
>;

export const useForespurteOmDelingAvCv = (stillingsId: string) =>
  useSWRImmutable(
    ForespurteOmDelingAvCvEndepunkt(stillingsId),
    getAPIwithSchema(ForespurteOmDelingAvCvSchema),
  );

export const foresporselOmDelingAvCVMirage = (server: any) => {
  server.get(ForespurteOmDelingAvCvEndepunkt('*'), () =>
    generateMockForespurteOmDelingAvCv(),
  );
};
