import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  hentJobbsøkerListe,
  JobbsøkerSøkTreffMock,
  utførSøk,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/jobbsøkereMock';
import {
  JobbsøkerHendelsestype,
  JobbsøkerStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { deleteMock, getMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

type OpprettJobbsøkerPayload = Record<string, unknown>;

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

function erSynligJobbsøker(jobbsøker: JobbsøkerSøkTreffMock) {
  return jobbsøker.status !== JobbsøkerStatus.SLETTET;
}

function tilJobbsøkerOversikt(jobbsøker: JobbsøkerSøkTreffMock) {
  return {
    ...jobbsøker,
    fødselsnummer: `mock-fnr-${jobbsøker.personTreffId}`,
    veilederNavIdent: jobbsøker.veilederNavident,
    hendelser: lagHendelserFraStatus(jobbsøker),
  };
}

function lagJobbsøkerOversiktRespons(treffId: string) {
  const alle = hentJobbsøkerListe(treffId);
  const synlige = alle.filter(erSynligJobbsøker);

  return {
    jobbsøkere: synlige.map(tilJobbsøkerOversikt),
    antallSynlige: synlige.length,
    antallSkjulte: 0,
    antallSlettede: alle.length - synlige.length,
  };
}

function lesSøkParametre(url: URL) {
  return {
    side: Number(url.searchParams.get('side') ?? 1),
    antallPerSide: Number(url.searchParams.get('antallPerSide') ?? 25),
    sorteringsfelt: url.searchParams.get('sortering') ?? 'navn',
    sorteringsretning: url.searchParams.get('retning') ?? undefined,
    fritekst: url.searchParams.get('fritekst') ?? undefined,
    status: url.searchParams.get('status')?.split(',').filter(Boolean),
  };
}

function tilValgfriTekst(verdi: unknown) {
  return verdi ? String(verdi) : null;
}

function lagNyJobbsøker(
  body: OpprettJobbsøkerPayload,
  suffix: string,
): JobbsøkerSøkTreffMock {
  const veilederNavident = tilValgfriTekst(body.veilederNavIdent);

  return {
    personTreffId: `mock-js-new-${suffix}`,
    fodselsnummer: `mock-fnr-new-${suffix}`,
    fornavn: tilValgfriTekst(body.fornavn) ?? 'Ny',
    etternavn: tilValgfriTekst(body.etternavn) ?? 'Jobbsøker',
    navkontor: tilValgfriTekst(body.navkontor),
    veilederNavn: tilValgfriTekst(body.veilederNavn),
    veilederNavident,
    status: JobbsøkerStatus.LAGT_TIL,
    lagtTilDato: new Date().toISOString(),
    lagtTilAv: veilederNavident,
    minsideHendelser: [],
  };
}

export const jobbsøkereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker`,
  ({ params, request }) => {
    const treffId = params.rekrutteringstreffId as string;
    const url = new URL(request.url);

    if (!url.searchParams.has('side')) {
      return HttpResponse.json(lagJobbsøkerOversiktRespons(treffId));
    }

    return HttpResponse.json(utførSøk(treffId, lesSøkParametre(url)));
  },
);

export const opprettJobbsøkereMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:id/jobbsoker`,
  async ({ params, request }) => {
    const treffId = params.id as string;
    const payload = (await request.json()) as
      | OpprettJobbsøkerPayload
      | OpprettJobbsøkerPayload[];
    const jobbsøkere = Array.isArray(payload) ? payload : [payload];
    const liste = hentJobbsøkerListe(treffId);
    const timestamp = Date.now();

    jobbsøkere.forEach((body, index) => {
      liste.push(lagNyJobbsøker(body, `${timestamp}-${index}`));
    });

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
