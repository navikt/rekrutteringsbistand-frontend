import {
  JobbsøkerHendelsestype,
  JobbsøkerStatus,
} from '@/app/rekrutteringstreff/_types/constants';

export interface MinsideHendelseMock {
  id: string;
  tidspunkt: string;
  hendelsestype: string;
  opprettetAvAktørType: string;
  aktørIdentifikasjon: string | null;
  hendelseData: Record<string, unknown> | null;
}

export interface JobbsøkerSøkTreffMock {
  personTreffId: string;
  fodselsnummer: string;
  fornavn: string;
  etternavn: string;
  navkontor: string | null;
  veilederNavn: string | null;
  veilederNavident: string | null;
  status: string;
  lagtTilDato: string;
  lagtTilAv: string | null;
  minsideHendelser: MinsideHendelseMock[];
}

type JobbsøkerSøkMockParams = {
  side: number;
  antallPerSide: number;
  sorteringsfelt?: string;
  sorteringsretning?: string;
  fritekst?: string;
  status?: string[];
};

const DATO_UTGANGSPUNKT = new Date('2026-02-12T10:00:00+01:00');

function lagJobbsøker(
  i: number,
  fornavn: string,
  status: string,
  navkontor: string,
  overrides?: Partial<JobbsøkerSøkTreffMock>,
): JobbsøkerSøkTreffMock {
  const nn = String(i + 1).padStart(2, '0');
  return {
    personTreffId: `mock-js-${String(i + 1).padStart(3, '0')}`,
    fodselsnummer: `1234567${String(i).padStart(4, '0')}`,
    fornavn,
    etternavn: `Etternavn${nn}`,
    navkontor,
    veilederNavn: 'Veileder Etternavn',
    veilederNavident: 'Z990248',
    status,
    lagtTilDato: new Date(
      DATO_UTGANGSPUNKT.getTime() + i * 7_200_000,
    ).toISOString(),
    lagtTilAv: 'Z990248',
    minsideHendelser: [],
    ...overrides,
  };
}

function lagMinsideHendelse(
  fnr: string,
  offsetMs: number,
  eksternKanal: string | null,
  eksternStatus: string,
  minsideStatus: string,
): MinsideHendelseMock {
  return {
    id: `minside-${fnr}-${offsetMs}`,
    tidspunkt: new Date(DATO_UTGANGSPUNKT.getTime() + offsetMs).toISOString(),
    hendelsestype: JobbsøkerHendelsestype.MOTTATT_SVAR_FRA_MINSIDE,
    opprettetAvAktørType: 'SYSTEM',
    aktørIdentifikasjon: null,
    hendelseData: {
      varselId: `varsel-${fnr}-${offsetMs}`,
      avsenderReferanseId: `ref-${fnr}`,
      fnr,
      eksternStatus,
      minsideStatus,
      opprettet: new Date(
        DATO_UTGANGSPUNKT.getTime() + offsetMs - 500,
      ).toISOString(),
      avsenderNavident: 'Z123456',
      eksternFeilmelding: null,
      eksternKanal,
      mal: 'KANDIDAT_INVITERT_TREFF',
      flettedata: null,
    },
  };
}

