'use client';

import { UNSAFE_Combobox as Combobox } from '@navikt/ds-react';
import React, { forwardRef } from 'react';

const KLOKKESLETT_OPTIONS = [...Array(24)].flatMap((_, h) =>
  [0, 15, 30, 45].map(
    (m) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
  ),
);

type Props = {
  value?: string;
  onChange: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  label?: string;
  hideLabel?: boolean;
  disabled?: boolean;
  error?: React.ReactNode | boolean;
  className?: string;
};

const TimeInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      onChange,
      onBlur,
      label = 'Klokkeslett',
      hideLabel,
      disabled,
      error,
      className,
    },
    ref,
  ) => {
    return (
      <Combobox
        ref={ref}
        label={label}
        hideLabel={hideLabel}
        disabled={disabled}
        error={error}
        className={['min-w-[7rem]', className].filter(Boolean).join(' ')}
        options={KLOKKESLETT_OPTIONS}
        value={value ?? ''}
        onToggleSelected={(option, isSelected) => {
          if (isSelected) onChange(option);
        }}
        onBlur={onBlur}
      />
    );
  },
);

TimeInput.displayName = 'TimeInput';

export default TimeInput;
