import type { DragEvent } from 'react';

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
