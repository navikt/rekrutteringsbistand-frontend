import { DatePicker, useDatepicker } from '@navikt/ds-react';
import React from 'react';

interface DatoVelgerProps {
  disabled?: boolean;
  fraDato?: Date;
  label?: string;
  setDato: (date: Date | undefined) => void;
}

export const DatoVelger: React.FC<DatoVelgerProps> = ({
  disabled,
  fraDato,
  label,
  setDato,
}) => {
  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    fromDate: fraDato ? fraDato : new Date(Date.now()),
    defaultSelected: fraDato ? fraDato : new Date(Date.now()),
  });

  React.useEffect(() => {
    setDato(selectedDay);
  }, [selectedDay, setDato]);

  return (
    <>
      <DatePicker {...datepickerProps}>
        <DatePicker.Input {...inputProps} label={label} disabled={disabled} />
      </DatePicker>
    </>
  );
};
