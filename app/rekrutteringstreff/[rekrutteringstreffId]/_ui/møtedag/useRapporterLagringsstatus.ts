'use client';

import { useEffect } from 'react';

/**
 * Melder fra til WorkOp-orkestratoren mens steget lagrer. Uten dette kan
 * Stepper bytte steg midt i en lagring, slik at både lagringen og en eventuell
 * feilmelding forsvinner sammen med det avmonterte steget.
 */
export const useRapporterLagringsstatus = (
  lagrer: boolean,
  onLagringsstatusEndret?: (lagrer: boolean) => void,
) => {
  useEffect(() => {
    onLagringsstatusEndret?.(lagrer);
  }, [lagrer, onLagringsstatusEndret]);
};
