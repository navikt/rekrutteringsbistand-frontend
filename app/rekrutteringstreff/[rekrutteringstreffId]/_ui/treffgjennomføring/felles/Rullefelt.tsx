'use client';

import { cn } from '@/lib/utils';
import { FC, ReactNode, useLayoutEffect, useRef, useState } from 'react';

interface Tilstand {
  skjultVenstre: boolean;
  skjultHøyre: boolean;
  loddrettRullefelt: number;
  vannrettRullefelt: number;
}

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * Rullefelt som viser skygge i kanten der innhold er skjult. Venstre skygge
 * tegnes av `FRYST_KOLONNE_KLASSER`, høyre av et lag over kanten.
 *
 * Kalleren setter `scroll-padding` i `className` lik den faste kolonnen og
 * overskriftsraden, så tastaturfokus ikke havner under dem (WCAG 2.4.11).
 */
const Rullefelt: FC<Props> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilstand, setTilstand] = useState<Tilstand>({
    skjultVenstre: false,
    skjultHøyre: false,
    loddrettRullefelt: 0,
    vannrettRullefelt: 0,
  });

  useLayoutEffect(() => {
    const felt = ref.current;
    if (!felt) return;

    const mål = () => {
      const neste: Tilstand = {
        skjultVenstre: felt.scrollLeft > 1,
        skjultHøyre: felt.scrollLeft < felt.scrollWidth - felt.clientWidth - 1,
        // Klassiske rullefelt i Windows tar plass. Skyggen skal stå innenfor.
        loddrettRullefelt: felt.offsetWidth - felt.clientWidth,
        vannrettRullefelt: felt.offsetHeight - felt.clientHeight,
      };
      setTilstand((forrige) =>
        JSON.stringify(forrige) === JSON.stringify(neste) ? forrige : neste,
      );
    };

    mål();
    felt.addEventListener('scroll', mål, { passive: true });
    const størrelse = new ResizeObserver(mål);
    størrelse.observe(felt);
    if (felt.firstElementChild) størrelse.observe(felt.firstElementChild);

    return () => {
      felt.removeEventListener('scroll', mål);
      størrelse.disconnect();
    };
  }, []);

  return (
    <div className='relative isolate [--rulleskygge:rgb(0_0_0/0.15)] dark:[--rulleskygge:rgb(0_0_0/0.6)]'>
      <div
        ref={ref}
        data-skjult-venstre={tilstand.skjultVenstre || undefined}
        className={cn('group/rullefelt overflow-auto', className)}
      >
        {children}
      </div>
      <div
        aria-hidden
        data-rulleskygge='høyre'
        className={cn(
          'pointer-events-none absolute top-0 z-20 w-3 bg-linear-to-l from-[var(--rulleskygge)] to-transparent transition-opacity',
          tilstand.skjultHøyre ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          right: tilstand.loddrettRullefelt,
          bottom: tilstand.vannrettRullefelt,
        }}
      />
    </div>
  );
};

export default Rullefelt;
