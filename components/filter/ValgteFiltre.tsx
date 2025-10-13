'use client';

import { formatChipText } from './FilterChip';
import TømFiltre, { TømFiltreProps } from './TømFiltre';
import { storForbokstavString } from '@/app/kandidat/util';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { Button, Chips } from '@navikt/ds-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface FilterItem {
  type: string[];
  setVerdi: (verdi: string[]) => void;
  mapVerdiNavn?: (verdi: string) => string;
}

export interface ValgteFilterProps {
  tømFiltreProps?: TømFiltreProps;
  filtre?: FilterItem[];
}

const ValgteFiltre: React.FC<ValgteFilterProps> = ({
  tømFiltreProps,
  filtre = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [collapsedCount, setCollapsedCount] = useState(0);
  const [lineHeight, setLineHeight] = useState<number | null>(null);
  const [reservedWidth, setReservedWidth] = useState(0); // faktisk width av kontroll (gradient + tekst + knapp)
  const [collapseBtnWidth, setCollapseBtnWidth] = useState(0); // bredde av collapse-knapp i expanded

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const collapseBtnRef = useRef<HTMLButtonElement>(null);

  const chips = filtre.flatMap((filter, filterIndex) =>
    (filter.type || []).map((value, i) => {
      const label = filter.mapVerdiNavn
        ? formatChipText(filter.mapVerdiNavn(value))
        : formatChipText(storForbokstavString(value));
      return {
        key: `${filterIndex}-${value}-${i}`,
        label,
        remove: () =>
          filter.setVerdi((filter.type || []).filter((v) => v !== value)),
      };
    }),
  );

  const hiddenCount = Math.max(0, chips.length - collapsedCount);
  const hasHidden = hiddenCount > 0;

  // Måling av hvor mange chips som får plass i collapsed state
  useLayoutEffect(() => {
    if (!containerRef.current || !measureRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    if (!containerWidth) return;
    const measureEl = measureRef.current;
    const chipButtons = Array.from(
      measureEl.querySelectorAll<HTMLButtonElement>(
        'button[data-chip-measure]',
      ),
    );
    const clearBtn = measureEl.querySelector<HTMLButtonElement>(
      'button[data-clear-all]',
    );
    const controlWrapper = measureEl.querySelector<HTMLDivElement>(
      'div[data-control-wrapper]',
    );
    const countEl = controlWrapper?.querySelector<HTMLSpanElement>(
      'span[data-count-text]',
    );

    // Dynamisk gap (flex gap) fra målecontaineren
    const computed = getComputedStyle(measureEl);
    const gapValue = parseFloat(computed.columnGap || computed.gap || '0') || 0;

    const clearWidth = clearBtn?.offsetWidth || 0;
    const chipWidths = chipButtons.map((b) => b.offsetWidth);

    // Lag kumulativ liste inkludert gap mellom chipper (men ikke etter siste)
    const cumulative: number[] = [];
    chipWidths.reduce((acc, w, idx) => {
      const next = acc + w + (idx > 0 || clearWidth > 0 ? gapValue : 0);
      cumulative.push(next);
      return next;
    }, clearWidth);

    const totalAll = cumulative[cumulative.length - 1] || clearWidth;
    if (totalAll <= containerWidth) {
      if (collapsedCount !== chips.length) setCollapsedCount(chips.length);
      if (reservedWidth !== 0) setReservedWidth(0);
      return;
    }

    let bestCount = 0;
    let bestReserved = 0;
    for (let candidate = chips.length; candidate >= 0; candidate--) {
      const hidden = chips.length - candidate;
      if (hidden === 0) {
        const widthChips =
          candidate === 0 ? clearWidth : cumulative[candidate - 1];
        if (widthChips <= containerWidth) {
          bestCount = candidate;
          bestReserved = 0;
          break;
        }
        continue;
      }
      if (countEl)
        countEl.textContent = `+ ${hidden} filter${hidden !== 1 ? 'e' : ''}`;
      // Mål bredden på kontrollwrapper (tekst + knapp + intern gap)
      const controlWidth = controlWrapper?.offsetWidth || 0;
      // Legg til minimal fade-bredde (16px) + padding fra absolutt container (pr-2 = 8px)
      const fadeWidth = 16;
      const paddingRight = 8;
      const totalControlWidth = controlWidth + fadeWidth + paddingRight;
      const widthChips =
        candidate === 0 ? clearWidth : cumulative[candidate - 1];
      // Inkluder gap mellom siste chip og kontroll
      const totalWidth =
        widthChips + (widthChips > 0 ? gapValue : 0) + totalControlWidth;
      if (totalWidth <= containerWidth) {
        bestCount = candidate;
        bestReserved = totalControlWidth;
        break;
      }
    }

    if (bestCount !== collapsedCount) setCollapsedCount(bestCount);
    if (bestReserved !== reservedWidth) setReservedWidth(bestReserved);
  }, [chips, tømFiltreProps, collapsedCount, reservedWidth]);

  // Måling av høyde + collapse-knapp bredde (for spacer i expanded)
  useLayoutEffect(() => {
    const el = chipsRef.current;
    if (el && !lineHeight) setLineHeight(el.getBoundingClientRect().height);

    // Mål collapse-knapp bredde på forhånd fra measure-container
    if (collapseBtnWidth === 0 && measureRef.current) {
      const collapseBtnEl = measureRef.current.querySelector<HTMLButtonElement>(
        'button[data-collapse-measure]',
      );
      if (collapseBtnEl) {
        const w = collapseBtnEl.offsetWidth + 8; // knapp + pr-2 padding
        setCollapseBtnWidth(w);
      }
    }
  }, [lineHeight, collapseBtnWidth]);

  // Resize -> remål
  useEffect(() => {
    let t: NodeJS.Timeout;
    const handler = () => {
      clearTimeout(t);
      t = setTimeout(() => setCollapsedCount(0), 150);
    };
    window.addEventListener('resize', handler);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', handler);
    };
  }, []);

  if (chips.length === 0) return null;
  const chipsToRender = isExpanded ? chips : chips.slice(0, collapsedCount);
  const maxHeightStyle = isExpanded
    ? lineHeight
      ? `${lineHeight * 8}px`
      : '600px'
    : lineHeight
      ? `${lineHeight}px`
      : '40px';

  const chipsPaddingRight = isExpanded ? (collapseBtnWidth || 40) + 16 : 0;

  return (
    <div ref={containerRef} className='w-full'>
      <div className='flex justify-between relative'>
        <Chips
          ref={chipsRef as any}
          size='small'
          className='flex items-center gap-2 flex-wrap flex-1 min-w-0 transition-all duration-300 ease-in-out overflow-hidden'
          style={{ maxHeight: maxHeightStyle, paddingRight: chipsPaddingRight }}
          aria-expanded={isExpanded}
        >
          {tømFiltreProps && (
            <div className='flex-shrink-0'>
              <TømFiltre
                {...tømFiltreProps}
                data-clear-all='true'
                className='flex-shrink-0'
              />
            </div>
          )}
          {chipsToRender.map((chip) => (
            <Chips.Removable
              key={chip.key}
              onClick={chip.remove}
              style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
              className='flex-shrink-0'
            >
              {chip.label}
            </Chips.Removable>
          ))}
        </Chips>
        {/* Skjult målecontainer */}
        <div
          ref={measureRef}
          className='invisible fixed left-[-9999px] flex items-center gap-2 flex-nowrap'
          aria-hidden='true'
        >
          {tømFiltreProps && (
            <div className='flex-shrink-0'>
              <TømFiltre
                {...tømFiltreProps}
                data-clear-all
                className='flex-shrink-0'
              />
            </div>
          )}
          {chips.map((chip) => (
            <Chips.Removable
              key={`m-${chip.key}`}
              data-chip-measure
              onClick={(e) => e.preventDefault()}
              className='flex-shrink-0 whitespace-nowrap'
            >
              {chip.label}
            </Chips.Removable>
          ))}
          <div data-control-wrapper className='flex items-center gap-2'>
            <span data-count-text className='text-s whitespace-nowrap'>
              + 0 filtre
            </span>
            <Button
              data-expand-measure
              size='small'
              variant='tertiary'
              className='flex-shrink-0'
              icon={<ChevronDownIcon />}
            />
            <Button
              data-collapse-measure
              size='small'
              variant='tertiary'
              className='flex-shrink-0'
              icon={<ChevronDownIcon className='rotate-180' />}
            />
          </div>
        </div>
        {hasHidden && !isExpanded && (
          <div
            className='absolute inset-y-0 right-0 flex items-center justify-end'
            style={{ width: reservedWidth }}
          >
            <div
              className='absolute inset-0 pointer-events-none'
              style={{
                background:
                  'linear-gradient(to right, rgba(0,0,0,0) 0%, var(--ax-surface-default) 55%)',
              }}
            />
            <div
              onClick={() => setIsExpanded(true)}
              className='relative flex items-center gap-2 pr-2 cursor-pointer'
            >
              <span className='text-s whitespace-nowrap'>{`+ ${hiddenCount} filte`}</span>
              <Button
                size='small'
                variant='tertiary'
                aria-label='Vis flere filtre'
                icon={<ChevronDownIcon className='transition-transform' />}
              />
            </div>
          </div>
        )}
        {isExpanded && (
          <div className='absolute top-0 right-0 pr-2 pt-0'>
            <Button
              ref={collapseBtnRef}
              size='small'
              variant='tertiary'
              aria-label='Skjul filtre'
              onClick={() => setIsExpanded(false)}
              icon={
                <ChevronDownIcon className='rotate-180 transition-transform' />
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ValgteFiltre;
