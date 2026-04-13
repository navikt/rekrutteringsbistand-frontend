'use client';

import {
  type RekrutteringstreffSokRespons,
  Sortering,
  useRekrutteringstreffSok,
  Visning,
} from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import {
  PublisertStatus,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from 'nuqs';
import { createContext, FC, useContext, type ReactNode } from 'react';
import type { SWRResponse } from 'swr';

export interface IRekrutteringstreffSøkContext {
  visning: Visning;
  setVisning: (val: Visning) => void;
  statuser: RekrutteringstreffStatus[];
  setStatuser: (val: RekrutteringstreffStatus[]) => void;
  publisertStatuser: PublisertStatus[];
  setPublisertStatuser: (val: PublisertStatus[]) => void;
  kontorer: string[];
  setKontorer: (val: string[]) => void;
  sortering: Sortering;
  setSortering: (val: Sortering) => void;
  side: number;
  setSide: (val: number) => void;
  sokHook: SWRResponse<RekrutteringstreffSokRespons, Error>;
}

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

  const rekrutteringstreffStatusVerdier = Object.values(
    RekrutteringstreffStatus,
  );
  const publiserteStatusVerdier = Object.values(PublisertStatus);

  const [statuser, setStatuserInternal] = useQueryState<
    RekrutteringstreffStatus[]
  >(
    'statuser',
    parseAsArrayOf(parseAsStringLiteral(rekrutteringstreffStatusVerdier))
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [publisertStatuser, setPublisertStatuserInternal] = useQueryState<
    PublisertStatus[]
  >(
    'publisertStatuser',
    parseAsArrayOf(parseAsStringLiteral(publiserteStatusVerdier))
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [kontorer, setKontorerInternal] = useQueryState<string[]>(
    'kontorer',
    parseAsArrayOf(parseAsString)
      .withDefault([])
      .withOptions({ clearOnDefault: true }),
  );

  const [side, setSideInternal] = useQueryState(
    'side',
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );

  const [sortering, setSorteringInternal] = useQueryState('sortering', {
    defaultValue: Sortering.SIST_OPPDATERTE,
    clearOnDefault: true,
  });

  const setVisning = (val: Visning) => {
    setVisningInternal(val);
    setSideInternal(1);
    if (val !== Visning.VALGTE_KONTORER) {
      setKontorerInternal([]);
    }
  };

  const setStatuser = (val: RekrutteringstreffStatus[]) => {
    setStatuserInternal(val);
    setSideInternal(1);
  };

  const setPublisertStatuser = (val: PublisertStatus[]) => {
    setPublisertStatuserInternal(val);
    // setSideInternal(1); // TODO: koa hva gjør denne?
  };

  const setKontorer = (val: string[]) => {
    setKontorerInternal(val);
    setSideInternal(1);
  };

  const setSide = (val: number) => {
    setSideInternal(val);
  };

  const setSortering = (val: Sortering) => {
    setSorteringInternal(val);
    setSideInternal(1);
  };

  const sokHook = useRekrutteringstreffSok({
    visning: visning as Visning,
    statuser: statuser.length > 0 ? statuser : undefined,
    publisertStatuser:
      publisertStatuser.length > 0 ? publisertStatuser : undefined,
    kontorer: kontorer.length > 0 ? kontorer : undefined,
    sortering: sortering as Sortering,
    side,
  });

  return (
    <RekrutteringstreffSøkContext.Provider
      value={{
        visning: visning as Visning,
        setVisning,
        statuser,
        setStatuser,
        publisertStatuser,
        setPublisertStatuser,
        kontorer,
        setKontorer,
        sortering: sortering as Sortering,
        setSortering,
        side,
        setSide,
        sokHook,
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
