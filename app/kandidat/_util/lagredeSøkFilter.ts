import { Innsatsgruppe } from '@/app/kandidat/_ui/innsatsgrupper';
import {
  Førerkortklasse,
  HovedMålType,
  KandidatSøkPortefølje,
  KandidatSøkQueryparam,
  Nivå,
  OmfangValg,
  PrioritertMålgruppe,
} from '@/app/kandidat/_util/kandidatsøk-typer';
import {
  bareSifre,
  sortertFilter,
  sortertUtenDuplikater,
} from '@/components/lagrede-søk/filterverdier';
import type { FrieFilterverdier } from '@/components/lagrede-søk/fødselsnummer';
import {
  createLoader,
  createSerializer,
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
  type inferParserType,
} from 'nuqs';

/** Verdiene bruker-api tar imot. Verdiene følger `KandidatFilterparameter` i bruker-api. */
export const lagbareVerdier = {
  porteføljer: Object.values(KandidatSøkPortefølje),
  innsatsgrupper: Object.values(Innsatsgruppe),
  hovedmål: Object.values(HovedMålType),
  utdanningsnivåer: Object.values(Nivå),
  målgrupper: Object.values(PrioritertMålgruppe),
  omfang: Object.values(OmfangValg),
  førerkort: Object.values(Førerkortklasse),
} as const;

const liste = parseAsArrayOf(parseAsString).withDefault([]);
const enAvListe = <T extends string>(verdier: readonly T[]) =>
  parseAsArrayOf(parseAsStringLiteral(verdier)).withDefault([]);

/**
 * Filtrene i kandidatsøket. Søket leser og skriver URL-en med dem, og lagrede søk bygges og tolkes med dem, som i
 * rekrutteringstreff. Ukjente faste verdier i URL-en ignoreres. Porteføljen har ingen standardverdi her, fordi
 * standarden avhenger av rollene til veilederen.
 */
export const filterParsere = {
  [KandidatSøkQueryparam.Portefølje]: parseAsStringLiteral(
    lagbareVerdier.porteføljer,
  ),
  [KandidatSøkQueryparam.ValgtKontor]: liste,
  [KandidatSøkQueryparam.Innsatsgruppe]: enAvListe(
    lagbareVerdier.innsatsgrupper,
  ),
  [KandidatSøkQueryparam.Hovedmål]: enAvListe(lagbareVerdier.hovedmål),
  [KandidatSøkQueryparam.Utdanningsnivå]: enAvListe(
    lagbareVerdier.utdanningsnivåer,
  ),
  [KandidatSøkQueryparam.PrioritertMålgruppe]: enAvListe(
    lagbareVerdier.målgrupper,
  ),
  [KandidatSøkQueryparam.Omfang]: enAvListe(lagbareVerdier.omfang),
  [KandidatSøkQueryparam.Førerkort]: enAvListe(lagbareVerdier.førerkort),
  [KandidatSøkQueryparam.ØnsketSted]: liste,
  [KandidatSøkQueryparam.BorPåØnsketSted]: parseAsStringLiteral([
    'ja',
    'nei',
  ] as const).withDefault('nei'),
  [KandidatSøkQueryparam.ØnsketYrke]: liste,
  [KandidatSøkQueryparam.Språk]: liste,
  [KandidatSøkQueryparam.Kompetanse]: liste,
  [KandidatSøkQueryparam.Arbeidserfaring]: liste,
};

export type KandidatSøkefiltre = inferParserType<typeof filterParsere>;

/** Samme format som `stedsnavn` i bruker-api. Stedene kommer fra pam-geografi, for eksempel «Bergen (Kommune)». */
const STEDSNAVN = /^\S.{0,99} \((Kommune|Fylke)\)$/;

/**
 * Porteføljene veilederen ser i kandidatsøket. Standardporteføljen tas ikke med i filteret, så vanlig søk har
 * tomt filter. Et lagret søk med en portefølje veilederen ikke ser, gir standardporteføljen.
 */
export interface KandidatPorteføljetilgang {
  standard: KandidatSøkPortefølje;
  synlige: readonly KandidatSøkPortefølje[];
}

