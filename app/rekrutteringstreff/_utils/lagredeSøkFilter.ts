import {
  publisertStatusVerdier,
  RekrutteringstreffStatus,
  rekrutteringstreffStatusVerdier,
  Sortering,
  sorteringVerdier,
  Visning,
  visningVerdier,
} from '@/app/rekrutteringstreff/_types/constants';
import {
  createLoader,
  createSerializer,
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
  type inferParserType,
} from 'nuqs';

export const filterParsere = {
  visning: parseAsStringLiteral(visningVerdier).withDefault(Visning.ALLE),
  statuser: parseAsArrayOf(
    parseAsStringLiteral(rekrutteringstreffStatusVerdier),
  ).withDefault([RekrutteringstreffStatus.PUBLISERT]),
  publisertStatuser: parseAsArrayOf(
    parseAsStringLiteral(publisertStatusVerdier),
  ).withDefault([]),
  fylker: parseAsArrayOf(parseAsString).withDefault([]),
  kommuner: parseAsArrayOf(parseAsString).withDefault([]),
  kontorer: parseAsArrayOf(parseAsString).withDefault([]),
  sortering: parseAsStringLiteral(sorteringVerdier).withDefault(
    Sortering.SIST_OPPDATERTE,
  ),
};

export type Søkefiltre = inferParserType<typeof filterParsere>;

const serialiser = createSerializer(filterParsere);
const lesFiltre = createLoader(filterParsere);

/** Sorterte nøkler og verdier, så samme valg gir samme filter uansett rekkefølgen de ble valgt i. */
export const byggLagretSøkFilter = (filtre: Søkefiltre): string => {
  const filter = new URLSearchParams(
    serialiser({
      ...filtre,
      statuser: [...filtre.statuser].sort(),
      publisertStatuser: [...filtre.publisertStatuser].sort(),
      fylker: [...filtre.fylker].sort(),
      kommuner: [...filtre.kommuner].sort(),
      kontorer: [...filtre.kontorer].sort(),
    }),
  );
  filter.sort();
  return filter.toString();
};

export const tolkLagretSøkFilter = (lagretFilter: string): Søkefiltre =>
  lesFiltre(new URLSearchParams(lagretFilter));

/**
 * Gir et lagret filter samme form som `byggLagretSøkFilter`: sorterte nøkler, uten `?` først,
 * uten standardverdier og uten parametere treffsøket ikke kjenner.
 */
export const normaliserLagretSøkFilter = (lagretFilter: string): string =>
  byggLagretSøkFilter(tolkLagretSøkFilter(lagretFilter));
