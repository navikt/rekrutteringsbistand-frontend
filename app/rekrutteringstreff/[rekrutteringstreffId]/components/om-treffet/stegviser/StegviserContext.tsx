'use client';

import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import * as React from 'react';

interface StegviserState {
  activeStep: number;
  erPubliseringklar: boolean;
  setErPubliseringklar: (klar: boolean) => void;
  harInvitert: boolean;
  setHarInvitert: (invitert: boolean) => void;
}

const StegviserContext = React.createContext<StegviserState | undefined>(
  undefined,
);

export const StegviserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [erPubliseringklar, setErPubliseringklar] = React.useState(false);
  const [harInvitert, setHarInvitert] = React.useState(false);

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: rekrutteringstreffData } =
    useRekrutteringstreff(rekrutteringstreffId);

  const activeStep = React.useMemo(() => {
    const hendelser = rekrutteringstreffData?.hendelser;
    if (!hendelser) return 1;

    const harHendelse = (type: string) =>
      hendelser.some((h) => h.hendelsestype === type);

    if (harHendelse('AVSLUTT') || harHendelse('AVSLUTT_OPPFØLGING')) {
      return 4;
    }
    if (harHendelse('AVSLUTT_INVITASJON')) {
      return 3;
    }
    if (harHendelse('PUBLISER')) {
      return 2;
    }
    return 1;
  }, [rekrutteringstreffData]);

  const value = {
    activeStep,
    erPubliseringklar,
    setErPubliseringklar,
    harInvitert,
    setHarInvitert,
  };

  return (
    <StegviserContext.Provider value={value}>
      {children}
    </StegviserContext.Provider>
  );
};

export const useStegviser = () => {
  const context = React.useContext(StegviserContext);
  if (context === undefined) {
    throw new Error('useStegviser must be used within a StegviserProvider');
  }
  return context;
};
