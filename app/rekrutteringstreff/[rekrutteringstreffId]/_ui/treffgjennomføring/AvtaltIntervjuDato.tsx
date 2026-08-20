'use client';

import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { format, isValid, parseISO } from 'date-fns';
import { useState, type FC } from 'react';

interface Props {
  /** Dato på formen `yyyy-MM-dd`, eller `null` når den ikke er satt. */
  dato: string | null;
  onEndre: (dato: string | null) => void;
  /** Leses bare av skjermlesere, for å skille radene fra hverandre. */
  kontekst: string;
}

const tilDato = (verdi: string | null) => {
  if (!verdi) return undefined;
  const dato = parseISO(verdi);
  return isValid(dato) ? dato : undefined;
};

export const AvtaltIntervjuDato: FC<Props> = ({
  dato,
  onEndre,
  kontekst,
}) => {
  const [åpen, settÅpen] = useState(false);
  const { datepickerProps, inputProps } = useDatepicker({
    defaultSelected: tilDato(dato),
    onDateChange: (valgtDato) => {
      onEndre(valgtDato ? format(valgtDato, 'yyyy-MM-dd') : null);
      settÅpen(false);
    },
    inputFormat: 'dd.MM.yyyy',
    allowTwoDigitYear: false,
  });

  return (
    <DatePicker
      {...datepickerProps}
      open={åpen}
      onOpenToggle={() => settÅpen((forrige) => !forrige)}
    >
      <DatePicker.Input
        {...inputProps}
        size='small'
        label={
          <>
            Dato for 2. intervju
            <span className='sr-only'> {kontekst}</span>
          </>
        }
        placeholder='dd.mm.åååå'
      />
    </DatePicker>
  );
};
