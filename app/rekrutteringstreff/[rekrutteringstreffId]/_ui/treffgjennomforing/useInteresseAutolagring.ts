'use client';
import { oppdaterØnske } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/mutations';
import {
  TreffgjennomforingDTO,
  InteresseDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/useTreffgjennomforing';
import { useSekvensiellAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/useSekvensiellAutolagring';
import type { TreffgjennomforingOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/useTreffgjennomforingFane';
import { useCallback, useMemo } from 'react';

type Ønskeendring = InteresseDTO & { interessert: boolean };

type Props = {
  rekrutteringstreffId: string;
  treffgjennomforing: TreffgjennomforingDTO;
  onTreffgjennomforingOppdatert: TreffgjennomforingOppdatering;
};

const ønskeNøkkel = ({ personTreffId, arbeidsgiverTreffId }: InteresseDTO) =>
  `${personTreffId}:${arbeidsgiverTreffId}`;

const medOptimistiskeØnsker = (
  treffgjennomforing: TreffgjennomforingDTO,
  optimistiskeØnsker: Record<string, Ønskeendring>,
): TreffgjennomforingDTO => {
  let interesser = [...treffgjennomforing.interesser];

  for (const interesse of Object.values(optimistiskeØnsker)) {
    interesser = interesser.filter(
      (lagretØnske) => ønskeNøkkel(lagretØnske) !== ønskeNøkkel(interesse),
    );
    if (interesse.interessert) {
      interesser.push({
        personTreffId: interesse.personTreffId,
        arbeidsgiverTreffId: interesse.arbeidsgiverTreffId,
      });
    }
  }

  return { ...treffgjennomforing, interesser };
};

export const useInteresseAutolagring = ({
  rekrutteringstreffId,
  treffgjennomforing,
  onTreffgjennomforingOppdatert,
}: Props) => {
  const utførLagring = useCallback(
    async (interesse: Ønskeendring) => {
      const oppdatertTreffgjennomforing = await oppdaterØnske(
        rekrutteringstreffId,
        {
          personTreffId: interesse.personTreffId,
          arbeidsgiverTreffId: interesse.arbeidsgiverTreffId,
        },
        interesse.interessert,
      );
      await onTreffgjennomforingOppdatert(oppdatertTreffgjennomforing);
    },
    [onTreffgjennomforingOppdatert, rekrutteringstreffId],
  );
  const hentTreffgjennomforingPåNytt = useCallback(
    () => onTreffgjennomforingOppdatert(),
    [onTreffgjennomforingOppdatert],
  );

  const {
    erVentende,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagre,
    optimistiskeVerdier,
    ventTilLagringerErFerdige,
  } = useSekvensiellAutolagring({
    nøkkelFor: ønskeNøkkel,
    utførLagring,
    vedLagringsfeil: hentTreffgjennomforingPåNytt,
  });

  const effektivTreffgjennomforing = useMemo(
    () => medOptimistiskeØnsker(treffgjennomforing, optimistiskeVerdier),
    [treffgjennomforing, optimistiskeVerdier],
  );

  const lagreØnske = useCallback(
    (
      personTreffId: string,
      arbeidsgiverTreffId: string,
      interessert: boolean,
    ) => {
      lagre(
        { personTreffId, arbeidsgiverTreffId, interessert },
        {
          lagrer: 'Lagrer ønske.',
          lagret: 'Ønsket er lagret.',
          feilmelding: 'Kunne ikke lagre ønsket. Prøv igjen.',
        },
      );
    },
    [lagre],
  );

  const erØnskeVentende = useCallback(
    (personTreffId: string, arbeidsgiverTreffId: string) =>
      erVentende({ personTreffId, arbeidsgiverTreffId, interessert: false }),
    [erVentende],
  );

  return {
    effektivTreffgjennomforing,
    erØnskeVentende,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreØnske,
    ventTilLagringerErFerdige,
  };
};
