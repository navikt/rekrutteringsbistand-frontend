'use client';

import { RekbisError } from '@/util/rekbisError';
import { createContext, ReactNode, useContext } from 'react';

interface RekrutteringstreffContekst {
  rekrutteringstreffId: string;
}

const RekrutteringstreffContext = createContext<
  RekrutteringstreffContekst | undefined
>(undefined);

interface RekrutteringstreffProviderProps {
  children: ReactNode;
  rekrutteringstreffId: string;
}

export const RekrutteringstreffProvider = ({
  children,
  rekrutteringstreffId,
}: RekrutteringstreffProviderProps) => {
  return (
    <RekrutteringstreffContext.Provider value={{ rekrutteringstreffId }}>
      {children}
    </RekrutteringstreffContext.Provider>
  );
};

export const useNullableRekrutteringstreffContext = () => {
  const context = useContext(RekrutteringstreffContext);

  if (context === undefined) {
    return null;
  }
  return context;
};

export const useRekrutteringstreffContext = () => {
  const contekst = useContext(RekrutteringstreffContext);

  if (!contekst) {
    throw new RekbisError({
      message:
        'useRekrutteringstreffContext må være i scope: RekrutteringstreffProvider',
    });
  }

  if (!contekst.rekrutteringstreffId) {
    throw new RekbisError({
      message: 'RekrutteringstreffId mangler i conteksten!',
    });
  }

  return contekst;
};
