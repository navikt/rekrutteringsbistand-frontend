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
  hendelser: MinsideHendelseMock[];
  minsideHendelser: MinsideHendelseMock[];
}

const DATO_UTGANGSPUNKT = new Date('2026-02-12T10:00:00+01:00');
const STANDARD_VEILEDER_NAVN = 'Veileder Etternavn';
const STANDARD_VEILEDER_NAVIDENT = 'Z990248';

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
  veilederNavident: string | null,
): MinsideHendelseMock[] {
  const hendelser: MinsideHendelseMock[] = [
    {
      id: `h-opprettet-${personTreffId}`,
      tidspunkt,
      hendelsestype: JobbsøkerHendelsestype.OPPRETTET,
      opprettetAvAktørType: 'VEILEDER',
      aktørIdentifikasjon: veilederNavident,
      hendelseData: null,
    },
  ];

  if (status !== JobbsøkerStatus.LAGT_TIL) {
    hendelser.push({
      id: `h-invitert-${personTreffId}`,
      tidspunkt,
      hendelsestype: JobbsøkerHendelsestype.INVITERT,
      opprettetAvAktørType: 'VEILEDER',
      aktørIdentifikasjon: veilederNavident,
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
  navkontor: string,
  overrides?: Partial<JobbsøkerSøkTreffMock>,
): JobbsøkerSøkTreffMock {
  const standarddata: JobbsøkerSøkTreffMock = {
    personTreffId: lagMockPersonTreffId(indeks),
    fodselsnummer: lagMockFodselsnummer(indeks),
    fornavn,
    etternavn: lagEtternavn(indeks),
    navkontor,
    veilederNavn: STANDARD_VEILEDER_NAVN,
    veilederNavident: STANDARD_VEILEDER_NAVIDENT,
    status,
    lagtTilDato: lagLagtTilDato(indeks),
    lagtTilAv: STANDARD_VEILEDER_NAVIDENT,
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
        jobbsoker.veilederNavident,
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
