'use client';
import { oppdaterVurdering } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  TreffgjennomføringDTO,
  VurderingDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import {
  medOptimistiskeVurderinger,
  registreringsnøkkel,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/optimistiskeRegistreringer';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useSekvensiellAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useSekvensiellAutolagring';
import { useCallback, useMemo } from 'react';

type Props = {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  onTreffgjennomføringOppdatert: TreffgjennomføringOppdatering;
};

export const useVurderingAutolagring = ({
  rekrutteringstreffId,
  treffgjennomføring,
  onTreffgjennomføringOppdatert,
}: Props) => {
  const lagreTilServer = useCallback(
    (vurdering: VurderingDTO) =>
      oppdaterVurdering(rekrutteringstreffId, vurdering),
    [rekrutteringstreffId],
  );

  const {
    feilFor,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagre,
    optimistiskeVerdier,
  } = useSekvensiellAutolagring({
    lagreTilServer,
    onTreffgjennomføringOppdatert,
    hentNøkkel: registreringsnøkkel,
  });

  const treffgjennomføringForVisning = useMemo(
    () => medOptimistiskeVurderinger(treffgjennomføring, optimistiskeVerdier),
    [treffgjennomføring, optimistiskeVerdier],
  );

  const lagreVurdering = useCallback(
    (vurdering: VurderingDTO, jobbsøkernavn: string) => {
      lagre(vurdering, {
        lagrer: `Lagrer vurdering for ${jobbsøkernavn}.`,
        lagret: `Vurderingen for ${jobbsøkernavn} er lagret.`,
        feilmelding: `Kunne ikke lagre vurderingen for ${jobbsøkernavn}. Prøv igjen.`,
      });
    },
    [lagre],
  );

  return {
    treffgjennomføringForVisning,
    feilForVurdering: (vurdering: VurderingDTO) =>
      feilFor(registreringsnøkkel(vurdering)),
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreVurdering,
  };
};
