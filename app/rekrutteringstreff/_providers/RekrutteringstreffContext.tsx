'use client';

import { RekbisError } from '@/util/rekbisError';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

export const RekrutteringstreffProvider = ({
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
  const lagrerNoe = Object.values(lagringsTellere).some((antall) => antall > 0);
  const [lagrerSynlig, setLagrerSynlig] = useState(false);
  const skjulTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSkjulTimer = useCallback(() => {
    if (skjulTimerRef.current) {
      clearTimeout(skjulTimerRef.current);
      skjulTimerRef.current = null;
    }
  }, []);

  const planleggSkjuling = useCallback(() => {
    clearSkjulTimer();
    skjulTimerRef.current = setTimeout(() => {
      setLagrerSynlig(false);
      skjulTimerRef.current = null;
    }, 500);
  }, [clearSkjulTimer]);

  const startLagring = useCallback(
    (nøkkel: Lagringsnøkkel) => {
      clearSkjulTimer();
      setLagrerSynlig(true);
      setLagringsTellere((forrige) => ({
        ...forrige,
        [nøkkel]: (forrige[nøkkel] || 0) + 1,
      }));
    },
    [clearSkjulTimer],
  );

  const stoppLagring = useCallback(
    (nøkkel: Lagringsnøkkel) =>
      setLagringsTellere((forrige) => {
        const neste = {
          ...forrige,
          [nøkkel]: Math.max(0, (forrige[nøkkel] || 1) - 1),
        };

        const ingenLagring = Object.values(neste).every(
          (antall) => antall === 0,
        );
        if (ingenLagring) {
          planleggSkjuling();
        }

        return neste;
      }),
    [planleggSkjuling],
  );

  useEffect(() => () => clearSkjulTimer(), [clearSkjulTimer]);

  const kontekstVerdi: RekrutteringstreffContekst = useMemo(
    () => ({
      rekrutteringstreffId,
      lagringsTellere,
      lagrerNoe,
      lagrerSynlig,
      startLagring,
      stoppLagring,
    }),
    [
      rekrutteringstreffId,
      lagringsTellere,
      lagrerNoe,
      lagrerSynlig,
      startLagring,
      stoppLagring,
    ],
  );

  return (
    <RekrutteringstreffContext.Provider value={kontekstVerdi}>
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
