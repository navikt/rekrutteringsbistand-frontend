'use client';

import FilterChip, { formatChipText } from './FilterChip';
import TømFiltre, { TømFiltreProps } from './TømFiltre';
import { storForbokstavString } from '@/app/kandidat/util';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Chips } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';

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
  const [maxVisibleFilters, setMaxVisibleFilters] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  // Count total number of filter items (not individual values)
  const totalFilters = filtre.length;

  // Calculate how many filters fit in the container
  useEffect(() => {
    const calculateVisibleFilters = () => {
      if (!containerRef.current || filtre.length === 0) {
        return;
      }

      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth === 0) return; // Container not rendered yet

      // Estimate widths more conservatively
      let usedWidth = 0;

      // Add TømFiltre button width estimate
      if (tømFiltreProps) {
        usedWidth += 120; // Estimate for "Fjern alle filtre" button
      }

      // First, try to fit all filters without toggle button space
      const availableWidthWithoutToggle = containerWidth - usedWidth;
      let totalFiltersWidth = 0;

      // Calculate total width needed for all filters
      for (let i = 0; i < filtre.length; i++) {
        const filter = filtre[i];
        let filterWidth = 0;

        // Estimate width for each chip in this filter using the same logic as FilterChip
        filter.type?.forEach((value) => {
          const formattedText = filter.mapVerdiNavn
            ? formatChipText(filter.mapVerdiNavn(value))
            : formatChipText(storForbokstavString(value));
          // More generous estimate: ~9px per character + padding to prevent text wrapping
          const estimatedChipWidth = Math.max(
            70,
            formattedText.length * 9 + 40,
          );
          filterWidth += estimatedChipWidth + 4; // +4 for gap between chips
        });

        // Add gap after filter group
        filterWidth += 8;
        totalFiltersWidth += filterWidth;
      }

      // If all filters fit without toggle, show them all
      if (totalFiltersWidth <= availableWidthWithoutToggle) {
        setMaxVisibleFilters(filtre.length);
        return;
      }

      // Otherwise, reserve space for toggle and calculate how many fit
      const toggleButtonWidth = 100; // Reduced estimate
      const availableWidth = containerWidth - usedWidth - toggleButtonWidth;
      let fittingFilters = 0;
      let currentWidth = 0;

      for (let i = 0; i < filtre.length; i++) {
        const filter = filtre[i];
        let filterWidth = 0;

        filter.type?.forEach((value) => {
          const formattedText = filter.mapVerdiNavn
            ? formatChipText(filter.mapVerdiNavn(value))
            : formatChipText(storForbokstavString(value));
          const estimatedChipWidth = Math.max(
            70,
            formattedText.length * 9 + 40,
          );
          filterWidth += estimatedChipWidth + 4;
        });

        filterWidth += 8;

        if (currentWidth + filterWidth <= availableWidth) {
          currentWidth += filterWidth;
          fittingFilters++;
        } else {
          break;
        }
      }

      // Ensure at least 1 filter is visible if there are filters
      if (fittingFilters === 0 && filtre.length > 0) {
        fittingFilters = 1;
      }

      // Don't show toggle if all filters fit
      if (fittingFilters >= filtre.length) {
        fittingFilters = filtre.length;
      }

      setMaxVisibleFilters(Math.max(1, fittingFilters));
    };

    // Initial calculation with a slight delay to ensure DOM is ready
    const timer = setTimeout(calculateVisibleFilters, 100);

    // Recalculate on window resize
    const handleResize = () => {
      setTimeout(calculateVisibleFilters, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [filtre, tømFiltreProps]);

  if (totalFilters === 0) {
    return null;
  }

  const visibleFilters = filtre.slice(0, maxVisibleFilters);
  const hiddenFilters = filtre.slice(maxVisibleFilters);

  // Count individual chips in hidden filters, not just filter groups
  const hiddenFiltersCount = hiddenFilters.reduce((count, filter) => {
    return count + (filter.type?.length || 0);
  }, 0);

  const hasHiddenFilters = hiddenFiltersCount > 0;

  return (
    <div ref={containerRef} className='relative'>
      <div
        className={`flex items-center gap-2 ${isExpanded ? 'flex-wrap pr-12' : 'flex-nowrap overflow-hidden'}`}
      >
        {/* Fjern alle filtre button */}
        {tømFiltreProps && <TømFiltre {...tømFiltreProps} />}

        {/* Filters - show visible when collapsed, all when expanded */}
        {(isExpanded ? filtre : visibleFilters).map((filter, index) => (
          <FilterChip
            key={index}
            type={filter.type}
            setVerdi={filter.setVerdi}
            mapVerdiNavn={filter.mapVerdiNavn}
          />
        ))}

        {/* Show toggle button inline only when collapsed */}
        {hasHiddenFilters && !isExpanded && (
          <Accordion
            type='single'
            collapsible
            value={isExpanded ? 'filters' : ''}
            onValueChange={(value) => setIsExpanded(value === 'filters')}
            className='inline-flex shrink-0'
          >
            <AccordionItem value='filters' className='border-none'>
              <AccordionTrigger className='p-0 hover:no-underline'>
                <Chips.Toggle checkmark={false} variant='neutral'>
                  {`+ ${hiddenFiltersCount} filter${hiddenFiltersCount !== 1 ? 'e' : ''}`}
                </Chips.Toggle>
              </AccordionTrigger>
              <AccordionContent className='hidden'>
                {/* Empty content since filters are rendered above */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>

      {/* Arrow button positioned absolutely at top right when expanded */}
      {hasHiddenFilters && isExpanded && (
        <div className='absolute top-0 right-0 h-9 flex items-center'>
          <Accordion
            type='single'
            collapsible
            value={isExpanded ? 'filters' : ''}
            onValueChange={(value) => setIsExpanded(value === 'filters')}
            className='inline-flex'
          >
            <AccordionItem value='filters' className='border-none'>
              <AccordionTrigger className='p-0 hover:no-underline h-9 w-9 flex items-center justify-center'>
                {/* Only show the arrow, no text */}
              </AccordionTrigger>
              <AccordionContent className='hidden'>
                {/* Empty content since filters are rendered above */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default ValgteFiltre;
