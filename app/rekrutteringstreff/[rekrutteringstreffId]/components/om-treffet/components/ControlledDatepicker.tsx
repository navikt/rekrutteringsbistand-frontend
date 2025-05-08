import { DatePicker, useDatepicker } from '@navikt/ds-react';
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
  from = new Date('2025-01-01'),
  to = new Date('2040-12-31'),
}: Props) {
  const { inputProps, datepickerProps } = useDatepicker({
    defaultSelected: value ?? undefined,
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
        error={error?.message}
      />
    </DatePicker>
  );
}
