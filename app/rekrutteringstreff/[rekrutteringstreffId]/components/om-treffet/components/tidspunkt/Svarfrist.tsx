import RekrutteringstreffDetalj from '../../../RekrutteringstreffDetalj';
import DatoTidRad from './DatoTidRad';
import { formaterKlokkeslett, toIso } from './utils';
import {
  oppdaterRekrutteringstreff,
  toOppdaterRekrutteringstreffDto,
} from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import type { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { Modal, Button, BodyShort, ErrorMessage } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { addWeeks, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { PlusIcon, TimerIcon } from 'lucide-react';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

export type SvarfristFormFields = {
  svarfristDato: Date | null;
  svarfristTid: string;
};

type Props = {
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
  className?: string;
};

export default function Svarfrist({
  rekrutteringstreff,
  onUpdated,
  className,
}: Props) {
  const modalRef = React.useRef<HTMLDialogElement>(null);

  const initialSvarfrist = rekrutteringstreff.svarfrist
    ? toZonedTime(parseISO(rekrutteringstreff.svarfrist), 'Europe/Oslo')
    : null;

  const methods = useForm<SvarfristFormFields>({
    defaultValues: {
      svarfristDato: initialSvarfrist ?? addWeeks(new Date(), 2),
      svarfristTid: formaterKlokkeslett(initialSvarfrist) || '12:00',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: SvarfristFormFields) => {
    if (!data.svarfristDato || !data.svarfristTid) {
      setError('root', {
        type: 'manual',
        message: 'Du må fylle ut både dato og klokkeslett for svarfrist.',
      });
      return;
    }

    try {
      await oppdaterRekrutteringstreff(
        rekrutteringstreff.id,
        toOppdaterRekrutteringstreffDto({
          ...rekrutteringstreff,
          svarfrist:
            data.svarfristDato && data.svarfristTid
              ? toIso(data.svarfristDato, data.svarfristTid)
              : null,
        }),
      );
      modalRef.current?.close();
      onUpdated();
    } catch (e) {
      setError('root', {
        type: 'manual',
        message: 'Kunne ikke lagre svarfrist. Prøv igjen.',
      });
      logger.error('Feil ved oppdatering av svarfrist:', e);
    }
  };

  const close = () => {
    modalRef.current?.close();
    clearErrors();
  };

  const formId = 'svarfristForm';

  return (
    <RekrutteringstreffDetalj
      tittelIkon={<TimerIcon fontSize='1.5rem' />}
      tittel='Svarfrist'
      knapp={
        <Button
          icon={<PlusIcon />}
          variant='tertiary'
          size='small'
          onClick={() => modalRef.current?.showModal()}
        >
          {rekrutteringstreff.svarfrist ? 'Endre' : 'Legg til'}
        </Button>
      }
      className={className}
    >
      <BodyShort size='small' className={className}>
        {rekrutteringstreff.svarfrist ? (
          toZonedTime(
            parseISO(rekrutteringstreff.svarfrist),
            'Europe/Oslo',
          ).toLocaleString('no-NO', {
            dateStyle: 'short',
            timeStyle: 'short',
          })
        ) : (
          <span></span>
        )}
      </BodyShort>

      <Modal
        ref={modalRef}
        onClose={close}
        header={{ heading: 'Velg svarfrist' }}
        width={320}
      >
        <Modal.Body>
          <FormProvider {...methods}>
            <form
              id={formId}
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-4 p-2'
            >
              <DatoTidRad<SvarfristFormFields>
                label=''
                nameDato='svarfristDato'
                nameTid='svarfristTid'
              />
              {errors.root?.message ? (
                <div className='flex items-center gap-1 mt-2'>
                  <ExclamationmarkTriangleIcon
                    aria-hidden
                    fontSize='1.5rem'
                    className='aksel-error-message mr-2'
                  />
                  <ErrorMessage size='medium'>
                    {errors.root.message}
                  </ErrorMessage>
                </div>
              ) : null}
            </form>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' form={formId} loading={isSubmitting}>
            Lagre
          </Button>
          <Button variant='secondary' type='button' onClick={close}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </RekrutteringstreffDetalj>
  );
}
