import type {
  RekrutteringstreffSokRespons,
  RekrutteringstreffSokTreff,
  Sortering,
  Visning,
} from './useRekrutteringstreffSok';
import type { SokStatus } from '@/app/rekrutteringstreff/_types/constants';

const statusVarianter: { status: SokStatus; apenForSokere: boolean }[] = [
  { status: 'utkast', apenForSokere: false },
  { status: 'publisert', apenForSokere: true },
  { status: 'publisert', apenForSokere: false },
  { status: 'fullfort', apenForSokere: false },
  { status: 'avlyst', apenForSokere: false },
];

const alleStatuser: SokStatus[] = ['utkast', 'publisert', 'fullfort', 'avlyst'];

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
  const variant = statusVarianter[i % statusVarianter.length];
  const dag = String((i % 28) + 1).padStart(2, '0');
  const mnd = String((i % 12) + 1).padStart(2, '0');
  const kontor = kontorValg[i % kontorValg.length];

  return {
    id: `mock-sok-${i}`,
    tittel:
      variant.status === 'utkast'
        ? 'Treff uten navn'
        : `${titler[i % titler.length]} #${i + 1}`,
    beskrivelse:
      variant.status === 'utkast'
        ? null
        : `Beskrivelse for treff nummer ${i + 1}.`,
    status: variant.status,
    apenForSokere: variant.apenForSokere,
    fraTid:
      variant.status === 'utkast' ? null : `2026-${mnd}-${dag}T09:00:00+02:00`,
    tilTid:
      variant.status === 'utkast' ? null : `2026-${mnd}-${dag}T12:00:00+02:00`,
    svarfrist:
      variant.status === 'utkast' ? null : `2026-${mnd}-${dag}T07:00:00+02:00`,
    gateadresse: variant.status === 'utkast' ? null : 'Malmøgata 1',
    postnummer: variant.status === 'utkast' ? null : '5555',
    poststed: variant.status === 'utkast' ? null : 'Kristiansand S',
    opprettetAvTidspunkt: `2025-10-${dag}T10:00:00+02:00`,
    sistEndret: `2025-11-${dag}T14:30:00+02:00`,
    eiere: [eierValg[i % eierValg.length]],
    kontorer: [kontor],
    antallArbeidsgivere: variant.status === 'utkast' ? 0 : (i % 5) + 1,
    antallJobbsokere: variant.status === 'utkast' ? 0 : (i % 10) + 2,
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
  apenForSokere?: boolean;
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

  return treffliste;
}

function filtrerPaStatus(
  treffliste: RekrutteringstreffSokTreff[],
  valgteStatuser?: string[],
  apenForSokere?: boolean,
) {
  if ((!valgteStatuser || valgteStatuser.length === 0) && !apenForSokere) {
    return treffliste;
  }

  return treffliste.filter((t) => {
    const matcherStatus =
      valgteStatuser &&
      valgteStatuser.length > 0 &&
      valgteStatuser.includes(t.status);
    const matcherApen =
      apenForSokere && t.status === 'publisert' && t.apenForSokere;
    return matcherStatus || matcherApen;
  });
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
    antall: treffliste.filter((treff) => treff.status === status).length,
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
    apenForSokere,
    kontorer,
    sortering,
  } = params;
  const treffEtterVisning = filtrerPaVisning(treff, visning);
  const treffForStatusaggregering = filtrerPaKontor(
    treffEtterVisning,
    kontorer,
  );
  const filtrerteTreff = sorterTreff(
    filtrerPaKontor(
      filtrerPaStatus(treffEtterVisning, statuser, apenForSokere),
      kontorer,
    ),
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
    antallApenForSokere: treffForStatusaggregering.filter(
      (t) => t.status === 'publisert' && t.apenForSokere,
    ).length,
  };
}

export const rekrutteringstreffSokMock = byggSokRespons({
  side: 1,
  antallPerSide: 20,
});
