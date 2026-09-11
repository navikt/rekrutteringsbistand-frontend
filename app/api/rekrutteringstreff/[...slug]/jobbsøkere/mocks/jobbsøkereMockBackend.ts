import { JobbsøkerSøkTreffMock, lagStandardJobbsøkere } from './jobbsøkereMock';
import {
  harRegistreringer,
  tellRegistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/registreringer';
import { hentTreffgjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring.msw';
import { byggMswScopeKey } from '@/app/api/rekrutteringstreff/mswScope';
import { treffgjennomføringStore } from '@/app/api/rekrutteringstreff/mswState';
import {
  JobbsøkerHendelsestype,
  JobbsøkerStatus,
} from '@/app/rekrutteringstreff/_types/constants';

export type JobbsøkerSøkMockParams = {
  side: number;
  antallPerSide: number;
  sorteringsfelt?: string;
  sorteringsretning?: string;
  fritekst?: string;
  status?: string[];
  aldersgruppe?: string[];
  kunForVeilederNavIdent?: string;
};

export type OpprettJobbsøkerPayload = Record<string, unknown>;

const jobbsøkerStore = new Map<string, JobbsøkerSøkTreffMock[]>();
const NY_JOBBSOKER_ID_PREFIX = 'mock-js-new';
const NY_JOBBSOKER_FODSELSNUMMER_PREFIX = 'mock-fnr-new';
const STANDARD_FORNAVN = 'Ny';
const STANDARD_ETTERNAVN = 'Jobbsøker';
const STANDARD_ALDER = 25;

function harStatus(status: string) {
  return (jobbsøker: JobbsøkerSøkTreffMock) => jobbsøker.status === status;
}

function harIkkeStatus(status: string) {
  return (jobbsøker: JobbsøkerSøkTreffMock) => jobbsøker.status !== status;
}

function erSynligJobbsøker(jobbsøker: JobbsøkerSøkTreffMock) {
  return jobbsøker.status !== JobbsøkerStatus.SLETTET;
}

function lagUtkastJobbsøkere(jobbsøkere: JobbsøkerSøkTreffMock[]) {
  return jobbsøkere.filter(harStatus(JobbsøkerStatus.LAGT_TIL)).slice(0, 1);
}

function lagJobbsøkereUtenSvarJa(jobbsøkere: JobbsøkerSøkTreffMock[]) {
  return jobbsøkere.filter(harIkkeStatus(JobbsøkerStatus.SVART_JA)).slice(0, 4);
}

function lagJobbsøkereForTreff(treffId: string): JobbsøkerSøkTreffMock[] {
  const jobbsøkere = lagStandardJobbsøkere();

  switch (treffId) {
    case 'utkast':
      return lagUtkastJobbsøkere(jobbsøkere);
    case 'slettet':
      return [];
    case 'ikke-eier-fullfort':
      return [];
    case 'ingen-svart-ja':
    case 'for-faa-svart-ja':
      return lagJobbsøkereUtenSvarJa(jobbsøkere);
    case 'formidling-uten-jobbsokere':
      return [];
    default:
      return jobbsøkere;
  }
}

function hentJobbsøkerListe(
  request: Request,
  treffId: string,
): JobbsøkerSøkTreffMock[] {
  const scopeKey = byggMswScopeKey(request, treffId);
  const eksisterende = jobbsøkerStore.get(scopeKey);
  if (eksisterende) return eksisterende;

  const nyListe = lagJobbsøkereForTreff(treffId);
  jobbsøkerStore.set(scopeKey, nyListe);
  return nyListe;
}

function antallSkjulteISøk(treffId: string) {
  return treffId === 'utkast' || treffId === 'slettet' ? 0 : 1;
}

function matcherFritekst(jobbsøker: JobbsøkerSøkTreffMock, fritekst: string) {
  if (/^\d{1,11}$/.test(fritekst)) {
    return jobbsøker.fødselsnummer.startsWith(fritekst);
  }

  return [jobbsøker.fornavn, jobbsøker.etternavn].some((navn) =>
    navn.toLowerCase().startsWith(fritekst),
  );
}

function sorterJobbsøkere(
  jobbsøkere: JobbsøkerSøkTreffMock[],
  felt: string,
  retning: string,
) {
  const faktor = retning === 'desc' ? -1 : 1;

  jobbsøkere.sort((a, b) => {
    if (felt === 'lagt-til') {
      return faktor * a.lagtTilDato.localeCompare(b.lagtTilDato);
    }

    if (felt === 'status') {
      return faktor * a.status.localeCompare(b.status);
    }

    return (
      faktor *
      `${a.etternavn} ${a.fornavn}`.localeCompare(
        `${b.etternavn} ${b.fornavn}`,
        'nb',
      )
    );
  });
}

function tilValgfriTekst(verdi: unknown) {
  return verdi ? String(verdi) : null;
}

function lagNyMockPersonTreffId(suffix: string) {
  return `${NY_JOBBSOKER_ID_PREFIX}-${suffix}`;
}

function lagNyttMockFodselsnummer(suffix: string) {
  return `${NY_JOBBSOKER_FODSELSNUMMER_PREFIX}-${suffix}`;
}

function hentFodselsnummer(body: OpprettJobbsøkerPayload, suffix: string) {
  return (
    tilValgfriTekst(body.fødselsnummer) ?? lagNyttMockFodselsnummer(suffix)
  );
}

function lagOpprettetHendelse(
  personTreffId: string,
  tidspunkt: string,
  lagtTilAvIdent: string | null,
  lagtTilAvNavn: string | null,
) {
  return {
    id: `h-opprettet-${personTreffId}`,
    tidspunkt,
    hendelsestype: JobbsøkerHendelsestype.OPPRETTET,
    opprettetAvAktørType: 'VEILEDER',
    aktørIdentifikasjon: lagtTilAvIdent,
    hendelseData: lagtTilAvNavn ? { lagtTilAvNavn } : null,
  };
}

function lagNyJobbsøker(
  body: OpprettJobbsøkerPayload,
  suffix: string,
  lagtTilAvIdent: string | null,
): JobbsøkerSøkTreffMock {
  const lagtTilAvNavn = tilValgfriTekst(body.lagtTilAvNavn);
  const personTreffId = lagNyMockPersonTreffId(suffix);
  const lagtTilDato = new Date().toISOString();
  const alder = STANDARD_ALDER;

  return {
    personTreffId,
    fødselsnummer: hentFodselsnummer(body, suffix),
    fornavn: tilValgfriTekst(body.fornavn) ?? STANDARD_FORNAVN,
    etternavn: tilValgfriTekst(body.etternavn) ?? STANDARD_ETTERNAVN,
    status: JobbsøkerStatus.LAGT_TIL,
    lagtTilDato,
    lagtTilAv: lagtTilAvIdent,
    lagtTilAvNavn,
    alder,
    innsatsgruppe: null,
    hendelser: [
      lagOpprettetHendelse(
        personTreffId,
        lagtTilDato,
        lagtTilAvIdent,
        lagtTilAvNavn,
      ),
    ],
    minsideHendelser: [],
  };
}

function medOppmøtestatus(
  jobbsøker: JobbsøkerSøkTreffMock,
  oppmøte: Set<string>,
): JobbsøkerSøkTreffMock {
  if (
    jobbsøker.status === JobbsøkerStatus.SLETTET ||
    jobbsøker.status === JobbsøkerStatus.FÅTT_JOBB
  ) {
    return jobbsøker;
  }
  if (oppmøte.has(jobbsøker.personTreffId)) {
    return { ...jobbsøker, status: JobbsøkerStatus.MØTT_OPP };
  }
  if (jobbsøker.status === JobbsøkerStatus.MØTT_OPP) {
    return { ...jobbsøker, status: JobbsøkerStatus.SVART_JA };
  }
  return jobbsøker;
}

export function søkJobbsøkere(
  request: Request,
  treffId: string,
  params: JobbsøkerSøkMockParams,
  oppmøte?: Set<string>,
) {
  const lagrede = hentJobbsøkerListe(request, treffId);
  const alle = oppmøte
    ? lagrede.map((jobbsøker) => medOppmøtestatus(jobbsøker, oppmøte))
    : lagrede;
  const antallSlettede = alle.filter(
    (jobbsøker) => !erSynligJobbsøker(jobbsøker),
  ).length;

  const fritekst = params.fritekst?.trim().toLowerCase();
  const felt = params.sorteringsfelt ?? 'navn';
  const retning =
    params.sorteringsretning ?? (felt === 'lagt-til' ? 'desc' : 'asc');

  let filtrert = alle.filter(erSynligJobbsøker);

  if (params.kunForVeilederNavIdent) {
    filtrert = filtrert.filter(
      (jobbsøker) => jobbsøker.lagtTilAv === params.kunForVeilederNavIdent,
    );
  }

  if (fritekst) {
    filtrert = filtrert.filter((jobbsøker) =>
      matcherFritekst(jobbsøker, fritekst),
    );
  }

  if (params.status?.length) {
    filtrert = filtrert.filter((jobbsøker) =>
      params.status!.includes(jobbsøker.status),
    );
  }

  sorterJobbsøkere(filtrert, felt, retning);

  const synlige = alle.filter(erSynligJobbsøker);
  const antallPerStatus: Record<string, number> = {};
  for (const js of synlige) {
    antallPerStatus[js.status] = (antallPerStatus[js.status] ?? 0) + 1;
  }

  const totalt = filtrert.length;
  const sisteSide = Math.max(1, Math.ceil(totalt / params.antallPerSide));
  const gyldigSide = Math.min(Math.max(params.side, 1), sisteSide);
  const start = (gyldigSide - 1) * params.antallPerSide;

  return {
    totalt,
    antallSkjulte: antallSkjulteISøk(treffId),
    antallSlettede,
    antallPerStatus,
    side: gyldigSide,
    jobbsøkere: filtrert.slice(start, start + params.antallPerSide),
  };
}

export function opprettJobbsøkere(
  request: Request,
  treffId: string,
  jobbsøkere: OpprettJobbsøkerPayload[],
  lagtTilAvIdent: string | null = null,
) {
  const liste = hentJobbsøkerListe(request, treffId);
  const timestamp = Date.now();

  jobbsøkere.forEach((body, index) => {
    const fødselsnummer = tilValgfriTekst(body.fødselsnummer);

    if (
      fødselsnummer &&
      liste.some(
        (jobbsøker) =>
          erSynligJobbsøker(jobbsøker) &&
          jobbsøker.fødselsnummer === fødselsnummer,
      )
    ) {
      return;
    }

    liste.push(lagNyJobbsøker(body, `${timestamp}-${index}`, lagtTilAvIdent));
  });
}

type SlettJobbsøkerResultat =
  | { status: 200 }
  | { status: 404 | 422; feil: string };

export function slettJobbsøker(
  request: Request,
  treffId: string,
  personTreffId: string,
): SlettJobbsøkerResultat {
  const jobbsøker = hentJobbsøkerListe(request, treffId).find(
    (kandidat) => kandidat.personTreffId === personTreffId,
  );

  if (!jobbsøker || !erSynligJobbsøker(jobbsøker)) {
    return { status: 404, feil: 'Jobbsøkeren finnes ikke på treffet.' };
  }

  const gjennomføring = hentTreffgjennomføring(request, treffId);
  const status = medOppmøtestatus(
    jobbsøker,
    new Set(gjennomføring.oppmøte),
  ).status;
  if (status !== JobbsøkerStatus.LAGT_TIL) {
    return {
      status: 422,
      feil: 'Bare jobbsøkere med status LAGT_TIL kan slettes.',
    };
  }
  if (harRegistreringer(tellRegistreringer(gjennomføring, personTreffId))) {
    return {
      status: 422,
      feil: 'Jobbsøkeren har registreringer i treffgjennomføringen og kan derfor ikke slettes.',
    };
  }

  jobbsøker.status = JobbsøkerStatus.SLETTET;
  if (gjennomføring.rom.some((rom) => rom.jobbsøkere.includes(personTreffId))) {
    treffgjennomføringStore.set(byggMswScopeKey(request, treffId), {
      ...gjennomføring,
      rom: gjennomføring.rom.map((rom) => ({
        ...rom,
        jobbsøkere: rom.jobbsøkere.filter((id) => id !== personTreffId),
      })),
    });
  }
  return { status: 200 };
}
