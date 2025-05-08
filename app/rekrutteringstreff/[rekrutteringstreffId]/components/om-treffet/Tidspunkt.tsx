import RekrutteringstreffDetalj from '../RekrutteringstreffDetalj';
import {
  oppdaterRekrutteringstreff,
  OppdaterRekrutteringstreffDTO,
} from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useUmami } from '@/app/providers/UmamiContext';
import { rekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import { CalendarIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Button,
  Popover,
  DatePicker,
  Select,
  useDatepicker,
} from '@navikt/ds-react';
import { format, isSameDay, startOfDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useRef, useState } from 'react';

interface Props {
  rekrutteringstreff: RekrutteringstreffDTO;
  className?: string;
}

const klokkeslettListe = Array.from({ length: 24 }, (_, time) =>
  [0, 30].map(
    (minutt) =>
      `${time.toString().padStart(2, '0')}:${minutt
        .toString()
        .padStart(2, '0')}`,
  ),
).flat();

const Tidspunkt = ({ rekrutteringstreff, className }: Props) => {
  const { track } = useUmami();
  const { fraTid, tilTid } = rekrutteringstreff;

  const popoverAnchorRef = useRef<HTMLDivElement>(null);
  const [popoverErÅpen, settPopoverErÅpen] = useState(false);

  const initialFraTid = fraTid
    ? toZonedTime(parseISO(fraTid), 'Europe/Oslo')
    : undefined;
  const initialTilTid = tilTid
    ? toZonedTime(parseISO(tilTid), 'Europe/Oslo')
    : undefined;

  const [valgtFraDato, settValgtFraDato] = useState<Date | undefined>(
    initialFraTid,
  );
  const [valgtFraKlokkeslett, settValgtFraKlokkeslett] = useState(
    initialFraTid ? format(initialFraTid, 'HH:mm') : '08:00',
  );
  const [valgtTilDato, settValgtTilDato] = useState<Date | undefined>(
    initialTilTid,
  );
  const [valgtTilKlokkeslett, settValgtTilKlokkeslett] = useState(
    initialTilTid ? format(initialTilTid, 'HH:mm') : '10:00',
  );

  const { inputProps: fraInputProps, datepickerProps: fraDatepickerProps } =
    useDatepicker({
      defaultSelected: valgtFraDato,
      onDateChange: settValgtFraDato,
      fromDate: new Date('2025-01-01'),
      toDate: new Date('2040-12-31'),
    });

  const { inputProps: tilInputProps, datepickerProps: tilDatepickerProps } =
    useDatepicker({
      defaultSelected: valgtTilDato,
      onDateChange: settValgtTilDato,
      fromDate: new Date('2025-01-01'),
      toDate: new Date('2040-12-31'),
    });

  const tidspunktErSammeDag =
    valgtFraDato && valgtTilDato && isSameDay(valgtFraDato, valgtTilDato);

  const beregnVarighet = () => {
    if (!valgtFraDato || !valgtTilDato) return 'Velg tid';

    if (tidspunktErSammeDag) {
      const [fraTimer, fraMinutter] = valgtFraKlokkeslett
        .split(':')
        .map(Number);
      const [tilTimer, tilMinutter] = valgtTilKlokkeslett
        .split(':')
        .map(Number);
      const fraTidspunkt = new Date(valgtFraDato);
      fraTidspunkt.setHours(fraTimer, fraMinutter);
      const tilTidspunkt = new Date(valgtTilDato);
      tilTidspunkt.setHours(tilTimer, tilMinutter);
      const antallTimer =
        (tilTidspunkt.getTime() - fraTidspunkt.getTime()) / 3_600_000;

      return `${Number.isInteger(antallTimer) ? antallTimer : antallTimer.toFixed(1)} timer`;
    }

    const antallDager =
      (startOfDay(valgtTilDato).getTime() -
        startOfDay(valgtFraDato).getTime()) /
        86_400_000 +
      1;

    return `${antallDager} dager`;
  };

  const tilIsoTid = (dato: Date, klokkeslett: string) => {
    const [timer, minutter] = klokkeslett.split(':').map(Number);
    const kopiAvDato = new Date(dato);
    kopiAvDato.setHours(timer, minutter, 0, 0);
    return kopiAvDato.toISOString();
  };

  const lagreTidspunkt = () => {
    if (!valgtFraDato || !valgtTilDato) return;

    const oppdatering: OppdaterRekrutteringstreffDTO = {
      tittel: rekrutteringstreff.tittel,
      beskrivelse: rekrutteringstreff.beskrivelse,
      sted: rekrutteringstreff.sted,
      fraTid: tilIsoTid(valgtFraDato, valgtFraKlokkeslett),
      tilTid: tilIsoTid(valgtTilDato, valgtTilKlokkeslett),
    };

    oppdaterRekrutteringstreff(rekrutteringstreff.id, oppdatering)
      .then(() => {
        track(UmamiEvent.Rekrutteringstreff.oppdatert_tidspunkt);
        settPopoverErÅpen(false);
      })
      .catch((error) => {
        throw new rekbisError({
          beskrivelse: 'Feil ved oppdatering av tidspunkt:',
          error,
        });
      });
  };

  return (
    <div ref={popoverAnchorRef} className={className}>
      <RekrutteringstreffDetalj
        tittelIkon={<CalendarIcon fontSize='1.5rem' />}
        tittel='Tidspunkt'
        knapp={
          <Button
            icon={fraTid ? <PencilIcon /> : <PlusIcon />}
            variant='tertiary'
            size='small'
            onClick={() => settPopoverErÅpen((erÅpen) => !erÅpen)}
            aria-expanded={popoverErÅpen}
          >
            {fraTid ? 'Endre' : 'Legg til'}
          </Button>
        }
      >
        {fraTid &&
          tilTid &&
          (tidspunktErSammeDag ? (
            <BodyShort size='small'>
              {format(initialFraTid!, 'dd.MM.yyyy')}{' '}
              <BodyShort as='span' size='small' textColor='subtle'>
                kl {format(initialFraTid!, 'HH:mm')}-
                {format(initialTilTid!, 'HH:mm')}
              </BodyShort>
            </BodyShort>
          ) : (
            <>
              <BodyShort size='small'>
                {format(initialFraTid!, 'dd.MM.yyyy')}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {format(initialFraTid!, 'HH:mm')}
                </BodyShort>{' '}
                til
              </BodyShort>
              <BodyShort size='small'>
                {format(initialTilTid!, 'dd.MM.yyyy')}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {format(initialTilTid!, 'HH:mm')}
                </BodyShort>
              </BodyShort>
            </>
          ))}
      </RekrutteringstreffDetalj>

      <Popover
        open={popoverErÅpen}
        onClose={() => settPopoverErÅpen(false)}
        anchorEl={popoverAnchorRef.current}
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
              <Button size='small' variant='tertiary' onClick={lagreTidspunkt}>
                Lagre
              </Button>
            </div>

            <div className='flex gap-4 items-center'>
              <span className='w-10'>Fra</span>
              <DatePicker {...fraDatepickerProps}>
                <DatePicker.Input
                  {...fraInputProps}
                  hideLabel
                  label='Fra dato'
                />
              </DatePicker>
              <Select
                label='Fra tidspunkt'
                hideLabel
                size='small'
                value={valgtFraKlokkeslett}
                onChange={(event) =>
                  settValgtFraKlokkeslett(event.target.value)
                }
              >
                {klokkeslettListe.map((tidspunkt) => (
                  <option key={tidspunkt}>{tidspunkt}</option>
                ))}
              </Select>
            </div>

            <div className='flex gap-4 items-center'>
              <span className='w-10'>Til</span>
              <DatePicker {...tilDatepickerProps}>
                <DatePicker.Input
                  {...tilInputProps}
                  hideLabel
                  label='Til dato'
                />
              </DatePicker>
              <Select
                label='Til tidspunkt'
                hideLabel
                size='small'
                value={valgtTilKlokkeslett}
                onChange={(event) =>
                  settValgtTilKlokkeslett(event.target.value)
                }
              >
                {klokkeslettListe.map((tidspunkt) => (
                  <option key={tidspunkt}>{tidspunkt}</option>
                ))}
              </Select>
            </div>

            <BodyShort size='small' textColor='subtle'>
              {beregnVarighet()}
            </BodyShort>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default Tidspunkt;
