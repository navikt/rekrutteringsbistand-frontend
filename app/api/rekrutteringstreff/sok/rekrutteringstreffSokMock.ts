import type {
  RekrutteringstreffSokRespons,
  RekrutteringstreffSokTreff,
  Sortering,
  Visning,
} from './useRekrutteringstreffSok';
import {
  PublisertStatus,
  publisertStatusVerdier,
  RekrutteringstreffKategori,
  rekrutteringstreffKategoriVerdier,
  RekrutteringstreffStatus,
  rekrutteringstreffStatusVerdier,
} from '@/app/rekrutteringstreff/_types/constants';
import { faker } from '@faker-js/faker';
import { addDays } from 'date-fns';

const rekrutteringstreffStatusVerdierUtenSlettet =
  rekrutteringstreffStatusVerdier.filter(
    (value) => value != RekrutteringstreffStatus.SLETTET,
  );

const titler = [
  'Rekrutteringstreff – bygg og anlegg',
  'Jobbmesse for helsesektoren',
  'Treff med transport og logistikk',
  'IT-rekruttering vår 2026',
  'Industritreff Vestland',
  'Serveringsbransjen søker folk',
  'Rekruttering innen renhold',
  'Jobbtreff for unge under 30',
  'Treff for Ingeniører',
  'Inkluderingstreff – mangfold i arbeidslivet',
];

const kontorValg = ['0315', '0220', '0314', '0402', '1002'];
const eierValg = ['A123456', 'B654321', 'C654321', 'X999999'];
const MOCK_NAV_IDENT = 'TestIdent';

const morgendagensDato = addDays(new Date(), 1);
const morgendagensÅr = morgendagensDato.getFullYear();
const morgendagensMåned = String(morgendagensDato.getMonth() + 1).padStart(
  2,
  '0',
);
const morgendagensDag = String(morgendagensDato.getDate()).padStart(2, '0');

function lagTreff(i: number): RekrutteringstreffSokTreff {
  const kategori = RekrutteringstreffKategori.REKRUTTERINGSTREFF;
  const status =
    rekrutteringstreffStatusVerdierUtenSlettet[
      i % rekrutteringstreffStatusVerdierUtenSlettet.length
    ];
  const publisertStatus =
    (status === RekrutteringstreffStatus.PUBLISERT &&
      faker.helpers.enumValue(PublisertStatus)) ||
    null;
  const dag = String((i % 28) + 1).padStart(2, '0');
  const mnd = String((i % 12) + 1).padStart(2, '0');
  const kontor = kontorValg[i % kontorValg.length];
  const erUtkast = status === RekrutteringstreffStatus.UTKAST;
  const erEgetTreff = i % 3 === 0;
  const opprettetAv = erEgetTreff
    ? MOCK_NAV_IDENT
    : eierValg[i % eierValg.length];
  const eiere = erEgetTreff
    ? [MOCK_NAV_IDENT, eierValg[i % eierValg.length]]
    : [eierValg[i % eierValg.length], eierValg[(i + 1) % eierValg.length]];

  return {
    id: `mock-sok-${i}`,
    tittel: erUtkast
      ? 'Treff uten navn'
      : `${titler[i % titler.length]} #${i + 1}`,
    beskrivelse: erUtkast ? null : `Beskrivelse for treff nummer ${i + 1}.`,
    kategori,
    status,
    publisertStatus,
    fraTid: erUtkast ? null : `2026-${mnd}-${dag}T09:00:00+02:00`,
    tilTid: erUtkast ? null : `2026-${mnd}-${dag}T12:00:00+02:00`,
    svarfrist: erUtkast ? null : `2026-${mnd}-${dag}T07:00:00+02:00`,
    gateadresse: erUtkast ? null : 'Malmøgata 1',
    postnummer: erUtkast ? null : '5555',
    poststed: erUtkast ? null : 'Kristiansand S',
    opprettetAv,
    opprettetAvTidspunkt: `2025-10-${dag}T10:00:00+02:00`,
    sistEndret: `2025-11-${dag}T14:30:00+02:00`,
    eiere,
    kontorer: [kontor, kontorValg[(i + 1) % kontorValg.length]],
    antallArbeidsgivere: erUtkast ? 0 : (i % 5) + 1,
    antallJobbsøkere: erUtkast ? 0 : (i % 10) + 2,
    antallJobbsøkereSvartJa: erUtkast ? 0 : (i % 7) + 1,
    antallJobbsøkereFåttJobb: erUtkast ? 0 : i % 7,
  };
}

