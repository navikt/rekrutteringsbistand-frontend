'use client';

import { useEffect, useRef } from 'react';

/**
 * Melder fra til WorkOp-orkestratoren mens steget lagrer. Uten dette kan
 * Stepper bytte steg midt i en lagring, slik at både lagringen og en eventuell
 * feilmelding forsvinner sammen med det avmonterte steget.
 */
export const useRapporterLagringsstatus = (
  lagrer: boolean,
  onLagringsstatusEndret?: (lagrer: boolean) => void,
) => {
  // Ref-en holder siste versjon av tilbakekallet, slik at opprydningen under
  // treffer riktig funksjon uten å måtte kjøre på nytt hver gang forelderen
  // gir oss en ny funksjonsidentitet.
  const rapporterRef = useRef(onLagringsstatusEndret);

  useEffect(() => {
    rapporterRef.current = onLagringsstatusEndret;
  }, [onLagringsstatusEndret]);

  useEffect(() => {
    rapporterRef.current?.(lagrer);
  }, [lagrer]);

  // Et steg kan bli byttet ut mens lagringen pågår: møteoppsettet erstattes av
  // romfordelingen i samme render som møteplanen blir opprettet, altså før
  // lagringsstatusen rekker å bli falsk igjen. Uten denne opprydningen blir
  // «lagrer» stående som sann hos orkestratoren, og da tegner Stepper alle
  // stegene grå og uklikkbare i stedet for blå.
  useEffect(() => () => rapporterRef.current?.(false), []);
};
