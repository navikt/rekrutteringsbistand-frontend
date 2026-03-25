import type {
  JobbsøkerFilterverdierDTO,
  JobbsøkerSøkResponsDTO,
  JobbsøkerSøkTreffDTO,
} from './useJobbsøkere';
import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  jobbsøkereAvlystMock,
  jobbsøkereFullførtMock,
  jobbsøkereIngenSvartJaMock,
  jobbsøkereMangeMock,
  lagJobbsøkereMock,
  jobbsøkereMock,
  jobbsøkereTomtMock,
  jobbsøkereUtkastMock,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/jobbsøkereMock';
import { alleSokTreff } from '@/app/api/rekrutteringstreff/sok/rekrutteringstreffSokMock';
import { deleteMock, getMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const validerPaginering = (url: URL) => {
  const side = url.searchParams.get('side');
  const antallPerSide = url.searchParams.get('antallPerSide');

  if (!side || !antallPerSide) {
    return HttpResponse.json(
      { feil: 'Mangler påkrevd query parameter: side eller antallPerSide' },
      { status: 400 },
    );
  }

  const sideTall = Number(side);
  const antallTall = Number(antallPerSide);

  if (!Number.isInteger(sideTall) || sideTall < 1) {
    return HttpResponse.json(
      { feil: 'side må være 1 eller høyere' },
      { status: 400 },
    );
  }

  if (!Number.isInteger(antallTall) || antallTall < 1 || antallTall > 100) {
    return HttpResponse.json(
      { feil: 'antallPerSide må være mellom 1 og 100' },
      { status: 400 },
    );
  }

  return null;
};

const byggFilterverdier = (
  alle: JobbsøkerSøkTreffDTO[],
): JobbsøkerFilterverdierDTO => ({
  navkontor: [
    ...new Set(alle.map((j) => j.navkontor).filter(Boolean)),
  ].sort() as string[],
  innsatsgrupper: [
    ...new Set(alle.map((j) => j.innsatsgruppe).filter(Boolean)),
  ].sort() as string[],
  steder: [
    ...[...new Set(alle.map((j) => j.kommune).filter(Boolean))]
      .sort()
      .map((navn) => ({ navn: navn as string, type: 'kommune' as const })),
    ...[...new Set(alle.map((j) => j.fylke).filter(Boolean))]
      .sort()
      .map((navn) => ({ navn: navn as string, type: 'fylke' as const })),
  ],
});

const filtrerOgPaginer = (
  alle: JobbsøkerSøkTreffDTO[],
  url: URL,
): JobbsøkerSøkResponsDTO => {
  let filtrert = [...alle];

  const fritekst = url.searchParams.get('fritekst');
  if (fritekst) {
    const lower = fritekst.toLowerCase();
    filtrert = filtrert.filter((j) =>
      [
        j.fornavn,
        j.etternavn,
        j.poststed,
        j.kommune,
        j.fylke,
        j.veilederNavn,
        j.veilederNavident,
      ]
        .filter(Boolean)
        .some((f) => f!.toLowerCase().includes(lower)),
    );
  }

  const statusParam = url.searchParams.get('status');
  if (statusParam) {
    const statuser = statusParam.split(',');
    filtrert = filtrert.filter((j) => statuser.includes(j.status));
  }

  const navkontor = url.searchParams.get('navkontor');
  if (navkontor) {
    filtrert = filtrert.filter((j) => j.navkontor === navkontor);
  }

  const kommune = url.searchParams.get('kommune');
  if (kommune) {
    filtrert = filtrert.filter((j) => j.kommune === kommune);
  }

  const innsatsgruppeParam = url.searchParams.get('innsatsgruppe');
  if (innsatsgruppeParam) {
    const grupper = innsatsgruppeParam.split(',');
    filtrert = filtrert.filter(
      (j) => j.innsatsgruppe && grupper.includes(j.innsatsgruppe),
    );
  }

  const fylke = url.searchParams.get('fylke');
  if (fylke) {
    filtrert = filtrert.filter((j) => j.fylke === fylke);
  }

  const sortering = url.searchParams.get('sortering') ?? 'navn';
  filtrert.sort((a, b) => {
    if (sortering === 'navn')
      return (a.etternavn ?? '').localeCompare(b.etternavn ?? '');
    if (sortering === 'status') return a.status.localeCompare(b.status);
    if (sortering === 'invitert_dato')
      return (a.invitertDato ?? '').localeCompare(b.invitertDato ?? '');
    return 0;
  });

  const side = parseInt(url.searchParams.get('side') ?? '1', 10);
  const antallPerSide = parseInt(
    url.searchParams.get('antallPerSide') ?? '20',
    10,
  );
  const start = (side - 1) * antallPerSide;
  const paginert = filtrert.slice(start, start + antallPerSide);

  return { totalt: filtrert.length, side, antallPerSide, jobbsøkere: paginert };
};

export const jobbsøkereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker`,
  ({ request, params }) => {
    const id = params.rekrutteringstreffId as string;
    const url = new URL(request.url);
    const pagineringsfeil = validerPaginering(url);
    if (pagineringsfeil) {
      return pagineringsfeil;
    }

    const mockPerTreffId: Record<string, () => JobbsøkerSøkResponsDTO> = {
      utkast: jobbsøkereUtkastMock,
      avlyst: jobbsøkereAvlystMock,
      fullfort: jobbsøkereFullførtMock,
      slettet: jobbsøkereTomtMock,
      'ingen-svart-ja': jobbsøkereIngenSvartJaMock,
      mange: jobbsøkereMangeMock,
    };
    const sokTreff = alleSokTreff.find((treff) => treff.id === id);
    const mockFn =
      mockPerTreffId[id] ??
      (sokTreff
        ? () => lagJobbsøkereMock(sokTreff.antallJobbsokere)
        : jobbsøkereMock);
    const baseData = mockFn();
    return HttpResponse.json(filtrerOgPaginer(baseData.jobbsøkere, url));
  },
);

export const jobbsøkerFilterverdierMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/filterverdier`,
  ({ params }) => {
    const id = params.rekrutteringstreffId as string;
    const mockPerTreffId: Record<string, () => JobbsøkerSøkResponsDTO> = {
      utkast: jobbsøkereUtkastMock,
      avlyst: jobbsøkereAvlystMock,
      fullfort: jobbsøkereFullførtMock,
      slettet: jobbsøkereTomtMock,
      'ingen-svart-ja': jobbsøkereIngenSvartJaMock,
      mange: jobbsøkereMangeMock,
    };
    const sokTreff = alleSokTreff.find((treff) => treff.id === id);
    const mockFn =
      mockPerTreffId[id] ??
      (sokTreff
        ? () => lagJobbsøkereMock(sokTreff.antallJobbsokere)
        : jobbsøkereMock);

    return HttpResponse.json(byggFilterverdier(mockFn().jobbsøkere));
  },
);

export const opprettJobbsøkereMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:id/jobbsoker`,
  () => HttpResponse.json({}),
);

export const jobbsøkerSlettMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:id1/jobbsoker/:id2/slett`,
  () => HttpResponse.json({ success: true }),
);

export const jobbsøkerFodselsnumreMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/fodselsnumre`,
  () => HttpResponse.json(['12345678901', '10987654321', '11223344556']),
);