/**
 * Navngitte treff som matcher detaljmockene i `rekrutteringstreffMock.ts`.
 * Disse vises øverst i søkeresultatet slik at man enkelt kan klikke seg inn
 * på et kjent test-treff per status og spesialcase.
 */
const lagNavngittTreff = (
  override: Partial<RekrutteringstreffSokTreff> &
    Pick<RekrutteringstreffSokTreff, 'id' | 'tittel' | 'status' | 'kategori'>,
): RekrutteringstreffSokTreff => ({
  beskrivelse: null,
  publisertStatus: null,
  fraTid: null,
  tilTid: null,
  svarfrist: null,
  gateadresse: null,
  postnummer: null,
  poststed: null,
  opprettetAv: MOCK_NAV_IDENT,
  opprettetAvTidspunkt: '2026-01-01T10:00:00+02:00',
  sistEndret: '2026-05-01T14:30:00+02:00',
  eiere: [MOCK_NAV_IDENT],
  kontorer: [kontorValg[0]],
  antallArbeidsgivere: 0,
  antallJobbsøkere: 0,
  antallJobbsøkereSvartJa: 0,
  antallJobbsøkereFåttJobb: 0,
  ...override,
});

const navngitteSokTreff: RekrutteringstreffSokTreff[] = [
  lagNavngittTreff({
    id: 'utkast',
    tittel: 'Utkast',
    status: RekrutteringstreffStatus.UTKAST,
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
  }),
  lagNavngittTreff({
    id: 'publisert',
    tittel: 'Publisert',
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
    beskrivelse:
      'Møt arbeidsgivere innen bygg og anlegg. Alle jobbsøkere er velkommen!',
    status: RekrutteringstreffStatus.PUBLISERT,
    publisertStatus: PublisertStatus.ÅPEN_FOR_SØKERE,
    fraTid: '2026-06-15T09:00:00+02:00',
    tilTid: '2026-06-15T12:00:00+02:00',
    svarfrist: '2026-06-14T07:00:00+02:00',
    gateadresse: 'Malmøgata 1',
    postnummer: '5555',
    poststed: 'Kristiansand S',
    antallArbeidsgivere: 5,
    antallJobbsøkere: 12,
  }),
  lagNavngittTreff({
    id: 'fullfort',
    tittel: 'Fullført',
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
    beskrivelse: 'Treffet ble gjennomført med godt oppmøte.',
    status: RekrutteringstreffStatus.FULLFØRT,
    fraTid: '2025-09-15T09:00:00+02:00',
    tilTid: '2025-09-15T12:00:00+02:00',
    svarfrist: '2025-09-14T23:59:00+02:00',
    opprettetAvTidspunkt: '2025-08-20T10:00:00+02:00',
    sistEndret: '2025-09-15T13:00:00+02:00',
    antallArbeidsgivere: 4,
    antallJobbsøkere: 18,
  }),
  lagNavngittTreff({
    id: 'avlyst',
    tittel: 'Avlyst',
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
    beskrivelse: 'Treffet ble avlyst grunnet manglende påmeldinger.',
    status: RekrutteringstreffStatus.AVLYST,
    fraTid: '2025-10-20T10:00:00+02:00',
    tilTid: '2025-10-20T13:00:00+02:00',
    svarfrist: '2025-10-19T23:59:00+02:00',
    opprettetAvTidspunkt: '2025-09-25T08:00:00+02:00',
    sistEndret: '2025-10-18T14:30:00+02:00',
    antallArbeidsgivere: 1,
    antallJobbsøkere: 0,
  }),
  lagNavngittTreff({
    id: 'slettet',
    tittel: 'Slettet',
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
    status: RekrutteringstreffStatus.SLETTET,
    opprettetAvTidspunkt: '2025-10-01T11:00:00+02:00',
    sistEndret: '2025-10-01T11:05:00+02:00',
  }),
  lagNavngittTreff({
    id: 'ingen-svart-ja',
    tittel: 'Treff uten ja-svar',
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
    status: RekrutteringstreffStatus.PUBLISERT,
    publisertStatus: PublisertStatus.ÅPEN_FOR_SØKERE,
    fraTid: '2026-06-15T09:00:00+02:00',
    tilTid: '2026-06-15T12:00:00+02:00',
    svarfrist: '2026-06-14T07:00:00+02:00',
    antallArbeidsgivere: 5,
    antallJobbsøkere: 12,
  }),
  lagNavngittTreff({
    id: 'publisert-tidspunkt-passert',
    tittel: 'Publisert treff der treff-tidspunktet har passert',
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
    status: RekrutteringstreffStatus.PUBLISERT,
    publisertStatus: PublisertStatus.SVARFRIST_PASSERT,
    antallArbeidsgivere: 5,
    antallJobbsøkere: 12,
  }),
  lagNavngittTreff({
    id: 'ikke-eier-utkast',
    tittel: 'Utkast – noen andre sitt',
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
    status: RekrutteringstreffStatus.UTKAST,
    opprettetAv: 'X999999',
    eiere: ['X999999'],
  }),
  lagNavngittTreff({
    id: 'ikke-eier-publisert',
    tittel: 'Publisert – noen andre sitt',
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
    status: RekrutteringstreffStatus.PUBLISERT,
    publisertStatus: PublisertStatus.ÅPEN_FOR_SØKERE,
    fraTid: '2026-06-15T09:00:00+02:00',
    tilTid: '2026-06-15T12:00:00+02:00',
    svarfrist: '2026-06-14T07:00:00+02:00',
    opprettetAv: 'X999999',
    eiere: ['X999999'],
    antallArbeidsgivere: 2,
    antallJobbsøkere: 5,
  }),
  lagNavngittTreff({
    id: 'ikke-eier-fullfort',
    tittel: 'Fullført – noen andre sitt',
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
    status: RekrutteringstreffStatus.FULLFØRT,
    fraTid: '2025-09-10T09:00:00+02:00',
    tilTid: '2025-09-10T12:00:00+02:00',
    svarfrist: '2025-09-09T23:59:00+02:00',
    opprettetAv: 'X999999',
    eiere: ['X999999'],
    opprettetAvTidspunkt: '2025-08-15T08:00:00+02:00',
    sistEndret: '2025-09-10T13:00:00+02:00',
    antallArbeidsgivere: 3,
    antallJobbsøkere: 10,
  }),
  lagNavngittTreff({
    id: 'ikke-eier-avlyst',
    tittel: 'Avlyst – noen andre sitt',
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
    status: RekrutteringstreffStatus.AVLYST,
    fraTid: '2025-10-05T10:00:00+02:00',
    tilTid: '2025-10-05T13:00:00+02:00',
    svarfrist: '2025-10-04T23:59:00+02:00',
    opprettetAv: 'X999999',
    eiere: ['X999999'],
    opprettetAvTidspunkt: '2025-09-01T08:00:00+02:00',
    sistEndret: '2025-10-03T14:00:00+02:00',
    antallArbeidsgivere: 1,
    antallJobbsøkere: 3,
  }),
  lagNavngittTreff({
    id: 'for-faa-svart-ja',
    tittel: 'Publisert treff – for få jobbsøkere svart ja',
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
    beskrivelse: 'Testtreff for varselbanner',
    status: RekrutteringstreffStatus.PUBLISERT,
    publisertStatus: PublisertStatus.ÅPEN_FOR_SØKERE,
    fraTid: `${morgendagensÅr}-${morgendagensMåned}-${morgendagensDag}T09:00:00+02:00`,
    tilTid: `${morgendagensÅr}-${morgendagensMåned}-${morgendagensDag}T12:00:00+02:00`,
    svarfrist: `${morgendagensÅr}-${morgendagensMåned}-${morgendagensDag}T07:00:00+02:00`,
    gateadresse: 'Testgata 1',
    postnummer: '0101',
    poststed: 'Oslo',
    opprettetAv: 'A123456',
    opprettetAvTidspunkt: '2025-03-01T10:00:00+02:00',
    sistEndret: '2025-03-15T10:00:00+02:00',
    eiere: ['A123456'],
    kontorer: ['0315'],
    antallArbeidsgivere: 2,
    antallJobbsøkere: 5,
    antallJobbsøkereSvartJa: 1,
  }),
];

