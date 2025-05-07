import RekrutteringstreffDetalj from '../RekrutteringstreffDetalj';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { CalendarIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Button,
  Popover,
  DatePicker,
  Select,
  useDatepicker,
} from '@navikt/ds-react';
import { format, isSameDay, startOfDay } from 'date-fns';
import { useRef, useState } from 'react';

interface TidspunktProps {
  rekrutteringstreff: RekrutteringstreffDTO;
  className?: string;
}

const klokkeslett = Array.from({ length: 24 }, (_, h) =>
  [0, 30].map(
    (m) => `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
  ),
).flat();

const Tidspunkt: React.FC<TidspunktProps> = ({
  rekrutteringstreff,
  className,
}) => {
  const { fraTid, tilTid } = rekrutteringstreff;

  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const initFra = fraTid ? new Date(fraTid) : undefined;
  const initTil = tilTid ? new Date(tilTid) : undefined;

  const [fraDato, setFraDato] = useState<Date | undefined>(initFra);
  const [fraKlokke, setFraKlokke] = useState<string>(
    initFra ? format(initFra, 'HH:mm') : '08:00',
  );
  const [tilDato, setTilDato] = useState<Date | undefined>(initTil);
  const [tilKlokke, setTilKlokke] = useState<string>(
    initTil ? format(initTil, 'HH:mm') : '10:00',
  );

  const { inputProps: fraInputProps, datepickerProps: fraPickerProps } =
    useDatepicker({
      fromDate: new Date('2020-01-01'),
      toDate: new Date('2030-12-31'),
      defaultSelected: fraDato,
      onDateChange: setFraDato,
    });

  const { inputProps: tilInputProps, datepickerProps: tilPickerProps } =
    useDatepicker({
      fromDate: new Date('2020-01-01'),
      toDate: new Date('2030-12-31'),
      defaultSelected: tilDato,
      onDateChange: setTilDato,
    });

  const sammeDag = fraDato && tilDato && isSameDay(fraDato, tilDato);

  const varighet = () => {
    if (!fraDato || !tilDato) return 'Velg tid';
    if (sammeDag) {
      const [fraTimer, fraMinutt] = fraKlokke.split(':').map(Number);
      const [tilTimer, tilminutt] = tilKlokke.split(':').map(Number);
      const fra = new Date(fraDato);
      fra.setHours(fraTimer, fraMinutt, 0, 0);
      const til = new Date(tilDato);
      til.setHours(tilTimer, tilminutt, 0, 0);
      const diff = (til.getTime() - fra.getTime()) / 3_600_000;
      return `${Number.isInteger(diff) ? diff : diff.toFixed(1)} timer`;
    }
    const days =
      (startOfDay(tilDato).getTime() - startOfDay(fraDato).getTime()) /
        86_400_000 +
      1;
    return `${days} dager`;
  };

  return (
    <div ref={anchorRef} className={className}>
      <RekrutteringstreffDetalj
        tittelIkon={<CalendarIcon fontSize='1.5rem' />}
        tittel='Tidspunkt'
        knapp={
          <Button
            icon={fraTid ? <PencilIcon /> : <PlusIcon />}
            variant='tertiary'
            size='small'
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {fraTid ? 'Endre' : 'Legg til'}
          </Button>
        }
      >
        {fraTid &&
          tilTid &&
          (sammeDag ? (
            <BodyShort size='small'>
              {format(initFra!, 'dd.MM.yyyy')}{' '}
              <BodyShort as='span' size='small' textColor='subtle'>
                kl {format(initFra!, 'HH:mm')}-{format(initTil!, 'HH:mm')}
              </BodyShort>
            </BodyShort>
          ) : (
            <>
              <BodyShort size='small'>
                {format(initFra!, 'dd.MM.yyyy')}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {format(initFra!, 'HH:mm')}
                </BodyShort>{' '}
                til
              </BodyShort>
              <BodyShort size='small'>
                {format(initTil!, 'dd.MM.yyyy')}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {format(initTil!, 'HH:mm')}
                </BodyShort>
              </BodyShort>
            </>
          ))}
      </RekrutteringstreffDetalj>

      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        offset={0}
        arrow={false}
        placement='bottom-start'
      >
        <Popover.Content>
          <div className='flex flex-col gap-4 p-2 min-w-[22rem]'>
            <div className='flex justify-between items-center mb-2'>
              <span className='font-bold flex items-center gap-2'>
                <CalendarIcon fontSize='1.5rem' />
                Tidspunkt
              </span>
              <Button
                size='small'
                variant='tertiary'
                onClick={() => setOpen(false)}
                className='text-text-action'
              >
                Lagre
              </Button>
            </div>

            <div className='flex gap-4 items-center'>
              <span className='w-10'>Fra</span>
              <DatePicker {...fraPickerProps}>
                <DatePicker.Input
                  {...fraInputProps}
                  hideLabel
                  label='Fra dato'
                />
              </DatePicker>
              <Select
                label='Fra klokke'
                hideLabel
                size='small'
                value={fraKlokke}
                onChange={(e) => setFraKlokke(e.target.value)}
              >
                {klokkeslett.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Select>
            </div>

            <div className='flex gap-4 items-center'>
              <span className='w-10'>Til</span>
              <DatePicker {...tilPickerProps}>
                <DatePicker.Input
                  {...tilInputProps}
                  hideLabel
                  label='Til dato'
                />
              </DatePicker>
              <Select
                label='Til klokke'
                hideLabel
                size='small'
                value={tilKlokke}
                onChange={(e) => setTilKlokke(e.target.value)}
              >
                {klokkeslett.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Select>
            </div>

            <BodyShort size='small' textColor='subtle'>
              {varighet()}
            </BodyShort>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default Tidspunkt;
