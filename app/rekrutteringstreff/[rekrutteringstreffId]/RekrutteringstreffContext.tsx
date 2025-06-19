'use client';

import { RekbisError } from '../../../util/rekbisError';
import * as React from 'react';

export interface RekrutteringstreffContextProps {
  rekrutteringstreffId: string;
}

const RekrutteringstreffContext = React.createContext<
  RekrutteringstreffContextProps | undefined
>(undefined);

export interface RekrutteringstreffContextProviderProps {
  children?: React.ReactNode | undefined;
  rekrutteringstreffId: string;
}

export const RekrutteringstreffContextProvider: React.FC<
  RekrutteringstreffContextProviderProps
> = ({ children, rekrutteringstreffId }) => {
  return (
    <RekrutteringstreffContext.Provider value={{ rekrutteringstreffId }}>
      {children}
    </RekrutteringstreffContext.Provider>
  );
};

export const useRekrutteringstreffContext = () => {
  const context = React.useContext(RekrutteringstreffContext);
  if (context === undefined) {
    throw new RekbisError({
      message:
        'useRekrutteringstreffContext må være i scope: RekrutteringstreffContextProvider',
    });
  }
  if (!context.rekrutteringstreffId) {
    throw new RekbisError({
      message: 'RekrutteringstreffId mangler i konteksten!',
    });
  }
  return context;
};
