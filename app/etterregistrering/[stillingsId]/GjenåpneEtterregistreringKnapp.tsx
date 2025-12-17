import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';

export default function GjenåpneEtterregistreringKnapp() {
  const { stillingsData } = useStillingsContext();
  const router = useRouter();

  return (
    <Button
      variant='primary'
      size='small'
      className='h-5 w-full'
      onClick={() =>
        router.push(`/etterregistrering/${stillingsData.stilling.uuid}/rediger`)
      }
    >
      Gjenåpne
    </Button>
  );
}
