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
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleChipCount, setVisibleChipCount] = useState<number>(0);

  // Flatten alle chips til individuelle elementer
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

  // Måle bredder og beregne synlige chips
  useLayoutEffect(() => {
    // Ikke mål hvis expanded - alle chips vises uansett
    if (isExpanded) {
      return;
    }

    if (!containerRef.current || chips.length === 0) {
      setVisibleChipCount((prev) => (prev !== 0 ? 0 : prev));
      return;
    }

    const containerWidth = containerRef.current.offsetWidth;
    if (containerWidth === 0) return;

    const measureEl = measureRef.current;
    if (!measureEl) return;

    const gapPx = 8;
    const safetyMargin = 100; // Høy margin for å håndtere lange chip-navn som "Kontinentallsokkelen"

    const chipButtons = Array.from(
      measureEl.querySelectorAll<HTMLButtonElement>(
        'button[data-chip-measure]',
      ),
    );
    const clearBtn = measureEl.querySelector<HTMLButtonElement>(
      'button[data-clear-all]',
    );
    const countTextEl = measureEl.querySelector<HTMLButtonElement>(
      'button[data-count-text]',
    );
    const arrowBtn = measureEl.querySelector<HTMLButtonElement>(
      'button[data-arrow-button]',
    );

    const clearWidth = clearBtn?.offsetWidth || 0;
    const countTextWidth = countTextEl?.offsetWidth || 90;
    const arrowWidth = arrowBtn?.offsetWidth || 48;
    const chipWidths = chipButtons.map((b) => b.offsetWidth);

    // Beregn total bredde uten count text og pil
    let totalWidth = clearWidth;
    chipWidths.forEach((w, idx) => {
      totalWidth += (idx > 0 || clearWidth > 0 ? gapPx : 0) + w;
    });

    // Hvis alt får plass uten count text og pil
    if (totalWidth + safetyMargin <= containerWidth) {
      setVisibleChipCount((prev) =>
        prev !== chips.length ? chips.length : prev,
      );
      return;
    }

    // Beregn hvor mange som får plass med count text og pil
    // Merk: count text og arrow er i egen div med gap-2 mellom dem
    const rightSideWidth = countTextWidth + gapPx + arrowWidth + 16; // +16 for pl-4 padding
    const availableWidth =
      containerWidth -
      rightSideWidth -
      safetyMargin -
      (clearWidth > 0 ? clearWidth + gapPx : 0) -
      gapPx * 2; // ekstra gap for sikkerhet

    let usedWidth = 0;
    let count = 0;

    for (let i = 0; i < chipWidths.length; i++) {
      const nextWidth = usedWidth + chipWidths[i] + (i > 0 ? gapPx : 0);
      if (nextWidth <= availableWidth) {
        usedWidth = nextWidth;
        count++;
      } else {
        break;
      }
    }

    setVisibleChipCount((prev) => (prev !== count ? count : prev));
  }, [chips, tømFiltreProps, isExpanded]);

  // Re-mål ved resize
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setVisibleChipCount(0); // trigger remåling
      }, 150);
    };
    window.addEventListener('resize', handler);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handler);
    };
  }, []);

  if (chips.length === 0) return null;

  const hiddenCount = Math.max(0, chips.length - visibleChipCount);
  const hasHidden = hiddenCount > 0;
  const chipsToRender = isExpanded ? chips : chips.slice(0, visibleChipCount);

  return (
    <div ref={containerRef} className='w-full'>
      {/* Gjør container relativ slik at toggle kan plasseres absolutt i hjørnet */}
      <div className='flex justify-between relative'>
        <div className='flex gap-2'>
          {/* Venstre side: filtre */}
          <Chips
            size='small'
            className={`flex items-center gap-2 flex-1 min-w-0 ${isExpanded ? 'flex-wrap' : 'flex-nowrap overflow-hidden'}`}
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

            {!isExpanded &&
              chipsToRender.map((chip) => (
                <Chips.Removable
                  key={chip.key}
                  onClick={chip.remove}
                  style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                  className='flex-shrink-0'
                >
                  {chip.label}
                </Chips.Removable>
              ))}

            {/* Alle chips når expanded */}
            {isExpanded &&
              chips.map((chip) => (
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
        </div>
        {/* Målecontainer (skjult) */}
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

          {/* Måle-elementer for høyre side */}
          <span data-count-text className='text-sm whitespace-nowrap'>
            + 999 filtre
          </span>
          <Button
            variant='tertiary'
            size='small'
            data-arrow-button
            className='flex-shrink-0'
            icon={<ChevronDownIcon />}
          />
        </div>
        {hasHidden && (
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex items-center gap-2 flex-shrink-0 absolute top-0 right-0 z-10 pl-4 cursor-pointer'
          >
            {!isExpanded && (
              <span className='text-sm whitespace-nowrap'>
                {`+ ${hiddenCount} filter${hiddenCount !== 1 ? 'e' : ''}`}
              </span>
            )}
            <Button
              variant='tertiary'
              size='small'
              className='flex-shrink-0'
              aria-label={isExpanded ? 'Skjul filtre' : 'Vis flere filtre'}
              icon={
                <ChevronDownIcon className={isExpanded ? 'rotate-180' : ''} />
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ValgteFiltre;
