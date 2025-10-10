import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import KopierStillingLenke from '@/app/stilling/[stillingsId]/_ui/KopierStillingLenke';
import StillingPrint from '@/app/stilling/[stillingsId]/_ui/StillingPrint';
import StillingDropdown from '@/app/stilling/[stillingsId]/_ui/tabs/StillingDropdown';
import {
  VisningsStatus,
  visStillingsDataInfo,
} from '@/app/stilling/_util/stillingInfoUtil';
import { RefObject } from 'react';

export default function TabKnapper({
  printRef,
}: {
  printRef: RefObject<HTMLDivElement | null>;
}) {
  const { stillingsData } = useStillingsContext();

  const kanKopierePrinteStilling =
    visStillingsDataInfo(stillingsData).visningsStatus ===
    VisningsStatus.ApenForSokere;
  return (
    <div className='flex items-center'>
      {kanKopierePrinteStilling && (
        <KopierStillingLenke stillingsId={stillingsData.stilling.uuid} />
      )}
      {kanKopierePrinteStilling && <StillingPrint printRef={printRef} />}
      <StillingDropdown />
    </div>
  );
}
