'use client';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import PauseSøkeforslag from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/endre-søkeforslag/PauseSøkeforslag';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';

export default function EndreSøkeforslag() {
  const { erEier, stillingsData } = useStillingsContext();

  if (!erEier) {
    return null;
  }

  if (stillingsData.stilling.status === StillingsStatus.Aktiv) {
    return <PauseSøkeforslag />;
  }

  return null;
}
