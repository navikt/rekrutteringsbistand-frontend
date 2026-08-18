'use client';

import type { ArbeidsgiverIntervjufordelingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { settDragImage } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/dragImage';
import type { Fordelingsseksjon } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordelingHjelpere';
import { DragEvent, useRef, useState } from 'react';

interface DragKilde {
  arbeidsgiverTreffId: string;
  personTreffId: string;
}

interface DropMål {
  arbeidsgiverTreffId: string;
  seksjon: Fordelingsseksjon;
  personTreffId: string | null;
}

export interface IntervjufordelingDrag {
  aktivDragKilde: DragKilde | null;
  erDropMål: (
    arbeidsgiverTreffId: string,
    seksjon: Fordelingsseksjon,
    personTreffId: string | null,
  ) => boolean;
  startDrag: (
    event: DragEvent<HTMLSpanElement>,
    arbeidsgiverTreffId: string,
    personTreffId: string,
  ) => void;
  avsluttDrag: () => void;
  tillatDropPåRad: (
    event: DragEvent<HTMLElement>,
    arbeidsgiverTreffId: string,
    seksjon: Fordelingsseksjon,
    personTreffId: string,
  ) => void;
  tillatDropPåSlutten: (
    event: DragEvent<HTMLElement>,
    arbeidsgiverTreffId: string,
    seksjon: Fordelingsseksjon,
  ) => void;
  slippPerson: (
    event: DragEvent<HTMLElement>,
    fordeling: ArbeidsgiverIntervjufordelingDTO,
    flytt: (personTreffId: string) => ArbeidsgiverIntervjufordelingDTO,
  ) => void;
}

/**
 * Dra-og-slipp-tilstand for intervjufordelingen. Flytting er alltid begrenset til
 * én arbeidsgiver — drop utenfor kildens arbeidsgiver ignoreres.
 */
export const useIntervjufordelingDragOgSlipp = (
  onFlyttet: (
    fordeling: ArbeidsgiverIntervjufordelingDTO,
    nyFordeling: ArbeidsgiverIntervjufordelingDTO,
    personTreffId: string,
  ) => void,
): IntervjufordelingDrag => {
  const dragKildeRef = useRef<DragKilde | null>(null);
  const visDropMålFrameRef = useRef<number | null>(null);
  const [aktivDragKilde, setAktivDragKilde] = useState<DragKilde | null>(null);
  const [dropMål, setDropMål] = useState<DropMål | null>(null);

  const startDrag = (
    event: DragEvent<HTMLSpanElement>,
    arbeidsgiverTreffId: string,
    personTreffId: string,
  ) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', 'workop-intervjufordeling');
    settDragImage(event);
    const dragKilde = { arbeidsgiverTreffId, personTreffId };
    dragKildeRef.current = dragKilde;
    visDropMålFrameRef.current = requestAnimationFrame(() => {
      setAktivDragKilde(dragKilde);
      visDropMålFrameRef.current = null;
    });
  };

  const avsluttDrag = () => {
    if (visDropMålFrameRef.current !== null) {
      cancelAnimationFrame(visDropMålFrameRef.current);
      visDropMålFrameRef.current = null;
    }
    dragKildeRef.current = null;
    setAktivDragKilde(null);
    setDropMål(null);
  };

  const tillatDrop = (
    event: DragEvent<HTMLElement>,
    arbeidsgiverTreffId: string,
    seksjon: Fordelingsseksjon,
    personTreffId: string | null,
  ) => {
    if (dragKildeRef.current?.arbeidsgiverTreffId !== arbeidsgiverTreffId) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDropMål({ arbeidsgiverTreffId, seksjon, personTreffId });
  };

  return {
    aktivDragKilde,
    erDropMål: (arbeidsgiverTreffId, seksjon, personTreffId) =>
      dropMål?.arbeidsgiverTreffId === arbeidsgiverTreffId &&
      dropMål.seksjon === seksjon &&
      dropMål.personTreffId === personTreffId,
    startDrag,
    avsluttDrag,
    tillatDropPåRad: (event, arbeidsgiverTreffId, seksjon, personTreffId) =>
      tillatDrop(event, arbeidsgiverTreffId, seksjon, personTreffId),
    tillatDropPåSlutten: (event, arbeidsgiverTreffId, seksjon) =>
      tillatDrop(event, arbeidsgiverTreffId, seksjon, null),
    slippPerson: (event, fordeling, flytt) => {
      event.preventDefault();
      const dragKilde = dragKildeRef.current;
      if (
        !dragKilde ||
        dragKilde.arbeidsgiverTreffId !== fordeling.arbeidsgiverTreffId
      ) {
        avsluttDrag();
        return;
      }

      const nyFordeling = flytt(dragKilde.personTreffId);
      const personTreffId = dragKilde.personTreffId;
      avsluttDrag();
      onFlyttet(fordeling, nyFordeling, personTreffId);
    },
  };
};
