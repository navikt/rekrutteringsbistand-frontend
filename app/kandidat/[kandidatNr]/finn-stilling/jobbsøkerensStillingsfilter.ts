import type {
  KandidatStillingssøkDTO,
  YrkeJobbonskeStillingsSøkDTO,
} from '@/app/api/kandidat-sok/useKandidatStillingssøk';
import { StillingsSøkQueryparam } from '@/app/stilling/_util/stillingssøk-typer';
import {
  getNummerFraSted,
  stedmappingFraGammeltNummer,
} from '@/util/fylkeOgKommuneMapping';

const hentFylker = (geografikoder: string[]): string[] =>
  Array.from(
    new Set(
      geografikoder
        .filter((n) => n.length === 2 || n.length === 4)
        .map((n) => (n.length === 4 ? n.substring(0, 2) : n)),
    ),
  );

const hentKommuner = (geografikoder: string[]): string[] =>
  geografikoder.filter((n) => n.length === 4);

const hentYrker = (yrkesønsker: YrkeJobbonskeStillingsSøkDTO[]): string[] => [
  ...new Set(
    yrkesønsker
      .flatMap((yrkesønske) => yrkesønske.sokeTitler ?? [])
      .filter((tittel): tittel is string => tittel != null),
  ),
];

/** Gamle fylkes- og kommunekoder blir dagens. Kommuner i et fylke som er valgt i sin helhet, tas ikke med. */
const konverterStederTilNåværendeKoder = (
  geografikoder: (string | null)[],
): string[] => {
  const konverterteKoder = geografikoder
    .filter((kode): kode is string => kode !== null)
    .map((kode) => {
      const nyekoder = stedmappingFraGammeltNummer.get(kode)?.nummer || kode;
      return nyekoder.length > 4 ? nyekoder.substring(0, 4) : nyekoder;
    });

  const fylkeskoder = konverterteKoder.filter((kode) => kode.length === 2);

  return konverterteKoder.filter(
    (kode) =>
      kode.length > 0 &&
      !fylkeskoder.some(
        (fylkeskode) => kode.startsWith(fylkeskode) && kode !== fylkeskode,
      ),
  );
};

/**
 * Jobbønskene og stedet til jobbsøkeren som forhåndsutfylt søk i stillingssøket: fylker og kommuner blir filtre, og
 * yrkestitlene blir søkeord. Uten geografiske jobbønsker brukes kommunen jobbsøkeren bor i. Statusen er
 * standardverdien «Åpen for søkere», så den står ikke i filteret.
 */
export const jobbsøkerensStillingsfilter = ({
  geografiJobbonsker,
  yrkeJobbonskerObj,
  kommunenummerstring,
}: KandidatStillingssøkDTO): { filter: string; søkeord: string[] } => {
  const geografikoder =
    geografiJobbonsker.length === 0
      ? [kommunenummerstring]
      : geografiJobbonsker.map((g) => getNummerFraSted(g.geografiKode));
  const koder = konverterStederTilNåværendeKoder(geografikoder);

  const parametere = new URLSearchParams();
  const fylker = hentFylker(koder);
  const kommuner = hentKommuner(koder);
  if (fylker.length > 0) {
    parametere.set(StillingsSøkQueryparam.Fylker, fylker.join(','));
  }
  if (kommuner.length > 0) {
    parametere.set(StillingsSøkQueryparam.Kommuner, kommuner.join(','));
  }

  return {
    filter: parametere.toString(),
    søkeord: hentYrker(yrkeJobbonskerObj),
  };
};
