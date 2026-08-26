'use client';

import {
  TREFFGJENNOMFØRING_STEG_QUERY_PARAM,
  treffgjennomføringStegParser,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringSteg';
import { useQueryState } from 'nuqs';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';

interface Lagringsstatus {
  lagringPågår: boolean;
  setLagringPågår: (pågår: boolean) => void;
}

const LagringsstatusContext = createContext<Lagringsstatus | undefined>(
  undefined,
);

/**
 * Steginnholdet og sidepanelet for treffgjennomføring rendres i hver sin del av
 * SideLayout. Aktivt steg deles allerede via URL-en, men lagringsstatusen er
 * lokal – den deles her slik at stegvelgeren kan låses mens et steg lagrer.
 */
export const TreffgjennomføringNavigasjonProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [lagringPågår, setLagringPågår] = useState(false);
  const verdi = useMemo(
    () => ({ lagringPågår, setLagringPågår }),
    [lagringPågår],
  );

  return (
    <LagringsstatusContext.Provider value={verdi}>
      {children}
    </LagringsstatusContext.Provider>
  );
};

export const useTreffgjennomføringNavigasjon = () => {
  const lagringsstatus = useContext(LagringsstatusContext);
  if (!lagringsstatus) {
    throw new Error(
      'useTreffgjennomføringNavigasjon må brukes innenfor TreffgjennomføringNavigasjonProvider',
    );
  }
  const { lagringPågår, setLagringPågår } = lagringsstatus;

  const [stegFraUrl, setStegFraUrl] = useQueryState(
    TREFFGJENNOMFØRING_STEG_QUERY_PARAM,
    treffgjennomføringStegParser.withOptions({ clearOnDefault: true }),
  );

  const byttSteg = useCallback(
    (steg: number) => {
      setLagringPågår(false);
      void setStegFraUrl(steg);
    },
    [setLagringPågår, setStegFraUrl],
  );

  return {
    stegFraUrl,
    setStegFraUrl,
    byttSteg,
    lagringPågår,
    setLagringPågår,
  };
};
