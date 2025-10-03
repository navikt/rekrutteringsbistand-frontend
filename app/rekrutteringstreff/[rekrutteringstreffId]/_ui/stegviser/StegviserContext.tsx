'use client';

import { useInviteringsStatus } from '../hooks/useInviteringsStatus';
import { useRekrutteringstreffData } from '../hooks/useRekrutteringstreffData';
import { useSjekklisteStatus } from '../hooks/useSjekklisteStatus';
import { AktivtSteg as AktivtStegConst } from '@/app/rekrutteringstreff/_domain/constants';
import {
  createContext,
  useState,
  useContext,
  useEffect,
  FC,
  ReactNode,
} from 'react';
import * as React from 'react';

export interface StegviserState {
  activeStep: string;
  setActiveStep: (step: string) => void;

  // Steg 1: Publisere
  sjekklistePunkterFullfort: number;
  totaltAntallSjekklistePunkter: number;
  erPubliseringklar: boolean;

  // Steg 2: Invitere
  inviterePunkterFullfort: number;
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
  // Lokal UI state - aktivt steg
  const [activeStep, setActiveStep] = useState<string>(
    AktivtStegConst.PUBLISERE,
  );

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
    inviterePunkterFullfort,
    totaltAntallInviterePunkter,
  } = useInviteringsStatus();

  // Alias for konsistens (brukt i flere komponenter)
  const arrangementtidspunktHarPassert = tilTidspunktHarPassert;

  // Synkroniser lokal activeStep med derived state fra backend
  useEffect(() => {
    setActiveStep((prev) => (prev === derivedStep ? prev : derivedStep));
  }, [derivedStep]);

  const value: StegviserState = {
    activeStep,
    setActiveStep,
    sjekklistePunkterFullfort,
    totaltAntallSjekklistePunkter,
    erPubliseringklar,
    inviterePunkterFullfort,
    totaltAntallInviterePunkter,
    harInvitert,
    antallInviterte,
    antallSvarJa,
    antallVenterSvar,
    arrangementtidspunktHarPassert,
    tiltidspunktHarPassert: tilTidspunktHarPassert,
  };

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
