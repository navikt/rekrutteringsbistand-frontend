import type {
  Hovedtag,
  Subtag,
} from '@/app/stilling/_ui/StillingsSøkFilter/InkluderingFilter';
import type { StillingsSøkSorteringTyper } from '@/app/stilling/_ui/StillingsSøkSortering';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { VisningsStatus } from '@/app/stilling/_util/stillingInfoUtil';
import {
  StillingsSøkPortefølje,
  StillingsSøkQueryparam,
} from '@/app/stilling/_util/stillingssøk-typer';
import { alleVerdierI } from '@/components/lagrede-søk/alleVerdierI';
import {
  createLoader,
  createSerializer,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs';

/*
 * Filtrene i stillingssøket som lagres i lagrede søk. Verdiene følger `StillingFilterparameter` i bruker-api.
 * Sortering og inkludering er skrevet ut her, fordi enumene ligger i komponenter som bruker søkets context.
 * `import type` hindrer en sirkulær import, og `alleVerdierI` sjekker at listene inneholder alle
 * enumverdiene og ikke har verdier utenfor enumene.
 */
const sorteringer = alleVerdierI<`${StillingsSøkSorteringTyper}`>()([
  'publiseringsdato',
  'utløpsdato',
  'mestRelevant',
]);

const hovedtagger = alleVerdierI<`${Hovedtag}`>()([
  'INKLUDERING',
  'TILTAK_ELLER_VIRKEMIDDEL',
  'PRIORITERT_MÅLGRUPPE',
  'STATLIG_INKLUDERINGSDUGNAD',
]);

const undertagger = alleVerdierI<`${Subtag}`>()([
  'INKLUDERING__ARBEIDSTID',
  'INKLUDERING__FYSISK',
  'INKLUDERING__ARBEIDSMILJØ',
  'INKLUDERING__GRUNNLEGGENDE',
  'TILTAK_ELLER_VIRKEMIDDEL__LØNNSTILSKUDD',
  'TILTAK_ELLER_VIRKEMIDDEL__MENTORTILSKUDD',
  'TILTAK_ELLER_VIRKEMIDDEL__LÆRLINGPLASS',
  'PRIORITERT_MÅLGRUPPE__UNGE_UNDER_30',
  'PRIORITERT_MÅLGRUPPE__SENIORER_OVER_45',
  'PRIORITERT_MÅLGRUPPE__KOMMER_FRA_LAND_UTENFOR_EØS',
  'PRIORITERT_MÅLGRUPPE__HULL_I_CV_EN',
  'PRIORITERT_MÅLGRUPPE__LITE_ELLER_INGEN_UTDANNING',
  'PRIORITERT_MÅLGRUPPE__LITE_ELLER_INGEN_ARBEIDSERFARING',
]);

/** «Slettet» og «Ukjent status» kan ikke velges i søket, og lagres ikke. */
const lagbareStatuser = [
  VisningsStatus.ApenForSokere,
  VisningsStatus.StengtForSokere,
  VisningsStatus.UtloptStengtForSokere,
  VisningsStatus.Fullfort,
  VisningsStatus.IkkePublisert,
] as const;

const porteføljer = Object.values(StillingsSøkPortefølje);
const kategorier = Object.values(Stillingskategori);

/** Uten valgte statuser i URL-en viser stillingssøket stillinger som er åpne for søkere. */
export const STANDARD_STATUSER: string[] = [VisningsStatus.ApenForSokere];
export const STANDARD_PORTEFØLJE = StillingsSøkPortefølje.INTERN;
export const STANDARD_SORTERING = 'publiseringsdato';

/** Verdiene bruker-api tar imot. Kontrakttesten i `tests/stilling/lagrede-sok.spec.ts` bygger filtre med dem. */
export const lagbareVerdier = {
  porteføljer,
  sorteringer,
  statuser: lagbareStatuser,
  kategorier,
  hovedtagger,
  undertagger,
} as const;

const filterParsere = {
  [StillingsSøkQueryparam.Portefølje]:
    parseAsStringLiteral(porteføljer).withDefault(STANDARD_PORTEFØLJE),
  [StillingsSøkQueryparam.Sortering]:
    parseAsStringLiteral(sorteringer).withDefault(STANDARD_SORTERING),
  [StillingsSøkQueryparam.Statuser]: parseAsArrayOf(
    parseAsStringLiteral(lagbareStatuser),
  ).withDefault([VisningsStatus.ApenForSokere]),
  [StillingsSøkQueryparam.Stillingskategorier]: parseAsArrayOf(
    parseAsStringLiteral(kategorier),
  ).withDefault([]),
  [StillingsSøkQueryparam.HovedInkluderingTags]: parseAsArrayOf(
    parseAsStringLiteral(hovedtagger),
  ).withDefault([]),
  [StillingsSøkQueryparam.SubInkluderingTags]: parseAsArrayOf(
    parseAsStringLiteral(undertagger),
  ).withDefault([]),
  [StillingsSøkQueryparam.Fylker]: parseAsArrayOf(parseAsString).withDefault(
    [],
  ),
  [StillingsSøkQueryparam.Kommuner]: parseAsArrayOf(parseAsString).withDefault(
    [],
  ),
  [StillingsSøkQueryparam.HarKandidatliste]: parseAsBoolean.withDefault(false),
};

/** Filtrene slik søkets context har dem. */
export interface StillingsSøkefiltre {
  portefølje: string;
  sortering: string;
  statuser: string[];
  kategori: string[];
  inkludering: string[];
  inkluderingUnderkategori: string[];
  fylker: string[];
  kommuner: string[];
  /** «Med oppdrag» er slått av. Gjelder bare arbeidsplassen.no. */
  utenOppdrag: boolean;
}

const serialiser = createSerializer(filterParsere);
const lesFiltre = createLoader(filterParsere);

const bareGyldige = <T extends string>(
  verdier: readonly string[],
  gyldige: readonly T[],
): T[] =>
  [
    ...new Set(
      verdier.filter((verdi): verdi is T => gyldige.includes(verdi as T)),
    ),
  ].sort();

const bareSifre = (verdier: readonly string[], antall: number) => {
  const mønster = new RegExp(`^\\d{${antall}}$`);
  return [...new Set(verdier.filter((verdi) => mønster.test(verdi)))].sort();
};

const enAv = <T extends string>(
  verdi: string,
  gyldige: readonly T[],
  standard: T,
): T => (gyldige.includes(verdi as T) ? (verdi as T) : standard);

/**
 * Sorterte nøkler og verdier, så samme valg gir samme filter uansett rekkefølgen de ble valgt i.
 * Verdier bruker-api ikke tar imot, tas ikke med. `utenOppdrag` tas bare med på arbeidsplassen.no,
 * fordi knappen bare finnes og bare virker der.
 */
export const byggLagretSøkFilter = (filtre: StillingsSøkefiltre): string => {
  const portefølje = enAv(filtre.portefølje, porteføljer, STANDARD_PORTEFØLJE);
  const filter = new URLSearchParams(
    serialiser({
      portefolje: portefølje,
      sortering: enAv(filtre.sortering, sorteringer, STANDARD_SORTERING),
      statuser: bareGyldige(filtre.statuser, lagbareStatuser),
      stillingskategori: bareGyldige(filtre.kategori, kategorier),
      inkludering: bareGyldige(filtre.inkludering, hovedtagger),
      inkluderingUnderkategori: bareGyldige(
        filtre.inkluderingUnderkategori,
        undertagger,
      ),
      fylker: bareSifre(filtre.fylker, 2),
      kommuner: bareSifre(filtre.kommuner, 4),
      utenOppdrag:
        portefølje === StillingsSøkPortefølje.ARBEIDSPLASSEN_NO &&
        filtre.utenOppdrag,
    }),
  );
  filter.sort();
  return filter.toString();
};

export const tolkLagretSøkFilter = (
  lagretFilter: string,
): StillingsSøkefiltre => {
  const filtre = lesFiltre(new URLSearchParams(lagretFilter));
  return {
    portefølje: filtre.portefolje,
    utenOppdrag:
      filtre.portefolje === StillingsSøkPortefølje.ARBEIDSPLASSEN_NO &&
      filtre.utenOppdrag,
    sortering: filtre.sortering,
    statuser: filtre.statuser,
    kategori: filtre.stillingskategori,
    inkludering: filtre.inkludering,
    inkluderingUnderkategori: filtre.inkluderingUnderkategori,
    fylker: filtre.fylker,
    kommuner: filtre.kommuner,
  };
};

/**
 * Gir et lagret filter samme form som `byggLagretSøkFilter`: sorterte nøkler, uten `?` først,
 * uten standardverdier og uten parametere stillingssøket ikke lagrer.
 */
export const normaliserLagretSøkFilter = (lagretFilter: string): string =>
  byggLagretSøkFilter(tolkLagretSøkFilter(lagretFilter));
