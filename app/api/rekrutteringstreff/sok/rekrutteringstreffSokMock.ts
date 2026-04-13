import type {
  RekrutteringstreffSokRespons,
  RekrutteringstreffSokTreff,
  Sortering,
  Visning,
} from './useRekrutteringstreffSok';
import {
  PublisertStatus,
  publisertStatusVerdier,
  RekrutteringstreffStatus,
  rekrutteringstreffStatusVerdier,
} from '@/app/rekrutteringstreff/_types/constants';
import { faker } from '@faker-js/faker';

const rekrutteringstreffStatusVerdierUtenSlettet =
  rekrutteringstreffStatusVerdier.filter(
    (value) => value != RekrutteringstreffStatus.SLETTET,
  );

const alleStatuser = [
  ...rekrutteringstreffStatusVerdier,
  ...publisertStatusVerdier,
] as const;

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

function lagTreff(i: number): RekrutteringstreffSokTreff {
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

  return {
    id: `mock-sok-${i}`,
    tittel: erUtkast
      ? 'Treff uten navn'
      : `${titler[i % titler.length]} #${i + 1}`,
    beskrivelse: erUtkast ? null : `Beskrivelse for treff nummer ${i + 1}.`,
    status,
    publisertStatus,
    fraTid: erUtkast ? null : `2026-${mnd}-${dag}T09:00:00+02:00`,
    tilTid: erUtkast ? null : `2026-${mnd}-${dag}T12:00:00+02:00`,
    svarfrist: erUtkast ? null : `2026-${mnd}-${dag}T07:00:00+02:00`,
    gateadresse: erUtkast ? null : 'Malmøgata 1',
    postnummer: erUtkast ? null : '5555',
    poststed: erUtkast ? null : 'Kristiansand S',
    opprettetAv: eierValg[i % eierValg.length],
    opprettetAvTidspunkt: `2025-10-${dag}T10:00:00+02:00`,
    sistEndret: `2025-11-${dag}T14:30:00+02:00`,
    eiere: [eierValg[i % eierValg.length], eierValg[(i + 1) % eierValg.length]],
    kontorer: [kontor, kontorValg[(i + 1) % kontorValg.length]],
    antallArbeidsgivere: erUtkast ? 0 : (i % 5) + 1,
    antallJobbsokere: erUtkast ? 0 : (i % 10) + 2,
  };
}

const treff: RekrutteringstreffSokTreff[] = Array.from({ length: 30 }, (_, i) =>
  lagTreff(i),
);

export const alleSokTreff = treff;

type ByggSokResponsParams = {
  side: number;
  antallPerSide: number;
  visning?: Visning;
  statuser?: string[];
  publisertStatuser?: string[];
  kontorer?: string[];
  sortering?: Sortering;
};

const MOCK_NAV_IDENT = 'A123456';
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

function aggregerStatus(treffliste: RekrutteringstreffSokTreff[]) {
  return alleStatuser.map((status) => ({
    verdi: status,
    antall:
      treffliste.filter((t) => t.status.toString() === status).length ||
      treffliste.filter((t) => t.publisertStatus?.toString() === status).length,
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
    statusaggregering: aggregerStatus(treffForStatusaggregering),
  };
}
