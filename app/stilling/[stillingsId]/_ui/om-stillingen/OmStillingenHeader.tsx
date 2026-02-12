import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import KopierStillingLenke from '@/app/stilling/[stillingsId]/_ui/KopierStillingLenke';
import StillingPrint from '@/app/stilling/[stillingsId]/_ui/StillingPrint';
import StillingsTag from '@/app/stilling/_ui/StillingsTag';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { Heading } from '@navikt/ds-react';
import { RefObject } from 'react';

export default function OmStillingenHeader({
  printRef,
}: {
  printRef: RefObject<HTMLDivElement | null>;
}) {
  const { stillingsData } = useStillingsContext();

  const kanKopierePrinteStilling =
    stillingsData.stilling.status === StillingsStatus.Aktiv;

  return (
    <div className='flex flex-wrap justify-between gap-4'>
      <div className='pb-5'>
        <Heading size='large'>{stillingsData.stilling.title ?? ''}</Heading>{' '}
        <StillingsTag stillingsData={stillingsData} rad />
      </div>
      <div>
        {kanKopierePrinteStilling && (
          <>
            <KopierStillingLenke stillingsData={stillingsData} />
            <StillingPrint printRef={printRef} />
          </>
        )}
      </div>
    </div>
  );
}
