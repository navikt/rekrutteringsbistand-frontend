import { JobbsøkerSøkTreffMock, lagStandardJobbsøkere } from './jobbsøkereMock';
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
};

export type OpprettJobbsøkerPayload = Record<string, unknown>;

const jobbsøkerStore = new Map<string, JobbsøkerSøkTreffMock[]>();
const NY_JOBBSOKER_ID_PREFIX = 'mock-js-new';
const NY_JOBBSOKER_FODSELSNUMMER_PREFIX = 'mock-fnr-new';
const STANDARD_FORNAVN = 'Ny';
const STANDARD_ETTERNAVN = 'Jobbsøker';

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
    case 'ingen-svart-ja':
      return lagJobbsøkereUtenSvarJa(jobbsøkere);
    default:
      return jobbsøkere;
  }
}

function hentJobbsøkerListe(treffId: string): JobbsøkerSøkTreffMock[] {
  const eksisterende = jobbsøkerStore.get(treffId);
  if (eksisterende) return eksisterende;

  const nyListe = lagJobbsøkereForTreff(treffId);
  jobbsøkerStore.set(treffId, nyListe);
  return nyListe;
}

function antallSkjulteISøk(treffId: string) {
  return treffId === 'utkast' || treffId === 'slettet' ? 0 : 1;
}

function matcherFritekst(jobbsøker: JobbsøkerSøkTreffMock, fritekst: string) {
  if (/^\d{11}$/.test(fritekst)) {
    return jobbsøker.fødselsnummer === fritekst;
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

  return {
    personTreffId,
    fødselsnummer: hentFodselsnummer(body, suffix),
    fornavn: tilValgfriTekst(body.fornavn) ?? STANDARD_FORNAVN,
    etternavn: tilValgfriTekst(body.etternavn) ?? STANDARD_ETTERNAVN,
    status: JobbsøkerStatus.LAGT_TIL,
    lagtTilDato,
    lagtTilAv: lagtTilAvIdent,
    lagtTilAvNavn,
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

export function søkJobbsøkere(treffId: string, params: JobbsøkerSøkMockParams) {
  const alle = hentJobbsøkerListe(treffId);
  const antallSlettede = alle.filter(
    (jobbsøker) => !erSynligJobbsøker(jobbsøker),
  ).length;

  const fritekst = params.fritekst?.trim().toLowerCase();
  const felt = params.sorteringsfelt ?? 'navn';
  const retning =
    params.sorteringsretning ?? (felt === 'lagt-til' ? 'desc' : 'asc');

  let filtrert = alle.filter(erSynligJobbsøker);

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
  treffId: string,
  jobbsøkere: OpprettJobbsøkerPayload[],
  lagtTilAvIdent: string | null = null,
) {
  const liste = hentJobbsøkerListe(treffId);
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

export function slettJobbsøker(treffId: string, personTreffId: string) {
  const jobbsøker = hentJobbsøkerListe(treffId).find(
    (kandidat) => kandidat.personTreffId === personTreffId,
  );

  if (jobbsøker) {
    jobbsøker.status = JobbsøkerStatus.SLETTET;
  }
}
