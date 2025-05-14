import { XMarkIcon } from '@navikt/aksel-icons';
import { Button, Modal, TextField } from '@navikt/ds-react';
import * as React from 'react';
import { useEffect } from 'react';
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
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      nyTittel: tittel,
    },
    mode: 'onChange',
  });

  // Oppdater skjemaets defaultVerdi hvis den eksterne 'tittel'-propen endres
  useEffect(() => {
    reset({ nyTittel: tittel });
  }, [tittel, reset]);

  const onSubmit: SubmitHandler<FormValues> = async () => {
    //(data.nyTittel);
    modalRef.current?.close();
  };

  const handleClearTittel = () => {
    setValue('nyTittel', '', { shouldValidate: true }); // Tømmer feltet og kan trigge validering
  };

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Denne useEffecten forblir for å style det indre input-feltet
  useEffect(() => {
    const inputElement = wrapperRef?.current?.querySelector<HTMLInputElement>(
      '.aksel-text-field__input',
    );
    if (inputElement) {
      // Juster padding basert på om X-knappen vises (dvs. om feltet har verdi)
      const harVerdi =
        control._formValues.nyTittel && control._formValues.nyTittel.length > 0;
      inputElement.style.paddingRight = harVerdi ? '2.5rem' : '0.75rem'; // Eksempelverdier
    }
  }, [control._formValues.nyTittel]); // Kjør når tittelen endres for å justere padding

  return (
    <div className='py-12'>
      <Modal
        ref={modalRef}
        header={{ heading: 'Endre navn på treffet' }}
        width={400}
        onClose={() => reset({ nyTittel: tittel })} // Tilbakestill skjemaet ved lukking
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
                    value: 30, // Eksempel på validering
                    message: 'Tittelen kan ikke være lenger enn 30 tegn',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Ny tittel'
                    hideLabel
                    className='w-full'
                    error={errors.nyTittel?.message}
                    autoFocus
                  />
                )}
              />
              {control._formValues.nyTittel && ( // Sjekk verdien fra RHF
                <Button
                  type='button'
                  onClick={handleClearTittel}
                  icon={<XMarkIcon title='Tøm feltet' />}
                  variant='tertiary'
                  size='small'
                  className='absolute !right-1 !top-1/2 !-translate-y-1/2' // Justert for å passe bedre
                />
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='submit'
            form='skjema-endre-tittel'
            loading={isSubmitting}
          >
            Lagre
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => {
              modalRef.current?.close();
              reset({ nyTittel: tittel }); // Tilbakestill også ved manuell avbryt
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
