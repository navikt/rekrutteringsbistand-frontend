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
  TextField,
} from '@navikt/ds-react';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

interface EndreTittelProps {
  onUpdated: () => void;
}

const MAX_TITLE_LENGTH = 100;

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

const ease = cubicBezier(0.16, 1, 0.3, 1);

const EndreTittel = ({ onUpdated }: EndreTittelProps) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: rekrutteringstreff, isLoading } =
    useRekrutteringstreff(rekrutteringstreffId);

  const { setLagret: setKiLagret } = useKiLogg(rekrutteringstreffId, 'tittel');
  const {
    trigger: validateKI,
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
    formState: { errors, touchedFields, isSubmitting },
    getValues,
    trigger: triggerRHF,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { nyTittel: '' },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const skeletonRef = useRef<HTMLDivElement>(null);
  const analyseRef = useRef<HTMLDivElement>(null);

  const [loggId, setLoggId] = useState<string | null>(null);
  const [forceSave, setForceSave] = useState(false);

  const nyTittel = useWatch({ control, name: 'nyTittel' });

  useEffect(() => {
    if (!isLoading && rekrutteringstreff) {
      reset({ nyTittel: rekrutteringstreff.tittel ?? '' });
    }
  }, [isLoading, rekrutteringstreff, reset]);

  useEffect(() => {
    setLoggId(null);
    setForceSave(false);
    resetAnalyse();
  }, [nyTittel, resetAnalyse]);

  const tegnIgjen =
    MAX_TITLE_LENGTH - (typeof nyTittel === 'string' ? nyTittel.length : 0);

  const kiErrorBorder =
    !!analyse &&
    !analyseError &&
    (analyse as any)?.bryterRetningslinjer &&
    !forceSave;

  const errorMsg = useMemo(() => {
    const e = errors.nyTittel?.message;
    if (!touchedFields.nyTittel) return undefined;
    return e ?? (kiErrorBorder ? 'Brudd på retningslinjer' : undefined);
  }, [errors.nyTittel, touchedFields.nyTittel, kiErrorBorder]);

  const save = async (values: FormValues, currentLoggId: string | null) => {
    if (!rekrutteringstreff) return;
    try {
      await oppdaterRekrutteringstreff(
        rekrutteringstreff.id,
        toOppdaterRekrutteringstreffDto({
          ...rekrutteringstreff,
          tittel: values.nyTittel,
        }),
      );
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
      onUpdated();
    } catch (error) {
      new RekbisError({ message: 'Lagring av tittel feilet.', error });
    }
  };

  const runValidationAndMaybeSave = async () => {
    const ok = await triggerRHF('nyTittel');
    if (!ok) return;

    const v = getValues();
    if (!v.nyTittel?.trim() || errors.nyTittel) return;
    if (!rekrutteringstreff) return;

    const res = (await validateKI({
      treffId: rekrutteringstreff.id,
      feltType: 'tittel',
      tekst: v.nyTittel,
    })) as { loggId?: string } | undefined;

    const id = res?.loggId ?? (analyse as any)?.loggId ?? null;
    setLoggId(id ?? null);

    const bryter = (analyse as any)?.bryterRetningslinjer;
    const kanLagre = (!bryter || forceSave) && !validating && !isSubmitting;

    if (kanLagre) {
      await handleSubmit(async (fv) => save(fv, id ?? null))();
    }
  };

  const clear = () => {
    setValue('nyTittel', '', { shouldValidate: true, shouldDirty: true });
    inputRef.current?.focus();
  };

  const onForceSave = async () => {
    setForceSave(true);
    await handleSubmit(async (fv) => save(fv, loggId))();
  };

  return (
    <section className='space-y-3'>
      {isLoading && <Skeleton variant='text' />}
      {!isLoading && (
        <>
          <div className='relative w-full'>
            {nyTittel && (
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
                name='nyTittel'
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ''}
                    ref={(el) => {
                      field.ref(el);
                      inputRef.current = el;
                    }}
                    label='Navn på treffet'
                    maxLength={MAX_TITLE_LENGTH}
                    className='w-full pt-2'
                    error={errorMsg}
                    aria-invalid={!!errorMsg}
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    onBlur={async (e) => {
                      field.onBlur();
                      await runValidationAndMaybeSave();
                    }}
                    onKeyDown={async (e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        await runValidationAndMaybeSave();
                        (e.currentTarget as HTMLInputElement).blur();
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
                      transition={{ duration: 0.2, ease }}
                      onAnimationComplete={() => analyseRef.current?.focus()}
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
                <Button size='small' variant='secondary' onClick={onForceSave}>
                  Lagre likevel
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
