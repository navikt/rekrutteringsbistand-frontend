'use client';

import { UNSAFE_Combobox as Combobox } from '@navikt/ds-react';
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';

export const KLOKKESLETT_OPTIONS = [...Array(24)].flatMap((_, h) =>
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
  error?: ReactNode | boolean;
  className?: string;
  options?: string[];
};

function TimeInput({
  value,
  onChange,
  onBlur,
  label = 'Klokkeslett',
  hideLabel,
  disabled,
  error,
  className,
  options,
}: Props) {
  // Trenger ref for å kunne scrolle til valgt element i dropdown, det er ikke standard funksjonalitet i ds-react sin Combobox
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollSelectedIntoView = useCallback(() => {
    const input = inputRef.current;
    if (input?.getAttribute('aria-expanded') === 'true') {
      const listId = input.getAttribute('aria-controls');
      const selected =
        listId &&
        document
          .getElementById(listId)
          ?.querySelector<HTMLElement>("[role='option'][aria-selected='true']");
      if (selected)
        (selected.closest<HTMLElement>("[role='listbox']") ||
          selected.parentElement)!.scrollTop = selected.offsetTop;
    }
  }, []);

  const queueScrollIntoView = useCallback(() => {
    if (typeof window === 'undefined') return;

    let attempts = 0;
    const run = () => {
      attempts += 1;
      scrollSelectedIntoView();
      if (attempts < 3) {
        window.requestAnimationFrame(run);
      }
    };

    window.requestAnimationFrame(run);
  }, [scrollSelectedIntoView]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'aria-expanded') {
          if (input.getAttribute('aria-expanded') === 'true') {
            queueScrollIntoView();
          }
        }
      }
    });

    observer.observe(input, {
      attributes: true,
      attributeFilter: ['aria-expanded'],
    });

    return () => observer.disconnect();
  }, [queueScrollIntoView]);

  useEffect(() => {
    queueScrollIntoView();
  }, [queueScrollIntoView, value]);

  const availableOptions = options ?? KLOKKESLETT_OPTIONS;

  return (
    <Combobox
      ref={inputRef}
      label={label}
      hideLabel={hideLabel}
      disabled={disabled}
      error={error}
      className={['min-w-[7rem]', className].filter(Boolean).join(' ')}
      options={availableOptions}
      filteredOptions={availableOptions}
      value={value ?? ''}
      selectedOptions={value ? [value] : []}
      onFocus={queueScrollIntoView}
      onToggleSelected={(option, isSelected) => {
        if (isSelected) onChange(option);
      }}
      onBlur={onBlur}
    />
  );
}

export default TimeInput;
