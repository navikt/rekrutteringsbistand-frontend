'use client';

import { LagredeSøkDomene } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import {
  KandidatSøkPortefølje,
  KandidatSøkQueryparam,
} from '@/app/kandidat/_util/kandidatsøk-typer';
import {
  byggLagretSøkFilter,
  filterParsere,
  frieFilterverdier,
  type KandidatPorteføljetilgang,
  type KandidatSøkefiltre,
  normaliserLagretSøkFilter,
  filtreFraLagretSøk,
} from '@/app/kandidat/_util/lagredeSøkFilter';
import { utenFødselsnummer } from '@/components/lagrede-søk/fødselsnummer';
import {
  type LagredeSøkTilstand,
  useLagredeSøk,
} from '@/components/lagrede-søk/useLagredeSøk';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import { parseAsInteger, useQueryState, useQueryStates } from 'nuqs';
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export interface IKandidaSokFilterContext {
  fritekst: string[];
  setFritekst: (tekst: string) => void;
  setFritekstListe: (søkeord: string[]) => void;
  portefølje: string;
  setPortefølje: (portefølje: string) => void;
  valgtKontor: string[];
  setValgtKontor: (valgtKontor: string[]) => void;
  innsatsgruppe: string[];
  setInnsatsgruppe: (innsatsgruppe: string[]) => void;
  side: number;
  setSide: (number: number) => void;
  ønsketYrke: string[];
  setØnsketYrke: (ønsketYrke: string[]) => void;
  ønsketSted: string[];
  setØnsketSted: (ønsketSted: string[]) => void;
  borPåØnsketSted: string | null;
  setBorPåØnsketSted: (borPåØnsketSted: string) => void;
  kompetanse: string[];
  setKompetanse: (kompetanse: string[]) => void;
  førerkort: string[];
  setFørerkort: (førerkort: string[]) => void;
  prioritertMålgruppe: string[];
  setPrioritertMålgruppe: (prioritertMålgruppe: string[]) => void;
  hovedmål: string[];
  setHovedmål: (hovedmål: string[]) => void;
  utdanningsnivå: string[];
  setUtdanningsnivå: (utdanningsnivå: string[]) => void;
  arbeidserfaring: string[];
  setArbeidserfaring: (arbeidserfaring: string[]) => void;
  ferskhet: number | null;
  språk: string[];
  setSpråk: (språk: string[]) => void;
  sortering: string;
  orgenhet: string | null;
  omfang: string[];
  setOmfang: (omfang: string[]) => void;
  lagredeSøk?: LagredeSøkTilstand;

  // Vente på for eksempel standarsøk, eller filtre ved relasting av side med valgte filtre
  venterPåFiltreOgSøkeord: boolean;
  fjernAlleFiltre: () => void;
}

export const KandidaSøkFilterContext = createContext<
  IKandidaSokFilterContext | undefined
>(undefined);

/** Kompetanse og arbeidserfaring godtar egen tekst, så Umami får bare antallet valgte verdier. */
const sporBareAntall: ReadonlySet<keyof typeof UmamiEvent.Kandidat> = new Set([
  'filter_kompetanse',
  'filter_arbeidserfaring',
]);

