import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { ExclamationmarkTriangleIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, Modal, TextField, ErrorMessage } from '@navikt/ds-react';
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

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const nyTittelValue = watch('nyTittel');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!rekrutteringstreff) {
      setError('root', {
        type: 'manual',
        message: 'Data for rekrutteringstreff mangler.',
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
      reset({ nyTittel: rekrutteringstreff?.tittel || '' });
      modalRef.current?.close();
    } catch (error) {
      logger.error('Lagring av tittel feilet:', error);
      setError('root', {
        type: 'api',
        message: 'Lagring av tittel feilet.',
      });
    }
  };

  const handleClearTittel = () => {
    setValue('nyTittel', '', { shouldValidate: true });
  };

  useEffect(() => {
    const inputElement = wrapperRef?.current?.querySelector<HTMLInputElement>(
      '.aksel-text-field__input',
    );
    if (inputElement) {
      inputElement.style.paddingRight = '2rem';
    }
  }, [nyTittelValue]);

  const handleCloseModal = () => {
    modalRef.current?.close();
    reset({ nyTittel: rekrutteringstreff?.tittel || '' });
    clearErrors('root');
  };

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

            {errors.root?.message ||
              (errors.nyTittel?.message ? (
                <div className='flex items-start mt-2 ml-1'>
                  <ExclamationmarkTriangleIcon
                    aria-hidden
                    fontSize='1.25rem'
                    className='aksel-error-message mr-1 mt-0.5'
                  />
                  <ErrorMessage size='medium' id='error-text'>
                    {errors.root?.message
                      ? errors.root.message
                      : errors.nyTittel.message}
                  </ErrorMessage>
                </div>
              ) : (
                <div className='flex items-start mt-2 ml-1'>&nbsp;</div>
              ))}
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
