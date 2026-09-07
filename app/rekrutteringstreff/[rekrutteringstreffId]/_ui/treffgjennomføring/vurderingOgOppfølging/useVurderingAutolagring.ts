'use client';
import { oppdaterVurdering } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  TreffgjennomføringDTO,
  VurderingDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { harVurderingsinnhold } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/vurdering';
import type { TreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useSekvensiellAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useSekvensiellAutolagring';
import { useCallback, useMemo } from 'react';

type Props = {
  rekrutteringstreffId: string;
  treffgjennomføring: TreffgjennomføringDTO;
  onTreffgjennomføringOppdatert: TreffgjennomføringOppdatering;
};

const vurderingNøkkel = ({
  personTreffId,
  arbeidsgiverTreffId,
}: Pick<VurderingDTO, 'personTreffId' | 'arbeidsgiverTreffId'>) =>
  `${personTreffId}:${arbeidsgiverTreffId}`;

const medOptimistiskeVurderinger = (
  treffgjennomføring: TreffgjennomføringDTO,
  optimistiskeVurderinger: Record<string, VurderingDTO>,
): TreffgjennomføringDTO => {
  const vurderinger = [...treffgjennomføring.vurderinger];

  for (const vurdering of Object.values(optimistiskeVurderinger)) {
    const indeks = vurderinger.findIndex(
      (lagretVurdering) =>
        vurderingNøkkel(lagretVurdering) === vurderingNøkkel(vurdering),
    );

    if (!harVurderingsinnhold(vurdering)) {
      if (indeks >= 0) vurderinger.splice(indeks, 1);
    } else if (indeks >= 0) {
      vurderinger[indeks] = vurdering;
    } else {
      vurderinger.push(vurdering);
    }
  }

  return { ...treffgjennomføring, vurderinger };
};

export const useVurderingAutolagring = ({
  rekrutteringstreffId,
  treffgjennomføring,
  onTreffgjennomføringOppdatert,
}: Props) => {
  const utførLagring = useCallback(
    async (vurdering: VurderingDTO) => {
      const oppdatertTreffgjennomføring = await oppdaterVurdering(
        rekrutteringstreffId,
        vurdering,
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
    feilFor,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagre,
    optimistiskeVerdier,
  } = useSekvensiellAutolagring({
    nøkkelFor: vurderingNøkkel,
    utførLagring,
    vedLagringsfeil: hentTreffgjennomføringPåNytt,
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
    feilForVurdering: feilFor,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreVurdering,
  };
};
