'use client';

import { cn } from '@/lib/utils';
import { DragVerticalIcon } from '@navikt/aksel-icons';
import type { DragEventHandler, FC } from 'react';

interface Props {
  deaktivert?: boolean;
  onDragStart: DragEventHandler<HTMLSpanElement>;
  onDragEnd: DragEventHandler<HTMLSpanElement>;
}

/**
 * Håndtak for å dra en person med mus. Skjult for skjermleser, fordi hver rad
 * også har knapper for å flytte uten mus.
 *
 * `size-6` gir en klikkflate på 24 × 24 px rundt ikonet på 18 px (WCAG 2.5.8).
 */
const DraOgSlippHåndtak: FC<Props> = ({
  deaktivert = false,
  onDragStart,
  onDragEnd,
}) => (
  <span
    aria-hidden
    draggable={!deaktivert}
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    className={cn(
      'inline-flex size-6 shrink-0 items-center justify-center',
      deaktivert ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing',
    )}
  >
    <DragVerticalIcon aria-hidden />
  </span>
);

export default DraOgSlippHåndtak;
