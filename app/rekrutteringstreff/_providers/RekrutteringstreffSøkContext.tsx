'use client';

import { createContext, FC, useContext, useState, type ReactNode } from 'react';

export enum RekrutteringstreffSortering {
  Publiseringsdato = 'publiseringsdato',
  Utløpsdato = 'utløpsdato',
}

export interface IRekrutteringstreffSøkContext {
  fritekst: string;
  setFritekst: (val: string) => void;
  sortering: RekrutteringstreffSortering;
  setSortering: (val: RekrutteringstreffSortering) => void;
}

const RekrutteringstreffSøkContext = createContext<
  IRekrutteringstreffSøkContext | undefined
>(undefined);

export const RekrutteringstreffSøkProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fritekst, setFritekst] = useState('');
  const [sortering, setSortering] = useState<RekrutteringstreffSortering>(
    RekrutteringstreffSortering.Publiseringsdato,
  );

  return (
    <RekrutteringstreffSøkContext.Provider
      value={{ fritekst, setFritekst, sortering, setSortering }}
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
