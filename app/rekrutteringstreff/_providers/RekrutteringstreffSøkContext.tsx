'use client';

import { LagredeSøkDomene } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import {
  type RekrutteringstreffSokRespons,
  useRekrutteringstreffSok,
} from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import {
  PublisertStatus,
  RekrutteringstreffStatus,
  Sortering,
  Visning,
} from '@/app/rekrutteringstreff/_types/constants';
import {
  byggLagretSøkFilter,
  filterParsere,
  tolkLagretSøkFilter,
  type Søkefiltre,
} from '@/app/rekrutteringstreff/_utils/lagredeSøkFilter';
import { harFilterEllerSøkeord } from '@/components/lagrede-søk/harSammeInnhold';
import {
  type LagredeSøkTilstand,
  useLagredeSøk,
} from '@/components/lagrede-søk/useLagredeSøk';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import { parseAsInteger, useQueryState, useQueryStates } from 'nuqs';
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
  gjeldendeFilter: string;
  lagredeSøk: LagredeSøkTilstand;
  harEndretFiltre: boolean;
  nullstillFiltre: () => void;
}

const SØKEPARAMETERE = [...Object.keys(filterParsere), 'side'];

const RekrutteringstreffSøkContext = createContext<
  IRekrutteringstreffSøkContext | undefined
>(undefined);

export const RekrutteringstreffSøkProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filtre, setFiltre] = useQueryStates(filterParsere);
  const {
    visning,
    statuser,
    publisertStatuser,
    fylker,
    kommuner,
    kontorer,
    sortering,
  } = filtre;
  const [side, setSide] = useQueryState('side', parseAsInteger.withDefault(1));

  const {
    brukerData: { roller },
  } = useApplikasjonContext();
  const { track } = useUmami();

  const kanSeUtkastOgMine =
    roller?.includes(
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    ) || roller?.includes(Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER);

  const synligeStatuser = kanSeUtkastOgMine
    ? statuser
    : statuser.filter((s) => s !== RekrutteringstreffStatus.UTKAST);

  useEffect(() => {
    if (kommuner.length !== 0) {
      const filtrerte = kommuner.filter((kommune) =>
        fylker.includes(kommune.slice(0, 2)),
      );
      if (filtrerte.length !== kommuner.length) {
        void setFiltre({ kommuner: filtrerte });
      }
    }
  }, [kommuner, fylker, setFiltre]);

  const [fritekst, setFritekstListeInternal] = useState<string[]>([]);

  useEffect(() => {
    if (
      !kanSeUtkastOgMine &&
      statuser.includes(RekrutteringstreffStatus.UTKAST)
    ) {
      void setFiltre({
        statuser: statuser.filter((s) => s !== RekrutteringstreffStatus.UTKAST),
      });
    }
  }, [kanSeUtkastOgMine, statuser, setFiltre]);

  const gjeldendeFilter = byggLagretSøkFilter({
    ...filtre,
    statuser: synligeStatuser,
  });

  const settFiltreFraLagretSøk = useCallback(
    (lagretFilter: string) => {
      const filter = tolkLagretSøkFilter(lagretFilter);

      void setFiltre({
        ...filter,
        visning:
          filter.visning === Visning.MINE && !kanSeUtkastOgMine
            ? null
            : filter.visning,
      });
      void setSide(null);
    },
    [kanSeUtkastOgMine, setFiltre, setSide],
  );

  const lagredeSøk = useLagredeSøk({
    domene: LagredeSøkDomene.REKRUTTERINGSTREFF,
    søkeparametere: SØKEPARAMETERE,
    gjeldendeFilter,
    settFiltre: settFiltreFraLagretSøk,
    settSøkeord: setFritekstListeInternal,
    sporHendelse: (hendelse) => track(UmamiEvent.Rekrutteringstreff[hendelse]),
  });

  const filterEndret = () => {
    void setSide(null);
    void lagredeSøk.setAktivtSøkId(null);
  };

  const endreFiltre = (endring: Partial<Søkefiltre>) => {
    void setFiltre(endring);
    filterEndret();
  };

  const setFylker = (val: string[]) => endreFiltre({ fylker: val });

  const setKommuner = (val: string[]) => endreFiltre({ kommuner: val });

  const setVisning = (val: Visning) =>
    endreFiltre(
      val === Visning.VALGTE_KONTORER
        ? { visning: val }
        : { visning: val, kontorer: [] },
    );

  const setStatuser = (val: RekrutteringstreffStatus[]) => {
    const filtrerteStatuser = kanSeUtkastOgMine
      ? val
      : val.filter((s) => s !== RekrutteringstreffStatus.UTKAST);
    endreFiltre({ statuser: filtrerteStatuser });
  };

  const setPublisertStatuser = (val: PublisertStatus[]) =>
    endreFiltre({ publisertStatuser: val });

  const setKontorer = (val: string[]) => endreFiltre({ kontorer: val });

  const setFritekst = (val: string) => {
    setFritekstListeInternal((forrige) => [...forrige, val]);
    filterEndret();
  };

  const setFritekstListe = (val: string[]) => {
    setFritekstListeInternal(val);
    filterEndret();
  };

  const setSortering = (val: Sortering) => endreFiltre({ sortering: val });

  const harEndretFiltre = harFilterEllerSøkeord(gjeldendeFilter, fritekst);

  // null fjerner parameteren fra URL-en, slik at filteret får standardverdien.
  const nullstillFiltre = () => {
    void setFiltre(null);
    void setSide(null);
    setFritekstListeInternal([]);
    void lagredeSøk.setAktivtSøkId(null);
  };

  const sokHook = useRekrutteringstreffSok(
    {
      visning,
      statuser: synligeStatuser,
      publisertStatuser,
      fylker,
      kommuner,
      kontorer,
      fritekst,
      sortering,
      side,
    },
    { aktiv: !lagredeSøk.venterPåStandardsøk },
  );

  return (
    <RekrutteringstreffSøkContext.Provider
      value={{
        visning,
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
        sortering,
        setSortering,
        side,
        setSide,
        sokHook,
        gjeldendeFilter,
        lagredeSøk,
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
