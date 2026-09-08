'use client';

import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { format, isValid, parseISO } from 'date-fns';
import { useLayoutEffect, useRef, type FC } from 'react';

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

export const AvtaltIntervjuDato: FC<Props> = ({ dato, onEndre, kontekst }) => {
  const forrigeDato = useRef(dato);
  const lagreDato = (nyDato: string | null) => {
    if (nyDato !== dato) onEndre(nyDato);
  };
  const { datepickerProps, inputProps, selectedDay, setSelected } =
    useDatepicker({
      defaultSelected: tilDato(dato),
      onDateChange: (valgtDato) => {
        if (valgtDato) lagreDato(format(valgtDato, 'yyyy-MM-dd'));
      },
      onValidate: ({ isEmpty }) => {
        // Aksel gir også undefined ved ugyldig input, men bare et tomt felt skal slette datoen.
        if (isEmpty) lagreDato(null);
      },
      inputFormat: 'dd.MM.yyyy',
      allowTwoDigitYear: false,
    });

  useLayoutEffect(() => {
    // Synkroniser før paint, så blur ikke formaterer en gammel feltverdi over tilbakeføringen.
    // Uendret dato skal fortsatt bevare uferdig eller ugyldig inntasting.
    if (dato === forrigeDato.current) return;
    forrigeDato.current = dato;
    const valgtDato = selectedDay ? format(selectedDay, 'yyyy-MM-dd') : null;
    if (valgtDato !== dato) {
      setSelected(tilDato(dato));
    }
  }, [dato, selectedDay, setSelected]);

  return (
    <DatePicker {...datepickerProps}>
      <DatePicker.Input
        {...inputProps}
        size='small'
        error={
          inputProps.value && !selectedDay
            ? 'Oppgi en gyldig dato som dd.mm.åååå. Endringen er ikke lagret.'
            : undefined
        }
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
