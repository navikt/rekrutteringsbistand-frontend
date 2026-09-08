'use client';
import { oppdaterInteresse } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import { TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import {
  medOptimistiskeInteresser,
  registreringsnøkkel,
  type Interesseendring,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/optimistiskeRegistreringer';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useSekvensiellAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useSekvensiellAutolagring';
import { useCallback, useMemo } from 'react';

type Props = {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  onTreffgjennomføringOppdatert: TreffgjennomføringOppdatering;
};

export const useInteresseAutolagring = ({
  rekrutteringstreffId,
  treffgjennomføring,
  onTreffgjennomføringOppdatert,
}: Props) => {
  const lagreTilServer = useCallback(
    (interesse: Interesseendring) =>
      oppdaterInteresse(
        rekrutteringstreffId,
        {
          personTreffId: interesse.personTreffId,
          arbeidsgiverTreffId: interesse.arbeidsgiverTreffId,
        },
        interesse.interessert,
      ),
    [rekrutteringstreffId],
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
    lagreTilServer,
    onTreffgjennomføringOppdatert,
    hentNøkkel: registreringsnøkkel,
  });

  const treffgjennomføringForVisning = useMemo(
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
      erVentende(registreringsnøkkel({ personTreffId, arbeidsgiverTreffId })),
    [erVentende],
  );

  return {
    treffgjennomføringForVisning,
    erInteresseVentende,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreInteresse,
    ventTilLagringerErFerdige,
  };
};
