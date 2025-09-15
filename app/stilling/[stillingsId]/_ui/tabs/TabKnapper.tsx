import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import KopierStillingLenke from '@/app/stilling/[stillingsId]/_ui/KopierStillingLenke';
import StillingPrint from '@/app/stilling/[stillingsId]/_ui/StillingPrint';
import StillingDropdown from '@/app/stilling/[stillingsId]/_ui/tabs/StillingDropdown';
import { RefObject } from 'react';

export default function TabKnapper({
  printRef,
}: {
  printRef: RefObject<HTMLDivElement | null>;
}) {
  const { stillingsData, kandidatlisteInfo } = useStillingsContext();

  const kandidatlistenErLukket =
    kandidatlisteInfo?.kandidatlisteStatus === Kandidatlistestatus.Lukket;

  if (kandidatlistenErLukket) {
    return null;
  }
  return (
    <div className='flex items-center'>
      <KopierStillingLenke stillingsId={stillingsData.stilling.uuid} />
      <StillingPrint printRef={printRef} />
      <StillingDropdown />
    </div>
  );
}
