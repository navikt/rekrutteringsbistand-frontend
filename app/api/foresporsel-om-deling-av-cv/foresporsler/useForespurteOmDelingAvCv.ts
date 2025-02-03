'use client';
/**
 * Endepunkt /useForespurteOmDelingAvCv
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { ForespørselDelingAvCvAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';

const ForespurteOmDelingAvCvEndepunkt = (stillingsId: string) => {
  return `${ForespørselDelingAvCvAPI.internUrl}/foresporsler/${stillingsId}`;
};

const ForespurtOmDelingSchema = z.object({
  aktørId: z.string(),
  stillingsId: z.string(),
  deltStatus: z.string(),
  deltTidspunkt: z.string(),
  deltAv: z.string(),
  svarfrist: z.string(),
  tilstand: z.string(),
  svar: z.null(),
  begrunnelseForAtAktivitetIkkeBleOpprettet: z.null(),
  navKontor: z.string(),
});

const ForespurteOmDelingAvCvSchema = z.record(
  z.string(),
  z.array(ForespurtOmDelingSchema),
);

export type ForespurteOmDelingAvCvDTO = z.infer<
  typeof ForespurteOmDelingAvCvSchema
>;

export const useForespurteOmDelingAvCv = (stillingsId: string) =>
  useSWRImmutable(
    ForespurteOmDelingAvCvEndepunkt(stillingsId),
    getAPIwithSchema(ForespurteOmDelingAvCvSchema),
  );
