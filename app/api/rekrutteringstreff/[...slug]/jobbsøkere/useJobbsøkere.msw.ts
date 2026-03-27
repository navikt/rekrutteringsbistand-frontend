import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  hentFilterverdier,
  hentJobbsøkerListe,
  jobbsøkerSøkStore,
  utførSøk,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/jobbsøkereMock';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { deleteMock, getMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const jobbsøkereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker`,
  ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    const url = new URL(request.url);

    const erSøk = url.searchParams.has('side');
    if (!erSøk) {
      const alle = hentJobbsøkerListe(id);
      const synlige = alle.filter((j) => j.status !== JobbsøkerStatus.SLETTET);
      return HttpResponse.json({
        jobbsøkere: synlige.map((j) => ({
          ...j,
          fødselsnummer: `mock-fnr-${j.personTreffId}`,
          veilederNavIdent: j.veilederNavident,
          hendelser: [],
        })),
        antallSynlige: synlige.length,
        antallSkjulte: 0,
        antallSlettede: alle.length - synlige.length,
      });
    }

    const side = Number(url.searchParams.get('side') ?? 1);
    const antallPerSide = Number(url.searchParams.get('antallPerSide') ?? 25);
    const sortering = url.searchParams.get('sortering') ?? 'navn';
    const fritekst = url.searchParams.get('fritekst') ?? undefined;
    const status = url.searchParams.get('status')?.split(',').filter(Boolean);
    const innsatsgruppe = url.searchParams
      .get('innsatsgruppe')
      ?.split(',')
      .filter(Boolean);
    const navkontor = url.searchParams.get('navkontor') ?? undefined;
    const fylke = url.searchParams.get('fylke') ?? undefined;
    const kommune = url.searchParams.get('kommune') ?? undefined;

    const respons = utførSøk(id, {
      side,
      antallPerSide,
      sortering,
      fritekst,
      status,
      innsatsgruppe,
      navkontor,
      fylke,
      kommune,
    });

    return HttpResponse.json(respons);
  },
);

export const jobbsøkerFilterverdierMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/filterverdier`,
  ({ params }) => {
    const id = params.rekrutteringstreffId as string;
    return HttpResponse.json(hentFilterverdier(id));
  },
);

export const opprettJobbsøkereMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:id/jobbsoker`,
  async ({ params, request }) => {
    const id = params.id as string;
    const body = (await request.json()) as Record<string, unknown>;
    const liste = hentJobbsøkerListe(id);
    liste.push({
      personTreffId: `mock-js-new-${Date.now()}`,
      fornavn: String(body.fornavn ?? 'Ny'),
      etternavn: String(body.etternavn ?? 'Jobbsøker'),
      innsatsgruppe: String(body.innsatsgruppe ?? 'Standardinnsats'),
      fylke: String(body.fylke ?? 'Oslo'),
      kommune: String(body.kommune ?? 'Oslo'),
      poststed: String(body.poststed ?? 'Oslo'),
      navkontor: String(body.navkontor ?? 'Nav Frogner'),
      veilederNavn: String(body.veilederNavn ?? 'Test Veileder'),
      veilederNavident: String(body.veilederNavident ?? 'Z000000'),
      status: JobbsøkerStatus.LAGT_TIL,
      invitertDato: null,
      lagtTilDato: new Date().toISOString(),
      lagtTilAv: String(body.veilederNavident ?? 'Z000000'),
      minsideHendelser: [],
    });
    jobbsøkerSøkStore.set(id, liste);
    return HttpResponse.json({});
  },
);

export const jobbsøkerSlettMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:id1/jobbsoker/:id2/slett`,
  ({ params }) => {
    const treffId = params.id1 as string;
    const personTreffId = params.id2 as string;
    const liste = hentJobbsøkerListe(treffId);
    const js = liste.find((j) => j.personTreffId === personTreffId);
    if (js) js.status = JobbsøkerStatus.SLETTET;
    return HttpResponse.json({ success: true });
  },
);
