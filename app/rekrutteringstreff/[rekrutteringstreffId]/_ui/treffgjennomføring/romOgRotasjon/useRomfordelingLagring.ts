'use client';

import {
  fordelRom,
  oppdaterRomplassering,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  navnPåJobbsøker: (personTreffId: string) => string;
  oppdatering: TreffgjennomføringOppdatering;
}

export const useRomfordelingLagring = ({
  rekrutteringstreffId,
  navnPåJobbsøker,
  oppdatering,
}: Props) => {
  const [lagrerRom, setLagrerRom] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [statusmelding, setStatusmelding] = useState<string | null>(null);

  const flyttOgLagre = async (personTreffId: string, målromnummer: number) => {
    const navn = navnPåJobbsøker(personTreffId);
    setFeil(null);
    setStatusmelding(null);
    setLagrerRom(true);
    try {
      const oppdatertTreffgjennomføring = await oppdaterRomplassering(
        rekrutteringstreffId,
        personTreffId,
        målromnummer,
      );
      await oppdatering.brukLagretSvar(oppdatertTreffgjennomføring);
      setStatusmelding(`${navn} er flyttet til rom ${målromnummer}.`);
    } catch {
      await oppdatering.hentBekreftetTilstand();
      setFeil(
        `Vi kunne ikke bekrefte flyttingen av ${navn}. Rommene er oppdatert fra serveren. Se over plasseringen før du gjør nye endringer.`,
      );
    } finally {
      setLagrerRom(false);
    }
  };

  const fordelPåNytt = async () => {
    setFeil(null);
    setStatusmelding(null);
    setLagrerRom(true);
    try {
      const oppdatertTreffgjennomføring = await fordelRom(rekrutteringstreffId);
      await oppdatering.brukLagretSvar(oppdatertTreffgjennomføring);
      setStatusmelding('Alle fremmøtte er fordelt på nytt.');
    } catch {
      await oppdatering.hentBekreftetTilstand();
      setFeil(
        'Vi kunne ikke bekrefte den nye fordelingen. Rommene er oppdatert fra serveren. Se over fordelingen før du gjør nye endringer.',
      );
    } finally {
      setLagrerRom(false);
    }
  };

  return {
    lagrerRom,
    feil,
    statusmelding,
    flyttOgLagre,
    fordelPåNytt,
    nullstillFeil: () => setFeil(null),
  };
};
