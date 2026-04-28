'use client';

import RedigerBehovDialog from './RedigerBehovDialog';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import {
  ArbeidsgiverBehovDTO,
  useArbeidsgivereMedBehov,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useMemo, useState } from 'react';

interface AktivRedigering {
  arbeidsgiverTreffId: string;
  navn: string;
}

export function useRedigerBehov() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const arbeidsgivereMedBehovHook =
    useArbeidsgivereMedBehov(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);

  const [aktivRedigering, setAktivRedigering] =
    useState<AktivRedigering | null>(null);

  const behovPerArbeidsgiver = useMemo(() => {
    const behovMap = new Map<string, ArbeidsgiverBehovDTO | null>();
    (arbeidsgivereMedBehovHook.data ?? []).forEach((arbeidsgiverMedBehov) =>
      behovMap.set(
        arbeidsgiverMedBehov.arbeidsgiverTreffId,
        arbeidsgiverMedBehov.behov ?? null,
      ),
    );
    return behovMap;
  }, [arbeidsgivereMedBehovHook.data]);

  const åpneRediger = (arbeidsgiver: ArbeidsgiverDTO) => {
    const arbeidsgiverTreffId = arbeidsgiver.arbeidsgiverTreffId as
      | string
      | undefined;
    if (!arbeidsgiverTreffId) return;
    setAktivRedigering({
      arbeidsgiverTreffId,
      navn: arbeidsgiver.navn,
    });
  };

  const harBehov = (arbeidsgiver: ArbeidsgiverDTO) => {
    const arbeidsgiverTreffId = arbeidsgiver.arbeidsgiverTreffId as
      | string
      | undefined;
    if (!arbeidsgiverTreffId) return false;
    return behovPerArbeidsgiver.get(arbeidsgiverTreffId) != null;
  };

  const dialog = aktivRedigering ? (
    <RedigerBehovDialog
      open
      rekrutteringstreffId={rekrutteringstreffId}
      arbeidsgiverTreffId={aktivRedigering.arbeidsgiverTreffId}
      arbeidsgiverNavn={aktivRedigering.navn}
      initielleVerdier={
        behovPerArbeidsgiver.get(aktivRedigering.arbeidsgiverTreffId) ?? null
      }
      onLukk={() => setAktivRedigering(null)}
      onLagret={() => {
        arbeidsgivereMedBehovHook.mutate();
        hendelseHook.mutate();
      }}
    />
  ) : null;

  return {
    åpneRediger,
    harBehov,
    behovPerArbeidsgiver,
    oppdaterArbeidsgivereMedBehov: arbeidsgivereMedBehovHook.mutate,
    dialog,
  };
}
