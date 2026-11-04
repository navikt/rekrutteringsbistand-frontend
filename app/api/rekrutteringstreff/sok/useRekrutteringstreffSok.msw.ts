import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { byggSokRespons } from '@/app/api/rekrutteringstreff/sok/rekrutteringstreffSokMock';
import {
  MAKS_ANTALL_SØKEORD_TREFFSØK,
  MAKS_SØKEORDTEGN_TREFFSØK,
} from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import type {
  Sortering,
  Visning,
} from '@/app/rekrutteringstreff/_types/constants';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const rekrutteringstreffSokMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/sok`,
  ({ request }) => {
    const url = new URL(request.url);
    const visning = url.searchParams.get('visning') ?? undefined;
    const kategorier = url.searchParams.get('kategorier');
    const statuser = url.searchParams.get('statuser');
    const publisertStatuser = url.searchParams.get('publisertStatuser');
    const kontorer = url.searchParams.get('kontorer');
    const fritekst = url.searchParams
      .getAll('fritekst')
      .map((ord) => ord.trim())
      .filter(Boolean);
    if (
      fritekst.length > MAKS_ANTALL_SØKEORD_TREFFSØK ||
      fritekst.reduce((sum, ord) => sum + ord.length, 0) >
        MAKS_SØKEORDTEGN_TREFFSØK
    ) {
      return HttpResponse.json(null, { status: 400 });
    }
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
        kategorier: kategorier?.split(',').filter(Boolean),
        statuser: statuser?.split(',').filter(Boolean),
        publisertStatuser: publisertStatuser?.split(',').filter(Boolean),
        kontorer: kontorer?.split(',').filter(Boolean),
        fritekst: fritekst.length > 0 ? fritekst : undefined,
        sortering: sortering as Sortering | undefined,
        side,
        antallPerSide,
      }),
    );
  },
);
