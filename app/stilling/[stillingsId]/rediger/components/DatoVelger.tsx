import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { parse } from 'date-fns';
import React from 'react';

interface DatoVelgerProps {
  error?: string;
  disabled?: boolean;
  valgtDato?: string | null;
  label?: string;
  setDato: (date: string | undefined) => void;
}

export const DatoVelger: React.FC<DatoVelgerProps> = ({
  error,
  disabled,
  valgtDato,
  label,
  setDato,
}) => {
  const formaterDato = valgtDato
    ? parse(valgtDato, 'dd.MM.yyyy', new Date())
    : undefined;

  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    locale: 'nb',
    onDateChange: (date: Date | undefined) => {
      if (date) {
        setDato(date.toLocaleString());
      } else {
        setDato(undefined);
      }
    },
    defaultSelected: formaterDato,
  });

  return (
    <>
      <DatePicker {...datepickerProps}>
        <DatePicker.Input
          {...inputProps}
          label={label}
          disabled={disabled}
          error={error}
        />
      </DatePicker>
    </>
  );
};
