import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { formaterDatoTilApi } from '@/app/api/foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV';
import { useSWRGet } from '@/app/api/useSWRGet';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';
import { z } from 'zod';

const rekrutteringstreffStatistikkEndepunkt = (param?: URLSearchParams) =>
  `${RekrutteringstreffAPI.internUrl}/statistikk/fatt-jobben${param ? `?${param}` : ''}`;

const rekrutteringstreffFåttJobbStatistikkSchema = z.object({
  totalt: z.number(),
  under30år: z.number(),
  innsatsgruppeIkkeStandard: z.number(),
});

export type RekrutteringstreffFåttJobbStatistikkDTO = z.infer<
  typeof rekrutteringstreffFåttJobbStatistikkSchema
>;

interface IuseRekrutteringstreffStatistikk {
  navKontor: string;
  fraOgMed: Date;
  tilOgMed: Date;
}

export const useRekrutteringstreffStatistikk = ({
  navKontor,
  fraOgMed,
  tilOgMed,
}: IuseRekrutteringstreffStatistikk) =>
  useSWRGet(
    rekrutteringstreffStatistikkEndepunkt(
      new URLSearchParams({
        fraOgMed: formaterDatoTilApi(fraOgMed),
        tilOgMed: formaterDatoTilApi(tilOgMed),
        navKontor,
      }),
    ),
    rekrutteringstreffFåttJobbStatistikkSchema,
  );

const rekrutteringstreffStatistikkMock: RekrutteringstreffFåttJobbStatistikkDTO =
  {
    totalt: 2,
    under30år: 1,
    innsatsgruppeIkkeStandard: 1,
  };

export const rekrutteringstreffStatistikkMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/statistikk/fatt-jobben`,
  () => HttpResponse.json(rekrutteringstreffStatistikkMock),
);
