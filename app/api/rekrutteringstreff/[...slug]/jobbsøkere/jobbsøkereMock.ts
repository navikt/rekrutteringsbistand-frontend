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
  innsatsgruppe: string | null;
  fylke: string | null;
  kommune: string | null;
  poststed: string | null;
  navkontor: string | null;
  veilederNavn: string | null;
  veilederNavident: string | null;
  telefonnummer: string | null;
  status: string;
  invitertDato: string | null;
  lagtTilDato: string;
  lagtTilAv: string | null;
  minsideHendelser: MinsideHendelseMock[];
}

const BASE_DATE = new Date('2026-02-12T10:00:00+01:00');

function js(
  i: number,
  fornavn: string,
  status: string,
  innsatsgruppe: string,
  navkontor: string,
  overrides?: Partial<JobbsøkerSøkTreffMock>,
): JobbsøkerSøkTreffMock {
  const nn = String(i + 1).padStart(2, '0');
  const harInvitasjon = status !== JobbsøkerStatus.LAGT_TIL;
  return {
    personTreffId: `mock-js-${String(i + 1).padStart(3, '0')}`,
    fodselsnummer: `1234567${String(i).padStart(4, '0')}`,
    fornavn,
    etternavn: `Etternavn${nn}`,
    innsatsgruppe,
    fylke: 'Oslo',
    kommune: 'Oslo',
    poststed: 'Oslo',
    navkontor,
    veilederNavn: 'Kari Nordmann',
    veilederNavident: 'Z990248',
    telefonnummer: i % 3 === 0 ? null : `9${String(i).padStart(7, '0')}`,
    status,
    invitertDato: harInvitasjon
      ? new Date(BASE_DATE.getTime() + i * 3_600_000).toISOString()
      : null,
    lagtTilDato: new Date(BASE_DATE.getTime() + i * 7_200_000).toISOString(),
    lagtTilAv: 'Z990248',
    minsideHendelser: [],
    ...overrides,
  };
}

function minsideHendelse(
  fnr: string,
  offsetMs: number,
  eksternKanal: string | null,
  eksternStatus: string,
  minsideStatus: string,
): MinsideHendelseMock {
  return {
    id: `minside-${fnr}-${offsetMs}`,
    tidspunkt: new Date(BASE_DATE.getTime() + offsetMs).toISOString(),
    hendelsestype: JobbsøkerHendelsestype.MOTTATT_SVAR_FRA_MINSIDE,
    opprettetAvAktørType: 'SYSTEM',
    aktørIdentifikasjon: null,
    hendelseData: {
      varselId: `varsel-${fnr}-${offsetMs}`,
      avsenderReferanseId: `ref-${fnr}`,
      fnr,
      eksternStatus,
      minsideStatus,
      opprettet: new Date(BASE_DATE.getTime() + offsetMs - 500).toISOString(),
      avsenderNavident: 'Z123456',
      eksternFeilmelding: null,
      eksternKanal,
      mal: 'KANDIDAT_INVITERT_TREFF',
      flettedata: null,
    },
  };
}

function lagJobbsøkere(): JobbsøkerSøkTreffMock[] {
  return [
    js(0, 'Marius', JobbsøkerStatus.LAGT_TIL, 'Standardinnsats', 'Nav Bærum', {
      veilederNavn: 'Fredrik Agboola',
      veilederNavident: 'L174111',
      telefonnummer: '99887766',
    }),
    js(
      1,
      'Emilie',
      JobbsøkerStatus.LAGT_TIL,
      'Situasjonsbestemt innsats',
      'Nav Frogner',
    ),
    js(
      2,
      'Oscar',
      JobbsøkerStatus.LAGT_TIL,
      'Spesielt tilpasset innsats',
      'Nav Majorstuen',
    ),
    js(3, 'Håkon', JobbsøkerStatus.INVITERT, 'Standardinnsats', 'Nav Bærum', {
      minsideHendelser: [
        minsideHendelse('12345670003', 2000, 'SMS', 'SENDT', 'AKTIV'),
        minsideHendelse('12345670003', 3000, 'EPOST', 'SENDT', 'AKTIV'),
      ],
    }),
    js(
      4,
      'Jonathan',
      JobbsøkerStatus.SVART_JA,
      'Varig tilpasset innsats',
      'Nav Kongsberg',
    ),
    js(5, 'Lise', JobbsøkerStatus.SVART_NEI, 'Standardinnsats', 'Nav Grorud'),
    js(
      6,
      'Nina',
      JobbsøkerStatus.INVITERT,
      'Situasjonsbestemt innsats',
      'Nav Grorud',
      {
        minsideHendelser: [
          minsideHendelse('12345670006', 2000, null, 'FEILET', 'OPPRETTET'),
        ],
      },
    ),
    js(
      7,
      'Anders',
      JobbsøkerStatus.SVART_JA,
      'Standardinnsats',
      'Nav Grünerløkka',
    ),
    js(
      8,
      'Kristine',
      JobbsøkerStatus.SVART_JA,
      'Situasjonsbestemt innsats',
      'Nav Sagene',
    ),
    js(9, 'Nora', JobbsøkerStatus.INVITERT, 'Standardinnsats', 'Nav Frogner'),
    js(
      10,
      'Lars',
      JobbsøkerStatus.LAGT_TIL,
      'Varig tilpasset innsats',
      'Nav Bærum',
    ),
    js(
      11,
      'Martin',
      JobbsøkerStatus.SVART_JA,
      'Situasjonsbestemt innsats',
      'Nav Majorstuen',
    ),
    js(
      12,
      'Sofie',
      JobbsøkerStatus.LAGT_TIL,
      'Spesielt tilpasset innsats',
      'Nav Grorud',
    ),
    js(13, 'Erik', JobbsøkerStatus.SVART_NEI, 'Standardinnsats', 'Nav Sagene'),
    js(
      14,
      'Ingrid',
      JobbsøkerStatus.INVITERT,
      'Varig tilpasset innsats',
      'Nav Kongsberg',
    ),
    js(
      15,
      'Thomas',
      JobbsøkerStatus.LAGT_TIL,
      'Standardinnsats',
      'Nav Stovner',
    ),
    js(
      16,
      'Kari',
      JobbsøkerStatus.SVART_JA,
      'Situasjonsbestemt innsats',
      'Nav Grünerløkka',
    ),
    js(
      17,
      'Siri',
      JobbsøkerStatus.LAGT_TIL,
      'Spesielt tilpasset innsats',
      'Nav Bærum',
    ),
    js(18, 'Per', JobbsøkerStatus.INVITERT, 'Standardinnsats', 'Nav Frogner'),
    js(
      19,
      'Hanna',
      JobbsøkerStatus.SVART_NEI,
      'Varig tilpasset innsats',
      'Nav Majorstuen',
    ),
    js(20, 'Jakob', JobbsøkerStatus.LAGT_TIL, 'Standardinnsats', 'Nav Grorud'),
    js(
      21,
      'Live',
      JobbsøkerStatus.INVITERT,
      'Situasjonsbestemt innsats',
      'Nav Sagene',
    ),
    js(
      22,
      'Ola',
      JobbsøkerStatus.SVART_JA,
      'Spesielt tilpasset innsats',
      'Nav Kongsberg',
    ),
    js(23, 'Maria', JobbsøkerStatus.LAGT_TIL, 'Standardinnsats', 'Nav Stovner'),
    js(
      24,
      'Agnes',
      JobbsøkerStatus.INVITERT,
      'Standardinnsats',
      'Nav Grünerløkka',
    ),
    js(
      25,
      'Henrik',
      JobbsøkerStatus.SVART_NEI,
      'Varig tilpasset innsats',
      'Nav Bærum',
    ),
    js(
      26,
      'Fredrik',
      JobbsøkerStatus.LAGT_TIL,
      'Situasjonsbestemt innsats',
      'Nav Frogner',
    ),
    js(
      27,
      'Maja',
      JobbsøkerStatus.SVART_JA,
      'Spesielt tilpasset innsats',
      'Nav Majorstuen',
    ),
    js(
      28,
      'Vilde',
      JobbsøkerStatus.INVITERT,
      'Situasjonsbestemt innsats',
      'Nav Sagene',
    ),
    js(29, 'Tormod', JobbsøkerStatus.LAGT_TIL, 'Standardinnsats', 'Nav Grorud'),
  ];
}

