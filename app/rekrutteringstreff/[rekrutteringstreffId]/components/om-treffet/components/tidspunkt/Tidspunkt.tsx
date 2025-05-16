'use client';

import RekrutteringstreffDetalj from '../../../RekrutteringstreffDetalj';
import Tidspunktrad from './Tidspunktrad';
import { rekrutteringstreffVarighet } from './varighet';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import type { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { formaterNorskDato } from '@/app/components/util';
import {
  CalendarIcon,
  ExclamationmarkTriangleIcon,
  PencilIcon,
  PlusIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Button, ErrorMessage, Modal } from '@navikt/ds-react';
import { addWeeks, format, isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

export type TidspunktFormFields = {
  fraDato: Date | null;
  fraTid: string;
  tilDato: Date | null;
  tilTid: string;
};

type Props = {
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
  className?: string;
};

const formaterKlokkeslett = (dato: Date | null): string =>
  dato ? format(dato, 'HH:mm') : '';

export default function Tidspunkt({
  rekrutteringstreff,
  onUpdated,
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  const initialFra = rekrutteringstreff.fraTid
    ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
    : null;
  const initialTil = rekrutteringstreff.tilTid
    ? toZonedTime(parseISO(rekrutteringstreff.tilTid), 'Europe/Oslo')
    : null;

  const methods = useForm<TidspunktFormFields>({
    defaultValues: {
      fraDato: initialFra ?? addWeeks(new Date(), 2),
      fraTid: formaterKlokkeslett(initialFra) || '08:00',
      tilDato: initialTil ?? addWeeks(new Date(), 2),
      tilTid: formaterKlokkeslett(initialTil) || '10:00',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;

  const [fraDato, fraTid, tilDato, tilTid] = useWatch({
    control: methods.control,
    name: ['fraDato', 'fraTid', 'tilDato', 'tilTid'],
  });

  const varighet = useMemo(
    () => rekrutteringstreffVarighet(fraDato, fraTid, tilDato, tilTid),
    [fraDato, fraTid, tilDato, tilTid],
  );

  const periodUgyldig = useMemo(
    () => varighet.startsWith('-') || varighet === '0 min',
    [varighet],
  );

  useEffect(() => {
    const erUgyldigPeriode =
      varighet && (varighet.startsWith('-') || varighet === '0 min');

    if (erUgyldigPeriode) {
      if (errors.root?.type !== 'manualPeriod') {
        setError('root', {
          type: 'manualPeriod',
          message: 'Sluttidspunkt kan ikke være før eller lik starttidspunkt.',
        });
      }
      if (errors.tilDato?.type !== 'visualCueOnly') {
        setError('tilDato', { type: 'visualCueOnly' });
      }
      if (errors.tilTid?.type !== 'visualCueOnly') {
        setError('tilTid', { type: 'visualCueOnly' });
      }
    } else {
      if (errors.root?.type === 'manualPeriod') {
        clearErrors('root');
      }
      if (errors.tilDato?.type === 'visualCueOnly') {
        clearErrors('tilDato');
      }
      if (errors.tilTid?.type === 'visualCueOnly') {
        clearErrors('tilTid');
      }
    }
  }, [
    varighet,
    setError,
    clearErrors,
    errors.root,
    errors.tilDato,
    errors.tilTid,
  ]);

  const onSubmit = async (data: TidspunktFormFields) => {
    if (periodUgyldig) return;

    setOpen(false);

    const { tittel, beskrivelse, sted } = rekrutteringstreff;

    await oppdaterRekrutteringstreff(rekrutteringstreff.id, {
      tittel,
      beskrivelse,
      sted,
      fraTid: toIso(data.fraDato!, data.fraTid),
      tilTid: toIso(data.tilDato!, data.tilTid),
    });
    onUpdated();
  };

  const close = () => {
    setOpen(false);
    clearErrors();
  };

  const formId = 'tidspunktForm';

  return (
    <>
      <RekrutteringstreffDetalj
        className={className}
        tittelIkon={<CalendarIcon fontSize='1.5rem' />}
        tittel='Tidspunkt'
        knapp={
          <Button
            variant='tertiary'
            size='small'
            icon={initialFra ? <PencilIcon /> : <PlusIcon />}
            onClick={() => setOpen(true)}
          >
            {initialFra ? 'Endre' : 'Legg til'}
          </Button>
        }
      >
        {initialFra && initialTil ? (
          isSameDay(initialFra, initialTil) ? (
            <BodyShort size='small'>
              {formaterNorskDato({ dato: initialFra, visning: 'tall' })}{' '}
              <BodyShort as='span' size='small' textColor='subtle'>
                kl {formaterKlokkeslett(initialFra)}-
                {formaterKlokkeslett(initialTil)}
              </BodyShort>
            </BodyShort>
          ) : (
            <>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: initialFra, visning: 'tall' })}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {formaterKlokkeslett(initialFra)}
                </BodyShort>{' '}
                til
              </BodyShort>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: initialTil, visning: 'tall' })}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {formaterKlokkeslett(initialTil)}
                </BodyShort>
              </BodyShort>
            </>
          )
        ) : (
          <BodyShort size='small' textColor='subtle'>
            &nbsp;
          </BodyShort>
        )}
      </RekrutteringstreffDetalj>

      <Modal
        open={open}
        width={420}
        onClose={close}
        header={{ heading: 'Velg tidspunkt' }}
      >
        <Modal.Body>
          <FormProvider {...methods}>
            <form
              id={formId}
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-4 p-2'
            >
              <Tidspunktrad label='Fra' nameDato='fraDato' nameTid='fraTid' />
              <Tidspunktrad label='Til' nameDato='tilDato' nameTid='tilTid' />

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
              ) : (
                <BodyShort size='small' textColor='subtle' className='mt-2'>
                  {varighet && !periodUgyldig ? varighet : 'Velg tid'}
                </BodyShort>
              )}
            </form>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer className='pt-1'>
          <Button
            type='submit'
            form={formId}
            disabled={periodUgyldig}
            loading={isSubmitting}
          >
            Lagre
          </Button>
          <Button variant='secondary' type='button' onClick={close}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const toIso = (d: Date, t: string) => {
  const [h, m] = t.split(':').map(Number);
  const copy = new Date(d);
  copy.setHours(h, m, 0, 0);
  return copy.toISOString();
};
