'use client';

import {
  fordelRom,
  oppdaterRomfordeling,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import type { RomDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { flyttJobbsøkerTilRom } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/romplassering';
import { useState } from 'react';

interface Romfordelingsfeil {
  type: 'flytting' | 'fordeling';
  melding: string;
}

interface Props {
  rekrutteringstreffId: string;
  romFraServer: RomDTO[];
  navnPåJobbsøker: (personTreffId: string) => string;
  onTreffgjennomføringOppdatert: TreffgjennomføringOppdatering;
  onFordeltPåNytt: () => void;
}

export const useRomfordelingLagring = ({
  rekrutteringstreffId,
  romFraServer,
  navnPåJobbsøker,
  onTreffgjennomføringOppdatert,
  onFordeltPåNytt,
}: Props) => {
  const [optimistiskeRom, setOptimistiskeRom] = useState<RomDTO[] | null>(null);
  const [lagrerRom, setLagrerRom] = useState(false);
  const [feil, setFeil] = useState<Romfordelingsfeil | null>(null);
  const [statusmelding, setStatusmelding] = useState<string | null>(null);
  const visteRom = optimistiskeRom ?? romFraServer;

  const flyttOgLagre = async (personTreffId: string, målromnummer: number) => {
    const nyeRom = flyttJobbsøkerTilRom(visteRom, personTreffId, målromnummer);
    if (nyeRom === visteRom) return;

    const navn = navnPåJobbsøker(personTreffId);
    setFeil(null);
    setStatusmelding(null);
    setOptimistiskeRom(nyeRom);
    setLagrerRom(true);
    try {
      const oppdatertTreffgjennomføring = await oppdaterRomfordeling(
        rekrutteringstreffId,
        nyeRom,
      );
      await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
      setStatusmelding(`${navn} er flyttet til rom ${målromnummer}.`);
    } catch {
      setFeil({
        type: 'flytting',
        melding: `Kunne ikke flytte ${navn}. Prøv igjen.`,
      });
    } finally {
      setOptimistiskeRom(null);
      setLagrerRom(false);
    }
  };

  const fordelPåNytt = async () => {
    setFeil(null);
    setStatusmelding(null);
    setLagrerRom(true);
    try {
      const oppdatertTreffgjennomføring = await fordelRom(rekrutteringstreffId);
      await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
      setStatusmelding('Alle fremmøtte er fordelt på nytt.');
      onFordeltPåNytt();
    } catch {
      setFeil({
        type: 'fordeling',
        melding: 'Kunne ikke fordele jobbsøkerne på nytt. Prøv igjen.',
      });
    } finally {
      setLagrerRom(false);
    }
  };

  return {
    visteRom,
    lagrerRom,
    feil,
    statusmelding,
    flyttOgLagre,
    fordelPåNytt,
    nullstillFeil: () => setFeil(null),
  };
};
