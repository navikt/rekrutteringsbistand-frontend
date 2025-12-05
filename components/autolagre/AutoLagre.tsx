// components/AutoLagre/AutoLagre.tsx
'use client';

import { useAutoLagre } from './useAutoLagre';
import { FloppydiskIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
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
}

export type AutoLagreBarn<TSkjemaVerdier extends FieldValues> =
  | React.ReactNode
  | ((state: AutoLagreRenderState<TSkjemaVerdier>) => React.ReactNode);

export interface AutoLagreProps<TSkjemaVerdier extends FieldValues> {
  form: UseFormReturn<TSkjemaVerdier>;
  onLagre: (verdier: TSkjemaVerdier) => Promise<void>;
  kanLagre?: boolean;
  children?: AutoLagreBarn<TSkjemaVerdier>;
}

const formaterDel = (verdi: number, entall: string, flertall: string) =>
  `${verdi} ${verdi === 1 ? entall : flertall}`;

const formatTidSiden = (sekunder: number) => {
  if (sekunder < 60) {
    return formaterDel(sekunder, 'sekund', 'sekunder');
  }

  const minutter = Math.floor(sekunder / 60);
  const restSek = sekunder % 60;

  if (minutter < 60) {
    const minTekst = formaterDel(minutter, 'minutt', 'minutter');
    return restSek
      ? `${minTekst} ${formaterDel(restSek, 'sekund', 'sekunder')}`
      : minTekst;
  }

  const timer = Math.floor(minutter / 60);
  const restMin = minutter % 60;
  const timerTekst = formaterDel(timer, 'time', 'timer');

  return restMin
    ? `${timerTekst} ${formaterDel(restMin, 'minutt', 'minutter')}`
    : timerTekst;
};

export default function AutoLagre<TSkjemaVerdier extends FieldValues>({
  form,
  onLagre,
  kanLagre = true,
  children,
}: AutoLagreProps<TSkjemaVerdier>) {
  const {
    lagreNaa,
    lagrer,
    venterPåLagring,
    feil,
    sisteLagret,
    sekunderSidenLagret,
    harUlagredeEndringer,
    skjemaVerdier,
  } = useAutoLagre({ form, onLagre, kanLagre });

  const statusTekst = useMemo(() => {
    if (lagrer || venterPåLagring) {
      return 'Lagrer...';
    }
    if (sisteLagret && !harUlagredeEndringer) {
      return `Lagret for ${formatTidSiden(Math.max(sekunderSidenLagret, 0))} siden.`;
    }
    return 'Ikke lagret';
  }, [
    harUlagredeEndringer,
    lagrer,
    sekunderSidenLagret,
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
      });
    }

    if (children) {
      return children;
    }

    return (
      <div className='flex items-center gap-2 text-xs' aria-live='polite'>
        <Button
          icon={<FloppydiskIcon />}
          size='xsmall'
          variant='tertiary'
          onClick={lagreNaa}
          loading={lagrer}
          disabled={lagrer || !kanLagre}
        >
          {statusTekst}
        </Button>
      </div>
    );
  }, [
    children,
    feil,
    harUlagredeEndringer,
    kanLagre,
    lagreNaa,
    lagrer,
    sisteLagret,
    venterPåLagring,
    skjemaVerdier,
    statusTekst,
  ]);

  return <>{innhold}</>;
}
