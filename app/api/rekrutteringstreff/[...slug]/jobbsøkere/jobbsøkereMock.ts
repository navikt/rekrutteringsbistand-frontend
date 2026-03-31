import {
  JobbsøkerHendelsestype,
  JobbsøkerStatus,
} from '@/app/rekrutteringstreff/_types/constants';

export interface JobbsøkerSøkTreffMock {
  personTreffId: string;
  fornavn: string;
  etternavn: string;
  innsatsgruppe: string;
  fylke: string;
  kommune: string;
  poststed: string;
  navkontor: string;
  veilederNavn: string;
  veilederNavident: string;
  telefonnummer: string | null;
  status: string;
  invitertDato: string | null;
  lagtTilDato: string;
  lagtTilAv: string;
  minsideHendelser: MinsideHendelseMock[];
}

interface MinsideHendelseMock {
  id: string;
  tidspunkt: string;
  hendelsestype: string;
  opprettetAvAktørType: string;
  aktørIdentifikasjon: string | null;
  hendelseData: Record<string, unknown> | null;
}

const INNSATSGRUPPER = [
  'Standardinnsats',
  'Situasjonsbestemt innsats',
  'Spesielt tilpasset innsats',
  'Varig tilpasset innsats',
];

const NAVKONTORER = [
  'Nav Bærum',
  'Nav Frogner',
  'Nav Majorstuen',
  'Nav Grorud',
  'Nav Sagene',
  'Nav Kongsberg',
  'Nav Stovner',
  'Nav Grünerløkka',
];

const STEDER = [
  { fylke: 'Oslo', kommune: 'Oslo', poststed: 'Oslo' },
  { fylke: 'Viken', kommune: 'Bærum', poststed: 'Sandvika' },
  { fylke: 'Viken', kommune: 'Asker', poststed: 'Asker' },
  {
    fylke: 'Vestfold og Telemark',
    kommune: 'Kongsberg',
    poststed: 'Kongsberg',
  },
  { fylke: 'Oslo', kommune: 'Oslo', poststed: 'Sagene' },
];

const VEILEDERE = [
  { navn: 'Fredrik Agboola', ident: 'L174111' },
  { navn: 'Marie Oluwanisola', ident: 'A479484' },
  { navn: 'Jonas Berger', ident: 'J112233' },
  { navn: 'Ida Kvam', ident: 'I445566' },
  { navn: 'Eline Bello', ident: 'J370702' },
  { navn: 'Per Hansen', ident: 'P123456' },
  { navn: 'Kari Nordmann', ident: 'Z990248' },
  { navn: 'Thomas Berg', ident: 'T456789' },
];

const TELEFONNUMRE = [
  '99887766',
  '41234567',
  '92345678',
  null,
  '48765432',
  '91234567',
  null,
  '45678901',
];

const BASE_DATE = new Date('2026-02-12T10:00:00+01:00');

// [fornavn, etternavn, status, navkontorIdx, innsatsgruppeIdx, stedIdx, veilederIdx]
type Rå = [string, string, string, number, number, number, number];

