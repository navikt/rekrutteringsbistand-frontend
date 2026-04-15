import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { useMemo } from 'react';

export interface InviteringsStatus {
  // Inviterings-statistikk
  harInvitert: boolean;
  antallInviterte: number;
  antallSvarJa: number;
  antallVenterSvar: number;

  // Progress for steg 2
  antallInviterePunkterFullfort: number;
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
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const { data } = useJobbsøkere(rekrutteringstreffId);
  const antallPerStatus = data?.antallPerStatus ?? {};
  const tilTid = treff?.tilTid;

  const tilTidspunktHarPassert = useMemo(() => {
    if (!tilTid) return false;
    return new Date(tilTid) < new Date();
  }, [tilTid]);

  const antallSvarJa = antallPerStatus[JobbsøkerStatus.SVART_JA] ?? 0;
  const antallSvarNei = antallPerStatus[JobbsøkerStatus.SVART_NEI] ?? 0;
  const antallInvitert = antallPerStatus[JobbsøkerStatus.INVITERT] ?? 0;
  const antallInviterte = antallInvitert + antallSvarJa + antallSvarNei;
  const harInvitert = antallInviterte > 0;
  const antallVenterSvar = antallInvitert;

  const antallInviterePunkterFullfort = [
    harInvitert,
    tilTidspunktHarPassert,
  ].filter(Boolean).length;
  const totaltAntallInviterePunkter = 2;

  return {
    harInvitert,
    antallInviterte,
    antallSvarJa,
    antallVenterSvar,
    antallInviterePunkterFullfort,
    totaltAntallInviterePunkter,
  };
};
