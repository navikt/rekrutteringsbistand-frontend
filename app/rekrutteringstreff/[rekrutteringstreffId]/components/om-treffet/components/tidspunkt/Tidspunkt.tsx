import { formaterNorskDato } from '../../../../../../components/util';
import RekrutteringstreffDetalj from '../../../RekrutteringstreffDetalj';
import Tidspunktrad from './tidspunktrad';
import { rekrutteringstreffVarighet } from './varighet';
import {
  oppdaterRekrutteringstreff,
  OppdaterRekrutteringstreffDTO,
} from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import {
  RekrutteringstreffDTO,
  useRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { CalendarIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Popover } from '@navikt/ds-react';
import { format, isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type FormData = {
  fraDato: Date | null;
  fraTid: string;
  tilDato: Date | null;
  tilTid: string;
  root?: string;
};

interface Props {
  rekrutteringstreff: RekrutteringstreffDTO;
  className?: string;
}

export default function Tidspunkt({ rekrutteringstreff, className }: Props) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const treff = useRekrutteringstreff(rekrutteringstreff.id);

  const initialFra = rekrutteringstreff.fraTid
    ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
    : null;
  const initialTil = rekrutteringstreff.tilTid
    ? toZonedTime(parseISO(rekrutteringstreff.tilTid), 'Europe/Oslo')
    : null;

  const methods = useForm<FormData>({
    defaultValues: {
      fraDato: initialFra,
      fraTid: initialFra ? format(initialFra, 'HH:mm') : '08:00',
      tilDato: initialTil,
      tilTid: initialTil ? format(initialTil, 'HH:mm') : '10:00',
    },
  });

  const { handleSubmit, setError, watch, formState } = methods;
  const w = watch();
  const varighet = rekrutteringstreffVarighet(
    w.fraDato,
    w.fraTid,
    w.tilDato,
    w.tilTid,
  );

  const onSubmit = async ({ fraDato, fraTid, tilDato, tilTid }: FormData) => {
    if (!fraDato || !tilDato) {
      setError('fraDato', { message: 'Obligatorisk' });
      setError('tilDato', { message: 'Obligatorisk' });
      return;
    }
    if (!varighet) {
      setError('root', { type: 'manual', message: 'Vrengt periode' });
      return;
    }
    setOpen(false);

    const { tittel, beskrivelse, sted } = rekrutteringstreff;
    const dto: OppdaterRekrutteringstreffDTO = {
      tittel,
      beskrivelse,
      sted,
      fraTid: toIso(fraDato, fraTid),
      tilTid: toIso(tilDato, tilTid),
    };
    await oppdaterRekrutteringstreff(rekrutteringstreff.id, dto);
    treff.mutate();
  };

  return (
    <div ref={anchorRef} className={className}>
      <RekrutteringstreffDetalj
        tittelIkon={<CalendarIcon fontSize='1.5rem' />}
        tittel='Tidspunkt'
        knapp={
          <Button
            variant='tertiary'
            size='small'
            icon={rekrutteringstreff.fraTid ? <PencilIcon /> : <PlusIcon />}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            {rekrutteringstreff.fraTid ? 'Endre' : 'Legg til'}
          </Button>
        }
      >
        {initialFra && initialTil ? (
          isSameDay(initialFra, initialTil) ? (
            <BodyShort size='small'>
              {formaterNorskDato({ dato: initialFra, visning: 'tall' })}{' '}
              <BodyShort as='span' size='small' textColor='subtle'>
                kl {format(initialFra, 'HH:mm')}-{format(initialTil, 'HH:mm')}
              </BodyShort>
            </BodyShort>
          ) : (
            <>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: initialFra, visning: 'tall' })}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {format(initialFra, 'HH:mm')}
                </BodyShort>{' '}
                til
              </BodyShort>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: initialTil, visning: 'tall' })}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {format(initialTil, 'HH:mm')}
                </BodyShort>
              </BodyShort>
            </>
          )
        ) : (
          <BodyShort size='small' textColor='subtle'>
            Ikke satt
          </BodyShort>
        )}
      </RekrutteringstreffDetalj>

      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        placement='bottom-start'
        offset={0}
        arrow={false}
      >
        <Popover.Content>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-4 p-2 min-w-[22rem]'
            >
              <div className='flex justify-between items-center'>
                <span className='font-bold flex gap-2 items-center'>
                  <CalendarIcon /> Tidspunkt
                </span>
                <Button type='submit' size='small' variant='tertiary'>
                  Lagre
                </Button>
              </div>

              <Tidspunktrad label='Fra' nameDato='fraDato' nameTid='fraTid' />
              <Tidspunktrad label='Til' nameDato='tilDato' nameTid='tilTid' />

              {formState.errors.root ? (
                <BodyShort size='small' className='aksel-error-message'>
                  {formState.errors.root.message}
                </BodyShort>
              ) : (
                <BodyShort size='small' textColor='subtle'>
                  {varighet || 'Velg tid'}
                </BodyShort>
              )}
            </form>
          </FormProvider>
        </Popover.Content>
      </Popover>
    </div>
  );
}

const toIso = (d: Date, t: string) => {
  const [h, m] = t.split(':').map(Number);
  const copy = new Date(d);
  copy.setHours(h, m, 0, 0);
  return copy.toISOString();
};
