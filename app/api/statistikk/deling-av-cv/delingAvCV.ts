'use client';
/**
 * Endepunkt /delingAvCV
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { formaterDatoTilApi } from '../../../util/dato';
import { getAPIwithSchema } from '../../fetcher';

const delingAvCVEndepunkt = (param?: URLSearchParams) =>
  `/api/statistikk/deling-av-cv${param ? `?${param}` : ''}`;

const delingAvCVSchema = z.object({
  antallSvartJa: z.number(),
  antallSvartNei: z.number(),
  antallVenterPåSvar: z.number(),
  antallUtløpteSvar: z.number(),
});

export type delingAvCVDTO = z.infer<typeof delingAvCVSchema>;

interface IuseDelingAvCV {
  navKontor: string;
  fraOgMed: Date;
  tilOgMed: Date;
}

export const useDelingAvCV = ({
  navKontor,
  fraOgMed,
  tilOgMed,
}: IuseDelingAvCV) =>
  useSWRImmutable(
    delingAvCVEndepunkt(
      new URLSearchParams({
        fraOgMed: formaterDatoTilApi(fraOgMed),
        tilOgMed: formaterDatoTilApi(tilOgMed),
        navKontor,
      })
    ),
    getAPIwithSchema(delingAvCVSchema)
  );
