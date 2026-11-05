'use client';

import { LagredeSøkDomene } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import {
  byggLagretSøkFilter,
  frieFilterverdier,
  type KandidatPorteføljetilgang,
  normaliserLagretSøkFilter,
  tolkLagretSøkFilter,
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
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs';
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

export enum KandidatSøkPortefølje {
  MINE_BRUKERE = 'minebrukere',
  VALGTE_KONTORER = 'valgtekontorer',
  MINE_KONTORER = 'minekontorer',
  MITT_KONTOR = 'mittkontor',
  ALLE = 'alle',
}

export enum KandidatSøkQueryparam {
  Fritekst = 'fritekst',
  Side = 'side',
  Portefølje = 'portefolje',
  ValgtKontor = 'kontor',
  Innsatsgruppe = 'innsatsgruppe',
  ØnsketYrke = 'yrke',
  ØnsketSted = 'sted',
  BorPåØnsketSted = 'borDer',
  Kompetanse = 'kompetanse',
  Førerkort = 'forerkort',
  PrioritertMålgruppe = 'malgruppe',
  Hovedmål = 'hovedmal',
  Utdanningsnivå = 'utdanning',
  Arbeidserfaring = 'arbeidserfaring',
  Ferskhet = 'ferskhet',
  Språk = 'sprak',
  Sortering = 'sortering',
  Omfang = 'omfang',
}

export interface IKandidaSokFilterContext {
  fritekst: string;
  setFritekst: (tekst: string) => void;
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
  venterPåFiltreOgSøkeord: boolean;
  fjernAlleFiltre: () => void;
}

export const KandidaSøkFilterContext = createContext<
  IKandidaSokFilterContext | undefined
>(undefined);

const listeparser = parseAsArrayOf(parseAsString)
  .withDefault([])
  .withOptions({ clearOnDefault: true });

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
  const [fritekst, setFritekstInternal] = useState<string>('');

  const [side, setSide] = useQueryState(
    KandidatSøkQueryparam.Side,
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );

  const [portefølje, setPortefølje] = useQueryState(
    KandidatSøkQueryparam.Portefølje,
    {
      defaultValue: standardPortefølje,
      clearOnDefault: true,
    },
  );

  const [sortering] = useQueryState(KandidatSøkQueryparam.Sortering, {
    defaultValue: 'nyeste',
    clearOnDefault: true,
  });

  const [ønsketSted, setØnsketSted] = useQueryState<string[]>(
    KandidatSøkQueryparam.ØnsketSted,
    listeparser,
  );
  const [ønsketYrke, setØnsketYrke] = useQueryState<string[]>(
    KandidatSøkQueryparam.ØnsketYrke,
    listeparser,
  );
  const [valgtKontor, setValgtKontor] = useQueryState<string[]>(
    KandidatSøkQueryparam.ValgtKontor,
    listeparser,
  );
  const [hovedmål, setHovedmål] = useQueryState<string[]>(
    KandidatSøkQueryparam.Hovedmål,
    listeparser,
  );
  const [kompetanseIUrl, setKompetanse] = useQueryState<string[]>(
    KandidatSøkQueryparam.Kompetanse,
    listeparser,
  );
  const [innsatsgruppe, setInnsatsgruppe] = useQueryState<string[]>(
    KandidatSøkQueryparam.Innsatsgruppe,
    listeparser,
  );
  const [omfang, setOmfang] = useQueryState<string[]>(
    KandidatSøkQueryparam.Omfang,
    listeparser,
  );
  const [førerkort, setFørerkort] = useQueryState<string[]>(
    KandidatSøkQueryparam.Førerkort,
    listeparser,
  );
  const [språk, setSpråk] = useQueryState<string[]>(
    KandidatSøkQueryparam.Språk,
    listeparser,
  );
  const [arbeidserfaringIUrl, setArbeidserfaring] = useQueryState<string[]>(
    KandidatSøkQueryparam.Arbeidserfaring,
    listeparser,
  );

  // En gammel eller delt lenke kan ha verdier som ligner et fødselsnummer. De brukes ikke i søket og fjernes fra URL-en.
  const kompetanse = useMemo(
    () => utenFødselsnummer(kompetanseIUrl),
    [kompetanseIUrl],
  );
  const arbeidserfaring = useMemo(
    () => utenFødselsnummer(arbeidserfaringIUrl),
    [arbeidserfaringIUrl],
  );
  useEffect(() => {
    if (kompetanse.length !== kompetanseIUrl.length) {
      void setKompetanse(kompetanse, { history: 'replace' });
    }
  }, [kompetanse, kompetanseIUrl, setKompetanse]);
  useEffect(() => {
    if (arbeidserfaring.length !== arbeidserfaringIUrl.length) {
      void setArbeidserfaring(arbeidserfaring, { history: 'replace' });
    }
  }, [arbeidserfaring, arbeidserfaringIUrl, setArbeidserfaring]);
  const [utdanningsnivå, setUtdanningsnivå] = useQueryState<string[]>(
    KandidatSøkQueryparam.Utdanningsnivå,
    listeparser,
  );
  const [prioritertMålgruppe, setPrioritertMålgruppe] = useQueryState<string[]>(
    KandidatSøkQueryparam.PrioritertMålgruppe,
    listeparser,
  );

  const [borPåØnsketSted, setBorPåØnsketSted] = useQueryState(
    KandidatSøkQueryparam.BorPåØnsketSted,
    {
      defaultValue: 'nei',
      clearOnDefault: true,
    },
  );

  //TODO er denne aktuell?

  const [ferskhet] = useState<number | null>(null);

  const filtre = {
    portefølje,
    valgtKontor,
    innsatsgruppe,
    hovedmål,
    utdanningsnivå,
    prioritertMålgruppe,
    omfang,
    førerkort,
    ønsketSted,
    borPåØnsketSted: borPåØnsketSted === 'ja',
    ønsketYrke,
    språk,
    kompetanse,
    arbeidserfaring,
  };
  const gjeldendeFilter = byggLagretSøkFilter(filtre, tilgang);
  const trimmetFritekst = fritekst.trim();
  const gjeldendeSøkeord = useMemo(
    () => (trimmetFritekst ? [trimmetFritekst] : []),
    [trimmetFritekst],
  );

  const normaliserFilter = useCallback(
    (filter: string) => normaliserLagretSøkFilter(filter, tilgang),
    [tilgang],
  );

  const settSøkeord = useCallback(
    (søkeord: string[]) => setFritekstInternal(søkeord.join(' ')),
    [],
  );

  const settFiltreFraLagretSøk = useCallback(
    (lagretFilter: string) => {
      const filter = tolkLagretSøkFilter(lagretFilter, tilgang);
      void setPortefølje(
        filter.portefølje === tilgang.standard ? null : filter.portefølje,
      );
      void setValgtKontor(filter.valgtKontor);
      void setInnsatsgruppe(filter.innsatsgruppe);
      void setHovedmål(filter.hovedmål);
      void setUtdanningsnivå(filter.utdanningsnivå);
      void setPrioritertMålgruppe(filter.prioritertMålgruppe);
      void setOmfang(filter.omfang);
      void setFørerkort(filter.førerkort);
      void setØnsketSted(filter.ønsketSted);
      void setBorPåØnsketSted(filter.borPåØnsketSted ? 'ja' : null);
      void setØnsketYrke(filter.ønsketYrke);
      void setSpråk(filter.språk);
      void setKompetanse(filter.kompetanse);
      void setArbeidserfaring(filter.arbeidserfaring);
      void setSide(null);
    },
    [
      tilgang,
      setPortefølje,
      setValgtKontor,
      setInnsatsgruppe,
      setHovedmål,
      setUtdanningsnivå,
      setPrioritertMålgruppe,
      setOmfang,
      setFørerkort,
      setØnsketSted,
      setBorPåØnsketSted,
      setØnsketYrke,
      setSpråk,
      setKompetanse,
      setArbeidserfaring,
      setSide,
    ],
  );

  return {
    fritekst,
    setFritekstInternal,
    side,
    setSide,
    portefølje,
    setPortefølje,
    sortering,
    ønsketSted,
    setØnsketSted,
    ønsketYrke,
    setØnsketYrke,
    valgtKontor,
    setValgtKontor,
    hovedmål,
    setHovedmål,
    kompetanse,
    setKompetanse,
    innsatsgruppe,
    setInnsatsgruppe,
    omfang,
    setOmfang,
    førerkort,
    setFørerkort,
    språk,
    setSpråk,
    arbeidserfaring,
    setArbeidserfaring,
    utdanningsnivå,
    setUtdanningsnivå,
    prioritertMålgruppe,
    setPrioritertMålgruppe,
    borPåØnsketSted,
    setBorPåØnsketSted,
    ferskhet,
    orgenhet:
      portefølje === KandidatSøkPortefølje.MITT_KONTOR
        ? (valgtNavKontor?.navKontor ?? null)
        : null,
    gjeldendeFilter,
    gjeldendeSøkeord,
    frieFilterverdier: frieFilterverdier(filtre),
    normaliserFilter,
    settSøkeord,
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
    setter: (value: T | ((prevValue: T) => T) | null) => Promise<any>,
    trackingKey?: keyof typeof UmamiEvent.Kandidat,
  ): ((value: T | ((prevValue: T) => T)) => Promise<void>) => {
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

  const setFritekst = (tekst: string) => {
    filtre.setFritekstInternal(tekst);
    søkEndret();
    if (side !== 1) {
      setSide(1);
    }
  };

  return {
    fritekst: filtre.fritekst,
    setFritekst,
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
      filtre.setFritekstInternal('');
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
    gjeldendeSøkeord: filtre.gjeldendeSøkeord,
    settFiltre: filtre.settFiltreFraLagretSøk,
    settSøkeord: filtre.settSøkeord,
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