const useKandidatSøkFiltre = () => {
  const { valgtNavKontor, harRolle, brukerData } = useApplikasjonContext();
  const harTilgangTilAlleBrukerne = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  ]);
  const kanSeKontorfaner = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
  ]);
  const standardPortefølje = harTilgangTilAlleBrukerne
    ? KandidatSøkPortefølje.ALLE
    : KandidatSøkPortefølje.MINE_BRUKERE;

  const antallEnheter = brukerData?.enheter?.length ?? 0;
  const harValgtNavKontor = !!valgtNavKontor || antallEnheter > 0;
  const harFlereKontorer = antallEnheter > 1;
  const tilgang = useMemo<KandidatPorteføljetilgang>(
    () => ({
      standard: standardPortefølje,
      synlige: [
        KandidatSøkPortefølje.MINE_BRUKERE,
        ...(harTilgangTilAlleBrukerne
          ? [KandidatSøkPortefølje.ALLE, KandidatSøkPortefølje.VALGTE_KONTORER]
          : []),
        ...(kanSeKontorfaner && harValgtNavKontor
          ? [KandidatSøkPortefølje.MITT_KONTOR]
          : []),
        ...(kanSeKontorfaner && harFlereKontorer
          ? [KandidatSøkPortefølje.MINE_KONTORER]
          : []),
      ],
    }),
    [
      standardPortefølje,
      harTilgangTilAlleBrukerne,
      kanSeKontorfaner,
      harValgtNavKontor,
      harFlereKontorer,
    ],
  );

  // Unngå fritekst i searchParams
  const [fritekst, setFritekstListeInternal] = useState<string[]>([]);

  const [side, setSide] = useQueryState(
    KandidatSøkQueryparam.Side,
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );

  const [sortering] = useQueryState(KandidatSøkQueryparam.Sortering, {
    defaultValue: 'nyeste',
    clearOnDefault: true,
  });

  const [filtreIUrl, setFiltre] = useQueryStates(filterParsere);
  // Søket bruker porteføljen i URL-en som før. Bare lagringen bytter til standarden for porteføljer veilederen ikke ser.
  const portefølje = filtreIUrl.portefolje ?? standardPortefølje;

  // En gammel eller delt lenke kan ha verdier som ligner et fødselsnummer. De brukes ikke i søket og fjernes fra URL-en.
  const kompetanse = useMemo(
    () => utenFødselsnummer(filtreIUrl.kompetanse),
    [filtreIUrl.kompetanse],
  );
  const arbeidserfaring = useMemo(
    () => utenFødselsnummer(filtreIUrl.arbeidserfaring),
    [filtreIUrl.arbeidserfaring],
  );
  useEffect(() => {
    if (
      kompetanse.length !== filtreIUrl.kompetanse.length ||
      arbeidserfaring.length !== filtreIUrl.arbeidserfaring.length
    ) {
      void setFiltre({ kompetanse, arbeidserfaring }, { history: 'replace' });
    }
  }, [kompetanse, arbeidserfaring, filtreIUrl, setFiltre]);

  //TODO er denne aktuell?

  const [ferskhet] = useState<number | null>(null);

  const filtre: KandidatSøkefiltre = {
    ...filtreIUrl,
    portefolje: portefølje,
    kompetanse,
    arbeidserfaring,
  };
  const gjeldendeFilter = byggLagretSøkFilter(filtre, tilgang);

  const normaliserFilter = useCallback(
    (filter: string) => normaliserLagretSøkFilter(filter, tilgang),
    [tilgang],
  );

  const settFiltreFraLagretSøk = useCallback(
    (lagretFilter: string) => {
      void setFiltre(filtreFraLagretSøk(lagretFilter, tilgang));
      void setSide(null);
    },
    [tilgang, setFiltre, setSide],
  );

  /** Filtrene kommer fra skjemaelementer som gir `string[]`. Ukjente faste verdier ignoreres når URL-en leses. */
  const settFilter =
    (nøkkel: keyof KandidatSøkefiltre) => (verdi: string | string[]) =>
      setFiltre({ [nøkkel]: verdi } as Partial<KandidatSøkefiltre>);

  return {
    fritekst,
    setFritekstListeInternal,
    side,
    setSide,
    portefølje,
    setPortefølje: (verdi: string) =>
      setFiltre({
        portefolje:
          verdi === tilgang.standard ? null : (verdi as KandidatSøkPortefølje),
      }),
    sortering,
    ønsketSted: filtre.sted,
    setØnsketSted: settFilter(KandidatSøkQueryparam.ØnsketSted),
    ønsketYrke: filtre.yrke,
    setØnsketYrke: settFilter(KandidatSøkQueryparam.ØnsketYrke),
    valgtKontor: filtre.kontor,
    setValgtKontor: settFilter(KandidatSøkQueryparam.ValgtKontor),
    hovedmål: filtre.hovedmal,
    setHovedmål: settFilter(KandidatSøkQueryparam.Hovedmål),
    kompetanse,
    setKompetanse: settFilter(KandidatSøkQueryparam.Kompetanse),
    innsatsgruppe: filtre.innsatsgruppe,
    setInnsatsgruppe: settFilter(KandidatSøkQueryparam.Innsatsgruppe),
    omfang: filtre.omfang,
    setOmfang: settFilter(KandidatSøkQueryparam.Omfang),
    førerkort: filtre.forerkort,
    setFørerkort: settFilter(KandidatSøkQueryparam.Førerkort),
    språk: filtre.sprak,
    setSpråk: settFilter(KandidatSøkQueryparam.Språk),
    arbeidserfaring,
    setArbeidserfaring: settFilter(KandidatSøkQueryparam.Arbeidserfaring),
    utdanningsnivå: filtre.utdanning,
    setUtdanningsnivå: settFilter(KandidatSøkQueryparam.Utdanningsnivå),
    prioritertMålgruppe: filtre.malgruppe,
    setPrioritertMålgruppe: settFilter(
      KandidatSøkQueryparam.PrioritertMålgruppe,
    ),
    borPåØnsketSted: filtre.borDer,
    setBorPåØnsketSted: settFilter(KandidatSøkQueryparam.BorPåØnsketSted),
    ferskhet,
    orgenhet:
      portefølje === KandidatSøkPortefølje.MITT_KONTOR
        ? (valgtNavKontor?.navKontor ?? null)
        : null,
    gjeldendeFilter,
    frieFilterverdier: frieFilterverdier(filtre),
    normaliserFilter,
    settFiltreFraLagretSøk,
  };
};

