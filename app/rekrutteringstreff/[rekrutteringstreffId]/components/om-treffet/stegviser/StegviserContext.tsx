'use client';

import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import * as React from 'react';

const DEFAULT_TITTEL = 'Nytt rekrutteringstreff';
const sjekklisteData = [
  { id: 'arbeidsgiver', label: 'Minst 1 arbeidsgiver' },
  { id: 'navn', label: 'Navn' },
  { id: 'sted', label: 'Sted' },
  { id: 'tidspunkt', label: 'Tidspunkt' },
  { id: 'svarfrist', label: 'Svarfrist' },
  { id: 'omtreffet', label: 'Om treffet' },
];

interface StegviserState {
  activeStep: number;
  erPubliseringklar: boolean;
  setErPubliseringklar: (klar: boolean) => void;
  harInvitert: boolean;
  setHarInvitert: (invitert: boolean) => void;
  sjekklistePunkterFullfort: number;
  totaltAntallSjekklistePunkter: number;
  inviterePunkterFullfort: number;
  totaltAntallInviterePunkter: number;
  arrangementtidspunktHarPassert: boolean;
  antallInviterte: number;
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
  const { data: arbeidsgivereData } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const { data: innleggData } = useInnlegg(rekrutteringstreffId);
  const { data: jobbsøkere } = useJobbsøkere(rekrutteringstreffId);

  const checkedItems: Record<string, boolean> = React.useMemo(() => {
    const tittel = rekrutteringstreffData?.tittel?.trim() ?? '';
    return {
      arbeidsgiver: (arbeidsgivereData?.length ?? 0) > 0,
      navn: tittel.length > 0 && tittel !== DEFAULT_TITTEL,
      sted:
        !!rekrutteringstreffData?.gateadresse?.trim() &&
        !!rekrutteringstreffData?.poststed?.trim(),
      tidspunkt: !!rekrutteringstreffData?.fraTid,
      svarfrist: !!rekrutteringstreffData?.svarfrist,
      omtreffet: (innleggData?.length ?? 0) > 0,
    };
  }, [arbeidsgivereData, rekrutteringstreffData, innleggData]);

  React.useEffect(() => {
    const alleOk = sjekklisteData.every((item) => checkedItems[item.id]);
    setErPubliseringklar(alleOk);
  }, [checkedItems, setErPubliseringklar]);

  const sjekklistePunkterFullfort =
    Object.values(checkedItems).filter(Boolean).length;
  const totaltAntallSjekklistePunkter = sjekklisteData.length;

  const antallInviterte = React.useMemo(
    () =>
      jobbsøkere?.filter((j) =>
        j.hendelser?.some((h) => h.hendelsestype === 'INVITER'),
      ).length ?? 0,
    [jobbsøkere],
  );

  const arrangementtidspunktHarPassert = React.useMemo(() => {
    if (!rekrutteringstreffData?.fraTid) return false;
    return (
      toZonedTime(parseISO(rekrutteringstreffData.fraTid), 'Europe/Oslo') <
      new Date()
    );
  }, [rekrutteringstreffData?.fraTid]);

  const harInvitertMinstEn = antallInviterte > 0;
  React.useEffect(() => {
    setHarInvitert(harInvitertMinstEn);
  }, [harInvitertMinstEn, setHarInvitert]);

  const inviterePunkterFullfort =
    (harInvitertMinstEn ? 1 : 0) + (arrangementtidspunktHarPassert ? 1 : 0);
  const totaltAntallInviterePunkter = 2;

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
    sjekklistePunkterFullfort,
    totaltAntallSjekklistePunkter,
    inviterePunkterFullfort,
    totaltAntallInviterePunkter,
    arrangementtidspunktHarPassert,
    antallInviterte,
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
