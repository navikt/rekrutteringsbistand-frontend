import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { PencilIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';

export default function RedigerStillingKnapp() {
  const { stillingsData, erEier, kandidatlisteInfo } = useStillingsContext();
  const router = useRouter();

  if (!erEier) {
    return null;
  }
  return (
    <Button
      disabled={kandidatlisteInfo?.kandidatlisteStatus === 'LUKKET'}
      variant='secondary'
      size='small'
      className='h-5 w-full'
      icon={<PencilIcon />}
      onClick={() => {
        if (
          stillingsData.stillingsinfo?.stillingskategori ===
          Stillingskategori.Formidling
        ) {
          router.push(
            `/etterregistrering/${stillingsData.stilling.uuid}/rediger`,
          );
        } else {
          router.push(`/stilling/${stillingsData.stilling.uuid}/rediger`);
        }
      }}
    >
      Rediger
    </Button>
  );
}
