import {
  useJobbsøkere,
  type JobbsøkerDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { useMemo } from 'react';

const erInvitert = (j: JobbsøkerDTO) =>
  j.status === JobbsøkerStatus.INVITERT ||
  j.status === JobbsøkerStatus.SVART_JA ||
  j.status === JobbsøkerStatus.SVART_NEI;

const harSvarJa = (j: JobbsøkerDTO) => j.status === JobbsøkerStatus.SVART_JA;

const harSvarNei = (j: JobbsøkerDTO) => j.status === JobbsøkerStatus.SVART_NEI;

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
  const jobbsøkere = useMemo(() => data?.jobbsøkere ?? [], [data?.jobbsøkere]);
  const tilTid = treff?.tilTid;

  // Sjekk om til-tidspunkt har passert
  const tilTidspunktHarPassert = useMemo(() => {
    if (!tilTid) return false;
    return new Date(tilTid) < new Date();
  }, [tilTid]);

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
