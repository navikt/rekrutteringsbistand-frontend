import type { KandidatSøkPortefølje } from '@/app/kandidat/KandidaSokFilterContext';
import { Innsatsgruppe } from '@/app/kandidat/_ui/innsatsgrupper';
import type { Førerkortklasse } from '@/app/kandidat/kandidat-søk-filter/_ui/Førerkort';
import type { HovedMålType } from '@/app/kandidat/kandidat-søk-filter/_ui/Hovedmål';
import type { OmfangValg } from '@/app/kandidat/kandidat-søk-filter/_ui/OmfangValg';
import type { PrioritertMålgruppe } from '@/app/kandidat/kandidat-søk-filter/_ui/PrioriterteMålgrupper';
import type { Nivå } from '@/app/kandidat/kandidat-søk-filter/_ui/Utdanningsnivå';
import { alleVerdierI } from '@/components/lagrede-søk/alleVerdierI';
import {
  bareGyldige,
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
} from 'nuqs';

/*
 * Filtrene i kandidatsøket som lagres i lagrede søk. Verdiene følger `KandidatFilterparameter` i bruker-api.
 * Enumene ligger i komponenter som bruker søkets context, så verdiene er skrevet ut her. `import type` hindrer en
 * sirkulær import, og `alleVerdierI` sjekker at listene har alle enumverdiene og ingen andre.
 */
const porteføljer = alleVerdierI<`${KandidatSøkPortefølje}`>()([
  'minebrukere',
  'valgtekontorer',
  'minekontorer',
  'mittkontor',
  'alle',
]);

const hovedmål = alleVerdierI<`${HovedMålType}`>()([
  'SKAFFE_ARBEID',
  'BEHOLDE_ARBEID',
  'OKE_DELTAKELSE',
]);

const utdanningsnivåer = alleVerdierI<`${Nivå}`>()([
  'videregaende',
  'fagskole',
  'bachelor',
  'master',
  'doktorgrad',
]);

const målgrupper = alleVerdierI<`${PrioritertMålgruppe}`>()([
  'unge',
  'senior',
  'hullICv',
]);

const omfang = alleVerdierI<`${OmfangValg}`>()([
  'HELTID',
  'DELTID',
  'HELTID_OG_DELTID',
]);

const førerkort = alleVerdierI<`${Førerkortklasse}`>()([
  'A1 - Lett motorsykkel',
  'A2 - Mellomtung motorsykkel',
  'A - Tung motorsykkel',
  'B - Personbil',
  'BE - Personbil med tilhenger',
  'C1 - Lett lastebil',
  'C1E - Lett lastebil med tilhenger',
  'C - Lastebil',
  'CE - Lastebil med tilhenger',
  'D1 - Minibuss',
  'D1E - Minibuss med tilhenger',
  'D - Buss',
  'DE - Buss med tilhenger',
  'T - Traktor',
  'S - Snøscooter',
]);

const innsatsgrupper = Object.values(Innsatsgruppe);

/** Verdiene bruker-api tar imot. Kontrakttesten i `tests/kandidat/lagrede-sok.spec.ts` bygger filtre med dem. */
export const lagbareVerdier = {
  porteføljer,
  innsatsgrupper,
  hovedmål,
  utdanningsnivåer,
  målgrupper,
  omfang,
  førerkort,
} as const;

/** Samme grense som `friVerdi` i bruker-api. */
const MAKS_FRI_VERDILENGDE = 100;
/** Samme format som `stedsnavn` i bruker-api. Stedene kommer fra pam-geografi, for eksempel «Bergen (Kommune)». */
const STEDSNAVN = /^\S.{0,99} \((Kommune|Fylke)\)$/;

/** Filtrene slik søkets context har dem. */
export interface KandidatSøkefiltre {
  portefølje: string;
  valgtKontor: string[];
  innsatsgruppe: string[];
  hovedmål: string[];
  utdanningsnivå: string[];
  prioritertMålgruppe: string[];
  omfang: string[];
  førerkort: string[];
  ønsketSted: string[];
  borPåØnsketSted: boolean;
  ønsketYrke: string[];
  språk: string[];
  kompetanse: string[];
  arbeidserfaring: string[];
}

/**
 * Porteføljene veilederen ser i kandidatsøket. Standardporteføljen tas ikke med i filteret, så vanlig søk har
 * tomt filter. Et lagret søk med en portefølje veilederen ikke ser, gir standardporteføljen.
 */
export interface KandidatPorteføljetilgang {
  standard: string;
  synlige: readonly string[];
}

