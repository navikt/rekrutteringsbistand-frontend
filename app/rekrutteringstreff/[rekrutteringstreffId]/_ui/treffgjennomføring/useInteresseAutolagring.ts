'use client';
import { oppdaterInteresse } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  TreffgjennomføringDTO,
  InteresseDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { useSekvensiellAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useSekvensiellAutolagring';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useTreffgjennomføringFane';
import { useCallback, useMemo } from 'react';

type Interesseendring = InteresseDTO & { interessert: boolean };

type Props = {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  onTreffgjennomføringOppdatert: TreffgjennomføringOppdatering;
};

const interesseNøkkel = ({
  personTreffId,
  arbeidsgiverTreffId,
}: InteresseDTO) => `${personTreffId}:${arbeidsgiverTreffId}`;

const medOptimistiskeInteresser = (
  treffgjennomføring: TreffgjennomføringDTO,
  optimistiskeInteresser: Record<string, Interesseendring>,
): TreffgjennomføringDTO => {
  let interesser = [...treffgjennomføring.interesser];

  for (const interesse of Object.values(optimistiskeInteresser)) {
    interesser = interesser.filter(
      (lagretInteresse) =>
        interesseNøkkel(lagretInteresse) !== interesseNøkkel(interesse),
    );
    if (interesse.interessert) {
      interesser.push({
        personTreffId: interesse.personTreffId,
        arbeidsgiverTreffId: interesse.arbeidsgiverTreffId,
      });
    }
  }

  return { ...treffgjennomføring, interesser };
};

export const useInteresseAutolagring = ({
  rekrutteringstreffId,
  treffgjennomføring,
  onTreffgjennomføringOppdatert,
}: Props) => {
  const utførLagring = useCallback(
    async (interesse: Interesseendring) => {
      const oppdatertTreffgjennomføring = await oppdaterInteresse(
        rekrutteringstreffId,
        {
          personTreffId: interesse.personTreffId,
          arbeidsgiverTreffId: interesse.arbeidsgiverTreffId,
        },
        interesse.interessert,
      );
      await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
    },
    [onTreffgjennomføringOppdatert, rekrutteringstreffId],
  );
  const hentTreffgjennomføringPåNytt = useCallback(
    () => onTreffgjennomføringOppdatert(),
    [onTreffgjennomføringOppdatert],
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
    nøkkelFor: interesseNøkkel,
    utførLagring,
    vedLagringsfeil: hentTreffgjennomføringPåNytt,
  });

  const effektivTreffgjennomføring = useMemo(
    () => medOptimistiskeInteresser(treffgjennomføring, optimistiskeVerdier),
    [treffgjennomføring, optimistiskeVerdier],
  );

  const lagreInteresse = useCallback(
    (
      personTreffId: string,
      arbeidsgiverTreffId: string,
      interessert: boolean,
    ) => {
      lagre(
        { personTreffId, arbeidsgiverTreffId, interessert },
        {
          lagrer: 'Lagrer interesse.',
          lagret: 'Interessen er lagret.',
          feilmelding: 'Kunne ikke lagre interessen. Prøv igjen.',
        },
      );
    },
    [lagre],
  );

  const erInteresseVentende = useCallback(
    (personTreffId: string, arbeidsgiverTreffId: string) =>
      erVentende({ personTreffId, arbeidsgiverTreffId, interessert: false }),
    [erVentende],
  );

  return {
    effektivTreffgjennomføring,
    erInteresseVentende,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreInteresse,
    ventTilLagringerErFerdige,
  };
};
