'use client';

/**
 * Endepunkt /useKandidatlisteInfo
 */
import { KandidatAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import { StillingsinfoDTO } from '../stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { Server } from 'miragejs';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

export const kandidatlisteInfoEndepunkt = (stillingsId: string) =>
  `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatlisteinfo`;

const KandidatlisteInfoSchema = z.object({
  kandidatlisteId: z.string(),
  antallKandidater: z.number(),
  kandidatlisteStatus: z.string(),
});

export type KandidatlisteInfoDTO = z.infer<typeof KandidatlisteInfoSchema>;

export const useKandidatlisteInfo = (
  stillingsInfo?: StillingsinfoDTO | null,
) => {
  const kandidatlisteHook = useSWRImmutable(
    stillingsInfo?.stillingsid
      ? kandidatlisteInfoEndepunkt(stillingsInfo.stillingsid)
      : null,
    getAPIwithSchema(KandidatlisteInfoSchema),
    {
      errorRetryCount: 3,
      errorRetryInterval: 3000,
    },
  );

  if (
    //@ts-expect-error fordi dette skal fikses backend
    kandidatlisteHook.data?.status &&
    //@ts-expect-error fordi dette skal fikses backend
    kandidatlisteHook.data?.status === 404
  ) {
    return null;
  }

  return kandidatlisteHook;
};

export const kandidatlisteInfoMirage = (server: Server) => {
  return server.get(kandidatlisteInfoEndepunkt('*'), () => {
    return {
      kandidatlisteId: 'kandidatlisteId',
      antallKandidater: 10,
      kandidatlisteStatus: 'ÅPEN',
    };
  });
};
