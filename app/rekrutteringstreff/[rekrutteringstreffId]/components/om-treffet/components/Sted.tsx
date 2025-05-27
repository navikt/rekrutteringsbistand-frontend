import RekrutteringstreffDetalj from '../../RekrutteringstreffDetalj';
import { usePamPostdata } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocationPinIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Modal, TextField } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import React, { useEffect, useId, useMemo, useRef } from 'react';
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

interface StedProps {
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
  className?: string;
}

const Sted: React.FC<StedProps> = ({
  rekrutteringstreff,
  onUpdated,
  className,
}) => {
  const {
    id,
    gateadresse = '',
    postnummer = '',
    poststed = '',
    tittel,
    beskrivelse,
    fraTid,
    tilTid,
  } = rekrutteringstreff;

  const formId = useId();
  const modalRef = useRef<HTMLDialogElement>(null);

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

  useEffect(() => {
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

  const harStedsinfo = useMemo(
    () => !!gateadresse || !!postnummer || !!poststed,
    [gateadresse, postnummer, poststed],
  );

  const open = () => {
    reset({
      gateadresse: gateadresse ?? '',
      postnummer: postnummer ?? '',
      poststed: poststed ?? '',
    });
    modalRef.current?.showModal();
  };
  const close = () => {
    modalRef.current?.close();
    reset();
  };

  const submit: SubmitHandler<StedFormFields> = async ({
    gateadresse: nyGateadresse,
    postnummer: nyttPostnummer,
    poststed: nyttPoststed,
  }) => {
    try {
      await oppdaterRekrutteringstreff(id, {
        tittel,
        beskrivelse,
        gateadresse: nyGateadresse,
        postnummer: nyttPostnummer,
        poststed: nyttPoststed,
        fraTid,
        tilTid,
      });
      onUpdated();
      close();
    } catch (err) {
      logger.error('Feil ved oppdatering av sted:', err);
    }
  };

  return (
    <>
      <RekrutteringstreffDetalj
        tittelIkon={<LocationPinIcon fontSize='1.5rem' />}
        tittel='Sted'
        knapp={
          <Button
            icon={harStedsinfo ? <PencilIcon /> : <PlusIcon />}
            variant='tertiary'
            size='small'
            onClick={open}
          >
            {harStedsinfo ? 'Endre' : 'Legg til'}
          </Button>
        }
        className={className}
      >
        {harStedsinfo && (
          <>
            {gateadresse && <BodyShort size='small'>{gateadresse}</BodyShort>}
            {(postnummer || poststed) && (
              <BodyShort size='small' textColor='subtle'>
                {postnummer}
                {poststed ? ` ${poststed}` : ''}
              </BodyShort>
            )}
          </>
        )}
      </RekrutteringstreffDetalj>

      <Modal
        ref={modalRef}
        header={{ heading: harStedsinfo ? 'Endre sted' : 'Legg til sted' }}
        width={400}
        onClose={close}
        key={`nytt-sted-modal-${id}-${postnummer}-${gateadresse}`}
      >
        <Modal.Body>
          <form
            id={formId}
            onSubmit={handleSubmit(submit)}
            className='space-y-4'
          >
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
    </>
  );
};

export default Sted;
