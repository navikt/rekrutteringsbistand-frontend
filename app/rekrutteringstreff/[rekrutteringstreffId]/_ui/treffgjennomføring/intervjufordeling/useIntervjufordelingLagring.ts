'use client';

import {
  fordelIntervjuer,
  oppdaterIntervjufordeling,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  fordelingerFraServer: ArbeidsgiverIntervjufordelingDTO[];
  onTreffgjennomføringOppdatert: TreffgjennomføringOppdatering;
}

export const useIntervjufordelingLagring = ({
  rekrutteringstreffId,
  fordelingerFraServer,
  onTreffgjennomføringOppdatert,
}: Props) => {
  const [optimistiskeFordelinger, setOptimistiskeFordelinger] = useState<
    ArbeidsgiverIntervjufordelingDTO[] | null
  >(null);
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [statusmelding, setStatusmelding] = useState('');
  const fordelinger = optimistiskeFordelinger ?? fordelingerFraServer;

  const lagreFordeling = async (
    nyFordeling: ArbeidsgiverIntervjufordelingDTO,
    lagretMelding: string,
  ) => {
    setFeil(null);
    setStatusmelding('');
    setLagrer(true);
    setOptimistiskeFordelinger(
      fordelinger.map((fordeling) =>
        fordeling.arbeidsgiverTreffId === nyFordeling.arbeidsgiverTreffId
          ? nyFordeling
          : fordeling,
      ),
    );
    try {
      const oppdatertTreffgjennomføring = await oppdaterIntervjufordeling(
        rekrutteringstreffId,
        nyFordeling,
      );
      await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
      setStatusmelding(lagretMelding);
      setOptimistiskeFordelinger(null);
    } catch {
      setOptimistiskeFordelinger(null);
      setFeil(
        'Kunne ikke lagre intervjufordelingen. Flyttingen ble tilbakestilt. Prøv igjen.',
      );
    } finally {
      setLagrer(false);
    }
  };

  const fordelPåNytt = async () => {
    setFeil(null);
    setLagrer(true);
    try {
      const oppdatertTreffgjennomføring =
        await fordelIntervjuer(rekrutteringstreffId);
      await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
      setStatusmelding('Intervjuene er fordelt på nytt.');
    } catch {
      setFeil('Kunne ikke fordele på nytt. Prøv igjen.');
    } finally {
      setLagrer(false);
    }
  };

  return {
    fordelinger,
    lagrer,
    feil,
    statusmelding,
    lagreFordeling,
    fordelPåNytt,
  };
};
