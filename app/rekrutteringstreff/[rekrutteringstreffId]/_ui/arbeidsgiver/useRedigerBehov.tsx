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
    const m = new Map<string, ArbeidsgiverBehovDTO | null>();
    (arbeidsgivereMedBehovHook.data ?? []).forEach((a) =>
      m.set(a.arbeidsgiverTreffId, a.behov ?? null),
    );
    return m;
  }, [arbeidsgivereMedBehovHook.data]);

  const åpneRediger = (arbeidsgiver: ArbeidsgiverDTO) => {
    const id = arbeidsgiver.arbeidsgiverTreffId as string | undefined;
    if (!id) return;
    setAktivRedigering({
      arbeidsgiverTreffId: id,
      navn: arbeidsgiver.navn,
    });
  };

  const harBehov = (arbeidsgiver: ArbeidsgiverDTO) => {
    const id = arbeidsgiver.arbeidsgiverTreffId as string | undefined;
    if (!id) return false;
    return behovPerArbeidsgiver.get(id) != null;
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
