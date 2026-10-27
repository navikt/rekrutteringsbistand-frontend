'use client';

import {
  StandardsøkDomene,
  type StandardsøkDTO,
} from '@/app/api/bruker/standardsok/standardsøkTyper';
import {
  type RekrutteringstreffSokRespons,
  Sortering,
  useRekrutteringstreffSok,
  Visning,
} from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import {
  PublisertStatus,
  publisertStatusVerdier,
  RekrutteringstreffStatus,
  rekrutteringstreffStatusVerdier,
} from '@/app/rekrutteringstreff/_types/constants';
import {
  byggLagretSøkFilter,
  tolkLagretSøkFilter,
} from '@/app/rekrutteringstreff/_utils/lagredeSøkFilter';
import {
  useAktivtLagretSøkId,
  useLagredeSøk,
} from '@/components/standardsøk/useLagredeSøk';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from 'nuqs';
import {
  createContext,
  FC,
  useContext,
  useCallback,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import type { SWRResponse } from 'swr';

export interface IRekrutteringstreffSøkContext {
  visning: Visning;
  setVisning: (val: Visning) => void;
  statuser: RekrutteringstreffStatus[];
  setStatuser: (val: RekrutteringstreffStatus[]) => void;
  publisertStatuser: PublisertStatus[];
  setPublisertStatuser: (val: PublisertStatus[]) => void;
  fylker: string[];
  setFylker: (val: string[]) => void;
  kommuner: string[];
  setKommuner: (val: string[]) => void;
  kontorer: string[];
  setKontorer: (val: string[]) => void;
  fritekst: string[];
  setFritekst: (val: string) => void;
  setFritekstListe: (val: string[]) => void;
  sortering: Sortering;
  setSortering: (val: Sortering) => void;
  side: number;
  setSide: (val: number) => void;
  sokHook: SWRResponse<RekrutteringstreffSokRespons, Error>;
  /** Filtrene som lagres i et lagret søk, som normalisert query-streng uten fritekst. */
  gjeldendeFilter: string;
  aktivtStandardsøkId: string | null;
  setAktivtStandardsøkId: (id: string | null) => void;
  brukLagretSøk: (søk: StandardsøkDTO) => Promise<boolean>;
  /** Sann mens siden venter på standardsøket. Søket mot treffene starter først etterpå. */
  venterPåStandardsøk: boolean;
  /** Sann når filtre, sortering eller søkeord avviker fra standardvisningen. */
  harEndretFiltre: boolean;
  /** Setter alle filtre og sortering tilbake til standard og fjerner søkeordene. */
  nullstillFiltre: () => void;
}

// Står ingen av disse i URL-en når siden åpnes, bruker vi standardsøket.
const SØKEPARAMETERE = [
  'visning',
  'statuser',
  'publisertStatuser',
  'fylker',
  'kommuner',
  'kontorer',
  'sortering',
  'side',
];

const RekrutteringstreffSøkContext = createContext<
  IRekrutteringstreffSøkContext | undefined
>(undefined);

export const RekrutteringstreffSøkProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [visning, setVisningInternal] = useQueryState('visning', {
    defaultValue: Visning.ALLE,
    clearOnDefault: true,
  });

  const [aktivtStandardsøkId, setAktivtStandardsøkId] = useAktivtLagretSøkId();

  const {
    brukerData: { roller },
  } = useApplikasjonContext();
  const { track } = useUmami();

  const harTilgangTilUtkast =
    roller?.includes(
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    ) || roller?.includes(Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER);

  const [statuser, setStatuserInternal] = useQueryState<
    RekrutteringstreffStatus[]
  >(
    'statuser',
    parseAsArrayOf(parseAsStringLiteral(rekrutteringstreffStatusVerdier))
      .withDefault([RekrutteringstreffStatus.PUBLISERT])
      .withOptions({ clearOnDefault: true }),
  );

  const synligeStatuser = harTilgangTilUtkast
    ? statuser
    : statuser.filter((s) => s !== RekrutteringstreffStatus.UTKAST);

  const [publisertStatuser, setPublisertStatuserInternal] = useQueryState<
    PublisertStatus[]
  >(
    'publisertStatuser',
    parseAsArrayOf(parseAsStringLiteral(publisertStatusVerdier))
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [fylker, setFylkerInternal] = useQueryState<string[]>(
    'fylker',
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );
  const [kommuner, setKommunerInternal] = useQueryState<string[]>(
    'kommuner',
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const setFylker = (val: string[]) => {
    setFylkerInternal(val);
    setSideInternal(1);
    void setAktivtStandardsøkId(null);
  };
  const setKommuner = (val: string[]) => {
    setKommunerInternal(val);
    setSideInternal(1);
    void setAktivtStandardsøkId(null);
  };

  useEffect(() => {
    if (kommuner.length !== 0) {
      const filtrerte = kommuner.filter((kommune) =>
        fylker.includes(kommune.slice(0, 2)),
      );
      if (filtrerte.length !== kommuner.length) setKommunerInternal(filtrerte);
    }
  }, [kommuner, fylker, setKommunerInternal]);

  const [kontorer, setKontorerInternal] = useQueryState<string[]>(
    'kontorer',
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [fritekst, setFritekstListeInternal] = useState<string[]>([]);

  const setFritekst = (val: string) => {
    setFritekstListeInternal((forrige) => [...forrige, val]);
    setSideInternal(1);
    void setAktivtStandardsøkId(null);
  };

  const setFritekstListe = (val: string[]) => {
    setFritekstListeInternal(val);
    setSideInternal(1);
    void setAktivtStandardsøkId(null);
  };

  const [side, setSideInternal] = useQueryState(
    'side',
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );

  const [sortering, setSorteringInternal] = useQueryState('sortering', {
    defaultValue: Sortering.SIST_OPPDATERTE,
    clearOnDefault: true,
  });

  useEffect(() => {
    if (
      !harTilgangTilUtkast &&
      statuser.includes(RekrutteringstreffStatus.UTKAST)
    ) {
      setStatuserInternal(
        statuser.filter((s) => s !== RekrutteringstreffStatus.UTKAST),
      );
    }
  }, [harTilgangTilUtkast, statuser, setStatuserInternal]);

  const setVisning = (val: Visning) => {
    setVisningInternal(val);
    setSideInternal(1);
    void setAktivtStandardsøkId(null);
    if (val !== Visning.VALGTE_KONTORER) {
      setKontorerInternal([]);
    }
  };

  const setStatuser = (val: RekrutteringstreffStatus[]) => {
    const filtrerteStatuser = harTilgangTilUtkast
      ? val
      : val.filter((s) => s !== RekrutteringstreffStatus.UTKAST);
    setStatuserInternal(filtrerteStatuser);
    setSideInternal(1);
    void setAktivtStandardsøkId(null);
  };

  const setPublisertStatuser = (val: PublisertStatus[]) => {
    setPublisertStatuserInternal(val);
    setSideInternal(1);
    void setAktivtStandardsøkId(null);
  };

  const setKontorer = (val: string[]) => {
    setKontorerInternal(val);
    setSideInternal(1);
    void setAktivtStandardsøkId(null);
  };

  const setSide = (val: number) => {
    setSideInternal(val);
  };

  const setSortering = (val: Sortering) => {
    setSorteringInternal(val);
    setSideInternal(1);
    void setAktivtStandardsøkId(null);
  };

  const gjeldendeFilter = byggLagretSøkFilter({
    visning: visning as Visning,
    kontorer,
    statuser: synligeStatuser,
    publisertStatuser,
    fylker,
    kommuner,
    sortering: sortering as Sortering,
  });

  // Parametere som mangler i det lagrede filteret, settes til standardverdien (null).
  const settFiltreFraLagretSøk = useCallback(
    (lagretFilter: string) => {
      const filter = tolkLagretSøkFilter(lagretFilter);

      setVisningInternal(
        filter.visning === Visning.MINE && !harTilgangTilUtkast
          ? null
          : filter.visning,
      );
      setStatuserInternal(filter.statuser);
      setPublisertStatuserInternal(filter.publisertStatuser);
      setFylkerInternal(filter.fylker);
      setKommunerInternal(filter.kommuner);
      setKontorerInternal(filter.kontorer);
      setSorteringInternal(filter.sortering);
      setSideInternal(null);
    },
    [
      harTilgangTilUtkast,
      setFylkerInternal,
      setKontorerInternal,
      setKommunerInternal,
      setPublisertStatuserInternal,
      setSideInternal,
      setSorteringInternal,
      setStatuserInternal,
      setVisningInternal,
    ],
  );

  const registrerStandardsøkBrukt = useCallback(() => {
    track(UmamiEvent.Rekrutteringstreff.standardsøk_brukt);
  }, [track]);

  const { brukLagretSøk, venterPåStandardsøk } = useLagredeSøk({
    domene: StandardsøkDomene.REKRUTTERINGSTREFF,
    søkeparametere: SØKEPARAMETERE,
    gjeldendeFilter,
    setAktivtSøkId: setAktivtStandardsøkId,
    settFiltre: settFiltreFraLagretSøk,
    settSøkeord: setFritekstListeInternal,
    onStandardsøkBrukt: registrerStandardsøkBrukt,
  });

  const harEndretFiltre = gjeldendeFilter !== '' || fritekst.length > 0;

  // null fjerner parameteren fra URL-en, slik at filteret får standardverdien.
  const nullstillFiltre = () => {
    setVisningInternal(null);
    setStatuserInternal(null);
    setPublisertStatuserInternal(null);
    setFylkerInternal(null);
    setKommunerInternal(null);
    setKontorerInternal(null);
    setSorteringInternal(null);
    setSideInternal(null);
    setFritekstListeInternal([]);
    setAktivtStandardsøkId(null);
  };

  const sokHook = useRekrutteringstreffSok(
    {
      visning: visning as Visning,
      statuser: synligeStatuser.length > 0 ? synligeStatuser : undefined,
      publisertStatuser:
        publisertStatuser.length > 0 ? publisertStatuser : undefined,
      fylker: fylker.length > 0 ? fylker : undefined,
      kommuner: kommuner.length > 0 ? kommuner : undefined,
      kontorer: kontorer.length > 0 ? kontorer : undefined,
      fritekst: fritekst.length > 0 ? fritekst : undefined,
      sortering: sortering as Sortering,
      side,
    },
    { aktiv: !venterPåStandardsøk },
  );

  return (
    <RekrutteringstreffSøkContext.Provider
      value={{
        visning: visning as Visning,
        setVisning,
        statuser: synligeStatuser,
        setStatuser,
        publisertStatuser,
        setPublisertStatuser,
        fylker,
        setFylker,
        kommuner,
        setKommuner,
        kontorer,
        setKontorer,
        fritekst,
        setFritekst,
        setFritekstListe,
        sortering: sortering as Sortering,
        setSortering,
        side,
        setSide,
        sokHook,
        gjeldendeFilter,
        aktivtStandardsøkId,
        setAktivtStandardsøkId,
        brukLagretSøk,
        venterPåStandardsøk,
        harEndretFiltre,
        nullstillFiltre,
      }}
    >
      {children}
    </RekrutteringstreffSøkContext.Provider>
  );
};

export const useRekrutteringstreffSøkFilter = () => {
  const context = useContext(RekrutteringstreffSøkContext);
  if (!context) {
    throw new Error(
      'useRekrutteringstreffSøkFilter må brukes innenfor RekrutteringstreffSøkProvider',
    );
  }
  return context;
};
