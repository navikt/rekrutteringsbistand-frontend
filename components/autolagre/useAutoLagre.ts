'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

const BLUR_SAVE_DELAY_MS = 3000;

const tilDato = (verdi?: Date | string | null): Date | null => {
  if (!verdi) return null;
  if (verdi instanceof Date) return verdi;
  const parsed = new Date(verdi);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

interface UseAutoLagreOptions<TSkjemaVerdier extends FieldValues> {
  form: UseFormReturn<TSkjemaVerdier>;
  onLagre: (verdier: TSkjemaVerdier) => Promise<void>;
  autoLagringAktiv?: boolean;
  sisteLagretInitialt?: Date | string | null;
  harKiFeil?: boolean;
  kiSjekket?: boolean;
}

interface UseAutoLagreResult<TSkjemaVerdier extends FieldValues> {
  lagreNaa: () => Promise<void>;
  lagrer: boolean;
  venterPåLagring: boolean;
  feil: string | null;
  sisteLagret: Date | null;
  harUlagredeEndringer: boolean;
  skjemaVerdier: () => TSkjemaVerdier;
}

export function useAutoLagre<TSkjemaVerdier extends FieldValues>({
  form,
  onLagre,
  autoLagringAktiv = true,
  sisteLagretInitialt,
  harKiFeil = false,
  kiSjekket = true,
}: UseAutoLagreOptions<TSkjemaVerdier>): UseAutoLagreResult<TSkjemaVerdier> {
  const [lagrer, setLagrer] = useState(false);
  const [venterPåLagring, setVenterPåLagring] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [sisteLagret, setSisteLagret] = useState<Date | null>(() =>
    tilDato(sisteLagretInitialt),
  );
  const [harUlagredeEndringer, setHarUlagredeEndringer] = useState(false);

  const watchSubscriptionRef = useRef<{ unsubscribe?: () => void } | null>(
    null,
  );
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const erMontertRef = useRef(true);
  const harVentendeLagringRef = useRef(false);
  const lagringKjørerRef = useRef(false);
  const køetEtterLagringRef = useRef(false);
  const hoppOverFørsteEndringRef = useRef(true);
  const sistFeiletRef = useRef(false);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPlanlagtLagring = useCallback(() => {
    if (blurTimeoutRef.current !== null) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
      if (erMontertRef.current) {
        setVenterPåLagring(false);
      }
    }
  }, []);

  const kiBlokkererLagring = harKiFeil || kiSjekket === false;

  const lagre = useCallback(
    async (tvang: boolean = false) => {
      clearPlanlagtLagring();

      if (!autoLagringAktiv && !tvang) {
        harVentendeLagringRef.current = false;
        return;
      }

      if (!harVentendeLagringRef.current && !tvang) {
        return;
      }

      if (!tvang && kiBlokkererLagring) {
        return;
      }

      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }

      if (lagringKjørerRef.current) {
        køetEtterLagringRef.current = true;
        return;
      }

      lagringKjørerRef.current = true;
      if (erMontertRef.current) {
        setLagrer(true);
        setFeil(null);
      }
      sistFeiletRef.current = false;

      const verdier = form.getValues();
      harVentendeLagringRef.current = false;

      try {
        await onLagre(verdier);
        if (erMontertRef.current) {
          setSisteLagret(new Date());
          if (!harVentendeLagringRef.current) {
            setHarUlagredeEndringer(false);
          }
        }
      } catch (error: unknown) {
        const melding =
          error instanceof Error ? error.message : 'Kunne ikke lagre endringer';
        if (erMontertRef.current) {
          setFeil(melding);
          setHarUlagredeEndringer(true);
        }
        harVentendeLagringRef.current = true;
        sistFeiletRef.current = true;
      } finally {
        lagringKjørerRef.current = false;
        if (erMontertRef.current) {
          setLagrer(false);
        }

        if (
          !sistFeiletRef.current &&
          (køetEtterLagringRef.current || harVentendeLagringRef.current)
        ) {
          køetEtterLagringRef.current = false;
          retryTimeoutRef.current = setTimeout(() => {
            retryTimeoutRef.current = null;
            lagre(true);
          }, 0);
        } else {
          køetEtterLagringRef.current = false;
        }
      }
    },
    [autoLagringAktiv, clearPlanlagtLagring, form, kiBlokkererLagring, onLagre],
  );

  useEffect(() => {
    const initialDato = tilDato(sisteLagretInitialt);
    if (!initialDato) return;

    setSisteLagret((gjeldende) => {
      if (!gjeldende) {
        return initialDato;
      }
      return gjeldende.getTime() >= initialDato.getTime()
        ? gjeldende
        : initialDato;
    });
  }, [sisteLagretInitialt]);

  const planleggLagring = useCallback(
    (forsinkelseMs: number = BLUR_SAVE_DELAY_MS) => {
      if (!autoLagringAktiv) return;
      if (!harVentendeLagringRef.current) return;
      if (lagringKjørerRef.current) return;
      if (kiBlokkererLagring) return;

      if (blurTimeoutRef.current !== null) {
        clearTimeout(blurTimeoutRef.current);
      }

      blurTimeoutRef.current = setTimeout(() => {
        blurTimeoutRef.current = null;
        if (erMontertRef.current) {
          setVenterPåLagring(false);
        }
        lagre();
      }, forsinkelseMs);

      if (erMontertRef.current) {
        setVenterPåLagring(true);
      }
    },
    [autoLagringAktiv, kiBlokkererLagring, lagre],
  );

  const markerEndring = useCallback(() => {
    if (!autoLagringAktiv) return;
    harVentendeLagringRef.current = true;
    if (erMontertRef.current) {
      setHarUlagredeEndringer(true);
    }
    planleggLagring();
  }, [autoLagringAktiv, planleggLagring]);

  useEffect(() => {
    if (kiBlokkererLagring) return;
    if (!autoLagringAktiv) return;
    if (!harVentendeLagringRef.current) return;
    if (lagringKjørerRef.current) return;
    if (blurTimeoutRef.current !== null) return;
    planleggLagring();
  }, [autoLagringAktiv, kiBlokkererLagring, planleggLagring]);

  useEffect(() => {
    erMontertRef.current = true;
    return () => {
      erMontertRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!autoLagringAktiv) {
      watchSubscriptionRef.current?.unsubscribe?.();
      watchSubscriptionRef.current = null;
      hoppOverFørsteEndringRef.current = true;
      return;
    }

    hoppOverFørsteEndringRef.current = true;

    watchSubscriptionRef.current?.unsubscribe?.();
    watchSubscriptionRef.current = null;

    const subscription = form.watch((_, info) => {
      if (lagringKjørerRef.current) {
        return;
      }

      if (hoppOverFørsteEndringRef.current) {
        hoppOverFørsteEndringRef.current = false;
        return;
      }

      const feltNavn = info?.name;
      const erSkjemaverdiEndret =
        form.formState.isDirty ||
        (feltNavn ? form.getFieldState(feltNavn as any)?.isDirty : false);

      if (!erSkjemaverdiEndret) {
        return;
      }

      if (!info?.type || info.type === 'change') {
        markerEndring();
        return;
      }

      if (info.type === 'blur') {
        planleggLagring();
      }
    });

    watchSubscriptionRef.current = subscription;

    return () => {
      watchSubscriptionRef.current?.unsubscribe?.();
      watchSubscriptionRef.current = null;
    };
  }, [autoLagringAktiv, form, markerEndring, planleggLagring]);

  useEffect(() => {
    if (!autoLagringAktiv) {
      harVentendeLagringRef.current = false;
      setHarUlagredeEndringer(false);
      setLagrer(false);
      setVenterPåLagring(false);
      clearPlanlagtLagring();
    }
  }, [autoLagringAktiv, clearPlanlagtLagring]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!harUlagredeEndringer) {
        return;
      }
      event.preventDefault();
      event.returnValue = 'Du har ulagrede endringer.';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [harUlagredeEndringer]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLinkNavigation = (event: MouseEvent) => {
      if (!harUlagredeEndringer) return;

      const target = event.target as HTMLElement | null;
      const lenke = target?.closest<HTMLAnchorElement>('a[href]');

      if (!lenke) return;
      if (lenke.target === '_blank') return;
      const href = lenke.getAttribute('href') ?? '';
      if (href.startsWith('#') || href.startsWith('mailto:')) return;

      const bekreft = window.confirm(
        'Du har ulagrede endringer. Trykk "OK" for å forlate uten å lagre, eller "Avbryt" for å bli.',
      );

      if (!bekreft) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener('click', handleLinkNavigation, true);

    const handlePopState = () => {
      if (!harUlagredeEndringer) return;
      const bekreft = window.confirm(
        'Du har ulagrede endringer. Trykk "OK" for å forlate uten å lagre, eller "Avbryt" for å bli.',
      );
      if (!bekreft) {
        history.forward();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleLinkNavigation, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [harUlagredeEndringer]);

  useEffect(
    () => () => {
      watchSubscriptionRef.current?.unsubscribe?.();
      watchSubscriptionRef.current = null;
      clearPlanlagtLagring();
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    },
    [clearPlanlagtLagring],
  );

  const lagreNaa = useCallback(async () => {
    harVentendeLagringRef.current = true;
    await lagre(true);
  }, [lagre]);

  return {
    lagreNaa,
    lagrer,
    venterPåLagring,
    feil,
    sisteLagret,
    harUlagredeEndringer,
    skjemaVerdier: form.getValues,
  };
}
