import { DatePicker, useDatepicker } from '@navikt/ds-react';
import { FocusEvent, InputHTMLAttributes, useCallback, useEffect } from 'react';
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
  const { inputProps, datepickerProps, selectedDay, setSelected } =
    useDatepicker({
      defaultSelected: value ?? undefined,
      fromDate: from,
      toDate: to,
      onDateChange: (d) => onChange(d ?? null),
    });

  const isAllowedInput = useCallback(
    (text?: string | null) => !text || /^[\d./-]*$/.test(text),
    [],
  );

  useEffect(() => {
    const next = value ?? undefined;
    const cur = selectedDay ?? undefined;
    if (
      (next && (!cur || cur.getTime() !== next.getTime())) ||
      (!next && !!cur)
    ) {
      setSelected(next);
    }
  }, [value, selectedDay, setSelected]);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onBlur?.(e);
    onBlur?.();
  };

  return (
    <DatePicker mode='single' {...datepickerProps}>
      <DatePicker.Input
        {...inputProps}
        hideLabel
        label={label}
        error={error ? error.message || true : undefined}
        disabled={disabled}
        onBlur={handleBlur}
        onBeforeInput={(event) => {
          const nativeEvent = event.nativeEvent as InputEvent;
          const data = 'data' in nativeEvent ? nativeEvent.data : null;
          if (!isAllowedInput(data)) {
            event.preventDefault();
            return;
          }
          (inputProps as InputHTMLAttributes<HTMLInputElement>).onBeforeInput?.(
            event,
          );
        }}
        onPaste={(event) => {
          const pasted = event.clipboardData.getData('text');
          if (!isAllowedInput(pasted)) {
            event.preventDefault();
            return;
          }
          (inputProps as InputHTMLAttributes<HTMLInputElement>).onPaste?.(
            event,
          );
        }}
        placeholder='dd.mm.åååå'
      />
    </DatePicker>
  );
}
