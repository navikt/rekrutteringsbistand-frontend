'use client';

import {
  Sortering,
  Visning,
} from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs';
import { createContext, FC, useContext, type ReactNode } from 'react';

export interface IRekrutteringstreffSøkContext {
  visning: Visning;
  setVisning: (val: Visning) => void;
  statuser: string[];
  setStatuser: (val: string[]) => void;
  kontorer: string[];
  setKontorer: (val: string[]) => void;
  sortering: Sortering;
  setSortering: (val: Sortering) => void;
  side: number;
  setSide: (val: number) => void;
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

  const [statuser, setStatuserInternal] = useQueryState<string[]>(
    'statuser',
    parseAsArrayOf(parseAsString)
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

  const setStatuser = (val: string[]) => {
    setStatuserInternal(val);
    setSideInternal(1);
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

  return (
    <RekrutteringstreffSøkContext.Provider
      value={{
        visning: visning as Visning,
        setVisning,
        statuser,
        setStatuser,
        kontorer,
        setKontorer,
        sortering: sortering as Sortering,
        setSortering,
        side,
        setSide,
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
