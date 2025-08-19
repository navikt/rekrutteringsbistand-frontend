'use client';

import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import {
  useJobbsøkere,
  JobbsøkerDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import * as React from 'react';

const DEFAULT_TITTEL = 'Nytt rekrutteringstreff';

const erMøttOpp = (j: JobbsøkerDTO) =>
  j.hendelser?.some((h) => h.hendelsestype === 'MØT_OPP') ?? false;

const erIkkeMøttOpp = (j: JobbsøkerDTO) =>
  j.hendelser?.some((h) => h.hendelsestype === 'IKKE_MØTT_OPP') ?? false;

const erUbestemt = (j: JobbsøkerDTO) =>
  !(
    j.hendelser?.some(
      (h) =>
        h.hendelsestype === 'MØT_OPP' || h.hendelsestype === 'IKKE_MØT_OPP',
    ) ?? false
  );

const erInvitert = (j: JobbsøkerDTO) =>
  j.hendelser?.some((h) => h.hendelsestype === 'INVITER') ?? false;

const parseDate = (value?: string | null): Date | undefined => {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
};

export interface StegviserState {
  activeStep: number;
  setActiveStep: (step: number) => void;

  // Steg 1: Publisere
  sjekklistePunkterFullfort: number;
  totaltAntallSjekklistePunkter: number;
  erPubliseringklar: boolean;

  // Steg 2: Invitere
  inviterePunkterFullfort: number;
  totaltAntallInviterePunkter: number;
  harInvitert: boolean;
  antallInviterte: number;

  // Steg 3: Følge opp
  antallMøttOpp: number;
  antallIkkeMøttOpp: number;
  antallUbestemt: number;
  totaltJobbsøkere: number;
  uregistrerte: JobbsøkerDTO[];

  // Tidsflagg
  arrangementtidspunktHarPassert: boolean;
  tiltidspunktHarPassert: boolean;
}

const StegviserContext = React.createContext<StegviserState | undefined>(
  undefined,
);

export const StegviserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeStep, setActiveStep] = React.useState<number>(1);
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const { data: rekrutteringstreff } =
    useRekrutteringstreff(rekrutteringstreffId);
  const { data: arbeidsgivereData } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const { data: innleggData } = useInnlegg(rekrutteringstreffId);
  const { data: jobbsøkere = [] } = useJobbsøkere(rekrutteringstreffId);

  // Steg 1: Publisere-logikk
  const sjekklisteItems = React.useMemo(() => {
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

  const fra = parseDate(rekrutteringstreff?.fraTid);
  const til = parseDate(rekrutteringstreff?.tilTid);
  const now = new Date();
  const arrangementtidspunktHarPassert = !!(fra && now >= fra);
  const tiltidspunktHarPassert = !!(til && now >= til);

  // Steg 2: Invitere-logikk
  const antallInviterte = jobbsøkere.filter(erInvitert).length;
  const harInvitert = antallInviterte > 0;
  const inviterePunkterFullfort =
    (harInvitert ? 1 : 0) + (arrangementtidspunktHarPassert ? 1 : 0);
  const totaltAntallInviterePunkter = 2;

  // Steg 3: Følge opp-logikk
  const antallMøttOpp = jobbsøkere.filter(erMøttOpp).length;
  const antallIkkeMøttOpp = jobbsøkere.filter(erIkkeMøttOpp).length;
  const antallUbestemt = jobbsøkere.filter(erUbestemt).length;
  const totaltJobbsøkere = jobbsøkere.length;
  const uregistrerte = jobbsøkere.filter(erUbestemt);

  React.useEffect(() => {
    const hendelser = rekrutteringstreff?.hendelser ?? [];
    const harHendelse = (type: string) =>
      hendelser.some((h) => h.hendelsestype === type);

    let step = 1;
    if (harHendelse('PUBLISER')) step = 2;
    if (harHendelse('AVSLUTT_INVITASJON')) step = 3;
    if (harHendelse('AVSLUTT_OPPFØLGING') || harHendelse('AVSLUTT')) step = 4;

    setActiveStep((prev) => (prev === step ? prev : step));
  }, [rekrutteringstreff?.hendelser]);

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
    arrangementtidspunktHarPassert,
    tiltidspunktHarPassert,
    antallMøttOpp,
    antallIkkeMøttOpp,
    antallUbestemt,
    totaltJobbsøkere,
    uregistrerte,
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
    throw new Error('useStegviser må brukes innenfor en StegviserProvider');
  }
  return context;
};
