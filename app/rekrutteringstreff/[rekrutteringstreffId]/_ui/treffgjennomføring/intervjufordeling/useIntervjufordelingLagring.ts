'use client';

import {
  fordelIntervjuer,
  oppdaterIntervjufordeling,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useBekreftetLagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useBekreftetLagring';
import { useState } from 'react';

interface Props {
  rekrutteringstreffId: string;
  fordelingerFraServer: ArbeidsgiverIntervjufordelingDTO[];
  oppdatering: TreffgjennomføringOppdatering;
}

const FEIL_ETTER_LAGRING =
  'Vi kunne ikke bekrefte lagringen. Listen er oppdatert fra serveren. Se over fordelingen før du gjør nye endringer.';
const FEIL_ETTER_FORDELING =
  'Vi kunne ikke bekrefte den nye fordelingen. Listen er oppdatert fra serveren. Se over fordelingen før du gjør nye endringer.';

export const useIntervjufordelingLagring = ({
  rekrutteringstreffId,
  fordelingerFraServer,
  oppdatering,
}: Props) => {
  const [optimistiskeFordelinger, setOptimistiskeFordelinger] = useState<
    ArbeidsgiverIntervjufordelingDTO[] | null
  >(null);
  const { lagrer, feil, statusmelding, utfør } =
    useBekreftetLagring(oppdatering);
  const fordelinger = optimistiskeFordelinger ?? fordelingerFraServer;

  const lagreFordeling = (
    nyFordeling: ArbeidsgiverIntervjufordelingDTO,
    lagretMelding: string,
  ) => {
    setOptimistiskeFordelinger(
      fordelinger.map((fordeling) =>
        fordeling.arbeidsgiverTreffId === nyFordeling.arbeidsgiverTreffId
          ? nyFordeling
          : fordeling,
      ),
    );
    return utfør(
      () => oppdaterIntervjufordeling(rekrutteringstreffId, nyFordeling),
      { lagret: lagretMelding, feil: FEIL_ETTER_LAGRING },
      () => setOptimistiskeFordelinger(null),
    );
  };

  const fordelPåNytt = () =>
    utfør(() => fordelIntervjuer(rekrutteringstreffId), {
      lagret: 'Intervjuene er fordelt på nytt.',
      feil: FEIL_ETTER_FORDELING,
    });

  return {
    fordelinger,
    lagrer,
    feil,
    statusmelding,
    lagreFordeling,
    fordelPåNytt,
  };
};