const treff: RekrutteringstreffSokTreff[] = [
  ...navngitteSokTreff,
  ...Array.from({ length: 30 }, (_, i) => lagTreff(i)),
];

export const alleSokTreff = treff;

type ByggSokResponsParams = {
  side: number;
  antallPerSide: number;
  visning?: Visning;
  kategorier?: string[];
  statuser?: string[];
  publisertStatuser?: string[];
  kontorer?: string[];
  sortering?: Sortering;
};

const MOCK_KONTOR = '0315';

function filtrerPaVisning(
  treffliste: RekrutteringstreffSokTreff[],
  visning?: Visning,
) {
  if (visning === 'mine') {
    return treffliste.filter((t) => t.eiere.includes(MOCK_NAV_IDENT));
  }

  if (visning === 'mitt_kontor') {
    return treffliste.filter((t) => t.kontorer.includes(MOCK_KONTOR));
  }

  if (visning === 'valgte_kontorer') {
    return treffliste;
  }

  return treffliste;
}

function filtrerPaStatus(
  treffliste: RekrutteringstreffSokTreff[],
  valgteStatuser?: string[],
  valgtePublisertStatuser?: string[],
) {
  if (!valgteStatuser || valgteStatuser.length === 0) {
    return treffliste;
  }

  let trefflisteFiltrertPaStatus = treffliste.filter((treff) =>
    valgteStatuser.includes(treff.status as RekrutteringstreffStatus),
  );
  if (valgtePublisertStatuser) {
    trefflisteFiltrertPaStatus = trefflisteFiltrertPaStatus.filter(
      (treff) =>
        treff.status != RekrutteringstreffStatus.PUBLISERT ||
        valgtePublisertStatuser.includes(
          treff.publisertStatus as PublisertStatus,
        ),
    );
  }
  return trefflisteFiltrertPaStatus;
}

