import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { format, isValid, parse } from 'date-fns';
import { nb } from 'date-fns/locale';
import React from 'react';

interface DatoVelgerProps {
  error?: string;
  disabled?: boolean;
  fraDato?: string | null;
  label?: string;
  setDato: (date: string | undefined) => void;
  defaultDato?: string | null;
}

const parseDateSafely = (dateStr: string): Date | undefined => {
  try {
    const parsed = parse(dateStr, 'dd.MM.yyyy', new Date(), { locale: nb });
    return isValid(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
};

export const DatoVelger: React.FC<DatoVelgerProps> = ({
  error,
  disabled,
  fraDato,
  label,
  setDato,
  defaultDato,
}) => {
  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    locale: 'nb',
    onDateChange: (date: Date | undefined) => {
      if (date) {
        setDato(format(date, 'dd-MM-yyyy'));
      } else {
        setDato(undefined);
      }
    },
    fromDate:
      fraDato && parseDateSafely(fraDato)
        ? parseDateSafely(fraDato)
        : new Date(),
    defaultSelected:
      fraDato && parseDateSafely(fraDato)
        ? parseDateSafely(fraDato)
        : new Date(),
  });

  const defaultValgt = defaultDato ? parseDateSafely(defaultDato) : undefined;

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
          defaultValue={
            defaultValgt ? format(defaultValgt, 'dd-MM-yyyy') : undefined
          }
          label={label}
          disabled={disabled}
          error={error}
        />
      </DatePicker>
    </>
  );
};
