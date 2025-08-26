'use client';

import { RekbisError } from '../../../../../../util/rekbisError';
import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/kiValidering/useValiderRekrutteringstreff';
import {
  oppdaterRekrutteringstreff,
  toOppdaterRekrutteringstreffDto,
} from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RobotFrownIcon,
  RobotIcon,
  RobotSmileIcon,
  XMarkIcon,
  EyeIcon,
  PersonCircleIcon,
} from '@navikt/aksel-icons';
import {
  Alert,
  BodyLong,
  Button,
  Detail,
  Skeleton,
  Switch,
  TextField,
} from '@navikt/ds-react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

interface EndreTittelProps {
  onUpdated: () => void;
}

const MAX_TITLE_LENGTH = 100;
const SKELETON_LINES = 6;

const schema = z.object({
  nyTittel: z
    .string()
    .trim()
    .min(1, 'Tittel kan ikke være tom.')
    .max(
      MAX_TITLE_LENGTH,
      `Tittelen kan ikke ha mer enn ${MAX_TITLE_LENGTH} tegn.`,
    ),
});
type FormValues = z.infer<typeof schema>;

const EndreTittel2 = ({ onUpdated }: EndreTittelProps) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: rekrutteringstreff, isLoading } =
    useRekrutteringstreff(rekrutteringstreffId);

  // PUT /lagret
  const { setLagret: setKiLagret } = useKiLogg(rekrutteringstreffId, 'tittel');

  const {
    trigger: validate,
    data: analyse,
    reset: resetAnalyse,
    error: analyseError,
    isMutating: validating,
  } = useValiderRekrutteringstreff();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { nyTittel: '' }, // alltid kontrollert
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const analyseRef = useRef<HTMLDivElement>(null);
  const sjekkBtnRef = useRef<HTMLButtonElement>(null);

  const nyTittel = useWatch({ control, name: 'nyTittel' });

  const [visTomFeil, setVisTomFeil] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [forceSave, setForceSave] = useState(false);
  const [loggId, setLoggId] = useState<string | null>(null);
  const [lastAutoSaveKey, setLastAutoSaveKey] = useState<string | null>(null);

  useEffect(() => {
    if (rekrutteringstreff) {
      reset({ nyTittel: rekrutteringstreff.tittel ?? '' });
    }
  }, [rekrutteringstreff, reset]);

  // Reset vurdering når teksten endres
  useEffect(() => {
    setVisTomFeil(false);
    setHasChecked(false);
    setForceSave(false);
    setLoggId(null);
    resetAnalyse();
  }, [nyTittel, resetAnalyse]);

  const errorMsg = useMemo(() => {
    const err = errors.nyTittel;
    if (!err) return undefined;
    if (err.type === 'too_big') return err.message;
    if (err.type === 'too_small' && visTomFeil) return err.message;
    return undefined;
  }, [errors.nyTittel, visTomFeil]);

  const baseInvalid = useMemo(
    () => !!errors.nyTittel || !nyTittel?.trim(),
    [errors.nyTittel, nyTittel],
  );

  // Rød ramme når KI sier brudd og du ikke har valgt "lagre likevel"
  const kiErrorBorder =
    hasChecked &&
    !validating &&
    !analyseError &&
    (analyse as any)?.bryterRetningslinjer &&
    !forceSave;

  const runValidation = async () => {
    if (!rekrutteringstreff) return;

    if (!nyTittel?.trim()) {
      setVisTomFeil(true);
      return;
    }

    const res = (await validate({
      treffId: rekrutteringstreff.id,
      feltType: 'tittel',
      tekst: nyTittel,
    })) as { loggId?: string } | undefined;

    const id =
      res?.loggId && res.loggId.length > 0
        ? res.loggId
        : ((analyse as any)?.loggId ?? null);

    setLoggId(id ?? null);
    setHasChecked(true);

    if (!id) {
      new RekbisError({
        message:
          'Kunne ikke hente logg-ID fra valideringen. Prøv å kjøre «Sjekk teksten» på nytt.',
      });
    }
  };

  const save = async ({ nyTittel }: FormValues) => {
    if (!rekrutteringstreff) return;
    if (!loggId) {
      new RekbisError({
        message:
          'Mangler referanse til valideringsloggen (logg-ID). Kjør «Sjekk teksten» og prøv igjen.',
      });
      return;
    }

    try {
      await oppdaterRekrutteringstreff(
        rekrutteringstreff.id,
        toOppdaterRekrutteringstreffDto({
          ...rekrutteringstreff,
          tittel: nyTittel,
        }),
      );

      try {
        await setKiLagret({ id: loggId, lagret: true });
      } catch (error) {
        new RekbisError({
          message: `Feil ved oppdatering av /lagret for logg ${loggId}.`,
          error,
        });
      }

      onUpdated();
    } catch (error) {
      new RekbisError({ message: 'Lagring av tittel feilet.', error });
    }
  };

  const clear = () => {
    setValue('nyTittel', '', { shouldValidate: true, shouldDirty: true });
    inputRef.current?.focus();
  };

  const tegnIgjen =
    MAX_TITLE_LENGTH - (typeof nyTittel === 'string' ? nyTittel.length : 0);

  // AUTOLAGRING (ingen "Lagre"-knapp)
  useEffect(() => {
    const canAutoSave =
      hasChecked &&
      !validating &&
      !isSubmitting &&
      !baseInvalid &&
      !!loggId &&
      ((analyse && !(analyse as any).bryterRetningslinjer) ||
        ((analyse as any)?.bryterRetningslinjer && forceSave));

    const key =
      loggId && typeof nyTittel === 'string' ? `${loggId}|${nyTittel}` : null;

    if (canAutoSave && key && key !== lastAutoSaveKey) {
      setLastAutoSaveKey(key);
      handleSubmit(save)().catch(() => {});
    }
  }, [
    hasChecked,
    validating,
    isSubmitting,
    baseInvalid,
    loggId,
    analyse,
    forceSave,
    nyTittel,
    lastAutoSaveKey,
    handleSubmit,
  ]);

  return (
    <section className='space-y-3'>
      {/* Én knapp: "Sjekk teksten". Etter sjekk blir den deaktivert og hoppes over i tab-rekkefølgen */}
      <div className='flex gap-2 justify-end'>
        <Button
          ref={sjekkBtnRef}
          type='button'
          onClick={runValidation}
          loading={validating}
          disabled={hasChecked || baseInvalid || validating}
          tabIndex={hasChecked ? -1 : 0}
        >
          Sjekk teksten
        </Button>
      </div>

      {/* Inputfelt – EN LINJE */}
      {isLoading && <Skeleton variant='text' />}
      {!isLoading && rekrutteringstreff && (
        <>
          <div className='flex items-start' tabIndex={-1}>
            <Controller
              control={control}
              name='nyTittel'
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value ?? ''} // alltid kontrollert
                  ref={(el) => {
                    field.ref(el);
                    inputRef.current = el;
                  }}
                  label='Navn på treffet'
                  maxLength={MAX_TITLE_LENGTH}
                  className='w-full pt-2'
                  error={errorMsg ?? (kiErrorBorder ? ' ' : undefined)} // <-- gir rød border uten å farge label
                  aria-invalid={!!(errorMsg || kiErrorBorder)}
                  autoComplete='off'
                  autoCorrect='off'
                  spellCheck={false}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      runValidation();
                      return;
                    }
                    if (e.key === 'Tab' && !e.shiftKey && !hasChecked) {
                      e.preventDefault();
                      sjekkBtnRef.current?.focus();
                    }
                  }}
                />
              )}
            />

            {nyTittel && (
              <Button
                type='button'
                onClick={clear}
                aria-label='Tøm tittel feltet'
                variant='tertiary'
                size='small'
                tabIndex={-1} // ikke i tabrekkefølgen
                className='h-8 p-1 -ml-9 mt-9 flex items-center'
                title='Tøm feltet'
              >
                <XMarkIcon aria-hidden fontSize='1.25rem' />
              </Button>
            )}
          </div>

          <Detail className='text-gray-400'>{tegnIgjen} tegn igjen</Detail>

          {/* Info-tekster */}
          <div className='space-y-1'>
            <Detail
              size='small'
              className='flex items-start gap-2 text-gray-400'
            >
              <PersonCircleIcon
                aria-hidden
                className='h-6 w-6 shrink-0 self-start mt-0.5'
              />
              <span>
                Ikke skriv personopplysninger og diskriminerende innhold.
                KI-verktøyet hjelper deg å vurdere innholdet, men du er
                ansvarlig for alt tekstinnhold.
              </span>
            </Detail>
            <Detail
              size='small'
              className='flex items-start gap-2 text-gray-400'
            >
              <EyeIcon aria-hidden fontSize='2em' className='mt-0.5' />
              <span>
                Synlig for jobbsøker, arbeidsgivere og NAV-ansatte når treffet
                er publisert.
              </span>
            </Detail>
          </div>

          {/* Analyse/tilbakemelding */}
          <div className='flex gap-3 mt-2 items-start'>
            <div className='inline-flex justify-center items-start w-10 pt-1'>
              {validating ? (
                <RobotIcon
                  aria-hidden
                  fontSize='2em'
                  className='text-gray-700'
                />
              ) : analyse && !analyseError ? (
                (analyse as any).bryterRetningslinjer ? (
                  <RobotFrownIcon
                    aria-hidden
                    fontSize='2em'
                    className='text-red-600'
                  />
                ) : (
                  <RobotSmileIcon
                    aria-hidden
                    fontSize='2em'
                    className='text-green-800'
                  />
                )
              ) : analyseError ? (
                <RobotFrownIcon
                  aria-hidden
                  fontSize='2em'
                  className='text-red-600'
                />
              ) : null}
            </div>

            <div className='w-full'>
              <AnimatePresence mode='wait'>
                {validating && (
                  <motion.div
                    key='skeleton'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {[...Array(SKELETON_LINES)].map((_, i) => (
                      <Skeleton
                        key={i}
                        variant='text'
                        width='100%'
                        height={31}
                      />
                    ))}
                  </motion.div>
                )}

                {!validating && analyseError && (
                  <motion.div
                    key='error'
                    ref={analyseRef}
                    tabIndex={0}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onAnimationComplete={() => analyseRef.current?.focus()}
                  >
                    <Alert variant='error'>
                      {analyseError.message ??
                        'En feil oppstod under validering.'}
                    </Alert>
                  </motion.div>
                )}

                {!validating && analyse && !analyseError && hasChecked && (
                  <motion.div
                    key='analyse'
                    ref={analyseRef}
                    tabIndex={0}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={
                      (analyse as any).bryterRetningslinjer
                        ? 'aksel-error-message p-1'
                        : 'text-green-700 p-1'
                    }
                  >
                    <BodyLong>{(analyse as any).begrunnelse}</BodyLong>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Overstyr ved brudd (styrer også autolagring) */}
          {hasChecked && (analyse as any)?.bryterRetningslinjer && (
            <div className='pt-1'>
              <Switch
                size='small'
                checked={forceSave}
                onChange={(e) => setForceSave(e.target.checked)}
              >
                Lagre innholdet likevel.
              </Switch>
            </div>
          )}
        </>
      )}
    </section>
  );
};

EndreTittel2.displayName = 'EndreTittel';
export default EndreTittel2;
