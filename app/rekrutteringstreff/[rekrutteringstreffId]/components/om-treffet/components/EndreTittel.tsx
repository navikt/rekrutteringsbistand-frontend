import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { ExclamationmarkTriangleIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, Modal, Textarea, ErrorMessage } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import React, { useEffect, KeyboardEvent, useRef } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

export interface EndreTittelProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
}

interface FormValues {
  nyTittel: string;
}

const EndreTittel: React.FC<EndreTittelProps> = ({
  modalRef,
  rekrutteringstreff,
  onUpdated,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      nyTittel: rekrutteringstreff?.tittel || '',
    },
  });

  const maksAntallTegn = 30;

  const nyTittelValue = watch('nyTittel');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    clearErrors();

    if (!rekrutteringstreff) {
      setError('root', {
        type: 'manual',
        message: 'Data for rekrutteringstreff mangler.',
      });
      return;
    }
    if (data.nyTittel.trim() === '') {
      setError('root', {
        type: 'required',
        message: 'Tittel kan ikke være tom.',
      });
      return;
    }
    if (data.nyTittel.length > maksAntallTegn) {
      setError('root', {
        type: 'maxLength',
        message: 'Tittelen kan ikke være lenger enn 30 tegn.',
      });
      return;
    }

    try {
      const { id, beskrivelse, sted, fraTid, tilTid } = rekrutteringstreff;
      await oppdaterRekrutteringstreff(id, {
        tittel: data.nyTittel,
        beskrivelse,
        sted,
        fraTid,
        tilTid,
      });
      onUpdated();
      modalRef.current?.close();
    } catch (error) {
      logger.error('Lagring av tittel feilet:', error);
      setError('root', {
        type: 'api',
        message: 'Lagring av tittel feilet. Prøv igjen.',
      });
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0 && nyTittelValue.trim() !== '') {
      clearErrors();
    }

    const textareaElement = wrapperRef.current?.querySelector('textarea');
    if (textareaElement) {
      textareaElement.style.paddingRight = '1.5rem';
    }
  }, [nyTittelValue, clearErrors, errors]);

  const handleClearTittel = () => {
    setValue('nyTittel', '', { shouldValidate: false });
    clearErrors(); //
    wrapperRef.current?.querySelector('textarea')?.focus();
  };

  const handleCloseModal = () => {
    modalRef.current?.close();
    reset({ nyTittel: rekrutteringstreff.tittel || '' });
    clearErrors();
  };

  const handleTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (
        !(
          nyTittelValue.trim() === '' ||
          nyTittelValue.length > maksAntallTegn ||
          isSubmitting
        )
      ) {
        handleSubmit(onSubmit)();
      }
    }
  };

  const errorMessageToDisplay =
    errors.root?.message || errors.nyTittel?.message;

  return (
    <div>
      <Modal
        ref={modalRef}
        header={{ heading: 'Endre navn på treffet' }}
        width={400}
        onClose={handleCloseModal}
      >
        <Modal.Body>
          <form id='skjema-endre-tittel' onSubmit={handleSubmit(onSubmit)}>
            <div
              ref={wrapperRef}
              className='relative w-full endre-tittel-input-wrapper'
            >
              <Controller
                name='nyTittel'
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label='Ny tittel'
                    hideLabel
                    maxLength={maksAntallTegn}
                    className='w-full pt-2'
                    autoFocus
                    minRows={1}
                    maxRows={1}
                    rows={1}
                    onKeyDown={handleTextareaKeyDown}
                    resize={false}
                  />
                )}
              />
              {nyTittelValue && nyTittelValue.length > 0 && (
                <Button
                  type='button'
                  onClick={handleClearTittel}
                  icon={<XMarkIcon title='Tøm feltet' fontSize='1.25rem' />}
                  variant='tertiary'
                  size='small'
                  className='absolute right-1 top-1/6 p-1'
                  aria-label='Tøm tittel feltet'
                />
              )}
            </div>

            <div className='h-6 mt-2 ml-1'>
              {' '}
              {errorMessageToDisplay && (
                <div className='flex items-start mt-1'>
                  <ExclamationmarkTriangleIcon
                    aria-hidden
                    fontSize='1.25rem'
                    className='aksel-error-message mr-1 '
                  />
                  <ErrorMessage size='small' id='general-error-text'>
                    {errorMessageToDisplay}
                  </ErrorMessage>
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='submit'
            form='skjema-endre-tittel'
            loading={isSubmitting}
            disabled={nyTittelValue.length > maksAntallTegn || isSubmitting}
          >
            Lagre
          </Button>
          <Button type='button' variant='secondary' onClick={handleCloseModal}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EndreTittel;
