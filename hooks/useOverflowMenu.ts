'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook som sjekker hvor mange elementer som får plass i en container.
 * Brukes for å dynamisk flytte elementer til en dropdown når det ikke er nok plass.
 *
 * @param antallElementer - Totalt antall elementer som skal vises
 * @returns {Object} - wrapperRef: ref til ytre wrapper
 *                   - measureRef: ref til måle-container
 *                   - antallSynlige: antall elementer som får plass utenfor dropdown
 */
export function useOverflowMenu(antallElementer: number) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [antallSynlige, setAntallSynlige] = useState(antallElementer);
  const elementBredderRef = useRef<number[]>([]);

  const sjekkPlass = useCallback(() => {
    if (!wrapperRef.current || !measureRef.current) return;

    // Mål bredden av hvert element
    const elementer = measureRef.current.querySelectorAll(
      '[data-measure-item]',
    );
    const bredder: number[] = [];
    elementer.forEach((el) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      if (rect.width > 0) {
        bredder.push(rect.width);
      }
    });

    if (bredder.length === 0) return;
    elementBredderRef.current = bredder;

    // Finn flex-row containeren (som inneholder brødsmuler og actions)
    // Gå opp til vi finner den
    let rowContainer = wrapperRef.current.parentElement;
    while (rowContainer && !rowContainer.classList.contains('flex')) {
      rowContainer = rowContainer.parentElement;
    }

    // Gå ett nivå opp til for å finne row med brødsmuler
    if (rowContainer) {
      const parent = rowContainer.parentElement;
      if (parent && parent.classList.contains('flex')) {
        rowContainer = parent;
      }
    }

    if (!rowContainer) return;

    const rowBredde = rowContainer.getBoundingClientRect().width;
    if (rowBredde === 0) return;

    // Finn venstre-delen (brødsmuler) - første flex-1 barn
    let venstreBredde = 0;
    for (const child of Array.from(rowContainer.children)) {
      const el = child as HTMLElement;
      const computedStyle = window.getComputedStyle(el);
      if (computedStyle.flexGrow === '1') {
        venstreBredde = el.getBoundingClientRect().width;
        break;
      }
    }

    // Tilgjengelig bredde = row - venstre - gaps
    const gaps = 48; // gap og padding
    const tilgjengeligBredde = rowBredde - venstreBredde - gaps;

    if (tilgjengeligBredde <= 0) {
      setAntallSynlige(0);
      return;
    }

    const dropdownBredde = 44;
    const gap = 4;

    // Beregn total bredde for alle elementer
    const totalBredde = bredder.reduce(
      (sum, b, i) => sum + b + (i > 0 ? gap : 0),
      0,
    );

    // Hvis alle får plass, vis alle
    if (totalBredde <= tilgjengeligBredde) {
      setAntallSynlige(antallElementer);
      return;
    }

    // Beregn hvor mange som får plass med dropdown
    let bruktBredde = 0;
    let antall = 0;

    for (let i = 0; i < bredder.length; i++) {
      const elementBredde = bredder[i] + (i > 0 ? gap : 0);
      const plassMedDropdown =
        bruktBredde + elementBredde + gap + dropdownBredde;

      if (plassMedDropdown <= tilgjengeligBredde) {
        bruktBredde += elementBredde;
        antall = i + 1;
      } else {
        break;
      }
    }

    setAntallSynlige(antall);
  }, [antallElementer]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Observer vindusendringer
    const handleResize = () => {
      requestAnimationFrame(sjekkPlass);
    };
    window.addEventListener('resize', handleResize);

    // Observer DOM-endringer oppover i treet
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(sjekkPlass);
    });

    // Observer hele veien opp til body
    let current: HTMLElement | null = wrapperRef.current;
    while (current && current !== document.body) {
      resizeObserver.observe(current);
      current = current.parentElement;
    }

    // Initial sjekk med timeouts
    const timeouts = [0, 50, 150].map((delay) => setTimeout(sjekkPlass, delay));

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, [sjekkPlass]);

  return { wrapperRef, measureRef, antallSynlige };
}
