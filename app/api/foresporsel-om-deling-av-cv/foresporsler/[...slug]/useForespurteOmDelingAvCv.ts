'use client';

/**
 * Endepunkt /useForespurteOmDelingAvCv
 */
import { ForespørselDelingAvCvAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { generateMockForespurteOmDelingAvCv } from '@/mocks/forespurteOmDelingAvCv.mock';
import { http, HttpResponse } from 'msw';
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
    {
      refreshInterval: 20000, // 20 seconds
    },
  );

export const foresporselOmDelingAvCVMSWHandler = http.get(
  ForespurteOmDelingAvCvEndepunkt('*'),
  () => HttpResponse.json(generateMockForespurteOmDelingAvCv()),
);
