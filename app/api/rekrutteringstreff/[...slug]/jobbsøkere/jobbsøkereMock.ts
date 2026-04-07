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

const BASE_DATE = new Date('2026-02-12T10:00:00+01:00');

function js(
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
    js(0, 'Marius', JobbsøkerStatus.LAGT_TIL, 'Nav Bærum', {
      veilederNavn: 'Veileder Fornansen',
      veilederNavident: 'L174111',
    }),
    js(1, 'Emilie', JobbsøkerStatus.LAGT_TIL, 'Nav Frogner'),
    js(2, 'Oscar', JobbsøkerStatus.LAGT_TIL, 'Nav Majorstuen'),
    js(3, 'Håkon', JobbsøkerStatus.INVITERT, 'Nav Bærum', {
      minsideHendelser: [
        minsideHendelse('12345670003', 2000, 'SMS', 'SENDT', 'AKTIV'),
        minsideHendelse('12345670003', 3000, 'EPOST', 'SENDT', 'AKTIV'),
      ],
    }),
    js(4, 'Jonathan', JobbsøkerStatus.SVART_JA, 'Nav Kongsberg'),
    js(5, 'Lise', JobbsøkerStatus.SVART_NEI, 'Nav Grorud'),
    js(6, 'Nina', JobbsøkerStatus.INVITERT, 'Nav Grorud', {
      minsideHendelser: [
        minsideHendelse('12345670006', 2000, null, 'FEILET', 'OPPRETTET'),
      ],
    }),
    js(7, 'Anders', JobbsøkerStatus.SVART_JA, 'Nav Grünerløkka'),
    js(8, 'Kristine', JobbsøkerStatus.SVART_JA, 'Nav Sagene'),
    js(9, 'Nora', JobbsøkerStatus.INVITERT, 'Nav Frogner'),
    js(10, 'Lars', JobbsøkerStatus.LAGT_TIL, 'Nav Bærum'),
    js(11, 'Martin', JobbsøkerStatus.SVART_JA, 'Nav Majorstuen'),
    js(12, 'Sofie', JobbsøkerStatus.LAGT_TIL, 'Nav Grorud'),
    js(13, 'Erik', JobbsøkerStatus.SVART_NEI, 'Nav Sagene'),
    js(14, 'Ingrid', JobbsøkerStatus.INVITERT, 'Nav Kongsberg'),
    js(15, 'Thomas', JobbsøkerStatus.LAGT_TIL, 'Nav Stovner'),
    js(16, 'Kari', JobbsøkerStatus.SVART_JA, 'Nav Grünerløkka'),
    js(17, 'Siri', JobbsøkerStatus.LAGT_TIL, 'Nav Bærum'),
    js(18, 'Per', JobbsøkerStatus.INVITERT, 'Nav Frogner'),
    js(19, 'Hanna', JobbsøkerStatus.SVART_NEI, 'Nav Majorstuen'),
    js(20, 'Jakob', JobbsøkerStatus.LAGT_TIL, 'Nav Grorud'),
    js(21, 'Live', JobbsøkerStatus.INVITERT, 'Nav Sagene'),
    js(22, 'Ola', JobbsøkerStatus.SVART_JA, 'Nav Kongsberg'),
    js(23, 'Maria', JobbsøkerStatus.LAGT_TIL, 'Nav Stovner'),
    js(24, 'Agnes', JobbsøkerStatus.INVITERT, 'Nav Grünerløkka'),
    js(25, 'Henrik', JobbsøkerStatus.SVART_NEI, 'Nav Bærum'),
    js(26, 'Fredrik', JobbsøkerStatus.LAGT_TIL, 'Nav Frogner'),
    js(27, 'Maja', JobbsøkerStatus.SVART_JA, 'Nav Majorstuen'),
    js(28, 'Vilde', JobbsøkerStatus.INVITERT, 'Nav Sagene'),
    js(29, 'Tormod', JobbsøkerStatus.LAGT_TIL, 'Nav Grorud'),
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
        `${j.fornavn} ${j.etternavn}`.toLowerCase().startsWith(søk) ||
        j.fodselsnummer === params.fritekst,
    );
  }
  if (params.status?.length) {
    filtrert = filtrert.filter((j) => params.status!.includes(j.status));
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
