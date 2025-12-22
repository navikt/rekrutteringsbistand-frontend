// components/AutoLagre/AutoLagre.tsx
'use client';

import { useAutoLagre } from '@/components/autolagre/useAutoLagre';
import {
  ExclamationmarkTriangleIcon,
  FloppydiskIcon,
} from '@navikt/aksel-icons';
import { Button, Loader } from '@navikt/ds-react';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import React, { useMemo } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

export interface AutoLagreRenderState<TSkjemaVerdier extends FieldValues> {
  lagreNaa: () => Promise<void>;
  lagrer: boolean;
  venterPåLagring: boolean;
  feil?: string | null;
  sisteLagret: Date | null;
  harUlagredeEndringer: boolean;
  statusTekst: string;
  skjemaVerdier: () => TSkjemaVerdier;
  kiSjekket: boolean;
}

export type AutoLagreBarn<TSkjemaVerdier extends FieldValues> =
  | React.ReactNode
  | ((state: AutoLagreRenderState<TSkjemaVerdier>) => React.ReactNode);

export interface AutoLagreProps<TSkjemaVerdier extends FieldValues> {
  form: UseFormReturn<TSkjemaVerdier>;
  onLagre: (verdier: TSkjemaVerdier) => Promise<void>;
  autoLagringAktiv?: boolean;
  sisteLagretInitialt?: Date | string | null;
  harKiFeil?: boolean;
  kiSjekket?: boolean;
  children?: AutoLagreBarn<TSkjemaVerdier>;
}

export default function AutoLagre<TSkjemaVerdier extends FieldValues>({
  form,
  onLagre,
  autoLagringAktiv = true,
  sisteLagretInitialt,
  harKiFeil = false,
  kiSjekket = true,
  children,
}: AutoLagreProps<TSkjemaVerdier>) {
  const {
    lagreNaa,
    lagrer,
    venterPåLagring,
    feil,
    sisteLagret,
    harUlagredeEndringer,
    skjemaVerdier,
  } = useAutoLagre({
    form,
    onLagre,
    autoLagringAktiv,
    sisteLagretInitialt,
    harKiFeil,
    kiSjekket,
  });

  const statusTekst = useMemo(() => {
    if (harKiFeil && harUlagredeEndringer) {
      return 'Kan ikke lagre (KI-feil)';
    }
    if (!kiSjekket && harUlagredeEndringer) {
      return 'Venter på KI-sjekk';
    }
    if (lagrer || venterPåLagring) {
      return 'Lagrer...';
    }
    if ((!autoLagringAktiv || !harUlagredeEndringer) && sisteLagret) {
      const relativTekst = formatDistanceToNow(sisteLagret, {
        locale: nb,
        addSuffix: true,
      });
      return `Lagret for ${relativTekst}`;
    }
    return 'Ikke lagret';
  }, [
    autoLagringAktiv,
    harKiFeil,
    harUlagredeEndringer,
    kiSjekket,
    lagrer,
    sisteLagret,
    venterPåLagring,
  ]);

  const innhold = useMemo(() => {
    if (typeof children === 'function') {
      return children({
        lagreNaa,
        lagrer,
        venterPåLagring,
        feil,
        sisteLagret,
        harUlagredeEndringer,
        statusTekst,
        skjemaVerdier,
        kiSjekket,
      });
    }

    if (children) {
      return children;
    }

    if (!autoLagringAktiv) {
      return (
        <span
          className='inline-flex items-center text-xs text-[var(--ax-text-neutral-subtle)]'
          aria-live='polite'
        >
          {statusTekst}
        </span>
      );
    }

    const kanTrykkeLagre =
      !(lagrer || venterPåLagring) && !harKiFeil && kiSjekket;
    const ikon = harKiFeil ? (
      <ExclamationmarkTriangleIcon title='KI-feil' />
    ) : lagrer || venterPåLagring ? (
      <Loader size='xsmall' title='Lagrer' />
    ) : (
      <FloppydiskIcon />
    );

    return (
      <div className='flex items-center gap-2 text-xs' aria-live='polite'>
        <Button
          icon={ikon}
          size='xsmall'
          variant='tertiary'
          onClick={lagreNaa}
          disabled={!kanTrykkeLagre}
        >
          {statusTekst}
        </Button>
      </div>
    );
  }, [
    autoLagringAktiv,
    children,
    feil,
    harUlagredeEndringer,
    harKiFeil,
    lagreNaa,
    lagrer,
    sisteLagret,
    venterPåLagring,
    skjemaVerdier,
    statusTekst,
    kiSjekket,
  ]);

  return <>{innhold}</>;
}