function lagStandardJobbsøkere(): JobbsøkerSøkTreffMock[] {
  return [
    lagJobbsøker(0, 'Marius', JobbsøkerStatus.LAGT_TIL, 'Nav Bærum', {
      veilederNavn: 'Veileder Fornansen',
      veilederNavident: 'L174111',
    }),
    lagJobbsøker(1, 'Emilie', JobbsøkerStatus.LAGT_TIL, 'Nav Frogner'),
    lagJobbsøker(2, 'Oscar', JobbsøkerStatus.LAGT_TIL, 'Nav Majorstuen'),
    lagJobbsøker(3, 'Håkon', JobbsøkerStatus.INVITERT, 'Nav Bærum', {
      minsideHendelser: [
        lagMinsideHendelse('12345670003', 2000, 'SMS', 'SENDT', 'AKTIV'),
        lagMinsideHendelse('12345670003', 3000, 'EPOST', 'SENDT', 'AKTIV'),
      ],
    }),
    lagJobbsøker(4, 'Jonathan', JobbsøkerStatus.SVART_JA, 'Nav Kongsberg'),
    lagJobbsøker(5, 'Lise', JobbsøkerStatus.SVART_NEI, 'Nav Grorud'),
    lagJobbsøker(6, 'Nina', JobbsøkerStatus.INVITERT, 'Nav Grorud', {
      minsideHendelser: [
        lagMinsideHendelse('12345670006', 2000, null, 'FEILET', 'OPPRETTET'),
      ],
    }),
    lagJobbsøker(7, 'Anders', JobbsøkerStatus.SVART_JA, 'Nav Grünerløkka'),
    lagJobbsøker(8, 'Kristine', JobbsøkerStatus.SVART_JA, 'Nav Sagene'),
    lagJobbsøker(9, 'Nora', JobbsøkerStatus.INVITERT, 'Nav Frogner'),
    lagJobbsøker(10, 'Lars', JobbsøkerStatus.LAGT_TIL, 'Nav Bærum'),
    lagJobbsøker(11, 'Martin', JobbsøkerStatus.SVART_JA, 'Nav Majorstuen'),
    lagJobbsøker(12, 'Sofie', JobbsøkerStatus.LAGT_TIL, 'Nav Grorud'),
    lagJobbsøker(13, 'Erik', JobbsøkerStatus.SVART_NEI, 'Nav Sagene'),
    lagJobbsøker(14, 'Ingrid', JobbsøkerStatus.INVITERT, 'Nav Kongsberg'),
    lagJobbsøker(15, 'Thomas', JobbsøkerStatus.LAGT_TIL, 'Nav Stovner'),
    lagJobbsøker(16, 'Kari', JobbsøkerStatus.SVART_JA, 'Nav Grünerløkka'),
    lagJobbsøker(17, 'Siri', JobbsøkerStatus.LAGT_TIL, 'Nav Bærum'),
    lagJobbsøker(18, 'Per', JobbsøkerStatus.INVITERT, 'Nav Frogner'),
    lagJobbsøker(19, 'Hanna', JobbsøkerStatus.SVART_NEI, 'Nav Majorstuen'),
    lagJobbsøker(20, 'Jakob', JobbsøkerStatus.LAGT_TIL, 'Nav Grorud'),
    lagJobbsøker(21, 'Live', JobbsøkerStatus.INVITERT, 'Nav Sagene'),
    lagJobbsøker(22, 'Ola', JobbsøkerStatus.SVART_JA, 'Nav Kongsberg'),
    lagJobbsøker(23, 'Maria', JobbsøkerStatus.LAGT_TIL, 'Nav Stovner'),
    lagJobbsøker(24, 'Agnes', JobbsøkerStatus.INVITERT, 'Nav Grünerløkka'),
    lagJobbsøker(25, 'Henrik', JobbsøkerStatus.SVART_NEI, 'Nav Bærum'),
    lagJobbsøker(26, 'Fredrik', JobbsøkerStatus.LAGT_TIL, 'Nav Frogner'),
    lagJobbsøker(27, 'Maja', JobbsøkerStatus.SVART_JA, 'Nav Majorstuen'),
    lagJobbsøker(28, 'Vilde', JobbsøkerStatus.INVITERT, 'Nav Sagene'),
    lagJobbsøker(29, 'Tormod', JobbsøkerStatus.LAGT_TIL, 'Nav Grorud'),
  ];
}

export const jobbsøkerSøkStore = new Map<string, JobbsøkerSøkTreffMock[]>();

function lagJobbsøkereForTreff(treffId: string): JobbsøkerSøkTreffMock[] {
  const jobbsøkere = lagStandardJobbsøkere();

  switch (treffId) {
    case 'utkast':
      return jobbsøkere.slice(0, 1);
    case 'slettet':
      return [];
    case 'ingen-svart-ja':
      return jobbsøkere
        .filter((j) => j.status !== JobbsøkerStatus.SVART_JA)
        .slice(0, 4);
    default:
      return jobbsøkere;
  }
}

export function hentJobbsøkerListe(treffId: string): JobbsøkerSøkTreffMock[] {
  const eksisterende = jobbsøkerSøkStore.get(treffId);
  if (eksisterende) return eksisterende;

  const nyListe = lagJobbsøkereForTreff(treffId);
  jobbsøkerSøkStore.set(treffId, nyListe);
  return nyListe;
}

function erSynligJobbsøker(jobbsøker: JobbsøkerSøkTreffMock) {
  return jobbsøker.status !== JobbsøkerStatus.SLETTET;
}

function matcherFritekst(jobbsøker: JobbsøkerSøkTreffMock, fritekst: string) {
  if (/^\d{11}$/.test(fritekst)) {
    return jobbsøker.fodselsnummer === fritekst;
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

    return (
      faktor *
      `${a.etternavn} ${a.fornavn}`.localeCompare(
        `${b.etternavn} ${b.fornavn}`,
        'nb',
      )
    );
  });
}

export function utførSøk(treffId: string, params: JobbsøkerSøkMockParams) {
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

  const totalt = filtrert.length;
  const sisteSide = Math.max(1, Math.ceil(totalt / params.antallPerSide));
  const gyldigSide = Math.min(Math.max(params.side, 1), sisteSide);
  const start = (gyldigSide - 1) * params.antallPerSide;

  return {
    totalt,
    antallSkjulte: treffId === 'utkast' || treffId === 'slettet' ? 0 : 1,
    antallSlettede,
    side: gyldigSide,
    antallPerSide: params.antallPerSide,
    jobbsøkere: filtrert.slice(start, start + params.antallPerSide),
  };
}
