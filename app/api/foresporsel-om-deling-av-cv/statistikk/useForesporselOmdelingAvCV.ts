'use client';
/**
 * Endepunkt /delingAvCV
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { formaterDatoTilApi } from '../../../../util/dato';
import { ForespørselDelingAvCvAPI } from '../../api-routes';
import { getAPIwithSchema } from '../../fetcher';
import { forespørselOmDelingAvCVStatistikkMock } from '../mocks/forespørselStatistikkMock';

const foresporselOmdelingAvCVEndepunkt = (param?: URLSearchParams) =>
  `${ForespørselDelingAvCvAPI.internUrl}/statistikk${param ? `?${param}` : ''}`;

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

export const useForesporselOmdelingAvCV = ({
  navKontor,
  fraOgMed,
  tilOgMed,
}: IuseDelingAvCV) =>
  useSWRImmutable(
    foresporselOmdelingAvCVEndepunkt(
      new URLSearchParams({
        fraOgMed: formaterDatoTilApi(fraOgMed),
        tilOgMed: formaterDatoTilApi(tilOgMed),
        navKontor,
      }),
    ),
    getAPIwithSchema(delingAvCVSchema),
  );

export const foresporselOmDelingAvCVStatistikkMirage = (server: any) =>
  server.get(
    '/api/foresporsel-om-deling-av-cv/statistikk',
    () => forespørselOmDelingAvCVStatistikkMock,
  );
