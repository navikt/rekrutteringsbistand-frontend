'use client';

import { formatChipText } from './FilterChip';
import TømFiltre, { TømFiltreProps } from './TømFiltre';
import { storForbokstavString } from '@/app/kandidat/util';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';
import {
  ChevronDownCircleIcon,
  ChevronUpCircleIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Button, Chips, Tooltip } from '@navikt/ds-react';
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
  const umami = useUmami();

  const [isExpanded, setIsExpanded] = useState(false);
  const [collapsedCount, setCollapsedCount] = useState(0);
  const [lineHeight, setLineHeight] = useState<number | null>(null);
  const [reservedWidth, setReservedWidth] = useState(0); // faktisk width av kontroll (gradient + tekst + knapp)
  const [collapseBtnWidth, setCollapseBtnWidth] = useState(0); // bredde av collapse-knapp i expanded
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

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

  // Track når filterpanelet ekspanderes
  useEffect(() => {
    if (isExpanded) {
      umami.track(UmamiEvent.Generell.åpne_filter_chip_panel);
    } else {
      umami.track(UmamiEvent.Generell.lukk_filter_chip_panel);
    }
  }, [isExpanded, umami]);

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

  // Scroll handler for scrollbar visibility
  const handleScroll = () => {
    setIsScrolling(true);

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    const timeout = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);

    setScrollTimeout(timeout);
  };

  // Cleanup scroll timeout
  useEffect(() => {
    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

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
      <style jsx>{`
        .chips-scroll-container::-webkit-scrollbar {
          width: 16px;
          height: 16px;
        }
        .chips-scroll-container::-webkit-scrollbar-track {
          background: transparent;
          margin: 2px;
        }
        .chips-scroll-container::-webkit-scrollbar-thumb {
          background: ${isScrolling
            ? 'rgba(203, 213, 225, 0.8)'
            : 'transparent'};
          border-radius: 8px;
          border: 4px solid transparent;
          background-clip: content-box;
          transition: background 0.3s ease;
        }
        .chips-scroll-container:hover::-webkit-scrollbar-thumb {
          background: rgba(203, 213, 225, 0.8);
          background-clip: content-box;
        }
        .chips-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.9) !important;
          background-clip: content-box;
        }
        .chips-scroll-container::-webkit-scrollbar-corner {
          background: transparent;
        }

        .chips-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: ${isScrolling
              ? 'rgba(203, 213, 225, 0.8)'
              : 'transparent'}
            transparent;
          transition: scrollbar-color 0.3s ease;
        }
        .chips-scroll-container:hover {
          scrollbar-color: rgba(203, 213, 225, 0.8) transparent;
        }

        /* Dark theme */
        :global(.dark) .chips-scroll-container::-webkit-scrollbar-thumb {
          background: ${isScrolling ? 'rgba(75, 85, 99, 0.8)' : 'transparent'};
          background-clip: content-box;
        }
        :global(.dark) .chips-scroll-container:hover::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          background-clip: content-box;
        }
        :global(.dark) .chips-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9) !important;
          background-clip: content-box;
        }
        :global(.dark) .chips-scroll-container {
          scrollbar-color: ${isScrolling
              ? 'rgba(75, 85, 99, 0.8)'
              : 'transparent'}
            transparent;
        }
        :global(.dark) .chips-scroll-container:hover {
          scrollbar-color: rgba(75, 85, 99, 0.8) transparent;
        }
      `}</style>
      <div className='flex justify-between relative'>
        <div
          className='chips-scroll-container flex-1 min-w-0 transition-all duration-300 ease-in-out overflow-auto'
          style={{
            maxHeight: maxHeightStyle,
            paddingRight: chipsPaddingRight,
          }}
          onScroll={handleScroll}
        >
          <Chips
            ref={chipsRef as any}
            size='small'
            className='flex items-center gap-2 flex-wrap'
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
            {!isExpanded && hiddenCount > 0 && (
              <BodyShort
                onClick={() => {
                  setIsExpanded(true);
                  umami.track(UmamiEvent.Generell.åpne_filter_chip_panel_tekst);
                }}
                className='cursor-pointer text-s whitespace-nowrap text-[var(--ax-text-accent-subtle)]'
              >{`+ ${hiddenCount} filtre`}</BodyShort>
            )}
          </Chips>
        </div>
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
            <div className='relative flex items-center gap-2 pr-2 '>
              <Tooltip content='Vis alle aktive filtre'>
                <Button
                  onClick={() => {
                    setIsExpanded(true);
                    umami.track(UmamiEvent.Generell.åpne_filter_chip_panel);
                  }}
                  size='small'
                  variant='tertiary'
                  aria-label='Vis flere filtre'
                  icon={<ChevronDownCircleIcon />}
                />
              </Tooltip>
            </div>
          </div>
        )}
        {isExpanded && (
          <div className='absolute top-0 right-0 pr-2 pt-0'>
            <Tooltip content={'Skjul aktive filtre'}>
              <Button
                ref={collapseBtnRef}
                size='small'
                variant='tertiary'
                aria-label='Skjul filtre'
                onClick={() => {
                  setIsExpanded(false);
                  umami.track(UmamiEvent.Generell.lukk_filter_chip_panel);
                }}
                icon={<ChevronUpCircleIcon />}
              />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValgteFiltre;
