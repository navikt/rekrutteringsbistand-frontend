'use client';

import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { format, isValid, parseISO } from 'date-fns';
import { useLayoutEffect, useRef, useState, type FC } from 'react';

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
  // Aksel validerer hvert tastetrykk, og mellomverdier som «10.1.2026» er gyldige datoer.
  // Inntasting lagres og valideres derfor først ved blur. Kalendervalg lagres med en gang.
  const [visFeil, setVisFeil] = useState(false);
  const lagreDato = (nyDato: Date | undefined) => {
    const verdi = nyDato ? format(nyDato, 'yyyy-MM-dd') : null;
    if (verdi !== dato) onEndre(verdi);
  };
  const { datepickerProps, inputProps, selectedDay, setSelected } =
    useDatepicker({
      defaultSelected: tilDato(dato),
      inputFormat: 'dd.MM.yyyy',
      allowTwoDigitYear: false,
    });

  const håndterKalendervalg: typeof datepickerProps.onDayClick = (
    dag,
    modifikatorer,
    e,
  ) => {
    datepickerProps.onDayClick?.(dag, modifikatorer, e);
    // Klikk på valgt dag fjerner valget.
    lagreDato(modifikatorer.selected ? undefined : dag);
  };

  const håndterEndring: typeof inputProps.onChange = (e) => {
    setVisFeil(false);
    inputProps.onChange?.(e);
  };

  const håndterBlur: typeof inputProps.onBlur = (e) => {
    inputProps.onBlur?.(e);
    const erTom = !e.target.value;
    if (erTom || selectedDay) lagreDato(selectedDay);
    else setVisFeil(true);
  };

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
    <DatePicker {...datepickerProps} onDayClick={håndterKalendervalg}>
      <DatePicker.Input
        {...inputProps}
        onChange={håndterEndring}
        onBlur={håndterBlur}
        size='small'
        error={
          visFeil && !selectedDay
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
