'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import {
  useJobbsøkere,
  JobbsøkerDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rekrutteringstreff/useRekrutteringstreffData';
import {
  AktivtSteg as AktivtStegConst,
  JobbsøkerHendelsestype,
} from '@/app/rekrutteringstreff/_domain/constants';
import {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
  FC,
  ReactNode,
} from 'react';
import * as React from 'react';

const DEFAULT_TITTEL = 'Treff uten navn';

const erInvitert = (j: JobbsøkerDTO) =>
  j.hendelser?.some(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.INVITER,
  ) ?? false;
const harSvarJa = (j: JobbsøkerDTO) =>
  j.hendelser?.some(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.SVAR_JA_TIL_INVITASJON,
  ) ?? false;
const harSvarNei = (j: JobbsøkerDTO) =>
  j.hendelser?.some(
    (h) => h.hendelsestype === JobbsøkerHendelsestype.SVAR_NEI_TIL_INVITASJON,
  ) ?? false;

const parseDate = (value?: string | null): Date | undefined => {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
};

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
  const [activeStep, setActiveStep] = useState<string>(
    AktivtStegConst.PUBLISERE,
  );
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const {
    treff: rekrutteringstreff,
    tilTidspunktHarPassert,
    activeStep: derivedStep,
    innlegg: innleggData,
  } = useRekrutteringstreffData();

  const { data: arbeidsgivereData } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const { data: jobbsøkere = [] } = useJobbsøkere(rekrutteringstreffId);

  // Steg 1: Publisere-logikk
  const sjekklisteItems = useMemo(() => {
    const tittel = rekrutteringstreff?.tittel?.trim() ?? '';
    return {
      arbeidsgiver: (arbeidsgivereData?.length ?? 0) > 0,
      navn: tittel.length > 0 && tittel !== DEFAULT_TITTEL,
      sted:
        !!rekrutteringstreff?.gateadresse?.trim() &&
        !!rekrutteringstreff?.poststed?.trim(),
      tidspunkt: !!rekrutteringstreff?.fraTid,
      svarfrist: !!rekrutteringstreff?.svarfrist,
      omtreffet: (innleggData?.length ?? 0) > 0,
    };
  }, [arbeidsgivereData, rekrutteringstreff, innleggData]);

  const sjekklistePunkterFullfort =
    Object.values(sjekklisteItems).filter(Boolean).length;
  const totaltAntallSjekklistePunkter = Object.keys(sjekklisteItems).length;
  const erPubliseringklar =
    sjekklistePunkterFullfort === totaltAntallSjekklistePunkter;

  const arrangementtidspunktHarPassert = tilTidspunktHarPassert;

  // Steg 2: Invitere-logikk
  const antallInviterte = jobbsøkere.filter(erInvitert).length;
  const harInvitert = antallInviterte > 0;
  const antallSvarJa = jobbsøkere.filter(harSvarJa).length;
  const antallVenterSvar = jobbsøkere.filter(
    (j) => erInvitert(j) && !harSvarJa(j) && !harSvarNei(j),
  ).length;
  const inviterePunkterFullfort =
    (harInvitert ? 1 : 0) + (tilTidspunktHarPassert ? 1 : 0);
  const totaltAntallInviterePunkter = 2;

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
