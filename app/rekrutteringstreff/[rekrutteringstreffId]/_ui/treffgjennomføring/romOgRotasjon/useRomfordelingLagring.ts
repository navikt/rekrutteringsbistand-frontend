'use client';

import {
  fordelRom,
  oppdaterRomplassering,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useBekreftetLagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useBekreftetLagring';

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
  const { lagrer, feil, statusmelding, utfør, nullstillFeil } =
    useBekreftetLagring(oppdatering);

  const flyttOgLagre = (personTreffId: string, målromnummer: number) => {
    const navn = navnPåJobbsøker(personTreffId);
    return utfør(
      () =>
        oppdaterRomplassering(
          rekrutteringstreffId,
          personTreffId,
          målromnummer,
        ),
      {
        lagret: `${navn} er flyttet til rom ${målromnummer}.`,
        feil: `Vi kunne ikke bekrefte flyttingen av ${navn}. Rommene er oppdatert fra serveren. Se over plasseringen før du gjør nye endringer.`,
      },
    );
  };

  const fordelPåNytt = () =>
    utfør(() => fordelRom(rekrutteringstreffId), {
      lagret: 'Alle fremmøtte er fordelt på nytt.',
      feil: 'Vi kunne ikke bekrefte den nye fordelingen. Rommene er oppdatert fra serveren. Se over fordelingen før du gjør nye endringer.',
    });

  return {
    lagrerRom: lagrer,
    feil,
    statusmelding,
    flyttOgLagre,
    fordelPåNytt,
    nullstillFeil,
  };
};
