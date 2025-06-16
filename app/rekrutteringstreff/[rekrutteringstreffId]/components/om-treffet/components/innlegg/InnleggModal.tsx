'use client';

import type { InnleggDTO } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import {
  oppdaterEttInnlegg,
  OpprettEllerOppdaterInnleggDto,
  opprettInnleggForTreff,
} from '@/app/api/rekrutteringstreff/opprettEllerOppdaterInnlegg';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/tittelValidering/useValiderRekrutteringstreff';
import RikTekstEditor from '@/app/components/rikteksteditor/RikTekstEditor';
import { RobotFrownIcon, RobotIcon, RobotSmileIcon } from '@navikt/aksel-icons';
import {
  Alert,
  BodyLong,
  BodyShort,
  Button,
  ErrorMessage,
  Label,
  Modal,
  Skeleton,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';

export interface InnleggModalProps {
  rekrutteringstreffId: string;
  innlegg?: InnleggDTO;
  onInnleggUpdated: () => void;
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

interface InnleggFormFields {
  htmlContent: string;
}

const SKELETON_LINES = 6;
const EDITOR_WRAPPER_ID = 'rediger-innlegg-htmlcontent-modal'; // Unik ID

const InnleggModal: React.FC<InnleggModalProps> = ({
  rekrutteringstreffId,
  innlegg,
  onInnleggUpdated,
  modalRef,
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const analyseRef = useRef<HTMLDivElement>(null);

  const [isClosingModal, setIsClosingModal] = useState(false);
  const [initialFocusDone, setInitialFocusDone] = useState(false);
  const [
    hasValidatedCurrentContentSuccessfully,
    setHasValidatedCurrentContentSuccessfully,
  ] = useState(false);
  const [editorKey, setEditorKey] = useState(Date.now());

  const methods = useForm<InnleggFormFields>({
    defaultValues: { htmlContent: innlegg?.htmlContent ?? '' },
    mode: 'onChange',
  });
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, dirtyFields },
  } = methods;

  const {
    trigger: validate,
    data: analyse,
    reset: resetAnalyse,
    error: analyseError,
    isMutating: validating,
  } = useValiderRekrutteringstreff();

  const htmlContent = watch('htmlContent');
  const isDirty = dirtyFields.htmlContent;

  useEffect(() => {
    if (isDirty) {
      setHasValidatedCurrentContentSuccessfully(false);
    }
  }, [htmlContent, isDirty]);

  const disableSave = useMemo(
    () =>
      !isDirty ||
      !htmlContent?.trim() ||
      isSubmitting ||
      validating ||
      !hasValidatedCurrentContentSuccessfully,
    [
      isDirty,
      htmlContent,
      isSubmitting,
      validating,
      hasValidatedCurrentContentSuccessfully,
    ],
  );

  const handleValidateOrError = () => {
    if (validating) return;
    const txt = htmlContent?.trim();
    if (!txt) {
      resetAnalyse();
      setHasValidatedCurrentContentSuccessfully(false);
      return;
    }
    setHasValidatedCurrentContentSuccessfully(false);
    validate({ tittel: null, beskrivelse: txt });
  };

  useEffect(() => {
    if (analyse && !validating && !analyseError) {
      setHasValidatedCurrentContentSuccessfully(!analyse.bryterRetningslinjer);
    } else if (analyseError && !validating) {
      setHasValidatedCurrentContentSuccessfully(false);
    }
  }, [analyse, validating, analyseError]);

  useEffect(() => {
    // Reset form and validation state when 'innlegg' prop changes or modal is not open
    // This ensures the modal is fresh if it's re-opened with different or no 'innlegg' data.
    reset({ htmlContent: innlegg?.htmlContent ?? '' });
    resetAnalyse();
    setHasValidatedCurrentContentSuccessfully(false);
    setEditorKey(Date.now());
    if (modalRef.current && !modalRef.current.open) {
      setIsClosingModal(false);
      setInitialFocusDone(false);
    }
  }, [innlegg, reset, resetAnalyse, modalRef]);

  const onSubmitHandler: SubmitHandler<InnleggFormFields> = async (data) => {
    if (validating || !hasValidatedCurrentContentSuccessfully) {
      logger.warn(
        'Attempted to save post without successful validation or while validation was in progress.',
      );
      return;
    }
    try {
      const navnForPayload =
        innlegg?.opprettetAvPersonNavn ||
        innlegg?.opprettetAvPersonNavident ||
        'Markedskontakt';
      const payload: OpprettEllerOppdaterInnleggDto = {
        htmlContent: data.htmlContent,
        tittel: 'Om treffet',
        opprettetAvPersonNavn: navnForPayload,
        opprettetAvPersonBeskrivelse: 'Markedskontakt',
        sendesTilJobbsokerTidspunkt: new Date().toISOString(),
      };

      if (innlegg?.id) {
        await oppdaterEttInnlegg(rekrutteringstreffId, innlegg.id, payload);
      } else {
        await opprettInnleggForTreff(rekrutteringstreffId, payload);
      }
      onInnleggUpdated();
      modalRef.current?.close(); // Triggers Modal's onClose
    } catch (error) {
      logger.error('Error saving post:', error);
    }
  };

  const focusEditor = () => {
    requestAnimationFrame(() => {
      const wrapper = document.getElementById(EDITOR_WRAPPER_ID);
      const editable = wrapper?.querySelector(
        '.ProseMirror[contenteditable="true"]',
      ) as HTMLElement | null;
      if (editable) {
        editable.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(editable);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    });
  };

  const handleInitialModalFocus = () => {
    if (initialFocusDone || !modalRef.current?.open) return;
    focusEditor();
    setInitialFocusDone(true);
  };

  const handleInternalModalClose = () => {
    // Cleanup logic when the modal is closed for any reason
    reset({ htmlContent: innlegg?.htmlContent ?? '' });
    resetAnalyse();
    setIsClosingModal(false);
    setInitialFocusDone(false);
    setHasValidatedCurrentContentSuccessfully(false);
  };

  return (
    <Modal
      ref={modalRef}
      placement='top'
      header={{ heading: innlegg ? 'Endre innlegg' : 'Skriv nytt innlegg' }}
      onClose={handleInternalModalClose}
      width='medium'
      onFocus={handleInitialModalFocus}
    >
      <FormProvider {...methods}>
        <form id='innlegg-form-modal' onSubmit={handleSubmit(onSubmitHandler)}>
          <Modal.Body>
            <div className='flex flex-col gap-6'>
              <BodyShort>
                Dette innlegget vises til jobbsøkerne før treffet. Skriv gjerne
                en hyggelig introduksjon og praktisk informasjon.
              </BodyShort>
              <div
                tabIndex={-1}
                onBlur={() =>
                  setTimeout(() => {
                    if (isClosingModal || !modalRef.current?.open) return;
                    const activeElement = document.activeElement;
                    if (
                      activeElement !== cancelButtonRef.current &&
                      activeElement !== submitButtonRef.current
                    ) {
                      if (!isDirty) {
                        resetAnalyse();
                        setHasValidatedCurrentContentSuccessfully(false);
                        cancelButtonRef.current?.focus();
                      } else {
                        handleValidateOrError();
                      }
                    }
                  }, 0)
                }
              >
                <Label htmlFor={EDITOR_WRAPPER_ID} className='mb-2 block'>
                  Innhold
                </Label>
                <RikTekstEditor
                  key={editorKey}
                  id={EDITOR_WRAPPER_ID}
                  tekst={htmlContent ?? ''}
                  onChange={(html) =>
                    setValue('htmlContent', html, {
                      shouldValidate: false,
                      shouldDirty: true,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Tab' && !e.shiftKey) {
                      e.preventDefault();
                      if (!isDirty) {
                        resetAnalyse();
                        setHasValidatedCurrentContentSuccessfully(false);
                        setTimeout(() => cancelButtonRef.current?.focus(), 0);
                      } else {
                        handleValidateOrError();
                        setTimeout(() => analyseRef.current?.focus(), 0);
                      }
                    } else if (e.key === 'Escape') {
                      e.preventDefault();
                      setIsClosingModal(true);
                      modalRef.current?.close();
                    }
                  }}
                />
                {errors.htmlContent && (
                  <ErrorMessage>{errors.htmlContent.message}</ErrorMessage>
                )}
              </div>
              <div ref={analyseRef} tabIndex={0} aria-live='polite'>
                <div className='flex gap-3 items-start'>
                  <div className='inline-flex justify-center items-start w-10 pt-1'>
                    {validating ? (
                      <RobotIcon aria-hidden fontSize='2em' />
                    ) : analyseError ? (
                      <RobotFrownIcon
                        aria-hidden
                        fontSize='2em'
                        className='text-red-600'
                      />
                    ) : analyse ? (
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
                              height={24}
                            />
                          ))}
                        </motion.div>
                      )}
                      {!validating && analyseError && (
                        <motion.div
                          key='error'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
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
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
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
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              ref={submitButtonRef}
              type='submit'
              loading={isSubmitting}
              disabled={disableSave}
            >
              {innlegg ? 'Lagre endringer' : 'Opprett innlegg'}
            </Button>
            <Button
              ref={cancelButtonRef}
              type='button'
              variant='secondary'
              onClick={() => {
                setIsClosingModal(true);
                modalRef.current?.close();
              }}
            >
              Avbryt
            </Button>
          </Modal.Footer>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default InnleggModal;
