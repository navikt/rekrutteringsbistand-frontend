'use client';

import { StatistikkAPI } from '@/app/api/api-routes';
import { formaterDatoTilApi } from '@/app/api/foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV';
import { useSWRGet } from '@/app/api/useSWRGet';
import { z } from 'zod';

/**
 * Endepunkt /statistikk
 */

const statistikkEndepunkt = (param?: URLSearchParams) =>
  `${StatistikkAPI.internUrl}${param ? `?${param}` : ''}`;

const antallDTOSchema = z.object({
  totalt: z.number(),
  under30år: z.number(),
  innsatsgruppeIkkeStandard: z.number(),
});

export type AntallDTO = z.infer<typeof antallDTOSchema>;

const statistikkSchema = z.object({
  antPresentasjoner: antallDTOSchema,
  antFåttJobben: antallDTOSchema,
});

export type statistikkDTO = z.infer<typeof statistikkSchema>;

interface IuseUtfallsstatistikk {
  navKontor: string;
  fraOgMed: Date;
  tilOgMed: Date;
}

export const useStatistikk = ({
  navKontor,
  fraOgMed,
  tilOgMed,
}: IuseUtfallsstatistikk) =>
  useSWRGet(
    statistikkEndepunkt(
      new URLSearchParams({
        fraOgMed: formaterDatoTilApi(fraOgMed),
        tilOgMed: formaterDatoTilApi(tilOgMed),
        navKontor,
      }),
    ),
    statistikkSchema,
  );

// MSW handler erstatter statistikkMirage
