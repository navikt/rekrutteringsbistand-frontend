'use client';

import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/kiValidering/useValiderRekrutteringstreff';
import {
  oppdaterRekrutteringstreff,
  MAX_TITLE_LENGTH,
} from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
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
  TextField,
} from '@navikt/ds-react';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

interface EndreTittelProps {
  onUpdated: () => void;
}

const ease = cubicBezier(0.16, 1, 0.3, 1);

const EndreTittel = ({ onUpdated }: EndreTittelProps) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const {
    data: rekrutteringstreff,
    isLoading,
    mutate,
  } = useRekrutteringstreff(rekrutteringstreffId);

  const { setLagret: setKiLagret } = useKiLogg(rekrutteringstreffId, 'tittel');
  const searchParams = useSearchParams();
  const isEditMode = (searchParams?.get('mode') ?? '') === 'edit';
  const {
    trigger: validateKI,
    data: analyse,
    reset: resetAnalyse,
    error: analyseError,
    isMutating: validating,
  } = useValiderRekrutteringstreff();

  const {
    control,
    setValue,
    getValues,
    trigger: triggerRHF,
    clearErrors,
    formState: { isSubmitting },
  } = useFormContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const skeletonRef = useRef<HTMLDivElement>(null);
  const analyseRef = useRef<HTMLDivElement>(null);

  const [loggId, setLoggId] = useState<string | null>(null);
  const [forceSave, setForceSave] = useState(false);

  const tittel = useWatch({ control, name: 'tittel' });
  const tegnIgjen =
    MAX_TITLE_LENGTH - (typeof tittel === 'string' ? tittel.length : 0);

  useEffect(() => {
    setLoggId(null);
    setForceSave(false);
    resetAnalyse();
  }, [tittel, resetAnalyse]);

  const kiErrorBorder =
    !!analyse &&
    !analyseError &&
    (analyse as any)?.bryterRetningslinjer &&
    !forceSave;

  const harPublisert = (rekrutteringstreff?.hendelser ?? []).some(
    (h: any) => h.hendelsestype === 'PUBLISER',
  );

  const save = async (currentLoggId: string | null) => {
    try {
      await oppdaterRekrutteringstreff(rekrutteringstreffId, {
        tittel: getValues('tittel'),
      });
      if (currentLoggId) {
        try {
          await setKiLagret({ id: currentLoggId, lagret: true });
        } catch (error) {
          new RekbisError({
            message: `Feil ved oppdatering av /lagret for logg ${currentLoggId}.`,
            error,
          });
        }
      }
      await mutate();
      onUpdated?.();
    } catch (error) {
      new RekbisError({ message: 'Lagring av tittel feilet.', error });
    }
  };

  const runValidationAndMaybeSave = async () => {
    const ok = await triggerRHF('tittel');
    if (!ok) return;

    const v = getValues('tittel');
    if (!String(v ?? '').trim()) return;

    const res = (await validateKI({
      treffId: rekrutteringstreff?.id ?? rekrutteringstreffId,
      feltType: 'tittel',
      tekst: v,
    })) as { loggId?: string } | undefined;

    const id = res?.loggId ?? (analyse as any)?.loggId ?? null;
    setLoggId(id ?? null);

    const bryter = (analyse as any)?.bryterRetningslinjer;
    const kanLagre =
      (!bryter || forceSave) &&
      !validating &&
      !isSubmitting &&
      !(harPublisert && isEditMode);

    if (kanLagre) {
      await save(id ?? null);
    }
  };

  const clear = () => {
    setValue('tittel', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    inputRef.current?.focus();
  };

  const onForceSave = async () => {
    setForceSave(true);
    await save(loggId);
  };

  return (
    <section className='space-y-3'>
      {isLoading && <Skeleton variant='text' />}
      {!isLoading && (
        <>
          <div className='relative w-full'>
            {tittel && (
              <Button
                type='button'
                onClick={clear}
                aria-label='Tøm tittel feltet'
                variant='tertiary'
                size='small'
                className='absolute right-2 top-[4rem] -translate-y-1/2 h-8 p-1'
                title='Tøm feltet'
              >
                <XMarkIcon aria-hidden fontSize='1.25rem' />
              </Button>
            )}

            <div className='flex items-start'>
              <Controller
                control={control}
                name='tittel'
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ''}
                    ref={(el) => {
                      field.ref(el);
                      inputRef.current = el as HTMLInputElement | null;
                    }}
                    label='Navn på treffet'
                    maxLength={MAX_TITLE_LENGTH}
                    className='w-full pt-2'
                    error={
                      fieldState.error?.message ||
                      (kiErrorBorder ? 'Brudd på retningslinjer' : undefined)
                    }
                    aria-invalid={!!(fieldState.error || kiErrorBorder)}
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    onChange={(e) => {
                      field.onChange(e);
                      const v = (e.target as HTMLInputElement).value;
                      if (v.trim().length > 0) {
                        clearErrors('tittel'); // fjerner "tom"-feil live når man begynner å skrive
                      }
                    }}
                    onBlur={async () => {
                      field.onBlur();
                      await runValidationAndMaybeSave();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        (async () => {
                          const el = e.currentTarget as HTMLInputElement;
                          await runValidationAndMaybeSave();
                          el?.blur();
                        })();
                      }
                    }}
                  />
                )}
              />
            </div>
          </div>

          <Detail className='text-gray-400'>{tegnIgjen} tegn igjen</Detail>

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
                Ikke skriv personopplysninger og diskriminerende innhold. KI
                hjelper deg å vurdere innholdet, men du er ansvarlig.
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

          <div className='flex gap-3 mt-2 items-start'>
            <div className='inline-flex justify-center items-start w-10 pt-1'>
              {validating ? (
                <RobotIcon
                  aria-hidden
                  fontSize='2em'
                  className='text-gray-700'
                />
              ) : analyse && !analyseError && !forceSave ? (
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
                    ref={skeletonRef}
                    tabIndex={0}
                    role='status'
                    aria-label='Validerer tittel'
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease }}
                    onAnimationComplete={() => skeletonRef.current?.focus()}
                  >
                    <Skeleton variant='text' width='100%' height={31} />
                    <Skeleton variant='text' width='100%' height={31} />
                    <Skeleton variant='text' width='100%' height={31} />
                    <Skeleton variant='text' width='100%' height={31} />
                    <Skeleton variant='text' width='100%' height={31} />
                    <Skeleton variant='text' width='100%' height={31} />
                  </motion.div>
                )}

                {!validating && analyseError && (
                  <motion.div
                    key='error'
                    ref={analyseRef}
                    tabIndex={0}
                    role='alert'
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease }}
                    onAnimationComplete={() => analyseRef.current?.focus()}
                  >
                    <Alert variant='error'>
                      {analyseError.message ??
                        'En feil oppstod under validering.'}
                    </Alert>
                  </motion.div>
                )}

                {!validating &&
                  analyse &&
                  !analyseError &&
                  (!(analyse as any).bryterRetningslinjer || !forceSave) && (
                    <motion.div
                      key='analyse'
                      ref={analyseRef}
                      tabIndex={0}
                      role='region'
                      aria-label='Analyse av tittel'
                      className='p-1'
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                    >
                      <BodyLong>{(analyse as any).begrunnelse}</BodyLong>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          </div>

          {!!analyse &&
            (analyse as any)?.bryterRetningslinjer &&
            !forceSave && (
              <div className='pt-1'>
                <Button
                  size='small'
                  variant='secondary'
                  onClick={() => {
                    if (harPublisert && isEditMode) {
                      // Ikke lagre nå, bare tillat brudd og fortsett i formet
                      setForceSave(true);
                    } else {
                      onForceSave();
                    }
                  }}
                >
                  {harPublisert && isEditMode
                    ? 'Bruk likevel'
                    : 'Lagre likevel'}
                </Button>
              </div>
            )}
        </>
      )}
    </section>
  );
};

EndreTittel.displayName = 'EndreTittel';
export default EndreTittel;
