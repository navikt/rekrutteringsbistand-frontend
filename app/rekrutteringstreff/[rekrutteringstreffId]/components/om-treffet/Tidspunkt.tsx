import RekrutteringstreffDetalj from '../RekrutteringstreffDetalj';
import ControlledDatePicker from './components/ControlledDatepicker';
import {
  oppdaterRekrutteringstreff,
  OppdaterRekrutteringstreffDTO,
} from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import {
  RekrutteringstreffDTO,
  useRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { CalendarIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import { Popover, Select, Button, BodyShort } from '@navikt/ds-react';
import {
  format,
  isSameDay,
  parseISO,
  differenceInMinutes,
  differenceInCalendarDays,
  set as setTime,
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useRef, useState } from 'react';
import {
  useForm,
  Controller,
  SubmitHandler,
  useWatch,
  FieldErrors,
  FieldError,
} from 'react-hook-form';

type FormData = {
  fraDato: Date | null;
  fraTid: string;
  tilDato: Date | null;
  tilTid: string;
  root?: string;
};

const klokkeslett = Array.from({ length: 24 }, (_, h) =>
  [0, 15, 30, 45].map(
    (m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
  ),
).flat();

interface Props {
  rekrutteringstreff: RekrutteringstreffDTO;
  className?: string;
}

export default function Tidspunkt({ rekrutteringstreff, className }: Props) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreff.id);

  const initialFra = rekrutteringstreff.fraTid
    ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
    : null;
  const initialTil = rekrutteringstreff.tilTid
    ? toZonedTime(parseISO(rekrutteringstreff.tilTid), 'Europe/Oslo')
    : null;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fraDato: initialFra,
      fraTid: initialFra ? format(initialFra, 'HH:mm') : '08:00',
      tilDato: initialTil,
      tilTid: initialTil ? format(initialTil, 'HH:mm') : '10:00',
    },
  });

  const watched = useWatch({ control });

  const duration = (() => {
    const { fraDato, tilDato, fraTid, tilTid } = watched;
    if (!(fraDato && tilDato && fraTid && tilTid)) return '';

    const start = setTime(new Date(fraDato), {
      hours: +fraTid.slice(0, 2),
      minutes: +fraTid.slice(3),
    });
    const end = setTime(new Date(tilDato), {
      hours: +tilTid.slice(0, 2),
      minutes: +tilTid.slice(3),
    });

    if (isSameDay(start, end)) {
      const totaltMin = differenceInMinutes(end, start);
      if (totaltMin < 0) return '';
      const h = Math.floor(totaltMin / 60);
      const m = totaltMin % 60;
      return h ? `${h} t${m ? ` ${m} min` : ''}` : `${m} min`;
    }

    const d = differenceInCalendarDays(end, start) + 1;
    return d > 0 ? `${d} dager` : '';
  })();

  const onSubmit: SubmitHandler<FormData> = async ({
    fraDato,
    fraTid,
    tilDato,
    tilTid,
  }) => {
    if (!fraDato || !tilDato) {
      setError('fraDato', { message: 'Obligatorisk' });
      setError('tilDato', { message: 'Obligatorisk' });
      return;
    }
    if (!duration) {
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
    rekrutteringstreffHook.mutate();
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
              {format(initialFra, 'dd.MM.yyyy')}{' '}
              <BodyShort as='span' size='small' textColor='subtle'>
                kl {format(initialFra, 'HH:mm')}-{format(initialTil, 'HH:mm')}
              </BodyShort>
            </BodyShort>
          ) : (
            <>
              <BodyShort size='small'>
                {format(initialFra, 'dd.MM.yyyy')}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {format(initialFra, 'HH:mm')}
                </BodyShort>{' '}
                til
              </BodyShort>
              <BodyShort size='small'>
                {format(initialTil, 'dd.MM.yyyy')}{' '}
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

            <Rad
              label='Fra'
              nameDato='fraDato'
              nameTid='fraTid'
              control={control}
              errors={errors}
            />
            <Rad
              label='Til'
              nameDato='tilDato'
              nameTid='tilTid'
              control={control}
              errors={errors}
            />

            {errors.root ? (
              <BodyShort size='small' className='aksel-error-message'>
                {errors.root.message}
              </BodyShort>
            ) : (
              <BodyShort size='small' textColor='subtle'>
                {duration || 'Velg tid'}
              </BodyShort>
            )}
          </form>
        </Popover.Content>
      </Popover>
    </div>
  );
}

function Rad({
  label,
  nameDato,
  nameTid,
  control,
  errors,
}: {
  label: string;
  nameDato: keyof FormData;
  nameTid: keyof FormData;
  control: any;
  errors: FieldErrors<FormData>;
}) {
  return (
    <div className='flex gap-4 items-start'>
      <span className='w-10 pt-3'>{label}</span>

      <Controller
        name={nameDato}
        control={control}
        rules={{ required: 'Obligatorisk' }}
        render={({ field }) => (
          <ControlledDatePicker
            label={label}
            value={field.value}
            onChange={field.onChange}
            error={errors[nameDato] as FieldError | undefined}
          />
        )}
      />

      <Controller
        name={nameTid}
        control={control}
        rules={{ required: 'Obligatorisk' }}
        render={({ field }) => (
          <Select
            {...field}
            hideLabel
            label='Tid'
            size='medium'
            className='h-[48px] min-w-[6rem]'
          >
            {klokkeslett.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        )}
      />
    </div>
  );
}

const toIso = (d: Date, t: string) => {
  const [h, m] = t.split(':').map(Number);
  const copy = new Date(d);
  copy.setHours(h, m, 0, 0);
  return copy.toISOString();
};
