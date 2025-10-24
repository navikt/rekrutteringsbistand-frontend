import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingsTag from '@/app/stilling/_ui/StillingsTag';
import { Heading } from '@navikt/ds-react';

export default function OmStillingenHeader() {
  const { stillingsData } = useStillingsContext();
  return (
    <div className='py-5'>
      <Heading size='large'>{stillingsData.stilling.title ?? ''}</Heading>{' '}
      <StillingsTag stillingsData={stillingsData} rad />
    </div>
  );
}
