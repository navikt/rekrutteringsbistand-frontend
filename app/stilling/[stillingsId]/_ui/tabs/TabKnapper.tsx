import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import KopierStillingLenke from '@/app/stilling/[stillingsId]/_ui/KopierStillingLenke';
import StillingPrint from '@/app/stilling/[stillingsId]/_ui/StillingPrint';
import StillingDropdown from '@/app/stilling/[stillingsId]/_ui/tabs/StillingDropdown';
import { RefObject } from 'react';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';

export default function TabKnapper({
  printRef,
}: {
  printRef: RefObject<HTMLDivElement | null>;
}) {
  const { stillingsData } = useStillingsContext();

  const kanKopierePrinteStilling =
    stillingsData.stilling.status === StillingsStatus.Aktiv;
  return (
    <div className='flex items-center'>
      {kanKopierePrinteStilling && (
        <KopierStillingLenke stillingsData={stillingsData} />
      )}
      {kanKopierePrinteStilling && <StillingPrint printRef={printRef} />}
      <StillingDropdown />
    </div>
  );
}
