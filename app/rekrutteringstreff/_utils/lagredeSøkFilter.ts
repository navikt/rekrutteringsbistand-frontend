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
  bareSifre,
  sortertFilter,
  sortertUtenDuplikater,
} from '@/components/lagrede-søk/filterverdier';
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

/**
 * Sorterte nøkler og verdier, så samme valg gir samme filter uansett rekkefølgen de ble valgt i.
 * Fylker, kommuner og kontorer som ikke er nummer, tas ikke med, fordi bruker-api avviser dem.
 */
export const byggLagretSøkFilter = (filtre: Søkefiltre): string =>
  sortertFilter(
    serialiser({
      ...filtre,
      statuser: sortertUtenDuplikater(filtre.statuser),
      publisertStatuser: sortertUtenDuplikater(filtre.publisertStatuser),
      fylker: bareSifre(filtre.fylker, 2),
      kommuner: bareSifre(filtre.kommuner, 4),
      kontorer: bareSifre(filtre.kontorer, 4),
    }),
  );

export const filtreFraLagretSøk = (lagretFilter: string): Søkefiltre =>
  lesFiltre(new URLSearchParams(lagretFilter));

/**
 * Gir et lagret filter samme form som `byggLagretSøkFilter`: sorterte nøkler, uten `?` først,
 * uten standardverdier og uten parametere treffsøket ikke kjenner.
 */
export const normaliserLagretSøkFilter = (lagretFilter: string): string =>
  byggLagretSøkFilter(filtreFraLagretSøk(lagretFilter));
