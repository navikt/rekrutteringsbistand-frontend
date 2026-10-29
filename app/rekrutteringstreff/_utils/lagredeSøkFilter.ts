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

export const byggLagretSøkFilter = (filtre: Søkefiltre): string => {
  const filter = new URLSearchParams(serialiser(filtre));
  filter.sort();
  return filter.toString();
};

export const tolkLagretSøkFilter = (lagretFilter: string): Søkefiltre =>
  lesFiltre(new URLSearchParams(lagretFilter));
