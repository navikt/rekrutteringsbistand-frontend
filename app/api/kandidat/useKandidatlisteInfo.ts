'use client';
/**
 * Endepunkt /useKandidatlisteInfo
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { KandidatAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';

const KandidatlisteInfoEndepunkt = (stillingsId: string) =>
  `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatlisteinfo`;

const KandidatlisteInfoSchema = z.object({
  kandidatlisteId: z.string(),
  antallKandidater: z.number(),
  kandidatlisteStatus: z.string(),
});

export type KandidatlisteInfoDTO = z.infer<typeof KandidatlisteInfoSchema>;

export const useUseKandidatlisteInfo = (stillingsId: string) =>
  useSWRImmutable(
    KandidatlisteInfoEndepunkt(stillingsId),
    getAPIwithSchema(KandidatlisteInfoSchema),
  );
