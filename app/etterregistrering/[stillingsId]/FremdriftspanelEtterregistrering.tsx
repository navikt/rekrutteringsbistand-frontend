import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FullførStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/FullførStillingKnapp';
import GjenåpneStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/GjenåpneStillingKnapp';
import {
  VisningsStatus,
  visStillingsDataInfo,
} from '@/app/stilling/_util/stillingInfoUtil';
import { Button } from '@navikt/ds-react';
import { PencilIcon } from 'lucide-react';
import { useRouter } from 'next/router';

export default function FremdriftspanelEtterregistrering() {
  const { erEier, stillingsData } = useStillingsContext();
  const router = useRouter();
  const info = visStillingsDataInfo(stillingsData);

  if (!erEier) {
    return null;
  }

  return (
    <div>
      {info.visningsStatus === VisningsStatus.Fullfort ? (
        <GjenåpneStillingKnapp />
      ) : (
        <FullførStillingKnapp />
      )}
      <Button
        variant='secondary'
        size='small'
        className='h-5 w-full'
        icon={<PencilIcon />}
        onClick={() =>
          router.push(
            `/etterregistrering/${stillingsData.stilling.uuid}/rediger`,
          )
        }
      >
        Rediger
      </Button>
    </div>
  );
}
