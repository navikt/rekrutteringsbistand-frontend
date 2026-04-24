import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import KopierStillingLenke from '@/app/stilling/[stillingsId]/_ui/KopierStillingLenke';
import StillingPrint from '@/app/stilling/[stillingsId]/_ui/StillingPrint';
import StillingsTag from '@/app/stilling/_ui/StillingsTag';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import AntallJobbsøkere from '@/components/stilling/AntallJobbsøkere';
import { Heading } from '@navikt/ds-react';
import { RefObject } from 'react';

export default function OmStillingenHeader({
  printRef,
}: {
  printRef: RefObject<HTMLDivElement | null>;
}) {
  const { stillingsData, kandidatlisteInfo } = useStillingsContext();

  const kanKopierePrinteStilling =
    stillingsData.stilling.status === StillingsStatus.Aktiv;

  return (
    <div className='flex flex-wrap justify-between gap-4'>
      <div className='pb-5'>
        <Heading size='large'>{stillingsData.stilling.title ?? ''}</Heading>{' '}
        <div className='flex flex-wrap items-start gap-2'>
          <StillingsTag stillingsData={stillingsData} rad />
          <AntallJobbsøkere antall={kandidatlisteInfo?.antallKandidater} />
        </div>
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
