'use client';

import { RekbisError } from '../../../../../../../util/rekbisError';
import { formaterKlokkeslett } from '../tidspunkt/utils';
import type { InnleggDTO } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import {
  oppdaterEttInnlegg,
  OpprettEllerOppdaterInnleggDto,
  opprettInnleggForTreff,
} from '@/app/api/rekrutteringstreff/opprettEllerOppdaterInnlegg';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/tittelValidering/useValiderRekrutteringstreff';
import SVGDarkmode from '@/app/components/SVGDarkmode';
import RikTekstEditor from '@/app/components/rikteksteditor/RikTekstEditor';
import VisEditorTekst from '@/app/components/rikteksteditor/VisEditorTekst';
import { formaterNorskDato } from '@/app/components/util';
import RekrutteringstreffDetalj from '@/app/rekrutteringstreff/[rekrutteringstreffId]/components/RekrutteringstreffDetalj';
import InnleggPenDarkIkon from '@/public/ikoner/innlegg_pen-dark.svg';
import InnleggPenIkon from '@/public/ikoner/innlegg_pen.svg';
import {
  HandShakeHeartIcon,
  PencilIcon,
  PlusIcon,
  RobotFrownIcon,
  RobotIcon,
  RobotSmileIcon,
} from '@navikt/aksel-icons';
import {
  Alert,
  BodyLong,
  BodyShort,
  Box,
  Button,
  Detail,
  ErrorMessage,
  Heading,
  Label,
  Modal,
  Skeleton,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { isSameDay } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

export interface InnleggProps {
  rekrutteringstreffId: string;
  innlegg?: InnleggDTO;
  fra: Date | null;
  til: Date | null;
  onInnleggUpdated: () => void;
}

interface InnleggFormFields {
  htmlContent: string;
}

const SKELETON_LINES = 6;
const EDITOR_WRAPPER_ID = 'rediger-innlegg-htmlcontent';

const Innlegg: React.FC<InnleggProps> = ({
  rekrutteringstreffId,
  innlegg,
  fra,
  til,
  onInnleggUpdated,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
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

    const tekst = htmlContent?.trim();
    if (!tekst) {
      resetAnalyse();
      setHasValidatedCurrentContentSuccessfully(false);
      return;
    }
    setHasValidatedCurrentContentSuccessfully(false);
    validate({ tekst: tekst });
  };

  useEffect(() => {
    if (analyse && !validating && !analyseError) {
      if (!analyse.bryterRetningslinjer) {
        setHasValidatedCurrentContentSuccessfully(true);
      } else {
        setHasValidatedCurrentContentSuccessfully(false);
      }
    } else if (analyseError && !validating) {
      setHasValidatedCurrentContentSuccessfully(false);
    }
  }, [analyse, validating, analyseError]);

  useEffect(() => {
    reset({ htmlContent: innlegg?.htmlContent ?? '' });
    resetAnalyse();
    setHasValidatedCurrentContentSuccessfully(false);
    setEditorKey(Date.now());
    if (modalRef.current && !modalRef.current.open) {
      setIsClosingModal(false);
      setInitialFocusDone(false);
    }
  }, [innlegg, reset, resetAnalyse]);

  const onSubmitHandler: SubmitHandler<InnleggFormFields> = async (data) => {
    if (validating || !hasValidatedCurrentContentSuccessfully) {
      logger.warn(
        'Forsøkte å lagre innlegg uten vellykket validering eller mens validering pågikk.',
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
      modalRef.current?.close();
    } catch (error) {
      new RekbisError({ message: 'Feil ved lagring av innlegg:', error });
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
        range.collapse(false); // Flytt cursor til slutten
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    });
  };

  const openModal = () => {
    setIsClosingModal(false);
    reset({ htmlContent: innlegg?.htmlContent ?? '' });
    resetAnalyse();
    setInitialFocusDone(false);
    setHasValidatedCurrentContentSuccessfully(false);
    setEditorKey(Date.now());
    modalRef.current?.showModal();
  };

  const handleInitialModalFocus = () => {
    if (initialFocusDone || !modalRef.current?.open) return;
    focusEditor();
    setInitialFocusDone(true);
  };

  const handleModalClose = () => {
    reset({ htmlContent: innlegg?.htmlContent ?? '' });
    resetAnalyse();
    setIsClosingModal(false);
    setInitialFocusDone(false);
    setHasValidatedCurrentContentSuccessfully(false);
  };

  return (
    <div className='max-w-[64rem]'>
      <Heading level='2' size='medium' className='mb-4'>
        Innlegg
      </Heading>

      <RekrutteringstreffDetalj
        tittelIkon={<HandShakeHeartIcon fontSize='1.5rem' />}
        tittel='Om treffet'
        headingLevel='3'
        knapp={
          <Button
            icon={innlegg ? <PencilIcon /> : <PlusIcon />}
            variant='tertiary'
            size='small'
            onClick={openModal}
          >
            {innlegg ? 'Endre' : 'Legg til'}
          </Button>
        }
      >
        {!innlegg ? (
          <Box.New
            padding='0'
            borderRadius='xlarge'
            className='flex flex-col px-6'
          >
            <div className='flex'>
              <div className='flex-[4] mt-4'>
                <Label size='medium' spacing>
                  Her kan du skrive det første innlegget til jobbsøkerne.
                </Label>
                <BodyLong size='small' spacing>
                  Skap litt ekstra trygghet ved å forklare hva som vil skje.
                </BodyLong>
                <BodyLong size='small' spacing>
                  Husk at du kan lage flere nye innlegg helt frem til treffet
                  starter.
                </BodyLong>
              </div>
              <div className='flex-[1]'>
                <SVGDarkmode
                  light={InnleggPenIkon}
                  dark={InnleggPenDarkIkon}
                  alt='Illustrasjon av en penn'
                />
              </div>
            </div>
          </Box.New>
        ) : (
          <Box.New borderRadius='xlarge' className='mb-2 ml-12'>
            <div className='flex justify-between items-start mb-2'>
              <Label size='small' as='p' textColor='subtle'>
                {innlegg.opprettetAvPersonNavn ||
                  innlegg.opprettetAvPersonNavident}
                {innlegg.opprettetAvPersonBeskrivelse &&
                  ` - ${innlegg.opprettetAvPersonBeskrivelse}`}
              </Label>
            </div>

            {fra && til && (
              <Detail spacing>
                Treffet er:{' '}
                {isSameDay(fra, til)
                  ? `${formaterNorskDato({ dato: fra, visning: 'tall' })} kl ${formaterKlokkeslett(fra)} - ${formaterKlokkeslett(til)}`
                  : `${formaterNorskDato({ dato: fra, visning: 'tall' })} kl ${formaterKlokkeslett(fra)} - ${formaterNorskDato({ dato: til, visning: 'tall' })} kl ${formaterKlokkeslett(til)}`}
              </Detail>
            )}

            <div className='prose prose-sm max-w-none mt-4'>
              <VisEditorTekst htmlTekst={innlegg.htmlContent} />
            </div>
          </Box.New>
        )}
      </RekrutteringstreffDetalj>

      <Modal
        ref={modalRef}
        placement='top'
        header={{ heading: innlegg ? 'Endre innlegg' : 'Skriv nytt innlegg' }}
        onClose={handleModalClose}
        width='medium'
        onFocus={handleInitialModalFocus}
      >
        <FormProvider {...methods}>
          <form id='innlegg-form' onSubmit={handleSubmit(onSubmitHandler)}>
            <Modal.Body>
              <div className='flex flex-col gap-6'>
                <BodyShort>
                  Dette innlegget vises til jobbsøkerne før treffet. Skriv
                  gjerne en hyggelig introduksjon og praktisk informasjon.
                </BodyShort>

                <div
                  tabIndex={-1}
                  onBlur={() =>
                    setTimeout(() => {
                      if (isClosingModal || !modalRef.current?.open) {
                        return;
                      }

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
                    onChange={(html) => {
                      setValue('htmlContent', html, {
                        shouldValidate: false,
                        shouldDirty: true,
                      });
                    }}
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

                {/* Valideringsseksjon */}
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
    </div>
  );
};

export default Innlegg;
