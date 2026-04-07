import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  hentJobbsøkerListe,
  JobbsøkerSøkTreffMock,
  jobbsøkerSøkStore,
  utførSøk,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/jobbsøkereMock';
import {
  JobbsøkerHendelsestype,
  JobbsøkerStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { deleteMock, getMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

function lagHendelserFraStatus(j: JobbsøkerSøkTreffMock) {
  const ts = j.lagtTilDato;
  const hendelser: {
    id: string;
    tidspunkt: string;
    hendelsestype: string;
    opprettetAvAktørType: string;
    aktørIdentifikasjon: string | null;
    hendelseData: null;
  }[] = [
    {
      id: `h-opprettet-${j.personTreffId}`,
      tidspunkt: ts,
      hendelsestype: JobbsøkerHendelsestype.OPPRETTET,
      opprettetAvAktørType: 'VEILEDER',
      aktørIdentifikasjon: j.veilederNavident,
      hendelseData: null,
    },
  ];

  if (j.status !== JobbsøkerStatus.LAGT_TIL) {
    hendelser.push({
      id: `h-invitert-${j.personTreffId}`,
      tidspunkt: ts,
      hendelsestype: JobbsøkerHendelsestype.INVITERT,
      opprettetAvAktørType: 'VEILEDER',
      aktørIdentifikasjon: j.veilederNavident,
      hendelseData: null,
    });
  }

  if (
    j.status === JobbsøkerStatus.SVART_JA ||
    j.status === JobbsøkerStatus.SVART_NEI
  ) {
    hendelser.push({
      id: `h-svar-${j.personTreffId}`,
      tidspunkt: ts,
      hendelsestype:
        j.status === JobbsøkerStatus.SVART_JA
          ? JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON
          : JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON,
      opprettetAvAktørType: 'SYSTEM',
      aktørIdentifikasjon: null,
      hendelseData: null,
    });
  }

  return hendelser;
}

export const jobbsøkereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker`,
  ({ params, request }) => {
    const id = params.rekrutteringstreffId as string;
    const url = new URL(request.url);

    if (!url.searchParams.has('side')) {
      const alle = hentJobbsøkerListe(id);
      const synlige = alle.filter((j) => j.status !== JobbsøkerStatus.SLETTET);
      return HttpResponse.json({
        jobbsøkere: synlige.map((j) => ({
          ...j,
          fødselsnummer: `mock-fnr-${j.personTreffId}`,
          veilederNavIdent: j.veilederNavident,
          hendelser: lagHendelserFraStatus(j),
        })),
        antallSynlige: synlige.length,
        antallSkjulte: 0,
        antallSlettede: alle.length - synlige.length,
      });
    }

    return HttpResponse.json(
      utførSøk(id, {
        side: Number(url.searchParams.get('side') ?? 1),
        antallPerSide: Number(url.searchParams.get('antallPerSide') ?? 25),
        sorteringsfelt: url.searchParams.get('sortering') ?? 'navn',
        sorteringsretning: url.searchParams.get('retning') ?? undefined,
        fritekst: url.searchParams.get('fritekst') ?? undefined,
        status: url.searchParams.get('status')?.split(',').filter(Boolean),
      }),
    );
  },
);

export const opprettJobbsøkereMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:id/jobbsoker`,
  async ({ params, request }) => {
    const id = params.id as string;
    const payload = (await request.json()) as
      | Record<string, unknown>
      | Record<string, unknown>[];
    const jobbsøkere = Array.isArray(payload) ? payload : [payload];
    const liste = hentJobbsøkerListe(id);

    jobbsøkere.forEach((body, index) => {
      liste.push({
        personTreffId: `mock-js-new-${Date.now()}-${index}`,
        fodselsnummer: `mock-fnr-new-${Date.now()}-${index}`,
        fornavn: String(body.fornavn ?? 'Ny'),
        etternavn: String(body.etternavn ?? 'Jobbsøker'),
        navkontor: body.navkontor ? String(body.navkontor) : null,
        veilederNavn: body.veilederNavn ? String(body.veilederNavn) : null,
        veilederNavident: body.veilederNavIdent
          ? String(body.veilederNavIdent)
          : null,
        status: JobbsøkerStatus.LAGT_TIL,
        lagtTilDato: new Date().toISOString(),
        lagtTilAv: body.veilederNavIdent ? String(body.veilederNavIdent) : null,
        minsideHendelser: [],
      });
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
