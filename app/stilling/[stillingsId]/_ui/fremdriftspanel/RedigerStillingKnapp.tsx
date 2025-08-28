import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { PencilIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';

export default function RedigerStillingKnapp() {
  const { stillingsData, erEier, kandidatlisteInfo } = useStillingsContext();
  const router = useRouter();
  return (
    <Button
      disabled={kandidatlisteInfo?.kandidatlisteStatus === 'LUKKET'}
      variant='secondary'
      size='small'
      className='h-5 w-full'
      icon={<PencilIcon />}
      onClick={() =>
        router.push(`/stilling/${stillingsData.stilling.uuid}/rediger`)
      }
    >
      Rediger
    </Button>
  );
}
