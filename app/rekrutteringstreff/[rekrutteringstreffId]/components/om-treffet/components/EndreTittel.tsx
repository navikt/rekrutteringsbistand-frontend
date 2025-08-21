'use client';

import { RekbisError } from '../../../../../../util/rekbisError';
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
  Modal,
  Skeleton,
  Textarea,
  Switch,
  Detail,
} from '@navikt/ds-react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

interface EndreTittelProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  onUpdated: () => void;
}

const MAX_TITLE_LENGTH = 100;
const DEFAULT_TITLE = 'Nytt rekrutteringstreff';
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

const EndreTittel = ({ modalRef, onUpdated }: EndreTittelProps) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: rekrutteringstreff, isLoading } =
    useRekrutteringstreff(rekrutteringstreffId);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lagreButtonRef = useRef<HTMLButtonElement>(null);
  const analyseRef = useRef<HTMLDivElement>(null);

  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalLukkeknappRef = useRef<HTMLButtonElement | null>(null);

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
  });

  const nyTittel = useWatch({ control, name: 'nyTittel' });

  useEffect(() => {
    if (rekrutteringstreff) {
      reset({ nyTittel: rekrutteringstreff.tittel });
    }
  }, [rekrutteringstreff, reset]);

  const [initialFocusDone, setInitialFocusDone] = useState(false);
  const [visTomFeil, setVisTomFeil] = useState(false);
  const [showUnchangedError, setShowUnchangedError] = useState(false);

  const [hasChecked, setHasChecked] = useState(false);
  const [forceSave, setForceSave] = useState(false);

  const errorMsg = useMemo(() => {
    const err = errors.nyTittel;
    if (err) {
      if (err.type === 'too_big') return err.message;
      if (err.type === 'too_small' && visTomFeil) return err.message;
      return undefined;
    }
    if (showUnchangedError) return 'Tittel er ikke endret.';
    return undefined;
  }, [errors.nyTittel, visTomFeil, showUnchangedError]);

  const baseInvalid = useMemo(
    () => !!errors.nyTittel || !nyTittel?.trim(),
    [errors.nyTittel, nyTittel],
  );

  const disableSave = useMemo(
    () =>
      baseInvalid ||
      isSubmitting ||
      validating ||
      (hasChecked && analyse?.bryterRetningslinjer && !forceSave),
    [
      baseInvalid,
      isSubmitting,
      validating,
      hasChecked,
      analyse?.bryterRetningslinjer,
      forceSave,
    ],
  );

  const focusTextareaEnd = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    const len = el.value.length;
    el.setSelectionRange(len, len);
  };

  useEffect(() => {
    setVisTomFeil(false);
    setShowUnchangedError(false);
    setHasChecked(false);
    setForceSave(false);
    resetAnalyse();
  }, [nyTittel, resetAnalyse]);

  useEffect(() => {
    if (modalRef.current) {
      modalLukkeknappRef.current = modalRef.current.querySelector(
        '.aksel-modal__header .aksel-modal__button',
      ) as HTMLButtonElement | null;
    }
  }, [modalRef]);

  const handleInitialFocus = () => {
    if (initialFocusDone || !rekrutteringstreff) return;
    setShowUnchangedError(false);
    if (rekrutteringstreff.tittel === DEFAULT_TITLE) {
      reset({ nyTittel: '' });
    } else {
      resetAnalyse();
    }
    setHasChecked(false);
    setForceSave(false);
    focusTextareaEnd();
    setInitialFocusDone(true);
  };

  const runValidation = async () => {
    if (!rekrutteringstreff) return;

    if (!nyTittel?.trim()) {
      setVisTomFeil(true);
      return;
    }

    await validate({
      treffId: rekrutteringstreff.id,
      feltType: 'tittel',
      tekst: nyTittel,
    });
    setHasChecked(true);
  };

  const save = async ({ nyTittel }: FormValues) => {
    if (!rekrutteringstreff) return;
    try {
      await oppdaterRekrutteringstreff(
        rekrutteringstreff.id,
        toOppdaterRekrutteringstreffDto({
          ...rekrutteringstreff,
          tittel: nyTittel,
        }),
      );
      onUpdated();
      modalRef.current?.close();
    } catch (error) {
      new RekbisError({ message: 'Lagring av tittel feilet:', error });
    }
  };

  const clear = () => {
    setValue('nyTittel', '', { shouldValidate: true, shouldDirty: true });
    setShowUnchangedError(false);
    focusTextareaEnd();
  };

  const close = () => {
    if (!rekrutteringstreff) return;
    modalRef.current?.close();
    reset({ nyTittel: rekrutteringstreff.tittel });
    resetAnalyse();
    setInitialFocusDone(false);
    setVisTomFeil(false);
    setShowUnchangedError(false);
    setHasChecked(false);
    setForceSave(false);
  };

  const handleValidateOrError = () => {
    if (!nyTittel?.trim()) {
      setVisTomFeil(true);
      setShowUnchangedError(false);
      return;
    }
    runValidation();
  };

  const formId = useId();

  return (
    <Modal
      placement='top'
      ref={modalRef}
      header={{ heading: 'Endre navn på treffet' }}
      width={400}
      onClose={close}
      onFocus={handleInitialFocus}
    >
      <Modal.Body>
        {isLoading && <Skeleton variant='text' />}
        {!isLoading && rekrutteringstreff && (
          <form id={formId} onSubmit={handleSubmit(save)} className='space-y-3'>
            <div className='flex items-start' tabIndex={-1}>
              <Controller
                control={control}
                name='nyTittel'
                render={({ field }) => (
                  <Textarea
                    {...field}
                    ref={textareaRef}
                    hideLabel
                    label='Ny tittel'
                    maxLength={MAX_TITLE_LENGTH}
                    autoFocus
                    minRows={2}
                    maxRows={2}
                    resize={false}
                    className='w-full pt-2'
                    error={errorMsg}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleValidateOrError();
                      }
                    }}
                  />
                )}
              />

              {nyTittel && (
                <Button
                  type='button'
                  ref={clearButtonRef}
                  onClick={clear}
                  aria-label='Tøm tittel feltet'
                  variant='tertiary'
                  size='small'
                  className='h-8 p-1 -ml-9 mt-3 flex items-center'
                >
                  <XMarkIcon aria-hidden fontSize='1.25rem' />
                </Button>
              )}
            </div>

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
                ) : analyse && !analyseError ? (
                  analyse.bryterRetningslinjer ? (
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
                      onAnimationComplete={() => analyseRef.current?.focus()}
                      className={
                        analyse.bryterRetningslinjer
                          ? 'aksel-error-message p-1'
                          : 'text-green-700 p-1'
                      }
                    >
                      <BodyLong>{analyse.begrunnelse}</BodyLong>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {hasChecked && analyse?.bryterRetningslinjer && (
              <div className='pt-1'>
                <Switch
                  size='small'
                  checked={forceSave}
                  onChange={(e) => setForceSave(e.target.checked)}
                >
                  Lagre innhold likevel
                </Switch>
              </div>
            )}
          </form>
        )}
      </Modal.Body>

      <Modal.Footer className='pt-2'>
        {!hasChecked ? (
          <>
            <Button
              type='button'
              onClick={runValidation}
              loading={validating}
              disabled={baseInvalid || validating}
            >
              Sjekk teksten for meg
            </Button>
            <Button
              type='button'
              variant='secondary'
              onClick={close}
              ref={closeButtonRef}
            >
              Avbryt
            </Button>
          </>
        ) : (
          <>
            <Button
              type='submit'
              form={formId}
              ref={lagreButtonRef}
              loading={isSubmitting}
              disabled={disableSave}
            >
              Lagre
            </Button>
            <Button
              type='button'
              variant='secondary'
              onClick={close}
              ref={closeButtonRef}
            >
              Avbryt
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

EndreTittel.displayName = 'EndreTittel';
export default EndreTittel;
