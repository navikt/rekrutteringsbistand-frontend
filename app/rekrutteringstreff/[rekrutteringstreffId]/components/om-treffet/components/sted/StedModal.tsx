import { RekbisError } from '../../../../../../../util/rekbisError';
import { usePamPostdata } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import {
  oppdaterRekrutteringstreff,
  toOppdaterRekrutteringstreffDto,
} from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { BodyShort, Button, Modal, TextField } from '@navikt/ds-react';
import React, { useId } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const FormFields = {
  GATEADRESSE: 'gateadresse',
  POSTNUMMER: 'postnummer',
  POSTSTED: 'poststed',
} as const;

const stedSchema = z.object({
  [FormFields.GATEADRESSE]: z
    .string()
    .trim()
    .min(1, 'Gateadresse må fylles ut'),
  [FormFields.POSTNUMMER]: z
    .string()
    .trim()
    .min(1, 'Postnummer må fylles ut')
    .regex(/^\d{4}$/, 'Postnummer må bestå av 4 siffer'),
  [FormFields.POSTSTED]: z.string().trim().min(1, 'Poststed må fylles ut'),
});

type StedFormFields = z.infer<typeof stedSchema>;

interface StedModalProps {
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

const StedModal: React.FC<StedModalProps> = ({
  rekrutteringstreff,
  onUpdated,
  modalRef,
}) => {
  const {
    id,
    gateadresse = '',
    postnummer = '',
    poststed = '',
  } = rekrutteringstreff;
  const formId = useId();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    setError,
    watch,
    trigger,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<StedFormFields>({
    resolver: zodResolver(stedSchema),
    defaultValues: {
      gateadresse: gateadresse ?? '',
      postnummer: postnummer ?? '',
      poststed: poststed ?? '',
    },
    mode: 'onBlur',
  });

  const watchPostnummer = watch(FormFields.POSTNUMMER);
  const { data: postdata, isLoading } = usePamPostdata(watchPostnummer);

  React.useEffect(() => {
    if (watchPostnummer.length !== 4 || isLoading) return;

    if (postdata?.korrigertNavnBy) {
      setValue(FormFields.POSTSTED, postdata.korrigertNavnBy, {
        shouldDirty: true,
        shouldValidate: true,
      });
      clearErrors(FormFields.POSTSTED);
    } else {
      setValue(FormFields.POSTSTED, '', {
        shouldDirty: true,
        shouldValidate: true,
      });
      setError(FormFields.POSTSTED, {
        type: 'manual',
        message: 'Ukjent poststed',
      });
    }
  }, [watchPostnummer, isLoading, postdata, setValue, setError, clearErrors]);

  const close = () => {
    modalRef.current?.close();
    reset();
  };

  const submit: SubmitHandler<StedFormFields> = async (values) => {
    try {
      await oppdaterRekrutteringstreff(
        id,
        toOppdaterRekrutteringstreffDto({
          ...rekrutteringstreff,
          gateadresse: values.gateadresse,
          postnummer: values.postnummer,
          poststed: values.poststed,
        }),
      );
      onUpdated();
      close();
    } catch (err) {
      new RekbisError({
        beskrivelse: 'Feil ved oppdatering av sted:',
        error: err,
      });
    }
  };

  const harStedsinfo = !!gateadresse || !!postnummer || !!poststed;

  return (
    <Modal
      ref={modalRef}
      header={{ heading: harStedsinfo ? 'Endre sted' : 'Legg til sted' }}
      width={400}
      onClose={close}
      key={`nytt-sted-modal-${id}-${postnummer}-${gateadresse}`}
    >
      <Modal.Body>
        <form id={formId} onSubmit={handleSubmit(submit)} className='space-y-4'>
          <Controller
            name={FormFields.GATEADRESSE}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Gateadresse'
                error={fieldState.error?.message}
                autoFocus
              />
            )}
          />
          <div className='flex gap-4'>
            <Controller
              name={FormFields.POSTNUMMER}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Postnummer'
                  htmlSize={12}
                  error={fieldState.error?.message}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    clearErrors([FormFields.POSTNUMMER, FormFields.POSTSTED]);
                    setValue(FormFields.POSTSTED, '', {
                      shouldDirty: false,
                      shouldValidate: true,
                    });
                    if (value.length <= 4) field.onChange(value);
                    if (value.length === 4) trigger();
                  }}
                />
              )}
            />
            <BodyShort
              className={`pt-8 ${watch(FormFields.POSTSTED) ? '' : 'aksel-error-message'}`}
            >
              {watch(FormFields.POSTSTED) ||
                (watchPostnummer.length === 4 && !isLoading
                  ? 'Ukjent poststed'
                  : '')}
            </BodyShort>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          form={formId}
          type='submit'
          loading={isSubmitting}
          disabled={!isDirty || !isValid || isSubmitting}
        >
          Lagre
        </Button>
        <Button variant='secondary' onClick={close}>
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StedModal;
