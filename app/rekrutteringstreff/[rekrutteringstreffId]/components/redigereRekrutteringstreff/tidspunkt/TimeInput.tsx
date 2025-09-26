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

  const availableOptions = options ?? KLOKKESLETT_OPTIONS;

  const [inputValue, setInputValue] = useState(value ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const [forceCloseDropdown, setForceCloseDropdown] = useState(false);

  const didUserTypeRef = useRef(false);
  const lastFocusValueRef = useRef<string | undefined>(value);
  const ignoreNextEmptyChangeRef = useRef(false);

  const erLovligTid = useCallback((val: string) => TIME_REGEX.test(val), []);
  const erLovligInput = useCallback(
    (text?: string | null) => !text || /^[\d:]*$/.test(text),
    [],
  );

  const insertOptionSorted = useCallback((opts: string[], v: string) => {
    return opts.includes(v) ? opts : [...opts, v].sort();
  }, []);

  const dynamiskeOptions =
    value && erLovligTid(value)
      ? insertOptionSorted(availableOptions, value)
      : availableOptions;

  const getListEl = () => {
    const input = inputRef.current;
    if (!input || typeof document === 'undefined') return null;
    const id = input.getAttribute('aria-controls');
    return id ? (document.getElementById(id) as HTMLElement | null) : null;
  };

  const scrollSelectedIntoView = useCallback(() => {
    const input = inputRef.current;
    if (!input || input.getAttribute('aria-expanded') !== 'true') return;
    const list = getListEl();
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
    if (!selected) return;

    const listbox =
      selected.closest<HTMLElement>("[role='listbox']") ||
      selected.parentElement;
    if (listbox) listbox.scrollTop = selected.offsetTop;
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

  const commitIfValid = useCallback(
    (val: string) => {
      if (val === '') {
        if (value) onChange('');
        return true;
      }
      if (erLovligTid(val)) {
        if (val !== value) onChange(val);
        return true;
      }
      return false;
    },
    [erLovligTid, onChange, value],
  );

  const handleInputChange = useCallback((val: string) => {
    if (ignoreNextEmptyChangeRef.current && val === '') {
      ignoreNextEmptyChangeRef.current = false;
      return;
    }
    if (val === '' && !didUserTypeRef.current) return;

    if (val !== '' && !didUserTypeRef.current) didUserTypeRef.current = true;

    if (val === '' && didUserTypeRef.current) setInputValue('');
    else if (val !== '') setInputValue(val);

    if (val !== '') setForceCloseDropdown(true);
  }, []);

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

  const tolkTidsinndata = (tekst: string): string | null => {
    const tidsformat = tekst.match(/^(\d{1,2})(?::?(\d{0,2}))?$/);
    if (!tidsformat) return null;
    const timer = Math.min(parseInt(tidsformat[1] || '0', 10) || 0, 23);
    const minutterRå = parseInt(tidsformat[2] || '0', 10) || 0;
    const minutterAvrundet = [0, 15, 30, 45].reduce(
      (forrige, nåværende) =>
        Math.abs(nåværende - minutterRå) < Math.abs(forrige - minutterRå)
          ? nåværende
          : forrige,
      0,
    );
    return `${String(timer).padStart(2, '0')}:${String(minutterAvrundet).padStart(2, '0')}`;
  };

  const beregnNesteVerdi = (nåværende: string | undefined, endring: number) => {
    const alternativer = dynamiskeOptions;
    const erGyldigTid = (verdi?: string) =>
      verdi && erLovligTid(verdi) ? alternativer.indexOf(verdi) : -1;

    let indeks = erGyldigTid(nåværende);
    if (indeks === -1) {
      const tolkeTid = tolkTidsinndata(inputValue);
      indeks = tolkeTid ? alternativer.indexOf(tolkeTid) : -1;
    }
    if (indeks === -1) indeks = Math.max(alternativer.indexOf(value ?? ''), 0);

    return alternativer[
      (indeks + endring + alternativer.length) % alternativer.length
    ];
  };

  const gåTilNesteTid = useCallback(
    (nåværende: string | undefined, endring: number) => {
      const nesteTid = beregnNesteVerdi(nåværende, endring);
      didUserTypeRef.current = true;
      ignoreNextEmptyChangeRef.current = true;
      setInputValue(nesteTid);
      commitIfValid(nesteTid);
      setForceCloseDropdown(true);
    },
    [commitIfValid, beregnNesteVerdi],
  );

  const handleKeyDownCapture: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          gåTilNesteTid(value ?? inputValue, +1);
          return;
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          gåTilNesteTid(value ?? inputValue, -1);
          return;
        }
        if (event.key === 'Enter') {
          ignoreNextEmptyChangeRef.current = true;
          const ok = commitIfValid((inputValue ?? '').trim());
          if (!ok && value) setInputValue(value);
          setForceCloseDropdown(true);
        }
      },
      [commitIfValid, inputValue, gåTilNesteTid, value],
    );

  const handleBeforeInput: React.FormEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const nativeEvent = event.nativeEvent as InputEvent;
        const data = 'data' in nativeEvent ? nativeEvent.data : null;
        if (!erLovligInput(data)) event.preventDefault();
      },
      [erLovligInput],
    );

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const pasted = event.clipboardData.getData('text');
        if (!erLovligInput(pasted)) event.preventDefault();
      },
      [erLovligInput],
    );

  const handleMouseDownCapture: React.MouseEventHandler<HTMLDivElement> =
    useCallback((e) => {
      if ((e.target as HTMLElement).tagName !== 'INPUT') {
        const el = inputRef.current;
        if (el) el.focus();
        e.preventDefault();
      }
      ignoreNextEmptyChangeRef.current = true;
    }, []);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> =
    useCallback(() => {
      setIsFocused(true);
      didUserTypeRef.current = false;
      lastFocusValueRef.current = value;
      setForceCloseDropdown(false);
      queueScrollIntoView();
    }, [queueScrollIntoView, value]);

  useEffect(() => {
    if (!isFocused || !didUserTypeRef.current) setInputValue(value ?? '');
  }, [value, isFocused]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'aria-expanded') {
          if (input.getAttribute('aria-expanded') === 'true')
            queueScrollIntoView();
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

  const selectedOptionsValue = value ? [value] : [];

  return (
    <Combobox
      ref={inputRef}
      label={label}
      hideLabel={hideLabel}
      disabled={disabled}
      error={error}
      className={className ?? 'w-[7rem]'}
      options={dynamiskeOptions}
      filteredOptions={dynamiskeOptions}
      allowNewValues={true}
      toggleListButton={true}
      isListOpen={forceCloseDropdown ? false : undefined}
      value={inputValue}
      inputClassName='flex-1 min-w-0 box-border'
      shouldShowSelectedOptions={false}
      selectedOptions={selectedOptionsValue}
      onMouseDownCapture={handleMouseDownCapture}
      onFocus={handleFocus}
      onToggleSelected={(option, isSelected) => {
        if (isSelected) {
          ignoreNextEmptyChangeRef.current = true;
          didUserTypeRef.current = true;
          setInputValue(option);
          commitIfValid(option);
          setForceCloseDropdown(false);
        }
      }}
      onChange={handleInputChange}
      onBlur={handleBlur}
      onKeyDownCapture={handleKeyDownCapture}
      onBeforeInput={handleBeforeInput}
      onPaste={handlePaste}
    />
  );
}

export default TimeInput;
