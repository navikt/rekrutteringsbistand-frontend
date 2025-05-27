import RekrutteringstreffDetalj from '../../RekrutteringstreffDetalj';
import { usePamPostdata } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocationPinIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Modal, TextField } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import * as React from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

const stedSchema = z.object({
  gateadresse: z.string().trim().min(1, 'Gateadresse må fylles ut'),
  postnummer: z
    .string()
    .trim()
    .min(1, 'Postnummer må fylles ut')
    .regex(/^\d{4}$/, 'Postnummer må bestå av 4 siffer'),
  poststed: z.string().optional(),
});

const formId = 'skjema-endre-sted';

export type StedFormFields = z.infer<typeof stedSchema>;

export interface StedProps {
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
  className?: string;
}

const Sted: React.FC<StedProps> = ({
  rekrutteringstreff,
  className,
  onUpdated,
}) => {
  const modalRef = React.useRef<HTMLDialogElement>(null);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<StedFormFields>({
    resolver: zodResolver(stedSchema),
    defaultValues: {
      gateadresse: rekrutteringstreff.gateadresse || '',
      postnummer: rekrutteringstreff.postnummer || '',
      poststed: '',
    },
    mode: 'onChange',
  });

  const harStedsinfo =
    !!rekrutteringstreff.gateadresse || !!rekrutteringstreff.postnummer;

  const postnummerValue = useWatch({
    control,
    name: 'postnummer',
  });

  const { data: postdata, isLoading: postdataLoading } =
    usePamPostdata(postnummerValue);

  React.useEffect(() => {
    if (postdata && postdata.korrigertNavnBy) {
      setValue('poststed', postdata.korrigertNavnBy, {
        shouldValidate: true,
        shouldDirty: true, // Vurder shouldDirty: false hvis dette ikke skal påvirke om skjemaet er "endret" kun av oppslag
      });
    } else if (
      postnummerValue &&
      postnummerValue.length === 4 &&
      !postdata &&
      !postdataLoading
    ) {
      setValue('poststed', '', { shouldValidate: true, shouldDirty: true });
    }
  }, [postdata, postnummerValue, postdataLoading, setValue]);

  const åpneModal = () => {
    reset({
      gateadresse: rekrutteringstreff.gateadresse || '',
      postnummer: rekrutteringstreff.postnummer || '',
      poststed: '',
    });
    modalRef.current?.showModal();
  };

  const close = () => {
    reset({
      gateadresse: rekrutteringstreff.gateadresse || '',
      postnummer: rekrutteringstreff.postnummer || '',
      poststed: '',
    });
    modalRef.current?.close();
  };

  const handleLukkModalFraKnapp = () => {
    modalRef.current?.close();
    close();
  };

  const onSubmit = async (data: StedFormFields) => {
    const { tittel, beskrivelse, fraTid, tilTid } = rekrutteringstreff;

    try {
      await oppdaterRekrutteringstreff(rekrutteringstreff.id, {
        tittel,
        beskrivelse,
        gateadresse: data.gateadresse,
        postnummer: data.postnummer,
        fraTid,
        tilTid,
      });
      onUpdated();
      handleLukkModalFraKnapp();
    } catch (error) {
      logger.error('Feil ved oppdatering av sted:', error);
    }
  };

  const disableSave = !isDirty || !isValid || isSubmitting;
  const poststedWatch = useWatch({ control, name: 'poststed' });

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
            onClick={åpneModal}
          >
            {harStedsinfo ? 'Endre' : 'Legg til'}
          </Button>
        }
        className={className}
      >
        {harStedsinfo && (
          <>
            <BodyShort size='small'>{rekrutteringstreff.gateadresse}</BodyShort>
            {rekrutteringstreff.postnummer && (
              <BodyShort size='small' textColor='subtle'>
                {rekrutteringstreff.postnummer}
                {poststedWatch ? ` ${poststedWatch}` : ''}
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
      >
        <Modal.Body>
          <form
            id={formId}
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <Controller
              name='gateadresse'
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
            <div className='flex flex-row gap-4 items-start'>
              <div>
                <Controller
                  name='postnummer'
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      htmlSize={12}
                      label='Postnummer'
                      error={fieldState.error?.message}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 4) {
                          field.onChange(value);
                        }
                      }}
                    />
                  )}
                />
              </div>
              <div className='flex-1 pt-2'>
                <BodyShort className='mt-6'>
                  {(!postdataLoading && poststedWatch) ||
                    (postnummerValue && postnummerValue.length === 4
                      ? 'Ukjent poststed'
                      : '')}
                </BodyShort>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className='pt-2'>
          <Button
            type='submit'
            form={formId}
            loading={isSubmitting}
            disabled={disableSave}
          >
            Lagre
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={handleLukkModalFraKnapp}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Sted;
