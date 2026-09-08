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
import { useMemo } from 'react';

type Props = {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  oppdatering: TreffgjennomføringOppdatering;
};

export const useInteresseAutolagring = ({
  rekrutteringstreffId,
  treffgjennomføring,
  oppdatering,
}: Props) => {
  const {
    erVentende,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagre,
    optimistiskeVerdier,
  } = useSekvensiellAutolagring<Interesseendring>({
    lagreTilServer: ({ personTreffId, arbeidsgiverTreffId, interessert }) =>
      oppdaterInteresse(
        rekrutteringstreffId,
        { personTreffId, arbeidsgiverTreffId },
        interessert,
      ),
    oppdatering,
    hentNøkkel: registreringsnøkkel,
  });

  const treffgjennomføringForVisning = useMemo(
    () => medOptimistiskeInteresser(treffgjennomføring, optimistiskeVerdier),
    [treffgjennomføring, optimistiskeVerdier],
  );

  const lagreInteresse = (
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
  };

  const erInteresseVentende = (
    personTreffId: string,
    arbeidsgiverTreffId: string,
  ) => erVentende(registreringsnøkkel({ personTreffId, arbeidsgiverTreffId }));

  return {
    treffgjennomføringForVisning,
    erInteresseVentende,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreInteresse,
  };
};
