'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { useInviteringsStatus } from './useInviteringsStatus';
import { useSjekklisteStatus } from './useSjekklisteStatus';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';

export interface StegviserState {
  activeStep: string;
  setActiveStep: (step: string) => void;

  // Steg 1: Publisere
  sjekklistePunkterFullfort: number;
  totaltAntallSjekklistePunkter: number;
  erPubliseringklar: boolean;

  // Steg 2: Invitere
  antallInviterePunkterFullfort: number;
  totaltAntallInviterePunkter: number;
  harInvitert: boolean;
  antallInviterte: number;
  antallSvarJa: number;
  antallVenterSvar: number;

  // Tidsflagg
  arrangementtidspunktHarPassert: boolean;
  tiltidspunktHarPassert: boolean;
}

const StegviserContext = createContext<StegviserState | undefined>(undefined);

export const StegviserProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Bruk sentraliserte hooks for all data og beregninger
  const { tilTidspunktHarPassert, activeStep: derivedStep } =
    useRekrutteringstreffData();

  const {
    punkterFullfort: sjekklistePunkterFullfort,
    totaltAntallPunkter: totaltAntallSjekklistePunkter,
    erPubliseringklar,
  } = useSjekklisteStatus();

  const {
    harInvitert,
    antallInviterte,
    antallSvarJa,
    antallVenterSvar,
    antallInviterePunkterFullfort,
    totaltAntallInviterePunkter,
  } = useInviteringsStatus();

  // Alias for konsistens (brukt i flere komponenter)
  const arrangementtidspunktHarPassert = tilTidspunktHarPassert;
  const setActiveStep = useCallback((step: string) => {
    void step; // Lokalt override fjernet; activeStep følger nå backend-state.
  }, []);

  const value: StegviserState = useMemo(
    () => ({
      activeStep: derivedStep,
      setActiveStep,
      sjekklistePunkterFullfort,
      totaltAntallSjekklistePunkter,
      erPubliseringklar,
      antallInviterePunkterFullfort,
      totaltAntallInviterePunkter,
      harInvitert,
      antallInviterte,
      antallSvarJa,
      antallVenterSvar,
      arrangementtidspunktHarPassert,
      tiltidspunktHarPassert: tilTidspunktHarPassert,
    }),
    [
      derivedStep,
      setActiveStep,
      sjekklistePunkterFullfort,
      totaltAntallSjekklistePunkter,
      erPubliseringklar,
      antallInviterePunkterFullfort,
      totaltAntallInviterePunkter,
      harInvitert,
      antallInviterte,
      antallSvarJa,
      antallVenterSvar,
      arrangementtidspunktHarPassert,
      tilTidspunktHarPassert,
    ],
  );

  return (
    <StegviserContext.Provider value={value}>
      {children}
    </StegviserContext.Provider>
  );
};

export const useStegviser = () => {
  const context = useContext(StegviserContext);
  if (context === undefined) {
    throw new Error('useStegviser må brukes innenfor en StegviserProvider');
  }
  return context;
};
