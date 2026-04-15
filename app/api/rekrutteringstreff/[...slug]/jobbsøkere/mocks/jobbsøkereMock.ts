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
  fødselsnummer: string;
  fornavn: string;
  etternavn: string;
  status: string;
  lagtTilDato: string;
  lagtTilAv: string | null;
  lagtTilAvNavn: string | null;
  hendelser: MinsideHendelseMock[];
  minsideHendelser: MinsideHendelseMock[];
}

const DATO_UTGANGSPUNKT = new Date('2026-02-12T10:00:00+01:00');
const STANDARD_LAGT_TIL_AV_NAVN = 'Markus Kontaktsen';
const STANDARD_LAGT_TIL_AV_IDENT = 'M112233';

function formatertLopenummer(indeks: number, lengde: number) {
  return String(indeks + 1).padStart(lengde, '0');
}

function lagMockPersonTreffId(indeks: number) {
  return `mock-js-${formatertLopenummer(indeks, 3)}`;
}

function lagMockFodselsnummer(indeks: number) {
  return `1234567${String(indeks).padStart(4, '0')}`;
}

function lagEtternavn(indeks: number) {
  return `Etternavn${formatertLopenummer(indeks, 2)}`;
}

function lagLagtTilDato(indeks: number) {
  return new Date(
    DATO_UTGANGSPUNKT.getTime() + indeks * 7_200_000,
  ).toISOString();
}

function lagHendelser(
  personTreffId: string,
  status: string,
  tidspunkt: string,
  lagtTilAvIdent: string | null,
  lagtTilAvNavn: string | null,
): MinsideHendelseMock[] {
  const hendelser: MinsideHendelseMock[] = [
    {
      id: `h-opprettet-${personTreffId}`,
      tidspunkt,
      hendelsestype: JobbsøkerHendelsestype.OPPRETTET,
      opprettetAvAktørType: 'VEILEDER',
      aktørIdentifikasjon: lagtTilAvIdent,
      hendelseData: lagtTilAvNavn ? { lagtTilAvNavn } : null,
    },
  ];

  if (status !== JobbsøkerStatus.LAGT_TIL) {
    hendelser.push({
      id: `h-invitert-${personTreffId}`,
      tidspunkt,
      hendelsestype: JobbsøkerHendelsestype.INVITERT,
      opprettetAvAktørType: 'VEILEDER',
      aktørIdentifikasjon: lagtTilAvIdent,
      hendelseData: null,
    });
  }

  if (
    status === JobbsøkerStatus.SVART_JA ||
    status === JobbsøkerStatus.SVART_NEI
  ) {
    hendelser.push({
      id: `h-svar-${personTreffId}`,
      tidspunkt,
      hendelsestype:
        status === JobbsøkerStatus.SVART_JA
          ? JobbsøkerHendelsestype.SVART_JA_TIL_INVITASJON
          : JobbsøkerHendelsestype.SVART_NEI_TIL_INVITASJON,
      opprettetAvAktørType: 'SYSTEM',
      aktørIdentifikasjon: null,
      hendelseData: null,
    });
  }

  return hendelser;
}

