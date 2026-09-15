'use client';

import { Checkbox } from '@navikt/ds-react';

interface MarkerAllePåSidenProps {
  valgbareIder: readonly string[];
  markerteIder: readonly string[];
  onMarkerAlle: () => void;
  onFjernAlle: () => void;
  disabled?: boolean;
}

export default function MarkerAllePåSiden({
  valgbareIder,
  markerteIder,
  onMarkerAlle,
  onFjernAlle,
  disabled = false,
}: MarkerAllePåSidenProps) {
  const markerte = new Set(markerteIder);
  const allePåSidenErMarkert =
    valgbareIder.length > 0 && valgbareIder.every((id) => markerte.has(id));
  const antallMarkerte = markerte.size;

  return (
    <Checkbox
      checked={allePåSidenErMarkert}
      disabled={disabled || valgbareIder.length === 0}
      onChange={allePåSidenErMarkert ? onFjernAlle : onMarkerAlle}
    >
      {allePåSidenErMarkert
        ? `Fjern markerte (${antallMarkerte})`
        : 'Marker alle på siden' +
          (antallMarkerte > 0 ? ` (${antallMarkerte} markert)` : '')}
    </Checkbox>
  );
}
