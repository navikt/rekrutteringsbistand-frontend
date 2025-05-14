import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { ExclamationmarkTriangleIcon, XMarkIcon } from '@navikt/aksel-icons';
import {
  Button,
  Modal,
  TextField,
  ErrorMessage,
  Loader,
} from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import React, { useEffect } from 'react';
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
    mode: 'onChange',
  });

  const nyTittelValue = watch('nyTittel');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!rekrutteringstreff) {
      setError('root', {
        type: 'manual',
        message: 'Kan ikke lagre, data for rekrutteringstreff mangler.',
      });
      return;
    }
    clearErrors('root');
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
        message: 'Lagring av tittel feilet. Prøv igjen senere.',
      });
    }
  };

  const handleClearTittel = () => {
    setValue('nyTittel', '', { shouldValidate: true });
  };

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inputElement = wrapperRef?.current?.querySelector<HTMLInputElement>(
      '.aksel-text-field__input',
    );
    if (inputElement) {
      const harVerdi = nyTittelValue && nyTittelValue.length > 0;
      inputElement.style.paddingRight = harVerdi ? '2.5rem' : '0.75rem';
    }
  }, [nyTittelValue]);

  const handleCloseModal = () => {
    modalRef.current?.close();
    reset({ nyTittel: rekrutteringstreff?.tittel || '' });
    clearErrors('root');
  };

  if (!rekrutteringstreff && modalRef.current?.open) {
    return (
      <Modal ref={modalRef} header={{ heading: 'Laster...' }} width={400}>
        <Modal.Body>
          <Loader size='xlarge' />
        </Modal.Body>
      </Modal>
    );
  }
  if (!rekrutteringstreff) {
    return null;
  }
  return (
    <div className='py-12'>
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
                rules={{
                  required: 'Tittel kan ikke være tom',
                  maxLength: {
                    value: 30,
                    message: 'Tittelen kan ikke være lenger enn 30 tegn',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Ny tittel'
                    hideLabel
                    className='w-full'
                    error={!!errors.nyTittel?.message}
                    aria-describedby={
                      errors.nyTittel?.message
                        ? 'nyTittel-error-text'
                        : errors.root?.message
                          ? 'root-error-text'
                          : undefined
                    }
                    autoFocus
                  />
                )}
              />
              {nyTittelValue && nyTittelValue.length > 0 && (
                <Button
                  type='button'
                  onClick={handleClearTittel}
                  icon={<XMarkIcon title='Tøm feltet' />}
                  variant='tertiary'
                  size='small'
                  className='absolute !right-1 !top-1/2 !-translate-y-1/2'
                />
              )}
            </div>

            <div className='h-6 mt-2 ml-1'>
              {errors.nyTittel?.message && (
                <div className='flex items-start'>
                  <ExclamationmarkTriangleIcon
                    aria-hidden
                    fontSize='1.25rem'
                    className='text-red-600 mr-1 mt-0.5'
                  />
                  <ErrorMessage size='small' id='nyTittel-error-text'>
                    {errors.nyTittel.message}
                  </ErrorMessage>
                </div>
              )}
            </div>

            {errors.root?.message && (
              <div className='flex items-start mt-2 ml-1'>
                <ExclamationmarkTriangleIcon
                  aria-hidden
                  fontSize='1.25rem'
                  className='text-red-600 mr-1 mt-0.5'
                />
                <ErrorMessage size='small' id='root-error-text'>
                  {errors.root.message}
                </ErrorMessage>
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='submit'
            form='skjema-endre-tittel'
            loading={isSubmitting}
            disabled={!!errors.nyTittel || !!errors.root}
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