export const jobbsøkerSøkStore = new Map<string, JobbsøkerSøkTreffMock[]>();

function initStore(treffId: string) {
  if (jobbsøkerSøkStore.has(treffId)) return;
  const defaults: Record<string, () => JobbsøkerSøkTreffMock[]> = {
    utkast: () => lagJobbsøkere().slice(0, 1),
    slettet: () => [],
    'ingen-svart-ja': () =>
      lagJobbsøkere()
        .filter((j) => j.status !== JobbsøkerStatus.SVART_JA)
        .slice(0, 4),
  };
  jobbsøkerSøkStore.set(treffId, (defaults[treffId] ?? lagJobbsøkere)());
}

export function hentJobbsøkerListe(treffId: string): JobbsøkerSøkTreffMock[] {
  initStore(treffId);
  return jobbsøkerSøkStore.get(treffId)!;
}

export function utførSøk(
  treffId: string,
  params: {
    side: number;
    antallPerSide: number;
    sorteringsfelt?: string;
    sorteringsretning?: string;
    fritekst?: string;
    status?: string[];
    innsatsgruppe?: string[];
  },
) {
  const alle = hentJobbsøkerListe(treffId);
  const antallSlettede = alle.filter(
    (j) => j.status === JobbsøkerStatus.SLETTET,
  ).length;

  let filtrert = alle.filter((j) => j.status !== JobbsøkerStatus.SLETTET);

  if (params.fritekst) {
    const søk = params.fritekst.toLowerCase();
    filtrert = filtrert.filter(
      (j) =>
        `${j.fornavn} ${j.etternavn}`.toLowerCase().includes(søk) ||
        j.navkontor?.toLowerCase().includes(søk) ||
        j.veilederNavident?.toLowerCase().includes(søk),
    );
  }
  if (params.status?.length) {
    filtrert = filtrert.filter((j) => params.status!.includes(j.status));
  }
  if (params.innsatsgruppe?.length) {
    filtrert = filtrert.filter(
      (j) =>
        j.innsatsgruppe != null &&
        params.innsatsgruppe!.includes(j.innsatsgruppe),
    );
  }

  const felt = params.sorteringsfelt ?? 'navn';
  const retning =
    params.sorteringsretning ?? (felt === 'lagt-til' ? 'desc' : 'asc');
  const faktor = retning === 'desc' ? -1 : 1;

  filtrert.sort((a, b) => {
    if (felt === 'lagt-til')
      return faktor * a.lagtTilDato.localeCompare(b.lagtTilDato);
    return (
      faktor *
      `${a.etternavn} ${a.fornavn}`.localeCompare(
        `${b.etternavn} ${b.fornavn}`,
        'nb',
      )
    );
  });

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

export function hentInnsatsgrupper(treffId: string) {
  const alle = hentJobbsøkerListe(treffId).filter(
    (j) => j.status !== JobbsøkerStatus.SLETTET,
  );
  const innsatsgrupper = [
    ...new Set(alle.map((j) => j.innsatsgruppe).filter(Boolean)),
  ].sort();
  return { innsatsgrupper };
}
