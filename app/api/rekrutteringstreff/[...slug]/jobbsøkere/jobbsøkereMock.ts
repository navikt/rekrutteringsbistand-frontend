import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';

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
  minsideHendelser: never[];
}

const BASE_DATE = new Date('2026-02-12T10:00:00+01:00');

function js(
  i: number,
  fornavn: string,
  etternavn: string,
  status: string,
  innsatsgruppe: string,
  navkontor: string,
): JobbsøkerSøkTreffMock {
  const harInvitasjon = status !== JobbsøkerStatus.LAGT_TIL;
  return {
    personTreffId: `mock-js-${String(i + 1).padStart(3, '0')}`,
    fodselsnummer: `1234567${String(i).padStart(4, '0')}`,
    fornavn,
    etternavn,
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
  };
}

function lagJobbsøkere(): JobbsøkerSøkTreffMock[] {
  return [
    js(
      0,
      'Marius',
      'Andersen',
      JobbsøkerStatus.LAGT_TIL,
      'Standardinnsats',
      'Nav Bærum',
    ),
    js(
      1,
      'Emilie',
      'Berg',
      JobbsøkerStatus.LAGT_TIL,
      'Situasjonsbestemt innsats',
      'Nav Frogner',
    ),
    js(
      2,
      'Oscar',
      'Christensen',
      JobbsøkerStatus.LAGT_TIL,
      'Spesielt tilpasset innsats',
      'Nav Majorstuen',
    ),
    js(
      3,
      'Håkon',
      'Dahl',
      JobbsøkerStatus.INVITERT,
      'Standardinnsats',
      'Nav Bærum',
    ),
    js(
      4,
      'Jonathan',
      'Eriksen',
      JobbsøkerStatus.SVART_JA,
      'Varig tilpasset innsats',
      'Nav Kongsberg',
    ),
    js(
      5,
      'Lise',
      'Fredriksen',
      JobbsøkerStatus.SVART_NEI,
      'Standardinnsats',
      'Nav Grorud',
    ),
    js(
      6,
      'Nina',
      'Gran',
      JobbsøkerStatus.INVITERT,
      'Situasjonsbestemt innsats',
      'Nav Grorud',
    ),
    js(
      7,
      'Anders',
      'Hansen',
      JobbsøkerStatus.SVART_JA,
      'Standardinnsats',
      'Nav Grünerløkka',
    ),
    js(
      8,
      'Kristine',
      'Iversen',
      JobbsøkerStatus.SVART_JA,
      'Situasjonsbestemt innsats',
      'Nav Sagene',
    ),
    js(
      9,
      'Lars',
      'Jensen',
      JobbsøkerStatus.LAGT_TIL,
      'Varig tilpasset innsats',
      'Nav Bærum',
    ),
    js(
      10,
      'Nora',
      'Karlsen',
      JobbsøkerStatus.INVITERT,
      'Standardinnsats',
      'Nav Frogner',
    ),
    js(
      11,
      'Martin',
      'Larsen',
      JobbsøkerStatus.SVART_JA,
      'Situasjonsbestemt innsats',
      'Nav Majorstuen',
    ),
    js(
      12,
      'Sofie',
      'Moen',
      JobbsøkerStatus.LAGT_TIL,
      'Spesielt tilpasset innsats',
      'Nav Grorud',
    ),
    js(
      13,
      'Erik',
      'Nilsen',
      JobbsøkerStatus.SVART_NEI,
      'Standardinnsats',
      'Nav Sagene',
    ),
    js(
      14,
      'Ingrid',
      'Olsen',
      JobbsøkerStatus.INVITERT,
      'Varig tilpasset innsats',
      'Nav Kongsberg',
    ),
    js(
      15,
      'Thomas',
      'Paulsen',
      JobbsøkerStatus.LAGT_TIL,
      'Standardinnsats',
      'Nav Stovner',
    ),
    js(
      16,
      'Kari',
      'Kvalheim',
      JobbsøkerStatus.SVART_JA,
      'Situasjonsbestemt innsats',
      'Nav Grünerløkka',
    ),
    js(
      17,
      'Siri',
      'Rasmussen',
      JobbsøkerStatus.LAGT_TIL,
      'Spesielt tilpasset innsats',
      'Nav Bærum',
    ),
    js(
      18,
      'Per',
      'Sandvik',
      JobbsøkerStatus.INVITERT,
      'Standardinnsats',
      'Nav Frogner',
    ),
    js(
      19,
      'Hanna',
      'Thorsen',
      JobbsøkerStatus.SVART_NEI,
      'Varig tilpasset innsats',
      'Nav Majorstuen',
    ),
    js(
      20,
      'Jakob',
      'Urheim',
      JobbsøkerStatus.LAGT_TIL,
      'Standardinnsats',
      'Nav Grorud',
    ),
    js(
      21,
      'Live',
      'Vestby',
      JobbsøkerStatus.INVITERT,
      'Situasjonsbestemt innsats',
      'Nav Sagene',
    ),
    js(
      22,
      'Ola',
      'Wiik',
      JobbsøkerStatus.SVART_JA,
      'Spesielt tilpasset innsats',
      'Nav Kongsberg',
    ),
    js(
      23,
      'Maria',
      'Aasen',
      JobbsøkerStatus.LAGT_TIL,
      'Standardinnsats',
      'Nav Stovner',
    ),
    js(
      24,
      'Henrik',
      'Bakke',
      JobbsøkerStatus.SVART_NEI,
      'Varig tilpasset innsats',
      'Nav Grünerløkka',
    ),
    js(
      25,
      'Agnes',
      'Carlsen',
      JobbsøkerStatus.INVITERT,
      'Standardinnsats',
      'Nav Bærum',
    ),
    js(
      26,
      'Fredrik',
      'Dahle',
      JobbsøkerStatus.LAGT_TIL,
      'Situasjonsbestemt innsats',
      'Nav Frogner',
    ),
    js(
      27,
      'Maja',
      'Elstad',
      JobbsøkerStatus.SVART_JA,
      'Spesielt tilpasset innsats',
      'Nav Majorstuen',
    ),
    js(
      28,
      'Tormod',
      'Foss',
      JobbsøkerStatus.LAGT_TIL,
      'Standardinnsats',
      'Nav Grorud',
    ),
    js(
      29,
      'Vilde',
      'Grønli',
      JobbsøkerStatus.INVITERT,
      'Situasjonsbestemt innsats',
      'Nav Sagene',
    ),
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
        j.navkontor?.toLowerCase().includes(søk),
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
