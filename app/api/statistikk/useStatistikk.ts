'use client';

/**
 * Endepunkt /statistikk
 */
import { StatistikkAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import { formaterDatoTilApi } from '../foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV';
import { statistikkMock } from './mocks/statistikkMock';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

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

export const statistikkMirage = (server: any) =>
  server.get('/api/statistikk', () => statistikkMock);