function filtrerPaKontor(
  treffliste: RekrutteringstreffSokTreff[],
  valgteKontorer?: string[],
) {
  if (!valgteKontorer || valgteKontorer.length === 0) {
    return treffliste;
  }

  return treffliste.filter((t) =>
    t.kontorer.some((kontor) => valgteKontorer.includes(kontor)),
  );
}

function aggregerKategori(treffliste: RekrutteringstreffSokTreff[]) {
  return rekrutteringstreffKategoriVerdier.map((kategori) => ({
    verdi: kategori,
    antall: treffliste.filter((t) => t.kategori.toString() === kategori).length,
  }));
}

function aggregerStatus(treffliste: RekrutteringstreffSokTreff[]) {
  return rekrutteringstreffStatusVerdier.map((status) => ({
    verdi: status,
    antall: treffliste.filter((t) => t.status.toString() === status).length,
  }));
}

function aggregerPublisertStatus(treffliste: RekrutteringstreffSokTreff[]) {
  return publisertStatusVerdier.map((status) => ({
    verdi: status,
    antall: treffliste.filter((t) => t.publisertStatus?.toString() === status)
      .length,
  }));
}

function sorterTreff(
  treffliste: RekrutteringstreffSokTreff[],
  sortering?: Sortering,
): RekrutteringstreffSokTreff[] {
  const sorted = [...treffliste];
  switch (sortering) {
    case 'nyeste':
      return sorted.sort(
        (a, b) =>
          new Date(b.opprettetAvTidspunkt).getTime() -
          new Date(a.opprettetAvTidspunkt).getTime(),
      );
    case 'eldste':
      return sorted.sort(
        (a, b) =>
          new Date(a.opprettetAvTidspunkt).getTime() -
          new Date(b.opprettetAvTidspunkt).getTime(),
      );
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.sistEndret).getTime() - new Date(a.sistEndret).getTime(),
      );
  }
}

export function byggSokRespons(
  params: ByggSokResponsParams,
): RekrutteringstreffSokRespons {
  const {
    side,
    antallPerSide,
    visning,
    statuser,
    publisertStatuser,
    kontorer,
    sortering,
  } = params;
  const treffEtterVisning = filtrerPaVisning(treff, visning);
  const treffEtterKontor =
    visning === 'mitt_kontor'
      ? treffEtterVisning
      : filtrerPaKontor(treffEtterVisning, kontorer);
  const treffForStatusaggregering = treffEtterKontor;
  const filtrerteTreff = sorterTreff(
    filtrerPaStatus(treffEtterKontor, statuser, publisertStatuser),
    sortering,
  );
  const start = (side - 1) * antallPerSide;
  const sideTreff = filtrerteTreff.slice(start, start + antallPerSide);

  return {
    treff: sideTreff,
    antallTotalt: filtrerteTreff.length,
    side,
    antallPerSide,
    kategoriaggregering: aggregerKategori(treffForStatusaggregering),
    statusaggregering: aggregerStatus(treffForStatusaggregering),
    publisertstatusaggregering: aggregerPublisertStatus(
      treffForStatusaggregering,
    ),
  };
}
