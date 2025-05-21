import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/tittelValidering/useValiderRekrutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { RobotFrownIcon, RobotSmileIcon, XMarkIcon } from '@navikt/aksel-icons';
import {
  Alert,
  BodyLong,
  Button,
  Modal,
  Skeleton,
  Textarea,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import React, { useRef, useState, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

export interface EndreTittelProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
}

const MAX_TITLE_LENGTH = 50;
const DEFAULT_REKRUTTERINGSTREFF_TITTEL = 'Nytt rekrutteringstreff';

const ZOD_TOO_SMALL = 'too_small';
const ZOD_TOO_BIG = 'too_big';

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
  const lagreButtonRef = useRef<HTMLButtonElement>(null);

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
    defaultValues: { nyTittel: rekrutteringstreff.tittel },
  });

  const nyTittel = useWatch({ control, name: 'nyTittel' });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [initialFocusDone, setInitialFocusDone] = useState(false);

  const handleInitialFocus = () => {
    if (!initialFocusDone) {
      const newInitialTittel =
        rekrutteringstreff.tittel === DEFAULT_REKRUTTERINGSTREFF_TITTEL
          ? ''
          : rekrutteringstreff.tittel;
      reset({ nyTittel: newInitialTittel });

      textareaRef.current?.focus();

      if (textareaRef.current) {
        const len = textareaRef.current.value.length;
        textareaRef.current.selectionStart = len;
        textareaRef.current.selectionEnd = len;
      }
      setInitialFocusDone(true);
    }
  };

  const [skalViseTomFeil, setSkalViseTomFeil] = useState(false);

  useEffect(() => {
    setSkalViseTomFeil(false);
    resetAnalyse();
  }, [nyTittel, resetAnalyse]);

  useEffect(() => {
    if (!validating && analyse && !analyseError) {
      focusEtterAnalyse();
    }
  }, [analyse, analyseError, validating]);

  const focusEtterAnalyse = () => {
    if (!analyse) return;
    if (!analyse.bryterRetningslinjer && lagreButtonRef.current) {
      lagreButtonRef.current.focus();
    }
    if (analyse.bryterRetningslinjer && textareaRef.current) {
      textareaRef.current.focus();
    }
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

  const onInvalid = () => {
    if (errors.nyTittel?.type === ZOD_TOO_SMALL) setSkalViseTomFeil(true);
  };

  const clear = () => {
    setValue('nyTittel', '', { shouldValidate: true, shouldDirty: true });
    textareaRef.current?.focus();
  };

  const close = () => {
    modalRef.current?.close();
    reset({ nyTittel: rekrutteringstreff.tittel });
    setInitialFocusDone(false);
  };

  const errorMsg =
    errors.nyTittel?.type === ZOD_TOO_BIG
      ? errors.nyTittel.message
      : skalViseTomFeil && errors.nyTittel?.type === ZOD_TOO_SMALL
        ? errors.nyTittel.message
        : undefined;

  const disableSave =
    errors.nyTittel?.type === ZOD_TOO_BIG ||
    isSubmitting ||
    validating ||
    !analyse ||
    !!errors.nyTittel ||
    analyse.bryterRetningslinjer;

  const clearButtonRef = useRef<HTMLButtonElement>(null);

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
          onSubmit={handleSubmit(save, onInvalid)}
          className='space-y-2'
        >
          <div
            className='flex items-start'
            tabIndex={-1}
            onBlur={() => {
              setTimeout(() => {
                const active = document.activeElement;
                if (
                  active !== textareaRef.current &&
                  active !== clearButtonRef.current
                ) {
                  if (nyTittel?.trim()) {
                    validate({ tittel: nyTittel, beskrivelse: null });
                  }
                }
              }, 0);
            }}
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
                  minRows={1}
                  maxRows={1}
                  rows={1}
                  resize={false}
                  className='w-full pt-2'
                  error={errorMsg}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (nyTittel?.trim()) {
                        validate({ tittel: nyTittel, beskrivelse: null });
                      }
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
          {validating && (
            <Skeleton height={150} variant='rounded' width={'100%'} />
          )}

          {analyseError && !validating && (
            <Alert variant='error'>
              {analyseError.message ?? 'En feil oppstod under validering.'}
            </Alert>
          )}

          {analyse && !validating && !analyseError && (
            <div className='flex gap-3 mt-2 items-start'>
              <div className='inline-flex justify-center items-start w-10 pt-1'>
                {analyse.bryterRetningslinjer ? (
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
                )}
              </div>
              <div
                className={
                  analyse.bryterRetningslinjer
                    ? 'aksel-error-message p-1'
                    : 'text-green-700 p-1'
                }
              >
                <BodyLong>{analyse.begrunnelse}</BodyLong>
              </div>
            </div>
          )}
        </form>
      </Modal.Body>

      <Modal.Footer className='pt-1'>
        <Button
          type='submit'
          form='skjema-endre-tittel'
          loading={isSubmitting}
          disabled={disableSave}
          ref={lagreButtonRef}
        >
          Lagre
        </Button>
        <Button type='button' variant='secondary' onClick={close}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EndreTittel.displayName = 'EndreTittel';
export default EndreTittel;
