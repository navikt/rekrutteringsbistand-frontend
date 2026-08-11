'use client';
import { oppdaterVurdering } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/mutations';
import {
  harRegistrertNoe,
  TreffgjennomforingDTO,
  VurderingDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/useTreffgjennomforing';
import { useSekvensiellAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/useSekvensiellAutolagring';
import type { TreffgjennomforingOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/useTreffgjennomforingFane';
import { useCallback, useMemo } from 'react';

type Props = {
  rekrutteringstreffId: string;
  treffgjennomforing: TreffgjennomforingDTO;
  onTreffgjennomforingOppdatert: TreffgjennomforingOppdatering;
};

const vurderingNøkkel = ({
  personTreffId,
  arbeidsgiverTreffId,
}: Pick<VurderingDTO, 'personTreffId' | 'arbeidsgiverTreffId'>) =>
  `${personTreffId}:${arbeidsgiverTreffId}`;

const medOptimistiskeVurderinger = (
  treffgjennomforing: TreffgjennomforingDTO,
  optimistiskeVurderinger: Record<string, VurderingDTO>,
): TreffgjennomforingDTO => {
  const vurderinger = [...treffgjennomforing.vurderinger];

  for (const vurdering of Object.values(optimistiskeVurderinger)) {
    const indeks = vurderinger.findIndex(
      (lagretVurdering) =>
        vurderingNøkkel(lagretVurdering) === vurderingNøkkel(vurdering),
    );

    if (!harRegistrertNoe(vurdering)) {
      if (indeks >= 0) vurderinger.splice(indeks, 1);
    } else if (indeks >= 0) {
      vurderinger[indeks] = vurdering;
    } else {
      vurderinger.push(vurdering);
    }
  }

  return { ...treffgjennomforing, vurderinger };
};

export const useVurderingAutolagring = ({
  rekrutteringstreffId,
  treffgjennomforing,
  onTreffgjennomforingOppdatert,
}: Props) => {
  const utførLagring = useCallback(
    async (vurdering: VurderingDTO) => {
      const oppdatertTreffgjennomforing = await oppdaterVurdering(
        rekrutteringstreffId,
        vurdering,
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
    feilFor,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagre,
    optimistiskeVerdier,
  } = useSekvensiellAutolagring({
    nøkkelFor: vurderingNøkkel,
    utførLagring,
    vedLagringsfeil: hentTreffgjennomforingPåNytt,
  });

  const effektivTreffgjennomforing = useMemo(
    () => medOptimistiskeVurderinger(treffgjennomforing, optimistiskeVerdier),
    [treffgjennomforing, optimistiskeVerdier],
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
    effektivTreffgjennomforing,
    feilForVurdering: feilFor,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreVurdering,
  };
};
