import { DatePicker, HStack, useRangeDatepicker } from '@navikt/ds-react';
import React from 'react';

interface DatoVelgerFraTilProps {
  fraDato?: Date;
  tilDato?: Date;
  setFraDato: (date: Date | undefined) => void;
  setTilDato: (date: Date | undefined) => void;
}
export const DatoVelgerFraTil: React.FC<DatoVelgerFraTilProps> = ({
  fraDato,
  tilDato,
  setFraDato,
  setTilDato,
}) => {
  const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
    useRangeDatepicker({
      fromDate: fraDato ? fraDato : new Date(Date.now()),
      toDate: tilDato ? tilDato : new Date(Date.now()),
      onRangeChange: console.info,
    });

  React.useEffect(() => {
    setFraDato(selectedRange?.from);
    setTilDato(selectedRange?.to);
  }, [selectedRange, setFraDato, setTilDato]);

  return (
    <DatePicker {...datepickerProps}>
      <HStack wrap gap='4' justify='center'>
        <DatePicker.Input {...fromInputProps} label='Fra' />
        <DatePicker.Input {...toInputProps} label='Til' />
      </HStack>
    </DatePicker>
  );
};
