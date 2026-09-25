'use client';

import { useEffect, useRef } from 'react';

/**
 * Flytteknapper gjenskapes når lagringen er ferdig, så fokus går tapt.
 * Husk hvilken knapp som ble brukt, og sett fokus på den igjen etterpå.
 *
 * @param dataattributt attributtet knappen identifiseres med, f.eks. `data-flyttknapp`
 * @param oppdatertInnhold endres når listen med knapper er rendret på nytt
 */
export const useFokusEtterLagring = (
  dataattributt: `data-${string}`,
  lagrer: boolean,
  oppdatertInnhold: unknown,
) => {
  const knappIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (lagrer) return;
    const knappId = knappIdRef.current;
    if (!knappId) return;
    knappIdRef.current = null;
    document
      .querySelector<HTMLButtonElement>(
        `[${dataattributt}="${CSS.escape(knappId)}"]`,
      )
      ?.focus();
  }, [dataattributt, lagrer, oppdatertInnhold]);

  return (knappId: string) => {
    knappIdRef.current = knappId;
  };
};
