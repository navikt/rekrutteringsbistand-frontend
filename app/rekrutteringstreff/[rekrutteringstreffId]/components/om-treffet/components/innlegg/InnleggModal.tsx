'use client';

import { RekbisError } from '../../../../../../../util/rekbisError';
import type { InnleggDTO } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useKiLogg } from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/kiValidering/useValiderRekrutteringstreff';
import {
  oppdaterEttInnlegg,
  OpprettEllerOppdaterInnleggDto,
  opprettInnleggForTreff,
} from '@/app/api/rekrutteringstreff/opprettEllerOppdaterInnlegg';
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
  Switch,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

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
  const [hasChecked, setHasChecked] = useState(false);
  const [forceSave, setForceSave] = useState(false);
  const [editorKey, setEditorKey] = useState(Date.now());
  const [loggId, setLoggId] = useState<string | null>(null);

  const { setLagret: setKiLagret } = useKiLogg(rekrutteringstreffId, 'innlegg');

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
      setHasChecked(false);
      setForceSave(false);
      setLoggId(null);
      resetAnalyse();
    }
  }, [htmlContent, isDirty, resetAnalyse]);

  const baseInvalid = useMemo(
    () => !isDirty || !htmlContent?.trim(),
    [isDirty, htmlContent],
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

  const handleValidateOrErrorOgSetLoggId = async () => {
    if (validating || !rekrutteringstreffId) return;
    const txt = htmlContent?.trim();
    if (!txt) {
      resetAnalyse();
      setHasChecked(false);
      setLoggId(null);
      return;
    }
    try {
      const res = (await validate({
        treffId: rekrutteringstreffId,
        feltType: 'innlegg',
        tekst: txt,
      })) as { loggId?: string } | undefined;

      setLoggId(res?.loggId && res.loggId.length > 0 ? res.loggId : null);
      if (!res?.loggId) {
        logger.warn(
          'Valideringen fullførte uten å returnere logglinje-id for innlegg.',
        );
      }
      setHasChecked(true);
    } catch (e) {
      setHasChecked(false);
      setLoggId(null);
      new RekbisError({
        message:
          'Validering av innlegget feilet. Prøv igjen eller kontakt brukerstøtte.',
        error: e,
      });
    }
  };

  useEffect(() => {
    reset({ htmlContent: innlegg?.htmlContent ?? '' });
    resetAnalyse();
    setHasChecked(false);
    setForceSave(false);
    setLoggId(null);
    setEditorKey(Date.now());
    if (modalRef.current && !modalRef.current.open) {
      setIsClosingModal(false);
      setInitialFocusDone(false);
    }
  }, [innlegg, reset, resetAnalyse, modalRef]);

  const onSubmitHandler: SubmitHandler<InnleggFormFields> = async (data) => {
    if (validating) {
      logger.warn('Forsøkte å lagre mens validering pågikk.');
      return;
    }
    if (!hasChecked) {
      logger.warn('Forsøkte å lagre uten at validering var kjørt.');
      return;
    }
    if (analyse?.bryterRetningslinjer && !forceSave) {
      logger.warn(
        'Forsøkte å lagre innhold med brudd uten at overstyring var valgt.',
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

      // Marker KI-logglinjen som lagret (hvis vi har ID)
      if (loggId) {
        try {
          await setKiLagret({ id: loggId, lagret: true });
        } catch (e) {
          new RekbisError({
            message:
              'Innholdet ble lagret, men markering av KI-logg som lagret feilet.',
            error: e,
          });
        }
      } else {
        logger.warn(
          'Innlegg lagret uten at logglinje-id var tilgjengelig – hopper over oppdatering av KI-logg.',
        );
      }

      onInnleggUpdated();
      modalRef.current?.close();
    } catch (error) {
      new RekbisError({
        message: 'Lagring av innlegget feilet. Prøv igjen senere.',
        error,
      });
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
    reset({ htmlContent: innlegg?.htmlContent ?? '' });
    resetAnalyse();
    setIsClosingModal(false);
    setInitialFocusDone(false);
    setHasChecked(false);
    setForceSave(false);
    setLoggId(null);
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
                        setHasChecked(false);
                        setLoggId(null);
                        cancelButtonRef.current?.focus();
                      } else {
                        handleValidateOrErrorOgSetLoggId();
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
                        setHasChecked(false);
                        setLoggId(null);
                        setTimeout(() => cancelButtonRef.current?.focus(), 0);
                      } else {
                        handleValidateOrErrorOgSetLoggId();
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
                      {!validating &&
                        analyse &&
                        !analyseError &&
                        hasChecked && (
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            {!hasChecked ? (
              <>
                <Button
                  type='button'
                  onClick={handleValidateOrErrorOgSetLoggId}
                  loading={validating}
                  disabled={baseInvalid || validating}
                >
                  Sjekk teksten for meg
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
              </>
            ) : (
              <>
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
              </>
            )}
          </Modal.Footer>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default InnleggModal;
