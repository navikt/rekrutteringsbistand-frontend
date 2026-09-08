'use client';

import {
  fordelRom,
  oppdaterRomplassering,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import type { RomDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { flyttJobbsøkerTilRom } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/romplassering';
import { useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  romFraServer: RomDTO[];
  navnPåJobbsøker: (personTreffId: string) => string;
  hentDeltakernummer?: (personTreffId: string) => number | undefined;
  onTreffgjennomføringOppdatert: TreffgjennomføringOppdatering;
}

export const useRomfordelingLagring = ({
  rekrutteringstreffId,
  romFraServer,
  navnPåJobbsøker,
  hentDeltakernummer,
  onTreffgjennomføringOppdatert,
}: Props) => {
  const [optimistiskeRom, setOptimistiskeRom] = useState<RomDTO[] | null>(null);
  const [lagrerRom, setLagrerRom] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [statusmelding, setStatusmelding] = useState<string | null>(null);
  const visteRom = optimistiskeRom ?? romFraServer;

  const flyttOgLagre = async (personTreffId: string, målromnummer: number) => {
    const nyeRom = flyttJobbsøkerTilRom(
      visteRom,
      personTreffId,
      målromnummer,
      hentDeltakernummer,
    );
    if (nyeRom === visteRom) return;

    const navn = navnPåJobbsøker(personTreffId);
    setFeil(null);
    setStatusmelding(null);
    setOptimistiskeRom(nyeRom);
    setLagrerRom(true);
    try {
      const oppdatertTreffgjennomføring = await oppdaterRomplassering(
        rekrutteringstreffId,
        personTreffId,
        målromnummer,
      );
      await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
      setStatusmelding(`${navn} er flyttet til rom ${målromnummer}.`);
    } catch {
      await onTreffgjennomføringOppdatert();
      setFeil(
        `Vi kunne ikke bekrefte flyttingen av ${navn}. Rommene er oppdatert fra serveren. Se over plasseringen før du gjør nye endringer.`,
      );
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
    } catch {
      await onTreffgjennomføringOppdatert();
      setFeil(
        'Vi kunne ikke bekrefte den nye fordelingen. Rommene er oppdatert fra serveren. Se over fordelingen før du gjør nye endringer.',
      );
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
