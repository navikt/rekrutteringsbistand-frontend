'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook som beregner hvor mange handlingsknapper som får plass basert på
 * tilgjengelig bredde i header-raden.
 *
 * Finner automatisk parent flex-row containeren og beregner
 * tilgjengelig plass etter at venstre-delen (tittel/brødsmuler) er trukket fra.
 */
export function useDynamiskDropdown(antallElementer: number) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [antallSynlige, setAntallSynlige] = useState(0);

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

    // Finn nærmeste flex-row ancestor (containeren med gap-x-4)
    let rowContainer: HTMLElement | null = wrapperRef.current.parentElement;
    while (rowContainer) {
      const classes = rowContainer.className;
      if (classes.includes('gap-x-4') && classes.includes('flex')) {
        break;
      }
      rowContainer = rowContainer.parentElement;
    }

    if (!rowContainer) {
      setAntallSynlige(antallElementer);
      return;
    }

    const rowBredde = rowContainer.getBoundingClientRect().width;
    if (rowBredde === 0) return;

    // Finn venstre-delen (flex-1 div med brødsmuler/tittel)
    // Vi må måle innholdet, ikke containeren som ekspanderer med flex-1
    const venstreDel = rowContainer.querySelector('.flex-1') as HTMLElement;
    let venstreBredde = 0;
    if (venstreDel) {
      const barn = venstreDel.children;
      for (const child of Array.from(barn)) {
        venstreBredde += (child as HTMLElement).getBoundingClientRect().width;
      }
      venstreBredde += Math.max(0, barn.length - 1) * 12; // gap-3
    }

    // Finn ml-auto containeren (høyre-del som inneholder actionsRight)
    const høyreDel = wrapperRef.current.closest('.ml-auto') as HTMLElement;

    // Tilgjengelig bredde = row - venstre - gaps
    const gaps = 48;
    let tilgjengeligBredde = rowBredde - venstreBredde - gaps;

    // Trekk fra andre elementer i høyre-del (meta, navigering)
    if (høyreDel) {
      for (const barn of Array.from(høyreDel.children)) {
        if (barn !== wrapperRef.current && !barn.contains(wrapperRef.current)) {
          tilgjengeligBredde -=
            (barn as HTMLElement).getBoundingClientRect().width + 12;
        }
      }
    }

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

    // Hvis alle får plass, vis alle uten dropdown
    if (totalBredde <= tilgjengeligBredde) {
      setAntallSynlige(antallElementer);
      return;
    }

    // Beregn hvor mange som får plass med dropdown
    let bruktBredde = dropdownBredde + gap;
    let antall = 0;

    for (let i = 0; i < bredder.length; i++) {
      const elementBredde = bredder[i] + gap;
      if (bruktBredde + elementBredde <= tilgjengeligBredde) {
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

    const handleResize = () => {
      requestAnimationFrame(sjekkPlass);
    };
    window.addEventListener('resize', handleResize);

    // Finn row-container og observer den
    let rowContainer: HTMLElement | null = wrapperRef.current.parentElement;
    while (rowContainer) {
      const classes = rowContainer.className;
      if (classes.includes('gap-x-4') && classes.includes('flex')) {
        break;
      }
      rowContainer = rowContainer.parentElement;
    }

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(sjekkPlass);
    });

    if (rowContainer) {
      resizeObserver.observe(rowContainer);

      // Observer også flex-1 div (venstre-del) for endringer i tittelbredde
      const venstreDel = rowContainer.querySelector('.flex-1');
      if (venstreDel) {
        resizeObserver.observe(venstreDel);
      }
    }

    // Observer også wrapper selv
    resizeObserver.observe(wrapperRef.current);

    // Initial sjekk med timeouts for å sikre at DOM er ferdig rendret
    const timeouts = [0, 50, 150, 300].map((delay) =>
      setTimeout(sjekkPlass, delay),
    );

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, [sjekkPlass]);

  return { wrapperRef, measureRef, antallSynlige };
}
