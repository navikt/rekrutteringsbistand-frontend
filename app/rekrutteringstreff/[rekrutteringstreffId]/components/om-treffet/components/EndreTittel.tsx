import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/tittelValidering/useValiderRekrutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RobotFrownIcon,
  RobotIcon,
  RobotSmileIcon,
  XMarkIcon,
} from '@navikt/aksel-icons';
import {
  Alert,
  BodyLong,
  Button,
  Modal,
  Skeleton,
  Textarea,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

interface EndreTittelProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
}

const MAX_TITLE_LENGTH = 50;
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

const EndreTittel = ({
  modalRef,
  rekrutteringstreff,
  onUpdated,
}: EndreTittelProps) => {
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
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { nyTittel: rekrutteringstreff.tittel },
  });
  const nyTittel = useWatch({ control, name: 'nyTittel' });

  const [initialFocusDone, setInitialFocusDone] = useState(false);
  const [visTomFeil, setVisTomFeil] = useState(false);
  const [showUnchangedError, setShowUnchangedError] = useState(false);

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

  const disableSave = useMemo(
    () =>
      !dirtyFields.nyTittel ||
      errors.nyTittel?.type === 'too_big' ||
      isSubmitting ||
      validating ||
      !analyse ||
      !!errors.nyTittel ||
      analyse?.bryterRetningslinjer,
    [dirtyFields.nyTittel, errors.nyTittel, isSubmitting, validating, analyse],
  );

  const focusTextareaEnd = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    const len = el.value.length;
    el.setSelectionRange(len, len);
  };

  useEffect(() => {
    resetAnalyse();
    setVisTomFeil(false);
    setShowUnchangedError(false);
  }, [nyTittel, resetAnalyse]);

  useEffect(() => {
    if (modalRef.current) {
      modalLukkeknappRef.current = modalRef.current.querySelector(
        '.aksel-modal__header .aksel-modal__button',
      ) as HTMLButtonElement | null;
    }
  }, [modalRef]);

  const handleInitialFocus = () => {
    if (initialFocusDone) return;
    setShowUnchangedError(false);
    if (rekrutteringstreff.tittel === DEFAULT_TITLE) {
      reset({ nyTittel: '' });
    } else {
      resetAnalyse();
    }
    focusTextareaEnd();
    setInitialFocusDone(true);
  };

  const save = async ({ nyTittel }: FormValues) => {
    try {
      const { id, beskrivelse, sted, fraTid, tilTid } = rekrutteringstreff;
      await oppdaterRekrutteringstreff(id, {
        tittel: nyTittel,
        beskrivelse,
        sted,
        fraTid,
        tilTid,
      });
      onUpdated();
      modalRef.current?.close();
    } catch (error) {
      logger.error('Lagring av tittel feilet:', error);
    }
  };

  const clear = () => {
    setValue('nyTittel', '', { shouldValidate: true, shouldDirty: true });
    setShowUnchangedError(false);
    focusTextareaEnd();
  };

  const close = () => {
    modalRef.current?.close();
    reset({ nyTittel: rekrutteringstreff.tittel });
    resetAnalyse();
    setInitialFocusDone(false);
    setVisTomFeil(false);
    setShowUnchangedError(false);
  };

  const handleValidateOrError = () => {
    if (!dirtyFields.nyTittel) {
      setShowUnchangedError(true);
      setVisTomFeil(false);
    } else if (dirtyFields.nyTittel && nyTittel?.trim()) {
      validate({ tittel: nyTittel, beskrivelse: null });
      setShowUnchangedError(false);
    } else {
      setVisTomFeil(true);
      setShowUnchangedError(false);
    }
  };

  const erInni = (wrapper: HTMLElement | null, el: Element | null) =>
    !!wrapper && !!el && (wrapper === el || wrapper.contains(el));

  return (
    <Modal
      ref={modalRef}
      header={{ heading: 'Endre navn på treffet' }}
      width={400}
      onClose={close}
      onFocus={handleInitialFocus}
    >
      <Modal.Body>
        <form
          id='skjema-endre-tittel'
          onSubmit={handleSubmit(save)}
          className='space-y-2'
        >
          <div
            className='flex items-start'
            tabIndex={-1}
            onBlur={() =>
              setTimeout(() => {
                const active = document.activeElement;
                if (
                  !erInni(textareaRef.current, active) &&
                  !erInni(clearButtonRef.current, active) &&
                  !erInni(closeButtonRef.current, active) &&
                  !erInni(modalLukkeknappRef.current, active) &&
                  !erInni(analyseRef.current, active)
                ) {
                  handleValidateOrError();
                }
              })
            }
          >
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

                {!validating && analyse && !analyseError && (
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
        </form>
      </Modal.Body>

      <Modal.Footer className='pt-2'>
        <Button
          type='submit'
          form='skjema-endre-tittel'
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
      </Modal.Footer>
    </Modal>
  );
};

EndreTittel.displayName = 'EndreTittel';
export default EndreTittel;
