import {
  JobbsøkerSøkTreffDTO,
  useJobbsøkerSøk,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { useMemo } from 'react';

export interface InviteringsStatus {
  harInvitert: boolean;
  antallInviterte: number;
  antallSvarJa: number;
  antallVenterSvar: number;

  antallInviterePunkterFullfort: number;
  totaltAntallInviterePunkter: number;
}

export const useInviteringsStatus = (): InviteringsStatus => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const { data } = useJobbsøkerSøk(rekrutteringstreffId, 1, 100);
  const jobbsøkere = useMemo(() => data?.jobbsøkere ?? [], [data?.jobbsøkere]);
  const tilTid = treff?.tilTid;

  const tilTidspunktHarPassert = useMemo(() => {
    if (!tilTid) return false;
    return new Date(tilTid) < new Date();
  }, [tilTid]);

  const antallInviterte = useMemo(
    () =>
      jobbsøkere.filter((j) => j.status !== JobbsøkerStatus.LAGT_TIL).length,
    [jobbsøkere],
  );

  const harInvitert = antallInviterte > 0;

  const antallSvarJa = useMemo(
    () =>
      jobbsøkere.filter((j) => j.status === JobbsøkerStatus.SVART_JA).length,
    [jobbsøkere],
  );

  const antallVenterSvar = useMemo(
    () =>
      jobbsøkere.filter((j) => j.status === JobbsøkerStatus.INVITERT).length,
    [jobbsøkere],
  );

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
