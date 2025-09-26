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

// Regex for å validere HH:MM (24-timers format)
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM

const insertOptionSorted = (options: string[], newOption: string) => {
  if (options.includes(newOption)) {
    return options;
  }

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
  // Trenger ref for å kunne scrolle til valgt element i dropdown, det er ikke standard funksjonalitet i ds-react sin Combobox
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Sørger for at valgt option havner helt øverst i lista
  const scrollSelectedIntoView = useCallback(() => {
    if (typeof document === 'undefined') return;
    const input = inputRef.current;
    if (!input || input.getAttribute('aria-expanded') !== 'true') return;
    const listId = input.getAttribute('aria-controls');
    if (!listId) return;

    const selected = document
      .getElementById(listId)
      ?.querySelector<HTMLElement>("[role='option'][aria-selected='true']");
    if (selected) {
      const listbox =
        selected.closest<HTMLElement>("[role='listbox']") ||
        selected.parentElement;
      if (listbox) {
        listbox.scrollTop = selected.offsetTop; // Plasser valgt øverst
      }
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

  const [inputValue, setInputValue] = useState(value ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const [forceCloseDropdown, setForceCloseDropdown] = useState(false);
  const didUserTypeRef = useRef(false); // Sporer om bruker faktisk har interagert med input-teksten
  const lastFocusValueRef = useRef<string | undefined>(value);

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  const isAllowedTime = useCallback((val: string) => TIME_REGEX.test(val), []);

  const isAllowedInput = useCallback(
    (text?: string | null) => !text || /^[\d:]*$/.test(text),
    [],
  );

  const handleInputChange = useCallback((val: string) => {
    if (val === '' && !didUserTypeRef.current) {
      return;
    }
    if (val !== '' && !didUserTypeRef.current) {
      didUserTypeRef.current = true;
    }
    if (val === '' && didUserTypeRef.current) {
      setInputValue('');
    } else if (val !== '') {
      setInputValue(val);
    }
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
      // Hvis bruker ikke skrev noe og inputValue er lik fokusverdi, ikke forsøk å committe tom init event
      if (
        !didUserTypeRef.current &&
        (inputValue === '' || inputValue === lastFocusValueRef.current)
      ) {
        setInputValue(value ?? '');
        onBlur?.(e);
        return;
      }

      const ok = commitIfValid(inputValue.trim());
      if (!ok) {
        setInputValue(value ?? '');
      }
      setForceCloseDropdown(false);
      onBlur?.(e);
    },
    [commitIfValid, inputValue, onBlur, value],
  );

  // Hvis den commit'ede verdien (value) ikke finnes i 15-min listen fordi bruker skrev et custom minutt, legg den til så den vises som valgt
  const dynamicOptions =
    value && TIME_REGEX.test(value)
      ? insertOptionSorted(availableOptions, value)
      : availableOptions;

  // Under skriving (fokus) skal ikke tidligere valg vises som chip. Uten å ta hensyn til dette vil tidspunkt vises når vi blanker ut feltet når vi skal skrive helt nytt tidspunkt.
  const showSelectedOption = !isFocused && value !== undefined && value !== '';
  const selectedOptionsValue = showSelectedOption ? [value] : [];

  return (
    <Combobox
      ref={inputRef}
      label={label}
      hideLabel={hideLabel}
      disabled={disabled}
      error={error}
      className={['min-w-[7rem]', className].filter(Boolean).join(' ')}
      options={dynamicOptions}
      filteredOptions={dynamicOptions}
      allowNewValues={true}
      toggleListButton={true}
      isListOpen={forceCloseDropdown ? false : undefined}
      value={inputValue}
      selectedOptions={selectedOptionsValue}
      onFocus={() => {
        setIsFocused(true);
        didUserTypeRef.current = false;
        lastFocusValueRef.current = value;
        setInputValue(value ?? '');
        setForceCloseDropdown(false);
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
        if (!isAllowedInput(data)) {
          event.preventDefault();
        }
      }}
      onPaste={(event) => {
        const pasted = event.clipboardData.getData('text');
        if (!isAllowedInput(pasted)) {
          event.preventDefault();
        }
      }}
    />
  );
}

export default TimeInput;
