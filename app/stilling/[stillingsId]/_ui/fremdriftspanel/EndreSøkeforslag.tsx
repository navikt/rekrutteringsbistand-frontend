import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { PauseIcon, PlayIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EndreSøkeforslag() {
  const { stillingsData, refetch } = useStillingsContext();
  const { valgtNavKontor, brukerData } = useApplikasjonContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const endreStatus = async (status: StillingsStatus) => {
    setLoading(true);
    try {
      const response = await oppdaterStilling(
        {
          ...stillingsData,
          stilling: { ...(stillingsData.stilling as any), status: status },
        },
        {
          eierNavident: brukerData.ident,
          eierNavn: brukerData.navn,
          eierNavKontorEnhetId: valgtNavKontor?.navKontor,
        },
      );

      if (response.stilling.uuid) {
        refetch?.();
        router.push(`/stilling/${response.stilling.uuid}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const status = stillingsData.stilling.status;

  if (status === StillingsStatus.Aktiv) {
    return (
      <>
        <Button
          icon={<PauseIcon />}
          size='small'
          className='w-full  mt-4'
          onClick={() => endreStatus(StillingsStatus.Inaktiv)}
        >
          Pause søkerforslag
        </Button>
      </>
    );
  }
  if (status === StillingsStatus.Inaktiv) {
    return (
      <Button
        loading={loading}
        icon={<PlayIcon />}
        size='small'
        className='w-full  mt-4'
        onClick={() => endreStatus(StillingsStatus.Aktiv)}
      >
        Åpne søkerforslag
      </Button>
    );
  }

  return null;
}