type KandidatSøkFiltre = ReturnType<typeof useKandidatSøkFiltre>;

const lagKandidatSøkVerdi = (
  filtre: KandidatSøkFiltre,
  {
    track,
    søkEndret,
    lagredeSøk,
  }: {
    track: ReturnType<typeof useUmami>['track'];
    søkEndret: () => void;
    lagredeSøk?: LagredeSøkTilstand;
  },
): IKandidaSokFilterContext => {
  const { side, setSide } = filtre;

  const wrapWithPageReset = <T,>(
    setter: (value: T) => Promise<unknown>,
    trackingKey?: keyof typeof UmamiEvent.Kandidat,
  ): ((value: T) => Promise<void>) => {
    return async (value) => {
      søkEndret();
      await setter(value);

      if (trackingKey && Array.isArray(value) && value.length > 0) {
        track(
          UmamiEvent.Kandidat[trackingKey],
          sporBareAntall.has(trackingKey)
            ? { antall: value.length }
            : { filter: value.join(', ') },
        );
      }

      if (side !== 1) {
        await setSide(1);
      }
    };
  };

  const fritekstEndret = () => {
    søkEndret();
    if (side !== 1) {
      setSide(1);
    }
  };

  // Hvert søk blir en egen chip. Et søkeord som allerede er med, legges ikke til igjen.
  const setFritekst = (tekst: string) => {
    filtre.setFritekstListeInternal((søkeord) =>
      søkeord.includes(tekst) ? søkeord : [...søkeord, tekst],
    );
    fritekstEndret();
  };

  const setFritekstListe = (søkeord: string[]) => {
    filtre.setFritekstListeInternal(søkeord);
    fritekstEndret();
  };

  return {
    fritekst: filtre.fritekst,
    setFritekst,
    setFritekstListe,
    portefølje: filtre.portefølje,
    setPortefølje: wrapWithPageReset(filtre.setPortefølje, 'filter_portefølje'),
    side,
    ønsketSted: filtre.ønsketSted,
    setØnsketSted: wrapWithPageReset(
      filtre.setØnsketSted,
      'filter_ønsket_sted',
    ),
    ønsketYrke: filtre.ønsketYrke,
    setØnsketYrke: wrapWithPageReset(
      filtre.setØnsketYrke,
      'filter_ønsket_yrke',
    ),
    innsatsgruppe: filtre.innsatsgruppe,
    setInnsatsgruppe: wrapWithPageReset(
      filtre.setInnsatsgruppe,
      'filter_innsatsgruppe',
    ),
    omfang: filtre.omfang,
    setOmfang: wrapWithPageReset(filtre.setOmfang, 'filter_omfang'),
    valgtKontor: filtre.valgtKontor,
    setValgtKontor: wrapWithPageReset(
      filtre.setValgtKontor,
      'filter_valgt_kontor',
    ),
    hovedmål: filtre.hovedmål,
    setHovedmål: wrapWithPageReset(filtre.setHovedmål, 'filter_hovedmål'),
    kompetanse: filtre.kompetanse,
    setKompetanse: wrapWithPageReset(filtre.setKompetanse, 'filter_kompetanse'),
    førerkort: filtre.førerkort,
    setFørerkort: wrapWithPageReset(filtre.setFørerkort, 'filter_førerkort'),
    språk: filtre.språk,
    setSpråk: wrapWithPageReset(filtre.setSpråk, 'filter_språk'),
    arbeidserfaring: filtre.arbeidserfaring,
    setArbeidserfaring: wrapWithPageReset(
      filtre.setArbeidserfaring,
      'filter_arbeidserfaring',
    ),
    utdanningsnivå: filtre.utdanningsnivå,
    setUtdanningsnivå: wrapWithPageReset(
      filtre.setUtdanningsnivå,
      'filter_utdanningsnivå',
    ),
    prioritertMålgruppe: filtre.prioritertMålgruppe,
    setPrioritertMålgruppe: wrapWithPageReset(
      filtre.setPrioritertMålgruppe,
      'filter_prioritert_målgruppe',
    ),
    borPåØnsketSted: filtre.borPåØnsketSted,
    setBorPåØnsketSted: wrapWithPageReset(filtre.setBorPåØnsketSted),
    ferskhet: filtre.ferskhet,
    sortering: filtre.sortering,
    orgenhet: filtre.orgenhet,
    setSide,
    lagredeSøk,
    venterPåFiltreOgSøkeord: lagredeSøk?.venterPåFiltreOgSøkeord ?? false,
    fjernAlleFiltre: () => {
      filtre.settFiltreFraLagretSøk(
        new URLSearchParams({
          [KandidatSøkQueryparam.Portefølje]: filtre.portefølje,
        }).toString(),
      );
      filtre.setFritekstListeInternal([]);
      søkEndret();
    },
  };
};