const RÅDATA: Rå[] = [
  ['Marius', 'Etternavn01', JobbsøkerStatus.LAGT_TIL, 0, 0, 1, 0],
  ['Emilie', 'Etternavn02', JobbsøkerStatus.LAGT_TIL, 1, 1, 0, 2],
  ['Oscar', 'Etternavn03', JobbsøkerStatus.LAGT_TIL, 2, 2, 0, 3],
  ['Håkon', 'Etternavn04', JobbsøkerStatus.INVITERT, 0, 0, 1, 1],
  ['Jonathan', 'Etternavn05', JobbsøkerStatus.SVART_JA, 5, 3, 3, 4],
  ['Lise', 'Etternavn06', JobbsøkerStatus.SVART_NEI, 3, 0, 0, 5],
  ['Nina', 'Etternavn07', JobbsøkerStatus.INVITERT, 3, 1, 0, 5],
  ['Teoretisk', 'Etternavn08', JobbsøkerStatus.INVITERT, 6, 2, 0, 6],
  ['Anders', 'Etternavn09', JobbsøkerStatus.SVART_JA, 7, 0, 0, 7],
  ['Kristine', 'Etternavn10', JobbsøkerStatus.SVART_JA, 4, 1, 4, 7],
  ['Lars', 'Etternavn11', JobbsøkerStatus.LAGT_TIL, 0, 3, 1, 0],
  ['Nora', 'Etternavn12', JobbsøkerStatus.INVITERT, 1, 0, 0, 1],
  ['Martin', 'Etternavn13', JobbsøkerStatus.SVART_JA, 2, 1, 0, 2],
  ['Sofie', 'Etternavn14', JobbsøkerStatus.LAGT_TIL, 3, 2, 0, 3],
  ['Erik', 'Etternavn15', JobbsøkerStatus.SVART_NEI, 4, 0, 4, 4],
  ['Ingrid', 'Etternavn16', JobbsøkerStatus.INVITERT, 5, 3, 3, 5],
  ['Thomas', 'Etternavn17', JobbsøkerStatus.LAGT_TIL, 6, 0, 0, 6],
  ['Kari', 'Etternavn18', JobbsøkerStatus.SVART_JA, 7, 1, 0, 7],
  ['Siri', 'Etternavn19', JobbsøkerStatus.LAGT_TIL, 0, 2, 1, 0],
  ['Per', 'Etternavn20', JobbsøkerStatus.INVITERT, 1, 0, 0, 1],
  ['Hanna', 'Etternavn21', JobbsøkerStatus.SVART_NEI, 2, 3, 0, 2],
  ['Jakob', 'Etternavn22', JobbsøkerStatus.LAGT_TIL, 3, 0, 0, 3],
  ['Live', 'Etternavn23', JobbsøkerStatus.INVITERT, 4, 1, 4, 4],
  ['Ola', 'Etternavn24', JobbsøkerStatus.SVART_JA, 5, 2, 3, 5],
  ['Maria', 'Etternavn25', JobbsøkerStatus.LAGT_TIL, 6, 0, 0, 6],
  ['Henrik', 'Etternavn26', JobbsøkerStatus.SVART_NEI, 7, 3, 0, 7],
  ['Agnes', 'Etternavn27', JobbsøkerStatus.INVITERT, 0, 0, 1, 0],
  ['Fredrik', 'Etternavn28', JobbsøkerStatus.LAGT_TIL, 1, 1, 0, 1],
  ['Maja', 'Etternavn29', JobbsøkerStatus.SVART_JA, 2, 2, 0, 2],
  ['Tormod', 'Etternavn30', JobbsøkerStatus.LAGT_TIL, 3, 0, 0, 3],
];

let idCounter = 0;
const lagId = () => `mock-js-${String(++idCounter).padStart(3, '0')}`;

function lagMinsideHendelser(status: string, i: number): MinsideHendelseMock[] {
  if (status === JobbsøkerStatus.LAGT_TIL) return [];
  const tidspunkt = new Date(
    BASE_DATE.getTime() + i * 60_000 + 120_000,
  ).toISOString();

  const harEksternKanal = i !== 6;

  return [
    {
      id: `mh-${i}`,
      tidspunkt,
      hendelsestype: JobbsøkerHendelsestype.MOTTATT_SVAR_FRA_MINSIDE,
      opprettetAvAktørType: 'SYSTEM',
      aktørIdentifikasjon: null,
      hendelseData: {
        varselId: `varsel-${i}`,
        avsenderReferanseId: `avsender-ref-${i}`,
        fnr: `12345678${String(i).padStart(3, '0')}`,
        eksternStatus: 'SENDT',
        minsideStatus: harEksternKanal ? 'AKTIV' : 'OPPRETTET',
        opprettet: tidspunkt,
        avsenderNavident: 'Z123456',
        eksternFeilmelding: null,
        eksternKanal: harEksternKanal ? 'SMS' : null,
        mal: 'KANDIDAT_INVITERT_TREFF',
        flettedata: null,
      },
    },
  ];
}

function lagPublisertJobbsøkere(): JobbsøkerSøkTreffMock[] {
  idCounter = 0;
  return RÅDATA.map(
    ([fornavn, etternavn, status, nkIdx, igIdx, stIdx, vlIdx], i) => {
      const sted = STEDER[stIdx];
      const veileder = VEILEDERE[vlIdx];
      return {
        personTreffId: lagId(),
        fornavn,
        etternavn,
        innsatsgruppe: INNSATSGRUPPER[igIdx],
        fylke: sted.fylke,
        kommune: sted.kommune,
        poststed: sted.poststed,
        navkontor: NAVKONTORER[nkIdx],
        veilederNavn: veileder.navn,
        veilederNavident: veileder.ident,
        telefonnummer: TELEFONNUMRE[vlIdx],
        status,
        invitertDato:
          status !== JobbsøkerStatus.LAGT_TIL
            ? new Date(BASE_DATE.getTime() + i * 3_600_000).toISOString()
            : null,
        lagtTilDato: new Date(
          BASE_DATE.getTime() + i * 1_800_000,
        ).toISOString(),
        lagtTilAv: veileder.ident,
        minsideHendelser: lagMinsideHendelser(status, i),
      };
    },
  );
}