function lagJobbsøker(
  indeks: number,
  fornavn: string,
  status: string,
  overrides?: Partial<JobbsøkerSøkTreffMock>,
): JobbsøkerSøkTreffMock {
  const standarddata: JobbsøkerSøkTreffMock = {
    personTreffId: lagMockPersonTreffId(indeks),
    fødselsnummer: lagMockFodselsnummer(indeks),
    fornavn,
    etternavn: lagEtternavn(indeks),
    status,
    lagtTilDato: lagLagtTilDato(indeks),
    lagtTilAv: STANDARD_LAGT_TIL_AV_IDENT,
    lagtTilAvNavn: STANDARD_LAGT_TIL_AV_NAVN,
    hendelser: [],
    minsideHendelser: [],
  };

  const jobbsoker = {
    ...standarddata,
    ...overrides,
  };

  return {
    ...jobbsoker,
    hendelser:
      overrides?.hendelser ??
      lagHendelser(
        jobbsoker.personTreffId,
        jobbsoker.status,
        jobbsoker.lagtTilDato,
        jobbsoker.lagtTilAv,
        jobbsoker.lagtTilAvNavn,
      ),
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

export function lagStandardJobbsøkere(): JobbsøkerSøkTreffMock[] {
  return [
    lagJobbsøker(0, 'Marius', JobbsøkerStatus.LAGT_TIL),
    lagJobbsøker(1, 'Emilie', JobbsøkerStatus.LAGT_TIL),
    lagJobbsøker(2, 'Oscar', JobbsøkerStatus.LAGT_TIL),
    lagJobbsøker(3, 'Håkon', JobbsøkerStatus.INVITERT, {
      minsideHendelser: [
        lagMinsideHendelse('12345670003', 2000, 'SMS', 'SENDT', 'AKTIV'),
        lagMinsideHendelse('12345670003', 3000, 'EPOST', 'SENDT', 'AKTIV'),
      ],
    }),
    lagJobbsøker(4, 'Jonathan', JobbsøkerStatus.SVART_JA),
    lagJobbsøker(5, 'Lise', JobbsøkerStatus.SVART_NEI),
    lagJobbsøker(6, 'Nina', JobbsøkerStatus.INVITERT, {
      minsideHendelser: [
        lagMinsideHendelse('12345670006', 2000, null, 'FEILET', 'OPPRETTET'),
      ],
    }),
    lagJobbsøker(7, 'Anders', JobbsøkerStatus.SVART_JA),
    lagJobbsøker(8, 'Kristine', JobbsøkerStatus.SVART_JA),
    lagJobbsøker(9, 'Nora', JobbsøkerStatus.INVITERT, {
      minsideHendelser: [
        lagMinsideHendelse('12345670009', 2000, null, 'FEILET', 'FEILET'),
      ],
    }),
    lagJobbsøker(10, 'Lars', JobbsøkerStatus.LAGT_TIL),
    lagJobbsøker(11, 'Martin', JobbsøkerStatus.SVART_JA),
    lagJobbsøker(12, 'Sofie', JobbsøkerStatus.LAGT_TIL),
    lagJobbsøker(13, 'Erik', JobbsøkerStatus.SVART_NEI),
    lagJobbsøker(14, 'Ingrid', JobbsøkerStatus.INVITERT),
    lagJobbsøker(15, 'Thomas', JobbsøkerStatus.LAGT_TIL),
    lagJobbsøker(16, 'Kari', JobbsøkerStatus.SVART_JA),
    lagJobbsøker(17, 'Siri', JobbsøkerStatus.LAGT_TIL),
    lagJobbsøker(18, 'Per', JobbsøkerStatus.INVITERT),
    lagJobbsøker(19, 'Hanna', JobbsøkerStatus.SVART_NEI),
    lagJobbsøker(20, 'Jakob', JobbsøkerStatus.LAGT_TIL),
    lagJobbsøker(21, 'Live', JobbsøkerStatus.INVITERT),
    lagJobbsøker(22, 'Ola', JobbsøkerStatus.SVART_JA),
    lagJobbsøker(23, 'Maria', JobbsøkerStatus.LAGT_TIL),
    lagJobbsøker(24, 'Agnes', JobbsøkerStatus.INVITERT),
    lagJobbsøker(25, 'Henrik', JobbsøkerStatus.SVART_NEI),
    lagJobbsøker(26, 'Fredrik', JobbsøkerStatus.LAGT_TIL),
    lagJobbsøker(27, 'Maja', JobbsøkerStatus.SVART_JA),
    lagJobbsøker(28, 'Vilde', JobbsøkerStatus.INVITERT),
    lagJobbsøker(29, 'Tormod', JobbsøkerStatus.LAGT_TIL),
  ];
}