const serialiser = createSerializer(filterParsere);
const lesFiltre = createLoader(filterParsere);

/**
 * Verdier som er for lange, tas med. Lagre-dialogen stopper dem og sier fra, så det lagrede søket aldri mangler et
 * filter veilederen ser på siden. Verdier som ligner et fødselsnummer, stoppes allerede i feltene og i URL-en.
 */
const frieVerdier = (
  verdier: readonly string[],
  gyldig: (verdi: string) => boolean = () => true,
) =>
  sortertUtenDuplikater(
    verdier.filter((verdi) => verdi.trim().length > 0 && gyldig(verdi)),
  );

const synligPortefølje = (
  valgt: KandidatSøkPortefølje | null,
  tilgang: KandidatPorteføljetilgang,
) => (valgt && tilgang.synlige.includes(valgt) ? valgt : tilgang.standard);

const utenStandard = (
  portefølje: KandidatSøkPortefølje,
  tilgang: KandidatPorteføljetilgang,
) => (portefølje === tilgang.standard ? null : portefølje);

/**
 * Sorterte nøkler og verdier, så samme valg gir samme filter uansett rekkefølgen de ble valgt i.
 * `kontor` tas bare med for «Velg kontor», og `borDer` bare når et sted er valgt, fordi søket ser bort fra dem ellers.
 */
export const byggLagretSøkFilter = (
  filtre: KandidatSøkefiltre,
  tilgang: KandidatPorteføljetilgang,
): string => {
  const portefølje = synligPortefølje(filtre.portefolje, tilgang);
  const steder = frieVerdier(filtre.sted, (sted) => STEDSNAVN.test(sted));
  return sortertFilter(
    serialiser({
      portefolje: utenStandard(portefølje, tilgang),
      kontor:
        portefølje === KandidatSøkPortefølje.VALGTE_KONTORER
          ? bareSifre(filtre.kontor, 4)
          : [],
      innsatsgruppe: sortertUtenDuplikater(filtre.innsatsgruppe),
      hovedmal: sortertUtenDuplikater(filtre.hovedmal),
      utdanning: sortertUtenDuplikater(filtre.utdanning),
      malgruppe: sortertUtenDuplikater(filtre.malgruppe),
      omfang: sortertUtenDuplikater(filtre.omfang),
      forerkort: sortertUtenDuplikater(filtre.forerkort),
      sted: steder,
      borDer: filtre.borDer === 'ja' && steder.length > 0 ? 'ja' : null,
      yrke: frieVerdier(filtre.yrke),
      sprak: frieVerdier(filtre.sprak),
      kompetanse: frieVerdier(filtre.kompetanse),
      arbeidserfaring: frieVerdier(filtre.arbeidserfaring),
    }),
  );
};

/** Filtrene i et lagret søk, klare til å settes i URL-en. En portefølje veilederen ikke ser, gir standardporteføljen. */
export const tolkLagretSøkFilter = (
  lagretFilter: string,
  tilgang: KandidatPorteføljetilgang,
): KandidatSøkefiltre => {
  const filtre = lesFiltre(new URLSearchParams(lagretFilter));
  return {
    ...filtre,
    portefolje: utenStandard(
      synligPortefølje(filtre.portefolje, tilgang),
      tilgang,
    ),
  };
};

/**
 * Gir et lagret filter samme form som `byggLagretSøkFilter`: sorterte nøkler, uten standardverdier, uten
 * porteføljer veilederen ikke ser og uten parametere kandidatsøket ikke lagrer.
 */
export const normaliserLagretSøkFilter = (
  lagretFilter: string,
  tilgang: KandidatPorteføljetilgang,
): string =>
  byggLagretSøkFilter(tolkLagretSøkFilter(lagretFilter, tilgang), tilgang);

/** Feltene der veilederen kan skrive egen tekst. Lagre-dialogen viser dem og stopper verdier over 100 tegn. */
export const frieFilterverdier = (
  filtre: KandidatSøkefiltre,
): FrieFilterverdier[] => [
  { felt: 'Kompetanse', verdier: filtre.kompetanse },
  { felt: 'Arbeidserfaring', verdier: filtre.arbeidserfaring },
];
