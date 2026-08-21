'use client';

import { cn } from '@/lib/utils';
import { Tooltip } from '@navikt/ds-react';
import { useEffect, useRef, useState, type FC } from 'react';

interface Props {
  /** Teksten som skal vises. Må være en ren streng, siden den også blir tooltip. */
  children: string;
  className?: string;
}

/**
 * Viser en tekst på én linje og kutter den med ellipse når den ikke får plass.
 * Hele teksten vises da i en tooltip.
 *
 * Tooltipen kommer **bare** når teksten faktisk er avkortet, så man slipper en
 * tooltip som bare gjentar det man allerede kan lese. Det er derfor vi måler
 * bredden i stedet for å alltid legge på en `title`.
 *
 * Avveiningen er bevisst: stabil linjehøyde og layout er viktigere enn å alltid
 * vise hele navnet. Rader med lange navn skal ikke skyve knapper og ikoner ut
 * av stilling.
 */
export const AvkortetTekst: FC<Props> = ({ children, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [erAvkortet, setErAvkortet] = useState(false);
  const [åpen, settÅpen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Delbredder gjør at scrollWidth kan ligge så vidt over clientWidth uten at
    // noe faktisk er kuttet, derfor slingringsmonnet.
    const måling = () => {
      setErAvkortet(element.scrollWidth > element.clientWidth + 1);
    };

    måling();
    // Første måling skjer før nettleseren har lagt ut tabeller og rutenett, og
    // da ser teksten ut til å få plass. Vi måler derfor på nytt etter layout.
    const bilde = requestAnimationFrame(måling);
    // Bredden endrer seg både med vindusstørrelsen og med hvor mange kolonner
    // rutenettet velger, så det holder ikke å måle én gang. Vi følger også med
    // på forelderen, siden det er den som styrer hvor mye plass teksten får.
    const observatør = new ResizeObserver(måling);
    observatør.observe(element);
    if (element.parentElement) observatør.observe(element.parentElement);

    // Når nettfonten er lastet blir teksten bredere uten at elementet endrer
    // størrelse. ResizeObserver ser ikke det, så vi må måle på nytt selv.
    let avbrutt = false;
    void document.fonts?.ready.then(() => {
      if (!avbrutt) måling();
    });

    return () => {
      avbrutt = true;
      cancelAnimationFrame(bilde);
      observatør.disconnect();
    };
  }, [children]);

  return (
    // Tooltipen ligger alltid i treet og styres på `open`. Byttet vi mellom
    // «med» og «uten» tooltip, ville spennet blitt montert på nytt for hver
    // måling, og målingen ville slått seg selv av og på.
    <Tooltip
      content={children}
      describesChild
      open={erAvkortet && åpen}
      onOpenChange={settÅpen}
    >
      <span
        ref={ref}
        className={cn('block min-w-0 truncate', className)}
        // Aksel legger på en `title` når tooltipen er lukket. Den ville gitt
        // nettleserens egen boble også på navn som ikke er kuttet, og to bobler
        // oppå hverandre på dem som er det.
        title=''
        // Er teksten kuttet, må også tastaturbrukere kunne nå tooltipen.
        tabIndex={erAvkortet ? 0 : undefined}
      >
        {children}
      </span>
    </Tooltip>
  );
};
