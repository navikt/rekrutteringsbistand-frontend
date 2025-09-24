'use client';

import { RekbisError } from '@/util/rekbisError';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Lagringsnøkkel = 'rekrutteringstreff' | 'innlegg' | 'republiser';

interface RekrutteringstreffContekst {
  rekrutteringstreffId: string;
  lagringsTellere: Record<Lagringsnøkkel, number>;
  lagrerNoe: boolean;
  lagrerSynlig: boolean;
  startLagring: (nøkkel: Lagringsnøkkel) => void;
  stoppLagring: (nøkkel: Lagringsnøkkel) => void;
}

const RekrutteringstreffContext = createContext<
  RekrutteringstreffContekst | undefined
>(undefined);

interface RekrutteringstreffProviderProps {
  children: ReactNode;
  rekrutteringstreffId: string;
}

export const RekrutteringstreffContextProvider = ({
  children,
  rekrutteringstreffId,
}: RekrutteringstreffProviderProps) => {
  const [lagringsTellere, setLagringsTellere] = useState<
    Record<Lagringsnøkkel, number>
  >({
    rekrutteringstreff: 0,
    innlegg: 0,
    republiser: 0,
  });

  const startLagring = (nøkkel: Lagringsnøkkel) =>
    setLagringsTellere((forrige) => ({
      ...forrige,
      [nøkkel]: (forrige[nøkkel] || 0) + 1,
    }));

  const stoppLagring = (nøkkel: Lagringsnøkkel) =>
    setLagringsTellere((forrige) => ({
      ...forrige,
      [nøkkel]: Math.max(0, (forrige[nøkkel] || 1) - 1),
    }));

  const lagrerNoe = Object.values(lagringsTellere).some((antall) => antall > 0);
  const [lagrerSynlig, setLagrerSynlig] = useState(false);

  // Enkel 500ms forsinkelse: vis umiddelbart, skjul etter 500ms
  useEffect(() => {
    if (lagrerNoe) {
      setLagrerSynlig(true);
    } else {
      const timer = setTimeout(() => setLagrerSynlig(false), 500);
      return () => clearTimeout(timer);
    }
  }, [lagrerNoe]);

  const kontekstVerdi: RekrutteringstreffContekst = useMemo(
    () => ({
      rekrutteringstreffId,
      lagringsTellere,
      lagrerNoe,
      lagrerSynlig,
      startLagring,
      stoppLagring,
    }),
    [rekrutteringstreffId, lagringsTellere, lagrerNoe, lagrerSynlig],
  );

  return (
    <RekrutteringstreffContext.Provider value={kontekstVerdi}>
      {children}
    </RekrutteringstreffContext.Provider>
  );
};

export const useRekrutteringstreffContext = () => {
  const contekst = useContext(RekrutteringstreffContext);

  if (!contekst) {
    throw new RekbisError({
      message:
        'useRekrutteringstreffContext må være i scope: RekrutteringstreffContextProvider',
    });
  }

  if (!contekst.rekrutteringstreffId) {
    throw new RekbisError({
      message: 'RekrutteringstreffId mangler i conteksten!',
    });
  }

  return contekst;
};
