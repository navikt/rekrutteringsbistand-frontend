'use client';

import { settDragImage } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/dragImage';
import type { DragEvent } from 'react';
import { useRef, useState } from 'react';

interface Dragkilde {
  personTreffId: string;
  romnummer: number;
}

/**
 * Dra-og-slipp av jobbsøkere mellom rom. Drag som slippes i kilderommet
 * ignoreres, og alt er deaktivert mens en lagring pågår.
 */
export const useRomdrag = (
  lagrer: boolean,
  onFlyttet: (personTreffId: string, målromnummer: number) => void,
) => {
  const dragKildeRef = useRef<Dragkilde | null>(null);
  const [aktivtMålromnummer, setAktivtMålromnummer] = useState<number | null>(
    null,
  );
  const [aktivPersonTreffId, setAktivPersonTreffId] = useState<string | null>(
    null,
  );

  const tilbakestillDrag = () => {
    dragKildeRef.current = null;
    setAktivPersonTreffId(null);
    setAktivtMålromnummer(null);
  };

  return {
    aktivtMålromnummer,
    aktivPersonTreffId,
    tilbakestillDrag,
    onDraStart: (
      event: DragEvent<HTMLSpanElement>,
      personTreffId: string,
      romnummer: number,
    ) => {
      if (lagrer) {
        event.preventDefault();
        return;
      }

      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', personTreffId);
      settDragImage(event);
      dragKildeRef.current = { personTreffId, romnummer };
      requestAnimationFrame(() => setAktivPersonTreffId(personTreffId));
    },
    onDraOver: (event: DragEvent<HTMLElement>, målromnummer: number) => {
      const kilde = dragKildeRef.current;
      if (!kilde || kilde.romnummer === målromnummer || lagrer) return;

      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      setAktivtMålromnummer(målromnummer);
    },
    onDraUt: (event: DragEvent<HTMLElement>) => {
      // Ignorer bobling fra elementer inne i rommet.
      const nesteElement = event.relatedTarget;
      if (
        nesteElement instanceof Node &&
        event.currentTarget.contains(nesteElement)
      ) {
        return;
      }
      setAktivtMålromnummer(null);
    },
    onSlipp: (event: DragEvent<HTMLElement>, målromnummer: number) => {
      event.preventDefault();
      const kilde = dragKildeRef.current;
      tilbakestillDrag();
      if (!kilde || kilde.romnummer === målromnummer || lagrer) return;
      onFlyttet(kilde.personTreffId, målromnummer);
    },
  };
};
