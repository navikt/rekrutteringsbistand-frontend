'use client';

/**
 * Endepunkt /delingAvCV
 */
import { ForespørselDelingAvCvAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { forespørselOmDelingAvCVStatistikkMock } from '@/app/api/foresporsel-om-deling-av-cv/mocks/forespørselStatistikkMock';
import { http, HttpResponse } from 'msw';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const medNull = (n: number) => (n < 10 ? '0' + n : n);
export const formaterDatoTilApi = (dato: Date): string => {
  const dag = medNull(dato.getDate());
  const måned = medNull(dato.getMonth() + 1);
  const år = dato.getFullYear();

  return `${år}-${måned}-${dag}`;
};

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

export const foresporselOmDelingAvCVStatistikkMSWHandler = http.get(
  '/api/foresporsel-om-deling-av-cv/statistikk',
  () => HttpResponse.json(forespørselOmDelingAvCVStatistikkMock),
);
