'use client';

import RedigerBehovModal from './RedigerBehovModal';
import {
  ArbeidsgiverBehovDTO,
  useArbeidsgivereMedBehov,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  const modalRef = useRef<HTMLDialogElement>(null);

  const behovPerArbeidsgiver = useMemo(() => {
    const m = new Map<string, ArbeidsgiverBehovDTO | null>();
    (arbeidsgivereMedBehovHook.data ?? []).forEach((a) =>
      m.set(a.arbeidsgiverTreffId, a.behov ?? null),
    );
    return m;
  }, [arbeidsgivereMedBehovHook.data]);

  useEffect(() => {
    if (aktivRedigering) {
      modalRef.current?.showModal();
    }
  }, [aktivRedigering]);

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

  const modal = aktivRedigering ? (
    <RedigerBehovModal
      modalRef={modalRef}
      rekrutteringstreffId={rekrutteringstreffId}
      arbeidsgiverTreffId={aktivRedigering.arbeidsgiverTreffId}
      arbeidsgiverNavn={aktivRedigering.navn}
      initielleVerdier={
        behovPerArbeidsgiver.get(aktivRedigering.arbeidsgiverTreffId) ?? null
      }
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
    modal,
  };
}
