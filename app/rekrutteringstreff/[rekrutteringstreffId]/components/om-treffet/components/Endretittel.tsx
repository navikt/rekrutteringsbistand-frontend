import { ExclamationmarkTriangleIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Button, Modal, TextField, ErrorMessage } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

export interface EndreTittelProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  tittel: string;
}

interface FormValues {
  nyTittel: string;
}

const EndreTittel: React.FC<EndreTittelProps> = ({ modalRef, tittel }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      nyTittel: tittel,
    },
    mode: 'onChange',
  });

  const nyTittelValue = watch('nyTittel');

  useEffect(() => {
    reset({ nyTittel: tittel });
  }, [tittel, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (/*data*/) => {
    //await onSave(data.nyTittel);
    modalRef.current?.close();
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

  return (
    <div className='py-12'>
      <Modal
        ref={modalRef}
        header={{ heading: 'Endre navn på treffet' }}
        width={400}
        onClose={() => reset({ nyTittel: tittel })}
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
                  className='absolute right-1 top-1/2 -translate-y-1/2'
                />
              )}
            </div>

            <div className='h-6 mt-4 '>
              {errors.nyTittel?.message && (
                <div className='flex items-center gap-1'>
                  <ExclamationmarkTriangleIcon
                    aria-hidden
                    fontSize='1.5rem'
                    className='aksel-error-message'
                  />
                  <ErrorMessage size='medium' id='nyTittel-error-text'>
                    {errors.nyTittel.message}
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
            disabled={errors.nyTittel !== undefined}
          >
            Lagre
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => {
              modalRef.current?.close();
              reset({ nyTittel: tittel });
            }}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EndreTittel;
