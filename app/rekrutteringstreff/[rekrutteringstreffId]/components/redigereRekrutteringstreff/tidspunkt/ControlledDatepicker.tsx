import { DatePicker, useDatepicker } from '@navikt/ds-react';
import type { FieldError } from 'react-hook-form';

type Props = {
  label: string;
  value: Date | null;
  onChange: (d: Date | null) => void;
  onBlur?: () => void;
  error?: FieldError;
  from?: Date;
  to?: Date;
  disabled?: boolean;
};

export default function ControlledDatePicker({
  label,
  value,
  onChange,
  onBlur,
  error,
  from = new Date(),
  to = new Date('2040-12-31'),
  disabled,
}: Props) {
  const { inputProps, datepickerProps } = useDatepicker({
    defaultSelected: value ?? undefined,
    fromDate: from,
    toDate: to,
    onDateChange: (d) => onChange(d ?? null),
  });

  return (
    <DatePicker mode='single' {...datepickerProps}>
      <DatePicker.Input
        {...inputProps}
        hideLabel
        label={label}
        error={error ? error.message || true : undefined}
        disabled={disabled}
        onBlur={onBlur} // <-- lagre ved blur
      />
    </DatePicker>
  );
}
