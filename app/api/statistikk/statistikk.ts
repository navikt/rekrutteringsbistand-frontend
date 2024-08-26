"use client";
/**
 * Endepunkt /statistikk
 */
import useSWRImmutable from "swr/immutable";
import { z } from "zod";
import { formaterDatoTilApi } from "../../../util/dato";
import { getAPIwithSchema } from "../fetcher";
import { StatistikkAPI } from "../route-env";

const statistikkEndepunkt = (param?: URLSearchParams) =>
  `${StatistikkAPI.internUrl}${param ? `?${param}` : ""}`;

const antallDTOSchema = z.object({
  totalt: z.number(),
  under30år: z.number(),
  innsatsgruppeIkkeStandard: z.number(),
});

const statistikkDTOSchema = z.object({
  antPresentasjoner: antallDTOSchema,
  antFåttJobben: antallDTOSchema,
});

export type AntallDTO = z.infer<typeof antallDTOSchema>;
export type StatistikkDTO = z.infer<typeof statistikkDTOSchema>;

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
  useSWRImmutable(
    statistikkEndepunkt(
      new URLSearchParams({
        fraOgMed: formaterDatoTilApi(fraOgMed),
        tilOgMed: formaterDatoTilApi(tilOgMed),
        navKontor,
      }),
    ),
    getAPIwithSchema(statistikkSchema),
  );
