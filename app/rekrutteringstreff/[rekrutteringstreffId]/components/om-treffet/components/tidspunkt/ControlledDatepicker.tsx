import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { addWeeks } from 'date-fns';
import type { FieldError } from 'react-hook-form';

type Props = {
  label: string;
  value: Date | null;
  onChange: (d: Date | null) => void;
  error?: FieldError;
  from?: Date;
  to?: Date;
};

export default function ControlledDatePicker({
  label,
  value,
  onChange,
  error,
  from = new Date(),
  to = new Date('2040-12-31'),
}: Props) {
  const { inputProps, datepickerProps } = useDatepicker({
    defaultSelected: value ?? addWeeks(new Date(), 2),
    fromDate: from,
    toDate: to,
    onDateChange: (d) => onChange(d ?? null),
  });

  const rest = datepickerProps as any;

  return (
    <DatePicker mode='single' selected={value ? [value] : undefined} {...rest}>
      <DatePicker.Input
        {...inputProps}
        hideLabel
        label={label}
        error={error ? error.message || true : undefined}
      />
    </DatePicker>
  );
}