type KandidatSøkProviderProps = { children: ReactNode };

const MedLagredeSøk: FC<KandidatSøkProviderProps> = ({ children }) => {
  const { track } = useUmami();
  const filtre = useKandidatSøkFiltre();
  const lagredeSøk = useLagredeSøk({
    domene: LagredeSøkDomene.KANDIDATSOK,
    gjeldendeFilter: filtre.gjeldendeFilter,
    gjeldendeSøkeord: filtre.fritekst,
    settFiltre: filtre.settFiltreFraLagretSøk,
    settSøkeord: filtre.setFritekstListeInternal,
    normaliserFilter: filtre.normaliserFilter,
    frieFilterverdier: filtre.frieFilterverdier,
    sporHendelse: (hendelse) => track(UmamiEvent.Kandidat[hendelse]),
  });
  return (
    <KandidaSøkFilterContext.Provider
      value={lagKandidatSøkVerdi(filtre, {
        track,
        søkEndret: lagredeSøk.søkEndret,
        lagredeSøk,
      })}
    >
      {children}
    </KandidaSøkFilterContext.Provider>
  );
};

const ingenEndring = () => {};

const UtenLagredeSøk: FC<KandidatSøkProviderProps> = ({ children }) => {
  const { track } = useUmami();
  const filtre = useKandidatSøkFiltre();
  return (
    <KandidaSøkFilterContext.Provider
      value={lagKandidatSøkVerdi(filtre, { track, søkEndret: ingenEndring })}
    >
      {children}
    </KandidaSøkFilterContext.Provider>
  );
};

export const KandidatSøkProvider: FC<
  KandidatSøkProviderProps & { brukerLagredeSøk: boolean }
> = ({ brukerLagredeSøk, children }) =>
  brukerLagredeSøk ? (
    <MedLagredeSøk>{children}</MedLagredeSøk>
  ) : (
    <UtenLagredeSøk>{children}</UtenLagredeSøk>
  );

export const useKandidatSøkFilterContext = () => {
  const context = useContext(KandidaSøkFilterContext);
  if (context === undefined) {
    throw new RekbisError({
      message: 'useKandidaSokFilterContext må være i scope',
    });
  }
  return context;
};
