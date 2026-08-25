'use client';

import { cn } from '@/lib/utils';
import { Tooltip } from '@navikt/ds-react';
import { useEffect, useRef, useState, type FC } from 'react';

interface Props {
  children: string;
  className?: string;
  maksLinjer?: number;
}
export const AvkortetTekst: FC<Props> = ({
  children,
  className,
  maksLinjer,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [erAvkortet, setErAvkortet] = useState(false);
  const [åpen, settÅpen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const måling = () => {
      setErAvkortet(
        element.scrollWidth > element.clientWidth + 1 ||
          element.scrollHeight > element.clientHeight + 1,
      );
    };

    måling();
    const bilde = requestAnimationFrame(måling);
    const observatør = new ResizeObserver(måling);
    observatør.observe(element);
    if (element.parentElement) observatør.observe(element.parentElement);

    let avbrutt = false;
    void document.fonts?.ready.then(() => {
      if (!avbrutt) måling();
    });

    return () => {
      avbrutt = true;
      cancelAnimationFrame(bilde);
      observatør.disconnect();
    };
  }, [children, maksLinjer]);

  return (
    <Tooltip
      content={children}
      describesChild
      open={erAvkortet && åpen}
      onOpenChange={settÅpen}
    >
      <span
        ref={ref}
        className={cn(
          'block min-w-0',
          maksLinjer ? 'overflow-hidden' : 'truncate',
          className,
        )}
        style={
          maksLinjer
            ? {
                display: '-webkit-box',
                minHeight: '2lh',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: maksLinjer,
              }
            : undefined
        }
        title=''
        tabIndex={erAvkortet ? 0 : undefined}
      >
        {children}
      </span>
    </Tooltip>
  );
};