const liste = parseAsArrayOf(parseAsString).withDefault([]);
const filterParsere = {
  portefolje: parseAsString,
  kontor: liste,
  innsatsgruppe: liste,
  hovedmal: liste,
  utdanning: liste,
  malgruppe: liste,
  omfang: liste,
  forerkort: liste,
  sted: liste,
  borDer: parseAsString,
  yrke: liste,
  sprak: liste,
  kompetanse: liste,
  arbeidserfaring: liste,
};
const serialiser = createSerializer(filterParsere);
const lesFiltre = createLoader(filterParsere);

/**
 * Samme lengdegrense som `friVerdi` i bruker-api. Verdier som ligner et fødselsnummer, tas med, så lagre-dialogen
 * kan stoppe dem og si fra i stedet for å fjerne dem i det stille.
 */
const frieVerdier = (
  verdier: readonly string[],
  gyldig: (verdi: string) => boolean = () => true,
) =>
  sortertUtenDuplikater(
    verdier.filter(
      (verdi) =>
        verdi.trim().length > 0 &&
        verdi.length <= MAKS_FRI_VERDILENGDE &&
        gyldig(verdi),
    ),
  );

const synligPortefølje = (valgt: string, tilgang: KandidatPorteføljetilgang) =>
  tilgang.synlige.includes(valgt) ? valgt : tilgang.standard;

/**
 * Sorterte nøkler og verdier, så samme valg gir samme filter uansett rekkefølgen de ble valgt i.
 * Verdier bruker-api ikke tar imot, tas ikke med. `kontor` tas bare med for «Velg kontor», og `borDer` bare
 * når et sted er valgt, fordi søket ser bort fra dem ellers.
 */
export const byggLagretSøkFilter = (
  filtre: KandidatSøkefiltre,
  tilgang: KandidatPorteføljetilgang,
): string => {
  const portefølje = synligPortefølje(filtre.portefølje, tilgang);
  const steder = frieVerdier(filtre.ønsketSted, (sted) => STEDSNAVN.test(sted));
  return sortertFilter(
    serialiser({
      portefolje: portefølje === tilgang.standard ? null : portefølje,
      kontor:
        portefølje === 'valgtekontorer' ? bareSifre(filtre.valgtKontor, 4) : [],
      innsatsgruppe: bareGyldige(filtre.innsatsgruppe, innsatsgrupper),
      hovedmal: bareGyldige(filtre.hovedmål, hovedmål),
      utdanning: bareGyldige(filtre.utdanningsnivå, utdanningsnivåer),
      malgruppe: bareGyldige(filtre.prioritertMålgruppe, målgrupper),
      omfang: bareGyldige(filtre.omfang, omfang),
      forerkort: bareGyldige(filtre.førerkort, førerkort),
      sted: steder,
      borDer: filtre.borPåØnsketSted && steder.length > 0 ? 'ja' : null,
      yrke: frieVerdier(filtre.ønsketYrke),
      sprak: frieVerdier(filtre.språk),
      kompetanse: frieVerdier(filtre.kompetanse),
      arbeidserfaring: frieVerdier(filtre.arbeidserfaring),
    }),
  );
};

export const tolkLagretSøkFilter = (
  lagretFilter: string,
  tilgang: KandidatPorteføljetilgang,
): KandidatSøkefiltre => {
  const filtre = lesFiltre(new URLSearchParams(lagretFilter));
  return {
    portefølje: synligPortefølje(
      filtre.portefolje ?? tilgang.standard,
      tilgang,
    ),
    valgtKontor: filtre.kontor,
    innsatsgruppe: filtre.innsatsgruppe,
    hovedmål: filtre.hovedmal,
    utdanningsnivå: filtre.utdanning,
    prioritertMålgruppe: filtre.malgruppe,
    omfang: filtre.omfang,
    førerkort: filtre.forerkort,
    ønsketSted: filtre.sted,
    borPåØnsketSted: filtre.borDer === 'ja',
    ønsketYrke: filtre.yrke,
    språk: filtre.sprak,
    kompetanse: filtre.kompetanse,
    arbeidserfaring: filtre.arbeidserfaring,
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

/** Feltene der veilederen kan skrive egen tekst. Lagre-dialogen viser dem og stopper fødselsnumre. */
export const frieFilterverdier = (
  filtre: KandidatSøkefiltre,
): FrieFilterverdier[] => [
  { felt: 'Kompetanse', verdier: filtre.kompetanse },
  { felt: 'Arbeidserfaring', verdier: filtre.arbeidserfaring },
];
