'use client';

import { rekbisError } from '../../../util/rekbisError';
import * as React from 'react';

export interface RekrutteringstreffContextProps {
  rekrutteringstreffId?: string;
}

const RekrutteringstreffContext =
  React.createContext<RekrutteringstreffContextProps>({});

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
    throw new rekbisError({
      beskrivelse:
        'useRekrutteringstreffContext må være i scope: RekrutteringstreffContextProvider',
    });
  }
  return context;
};
