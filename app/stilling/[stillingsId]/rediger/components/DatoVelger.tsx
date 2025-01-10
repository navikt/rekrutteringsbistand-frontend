import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { format, isValid } from 'date-fns';
import React from 'react';

interface DatoVelgerProps {
  error?: string;
  disabled?: boolean;
  fraDato?: string;
  label?: string;
  setDato: (date: string | undefined) => void;
}

export const DatoVelger: React.FC<DatoVelgerProps> = ({
  error,
  disabled,
  fraDato,
  label,
  setDato,
}) => {
  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    onDateChange: (date: Date | undefined) => {
      if (date) {
        setDato(format(date, 'dd-MM-yyyy'));
      } else {
        setDato(undefined);
      }
    },
    fromDate:
      fraDato && isValid(new Date(fraDato)) ? new Date(fraDato) : new Date(),
    defaultSelected:
      fraDato && isValid(new Date(fraDato)) ? new Date(fraDato) : undefined,
  });

  React.useEffect(() => {
    if (selectedDay) {
      const nyFraDato = format(selectedDay, 'dd-MM-yyyy');
      if (nyFraDato !== fraDato) {
        setDato(nyFraDato);
      }
    }
  }, [selectedDay, setDato, fraDato]);

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
