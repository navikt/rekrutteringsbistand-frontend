'use client';

import { useEffect, useRef } from 'react';

export const useRapporterLagringsstatus = (
  lagrer: boolean,
  onLagringsstatusEndret?: (lagrer: boolean) => void,
) => {
  const rapporterRef = useRef(onLagringsstatusEndret);

  useEffect(() => {
    rapporterRef.current = onLagringsstatusEndret;
  }, [onLagringsstatusEndret]);

  useEffect(() => {
    rapporterRef.current?.(lagrer);
  }, [lagrer]);

  useEffect(() => () => rapporterRef.current?.(false), []);
};