export const jobbsøkerSøkStore = new Map<string, JobbsøkerSøkTreffMock[]>();
const antallSkjultePerTreff = new Map<string, number>();

function initStore(treffId: string) {
  if (jobbsøkerSøkStore.has(treffId)) return;
  const defaults: Record<string, () => JobbsøkerSøkTreffMock[]> = {
    utkast: () => lagPublisertJobbsøkere().slice(0, 1),
    slettet: () => [],
    'ingen-svart-ja': () =>
      lagPublisertJobbsøkere()
        .filter((j) => j.status !== JobbsøkerStatus.SVART_JA)
        .slice(0, 4),
  };
  jobbsøkerSøkStore.set(
    treffId,
    (defaults[treffId] ?? lagPublisertJobbsøkere)(),
  );
  antallSkjultePerTreff.set(
    treffId,
    treffId === 'utkast' || treffId === 'slettet' ? 0 : 1,
  );
}

export function hentJobbsøkerListe(treffId: string): JobbsøkerSøkTreffMock[] {
  initStore(treffId);
  return jobbsøkerSøkStore.get(treffId)!;
}

export interface MockSøkParams {
  side: number;
  antallPerSide: number;
  sortering?: string;
  fritekst?: string;
  status?: string[];
  innsatsgruppe?: string[];
  navkontor?: string;
  fylke?: string;
  kommune?: string;
}

export function utførSøk(treffId: string, params: MockSøkParams) {
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
        j.navkontor.toLowerCase().includes(søk) ||
        j.veilederNavn.toLowerCase().includes(søk) ||
        j.veilederNavident.toLowerCase().includes(søk),
    );
  }
  if (params.status?.length) {
    filtrert = filtrert.filter((j) => params.status!.includes(j.status));
  }
  if (params.innsatsgruppe?.length) {
    filtrert = filtrert.filter((j) =>
      params.innsatsgruppe!.includes(j.innsatsgruppe),
    );
  }
  if (params.navkontor) {
    filtrert = filtrert.filter((j) => j.navkontor === params.navkontor);
  }
  if (params.fylke) {
    filtrert = filtrert.filter((j) => j.fylke === params.fylke);
  }
  if (params.kommune) {
    filtrert = filtrert.filter((j) => j.kommune === params.kommune);
  }

  filtrert.sort((a, b) => {
    switch (params.sortering) {
      case 'lagt_til_dato':
        return (b.lagtTilDato ?? '').localeCompare(a.lagtTilDato ?? '');
      case 'navn':
      default:
        return `${a.etternavn} ${a.fornavn}`.localeCompare(
          `${b.etternavn} ${b.fornavn}`,
          'nb',
        );
    }
  });

  const totalt = filtrert.length;
  const start = (params.side - 1) * params.antallPerSide;
  const paginert = filtrert.slice(start, start + params.antallPerSide);

  initStore(treffId);
  return {
    totalt,
    antallSkjulte: antallSkjultePerTreff.get(treffId) ?? 0,
    antallSlettede,
    side: params.side,
    antallPerSide: params.antallPerSide,
    jobbsøkere: paginert,
  };
}

export function hentFilterverdier(treffId: string) {
  const alle = hentJobbsøkerListe(treffId).filter(
    (j) => j.status !== JobbsøkerStatus.SLETTET,
  );

  const navkontor = [
    ...new Set(alle.map((j) => j.navkontor).filter(Boolean)),
  ].sort();
  const innsatsgrupper = [
    ...new Set(alle.map((j) => j.innsatsgruppe).filter(Boolean)),
  ].sort();
  const kommuner = [
    ...new Set(alle.map((j) => j.kommune).filter(Boolean)),
  ].sort();
  const fylker = [...new Set(alle.map((j) => j.fylke).filter(Boolean))].sort();
  const steder = [
    ...fylker.map((f) => ({ navn: f, type: 'fylke' as const })),
    ...kommuner.map((k) => ({ navn: k, type: 'kommune' as const })),
  ];

  return { navkontor, innsatsgrupper, steder };
}
