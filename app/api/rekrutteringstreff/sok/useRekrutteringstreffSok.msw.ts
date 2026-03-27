import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { byggSokRespons } from '@/app/api/rekrutteringstreff/sok/rekrutteringstreffSokMock';
import type {
  Sortering,
  Visning,
} from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const rekrutteringstreffSokMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/sok`,
  ({ request }) => {
    const url = new URL(request.url);
    const visning = url.searchParams.get('visning') ?? undefined;
    const statuser = url.searchParams.get('statuser');
    const kontorer = url.searchParams.get('kontorer');
    const sortering = url.searchParams.get('sortering') ?? undefined;
    const parsedSide = parseInt(url.searchParams.get('side') ?? '', 10);
    const side = Number.isNaN(parsedSide) ? 1 : parsedSide;
    const parsedAntallPerSide = parseInt(
      url.searchParams.get('antallPerSide') ?? '',
      10,
    );
    const antallPerSide = Number.isNaN(parsedAntallPerSide)
      ? 20
      : parsedAntallPerSide;
    return HttpResponse.json(
      byggSokRespons({
        visning: visning as Visning | undefined,
        statuser: statuser?.split(',').filter(Boolean),
        kontorer: kontorer?.split(',').filter(Boolean),
        sortering: sortering as Sortering | undefined,
        side,
        antallPerSide,
      }),
    );
  },
);
