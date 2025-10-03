import { useRekrutteringstreffData } from './useRekrutteringstreffData';
import {
  useJobbsøkere,
  JobbsøkerDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_domain/constants';
import { useMemo } from 'react';

// Helper functions for jobbsøker status
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

export interface InviteringsStatus {
  // Inviterings-statistikk
  harInvitert: boolean;
  antallInviterte: number;
  antallSvarJa: number;
  antallVenterSvar: number;

  // Progress for steg 2
  inviterePunkterFullfort: number;
  totaltAntallInviterePunkter: number;
}

/**
 * Hook for å beregne inviterings-status for rekrutteringstreff
 *
 * Denne hooken sentraliserer logikken for å:
 * - Telle antall inviterte jobbsøkere
 * - Telle antall som har svart ja/nei
 * - Beregne fremdrift for inviteringsfasen
 *
 * @returns InviteringsStatus med statistikk og fremdrift
 *
 * @example
 * ```tsx
 * const { harInvitert, antallInviterte, antallSvarJa } = useInviteringsStatus();
 * ```
 */
export const useInviteringsStatus = (): InviteringsStatus => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { tilTidspunktHarPassert } = useRekrutteringstreffData();
  const { data: jobbsøkere = [] } = useJobbsøkere(rekrutteringstreffId);

  // Beregn statistikk
  const antallInviterte = useMemo(
    () => jobbsøkere.filter(erInvitert).length,
    [jobbsøkere],
  );

  const harInvitert = antallInviterte > 0;

  const antallSvarJa = useMemo(
    () => jobbsøkere.filter(harSvarJa).length,
    [jobbsøkere],
  );

  const antallVenterSvar = useMemo(
    () =>
      jobbsøkere.filter((j) => erInvitert(j) && !harSvarJa(j) && !harSvarNei(j))
        .length,
    [jobbsøkere],
  );

  // Beregn fremdrift for steg 2: Invitere
  const inviterePunkterFullfort =
    (harInvitert ? 1 : 0) + (tilTidspunktHarPassert ? 1 : 0);
  const totaltAntallInviterePunkter = 2;

  return {
    harInvitert,
    antallInviterte,
    antallSvarJa,
    antallVenterSvar,
    inviterePunkterFullfort,
    totaltAntallInviterePunkter,
  };
};
