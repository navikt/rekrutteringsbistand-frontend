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
  // Inntasting lagres derfor først ved blur. `undefined` betyr at ingenting skal lagres.
  const erUnderInputbehandling = useRef(false);
  const datoTilLagring = useRef<string | null | undefined>(undefined);
  // Feilen vises først ved blur, så uferdig inntasting ikke markeres som feil.
  const [visFeil, setVisFeil] = useState(false);
  const lagreDato = (nyDato: string | null) => {
    if (nyDato !== dato) onEndre(nyDato);
  };
  const { datepickerProps, inputProps, selectedDay, setSelected } =
    useDatepicker({
      defaultSelected: tilDato(dato),
      onDateChange: (valgtDato) => {
        const nyDato = valgtDato ? format(valgtDato, 'yyyy-MM-dd') : undefined;
        if (erUnderInputbehandling.current) datoTilLagring.current = nyDato;
        else if (nyDato) lagreDato(nyDato);
      },
      onValidate: ({ isEmpty }) => {
        // Aksel gir også undefined ved ugyldig input, men bare et tomt felt skal slette datoen.
        if (!isEmpty) return;
        if (erUnderInputbehandling.current) datoTilLagring.current = null;
        else lagreDato(null);
      },
      inputFormat: 'dd.MM.yyyy',
      allowTwoDigitYear: false,
    });

  const håndterEndring: typeof inputProps.onChange = (e) => {
    setVisFeil(false);
    erUnderInputbehandling.current = true;
    try {
      inputProps.onChange?.(e);
    } finally {
      erUnderInputbehandling.current = false;
    }
  };

  const håndterBlur: typeof inputProps.onBlur = (e) => {
    inputProps.onBlur?.(e);
    setVisFeil(true);
    const nyDato = datoTilLagring.current;
    datoTilLagring.current = undefined;
    if (nyDato !== undefined) lagreDato(nyDato);
  };

  useLayoutEffect(() => {
    // Synkroniser før paint, så blur ikke formaterer en gammel feltverdi over tilbakeføringen.
    // Uendret dato skal fortsatt bevare uferdig eller ugyldig inntasting.
    if (dato === forrigeDato.current) return;
    forrigeDato.current = dato;
    const valgtDato = selectedDay ? format(selectedDay, 'yyyy-MM-dd') : null;
    if (valgtDato !== dato) {
      // Feltet overskrives, så en kladd som ikke lenger vises skal ikke lagres ved blur.
      datoTilLagring.current = undefined;
      setSelected(tilDato(dato));
    }
  }, [dato, selectedDay, setSelected]);

  return (
    <DatePicker {...datepickerProps}>
      <DatePicker.Input
        {...inputProps}
        onChange={håndterEndring}
        onBlur={håndterBlur}
        size='small'
        error={
          visFeil && inputProps.value && !selectedDay
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
