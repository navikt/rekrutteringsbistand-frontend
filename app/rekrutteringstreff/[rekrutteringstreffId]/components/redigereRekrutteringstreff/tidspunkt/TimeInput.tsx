'use client';

import { UNSAFE_Combobox as Combobox } from '@navikt/ds-react';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export const KLOKKESLETT_OPTIONS = [...Array(24)].flatMap((_, h) =>
  [0, 15, 30, 45].map(
    (m) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
  ),
);

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

const insertOptionSorted = (options: string[], newOption: string) => {
  if (options.includes(newOption)) return options;
  return [...options, newOption].sort();
};

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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollSelectedIntoView = useCallback(() => {
    if (typeof document === 'undefined') return;
    const input = inputRef.current;
    if (!input || input.getAttribute('aria-expanded') !== 'true') return;

    const listId = input.getAttribute('aria-controls');
    if (!listId) return;

    const list = document.getElementById(listId);
    if (!list) return;

    let selected = list.querySelector<HTMLElement>(
      "[role='option'][aria-selected='true']",
    );

    if (!selected && value) {
      const all = Array.from(
        list.querySelectorAll<HTMLElement>("[role='option']"),
      );
      selected = all.find((el) => el.textContent?.trim() === value) || null;
    }

    if (selected) {
      const listbox =
        selected.closest<HTMLElement>("[role='listbox']") ||
        selected.parentElement;
      if (listbox) listbox.scrollTop = selected.offsetTop;
    }
  }, [value]);

  const queueScrollIntoView = useCallback(() => {
    if (typeof window === 'undefined') return;
    let attempts = 0;
    const run = () => {
      attempts += 1;
      scrollSelectedIntoView();
      if (attempts < 3) window.requestAnimationFrame(run);
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

  const [inputValue, setInputValue] = useState(value ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const [forceCloseDropdown, setForceCloseDropdown] = useState(false);

  const didUserTypeRef = useRef(false);
  const lastFocusValueRef = useRef<string | undefined>(value);
  const ignoreNextEmptyChangeRef = useRef(false);

  useEffect(() => {
    // sync fra prop når ikke bruker skriver
    if (!isFocused || !didUserTypeRef.current) {
      setInputValue(value ?? '');
    }
  }, [value, isFocused]);

  const isAllowedTime = useCallback((val: string) => TIME_REGEX.test(val), []);
  const isAllowedInput = useCallback(
    (text?: string | null) => !text || /^[\d:]*$/.test(text),
    [],
  );

  const handleInputChange = useCallback((val: string) => {
    // ignorer første tomme endring etter musefokus
    if (ignoreNextEmptyChangeRef.current && val === '') {
      ignoreNextEmptyChangeRef.current = false;
      return;
    }
    if (val === '' && !didUserTypeRef.current) return;

    if (val !== '' && !didUserTypeRef.current) didUserTypeRef.current = true;

    if (val === '' && didUserTypeRef.current) setInputValue('');
    else if (val !== '') setInputValue(val);

    setForceCloseDropdown(true);
  }, []);

  const commitIfValid = useCallback(
    (val: string) => {
      if (val === '') {
        if (value) onChange('');
        return true;
      }
      if (isAllowedTime(val)) {
        if (val !== value) onChange(val);
        return true;
      }
      return false;
    },
    [isAllowedTime, onChange, value],
  );

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setIsFocused(false);
      if (
        !didUserTypeRef.current &&
        (inputValue === '' || inputValue === lastFocusValueRef.current)
      ) {
        setInputValue(value ?? '');
        onBlur?.(e);
        return;
      }
      const ok = commitIfValid(inputValue.trim());
      if (!ok) setInputValue(value ?? '');

      const closeDropdown = () => setForceCloseDropdown(true);
      if (typeof window !== 'undefined')
        window.requestAnimationFrame(closeDropdown);
      else closeDropdown();
      onBlur?.(e);
    },
    [commitIfValid, inputValue, onBlur, value],
  );

  const dynamicOptions =
    value && TIME_REGEX.test(value)
      ? insertOptionSorted(availableOptions, value)
      : availableOptions;

  const selectedOptionsValue = value ? [value] : [];

  // chips av -> ikke send selectedOptions
  // NB: bevar keyboard/arrow-oppførsel via filteredOptions/options
  return (
    <Combobox
      ref={inputRef}
      label={label}
      hideLabel={hideLabel}
      disabled={disabled}
      error={error}
      className='w-[7rem]'
      options={dynamicOptions}
      filteredOptions={dynamicOptions}
      allowNewValues={true}
      toggleListButton={true}
      isListOpen={forceCloseDropdown ? false : undefined}
      value={inputValue}
      inputClassName='flex-1 min-w-0 box-border'
      shouldShowSelectedOptions={false}
      selectedOptions={selectedOptionsValue}
      onMouseDownCapture={(e) => {
        // markér at neste tomme change fra lib skal ignoreres
        if ((e.target as HTMLElement).tagName !== 'INPUT') {
          const el = inputRef.current;
          if (el) el.focus();
          e.preventDefault();
        }
        ignoreNextEmptyChangeRef.current = true;
      }}
      onFocus={() => {
        setIsFocused(true);
        didUserTypeRef.current = false;
        lastFocusValueRef.current = value;
        setForceCloseDropdown(false);
        // ikke setInputValue her
        queueScrollIntoView();
      }}
      onToggleSelected={(option, isSelected) => {
        if (isSelected) {
          didUserTypeRef.current = true;
          setInputValue(option);
          commitIfValid(option);
          setForceCloseDropdown(false);
        }
      }}
      onChange={(val) => handleInputChange(val)}
      onBlur={handleBlur}
      onKeyDownCapture={(event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          setForceCloseDropdown(false);
        }
      }}
      onBeforeInput={(event) => {
        const nativeEvent = event.nativeEvent as InputEvent;
        const data = 'data' in nativeEvent ? nativeEvent.data : null;
        if (!isAllowedInput(data)) event.preventDefault();
      }}
      onPaste={(event) => {
        const pasted = event.clipboardData.getData('text');
        if (!isAllowedInput(pasted)) event.preventDefault();
      }}
    />
  );
}

export default TimeInput;
