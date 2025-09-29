'use client';

import { UNSAFE_Combobox as Combobox } from '@navikt/ds-react';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export const PREDEFINERTE_MINUTTER = [0, 30] as const;

export const KLOKKESLETT_OPTIONS = Array.from({ length: 24 }, (_, h) =>
  PREDEFINERTE_MINUTTER.map(
    (m) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
  ),
).flat();

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

const tolkTidsinndata = (tekst: string): string | null => {
  const m = tekst.match(/^(\d{1,2})(?::?(\d{0,2}))?$/);
  if (!m) return null;

  const t = Math.min(parseInt(m[1] || '0', 10) || 0, 23);
  const r = parseInt(m[2] || '0', 10) || 0;
  const n = PREDEFINERTE_MINUTTER.reduce(
    (best, cand) => (Math.abs(cand - r) < Math.abs(best - r) ? cand : best),
    PREDEFINERTE_MINUTTER[0],
  );

  return `${String(t).padStart(2, '0')}:${String(n).padStart(2, '0')}`;
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
  maxTime?: string;
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
  maxTime,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suppressAutoScrollRef = useRef(false);

  const availableOptions = useMemo(() => {
    const opts = options ?? KLOKKESLETT_OPTIONS;
    return maxTime ? opts.filter((opt) => opt <= maxTime) : opts;
  }, [options, maxTime]);

  const [inputValue, setInputValue] = useState(value ?? '');
  const [forceCloseDropdown, setForceCloseDropdown] = useState(false);

  const didUserTypeRef = useRef(false);
  const lastFocusValueRef = useRef<string | undefined>(value);
  const ignoreNextEmptyChangeRef = useRef(false);
  const ignoreBlurDueToOptionClickRef = useRef(false);

  const erLovligTid = useCallback(
    (val: string) => TIME_REGEX.test(val) && (!maxTime || val <= maxTime),
    [maxTime],
  );

  const erLovligInput = useCallback(
    (text?: string | null) => !text || /^[\d:]*$/.test(text),
    [],
  );

  const insertOptionSortert = useCallback(
    (opts: string[], v: string) =>
      maxTime && v > maxTime
        ? opts
        : opts.includes(v)
          ? opts
          : [...opts, v].sort(),
    [maxTime],
  );

  const dynamiskeOptions =
    value && erLovligTid(value)
      ? insertOptionSortert(availableOptions, value)
      : availableOptions;

  const roter = (arr: string[], start: string) => {
    const idx = arr.indexOf(start);
    if (idx <= 0) return arr;
    return [...arr.slice(idx), ...arr.slice(0, idx)];
  };

  const rotatedOptions = useMemo(() => {
    if (
      inputValue &&
      erLovligTid(inputValue) &&
      dynamiskeOptions.includes(inputValue)
    ) {
      return roter(dynamiskeOptions, inputValue);
    }
    if (value && erLovligTid(value) && dynamiskeOptions.includes(value)) {
      return roter(dynamiskeOptions, value);
    }
    return dynamiskeOptions;
  }, [dynamiskeOptions, inputValue, value, erLovligTid]);

  const hentListeElement = () => {
    const input = inputRef.current;
    if (!input || typeof document === 'undefined') return null;
    const id = input.getAttribute('aria-controls');
    return id ? (document.getElementById(id) as HTMLElement | null) : null;
  };

  const scrollSelectedIntoView = useCallback(() => {
    if (suppressAutoScrollRef.current) return;
    const input = inputRef.current;
    if (!input || input.getAttribute('aria-expanded') !== 'true') return;

    const list = hentListeElement();
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
    window.requestAnimationFrame(scrollSelectedIntoView);
  }, [scrollSelectedIntoView]);

  const finalizeCommit = useCallback(
    (valRaw: string) => {
      const v = valRaw.trim();

      if (v === '') {
        if (didUserTypeRef.current) {
          if (value) onChange('');
        } else {
          setInputValue(value ?? '');
        }
        return true;
      }

      if (erLovligTid(v)) {
        if (v !== value) onChange(v);
        return true;
      }

      setInputValue(value ?? '');
      return false;
    },
    [erLovligTid, onChange, value],
  );

  const handleInputChange = useCallback((val: string) => {
    if (ignoreNextEmptyChangeRef.current && val === '') {
      ignoreNextEmptyChangeRef.current = false;
      return;
    }

    if (!didUserTypeRef.current && val !== '') didUserTypeRef.current = true;
    if (val === '' && !didUserTypeRef.current) return;

    setInputValue(val === '' ? '' : val);
    if (val !== '') setForceCloseDropdown(true);
  }, []);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const related = e.relatedTarget as HTMLElement | null;
      const list = hentListeElement();
      const blurInsideList =
        ignoreBlurDueToOptionClickRef.current ||
        (related && list ? list.contains(related) : false);
      if (blurInsideList) {
        ignoreBlurDueToOptionClickRef.current = false;
        onBlur?.(e);
        return;
      }

      ignoreBlurDueToOptionClickRef.current = false;

      const unchanged =
        !didUserTypeRef.current &&
        (inputValue === '' || inputValue === lastFocusValueRef.current);

      if (unchanged) {
        setInputValue(value ?? '');
        onBlur?.(e);
        return;
      }

      finalizeCommit(inputValue);

      const close = () => setForceCloseDropdown(true);
      if (typeof window !== 'undefined') window.requestAnimationFrame(close);
      else close();

      onBlur?.(e);
    },
    [finalizeCommit, inputValue, onBlur, value],
  );

  const beregnNesteVerdi = useCallback(
    (nåværende: string | undefined, endring: number) => {
      const alternativer = dynamiskeOptions;
      const indexFor = (verdi?: string) =>
        verdi && erLovligTid(verdi) ? alternativer.indexOf(verdi) : -1;

      let i = indexFor(nåværende);
      if (i === -1) {
        const tolket = tolkTidsinndata(inputValue);
        i = tolket ? alternativer.indexOf(tolket) : -1;
      }
      if (i === -1) {
        const start = inputValue || value || '';
        const j = alternativer.indexOf(start);
        i = j >= 0 ? j : 0;
      }

      return alternativer[
        (i + endring + alternativer.length) % alternativer.length
      ];
    },
    [dynamiskeOptions, erLovligTid, inputValue, value],
  );

  const gåTilNesteTid = useCallback(
    (nåværende: string | undefined, endring: number) => {
      const neste = beregnNesteVerdi(nåværende, endring);
      didUserTypeRef.current = true;
      ignoreNextEmptyChangeRef.current = true;
      setInputValue(neste);
    },
    [beregnNesteVerdi],
  );

  const handleKeyDownCapture: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const k = event.key;
        if (k === 'ArrowDown' || k === 'ArrowUp') {
          event.preventDefault();
          event.stopPropagation();
          gåTilNesteTid(inputValue || value, k === 'ArrowDown' ? +1 : -1);
          return;
        }
        if (k === 'Enter') {
          ignoreNextEmptyChangeRef.current = true;
          const ok = finalizeCommit(inputValue ?? '');
          if (!ok && value) setInputValue(value);
          setForceCloseDropdown(true);
        }
      },
      [finalizeCommit, inputValue, gåTilNesteTid, value],
    );

  const handleBeforeInput: React.FormEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const nativeEvent = event.nativeEvent as InputEvent;
        const data = 'data' in nativeEvent ? (nativeEvent as any).data : null;
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
      const t = e.target as HTMLElement;
      const isInput = t.tagName === 'INPUT';
      const isOption =
        t.getAttribute('role') === 'option' || !!t.closest("[role='option']");
      const inListbox = !!t.closest("[role='listbox']");
      if (isOption || inListbox) ignoreBlurDueToOptionClickRef.current = true;
      if (inListbox) suppressAutoScrollRef.current = true;
      if (!(isInput || isOption || inListbox)) {
        inputRef.current?.focus();
        e.preventDefault();
        ignoreNextEmptyChangeRef.current = true;
      }
    }, []);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> =
    useCallback(() => {
      suppressAutoScrollRef.current = false;
      didUserTypeRef.current = false;
      lastFocusValueRef.current = value;
      setForceCloseDropdown(false);
      ignoreNextEmptyChangeRef.current = true;
      ignoreBlurDueToOptionClickRef.current = false;
      queueScrollIntoView();
    }, [queueScrollIntoView, value]);

  useEffect(() => setInputValue(value ?? ''), [value]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const observer = new MutationObserver(() => {
      if (input.getAttribute('aria-expanded') === 'true') queueScrollIntoView();
    });

    observer.observe(input, {
      attributes: true,
      attributeFilter: ['aria-expanded'],
    });
    return () => observer.disconnect();
  }, [queueScrollIntoView]);

  const selectedOptionsValue = useMemo(() => {
    const candidate =
      inputValue &&
      erLovligTid(inputValue) &&
      rotatedOptions.includes(inputValue)
        ? inputValue
        : value && erLovligTid(value) && rotatedOptions.includes(value)
          ? value
          : undefined;
    return candidate ? [candidate] : [];
  }, [inputValue, value, erLovligTid, rotatedOptions]);
  const computedClassName = `${className ?? 'w-[7rem]'} focus-within:outline-none focus-visible:outline-none focus-within:ring-0 focus-visible:ring-0`;

  return (
    <Combobox
      ref={inputRef}
      label={label}
      hideLabel={hideLabel}
      disabled={disabled}
      error={error}
      className={computedClassName}
      options={rotatedOptions}
      filteredOptions={rotatedOptions}
      allowNewValues
      toggleListButton
      isListOpen={forceCloseDropdown ? false : undefined}
      value={inputValue}
      inputClassName='min-w-0'
      shouldShowSelectedOptions={false}
      selectedOptions={selectedOptionsValue}
      onMouseDownCapture={handleMouseDownCapture}
      onFocus={handleFocus}
      onToggleSelected={(option, isSelected) => {
        if (isSelected) {
          ignoreNextEmptyChangeRef.current = true;
          ignoreBlurDueToOptionClickRef.current = false;
          setInputValue(option);
          lastFocusValueRef.current = option;
          didUserTypeRef.current = false;
          onChange(option);
          setForceCloseDropdown(true);
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
