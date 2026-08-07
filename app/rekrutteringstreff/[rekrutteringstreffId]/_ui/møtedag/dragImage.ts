import type { DragEvent } from 'react';

/**
 * Bare drahåndtaket er draggable, og da viser nettleseren håndtaket alene som
 * dragImage. Vi peker det derfor på navneseksjonen i raden, slik at navnet
 * følger med under draoperasjonen uten radens knapper.
 */
export const settDragImage = (event: DragEvent<HTMLElement>) => {
  const navneseksjon = event.currentTarget
    .closest('li')
    ?.querySelector<HTMLElement>('[data-drag-image]');
  if (!navneseksjon) {
    return;
  }

  const posisjon = navneseksjon.getBoundingClientRect();
  event.dataTransfer.setDragImage(
    navneseksjon,
    event.clientX - posisjon.left,
    event.clientY - posisjon.top,
  );
};
