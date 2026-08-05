'use client';
import { oppdaterVurdering } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import {
  MøtedagDTO,
  VurderingDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import { useSekvensiellAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/useSekvensiellAutolagring';
import type { MøtedagOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/useWorkOpMøtedag';
import { useCallback, useMemo } from 'react';

type Props = {
  rekrutteringstreffId: string;
  møtedag: MøtedagDTO;
  onMøtedagOppdatert: MøtedagOppdatering;
};

const vurderingNøkkel = ({
  personTreffId,
  arbeidsgiverTreffId,
}: Pick<VurderingDTO, 'personTreffId' | 'arbeidsgiverTreffId'>) =>
  `${personTreffId}:${arbeidsgiverTreffId}`;

const erTomVurdering = (vurdering: VurderingDTO) =>
  vurdering.vurdering === null &&
  !vurdering.andreIntervju &&
  !vurdering.jobbtilbud;

const medOptimistiskeVurderinger = (
  møtedag: MøtedagDTO,
  optimistiskeVurderinger: Record<string, VurderingDTO>,
): MøtedagDTO => {
  const vurderinger = [...møtedag.vurderinger];

  for (const vurdering of Object.values(optimistiskeVurderinger)) {
    const indeks = vurderinger.findIndex(
      (lagretVurdering) =>
        vurderingNøkkel(lagretVurdering) === vurderingNøkkel(vurdering),
    );

    if (erTomVurdering(vurdering)) {
      if (indeks >= 0) vurderinger.splice(indeks, 1);
    } else if (indeks >= 0) {
      vurderinger[indeks] = vurdering;
    } else {
      vurderinger.push(vurdering);
    }
  }

  return { ...møtedag, vurderinger };
};

export const useVurderingAutolagring = ({
  rekrutteringstreffId,
  møtedag,
  onMøtedagOppdatert,
}: Props) => {
  const utførLagring = useCallback(
    async (vurdering: VurderingDTO) => {
      const oppdatertMøtedag = await oppdaterVurdering(
        rekrutteringstreffId,
        vurdering,
      );
      await onMøtedagOppdatert(oppdatertMøtedag);
    },
    [onMøtedagOppdatert, rekrutteringstreffId],
  );
  const hentMøtedagPåNytt = useCallback(
    () => onMøtedagOppdatert(),
    [onMøtedagOppdatert],
  );

  const {
    feilFor,
    harLagringsfeil,
    harVentendeLagring,
    kunngjøring,
    lagre,
    optimistiskeVerdier,
  } = useSekvensiellAutolagring({
    nøkkelFor: vurderingNøkkel,
    utførLagring,
    vedLagringsfeil: hentMøtedagPåNytt,
  });

  const effektivMøtedag = useMemo(
    () => medOptimistiskeVurderinger(møtedag, optimistiskeVerdier),
    [møtedag, optimistiskeVerdier],
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
    effektivMøtedag,
    feilForVurdering: feilFor,
    harLagringsfeil,
    harVentendeLagring,
    kunngjøring,
    lagreVurdering,
  };
};
