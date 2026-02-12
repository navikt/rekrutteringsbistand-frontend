import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FullførStillingModal from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/fullfør-oppdrag/FullførStillingModal';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { CheckmarkCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useState } from 'react';

export default function FullførStillingKnapp() {
  const [visFullførStillingModal, setVisFullførStillingModal] = useState(false);
  const { stillingsData, erEier } = useStillingsContext();
  const kandidatlisteForEier = useKandidatlisteForEier(stillingsData, erEier);

  if (!erEier) {
    return null;
  }

  return (
    <>
      <Button
        onClick={() => setVisFullførStillingModal(true)}
        disabled={
          (kandidatlisteForEier.data?.status === Kandidatlistestatus.Lukket &&
            stillingsData.stilling.status === StillingsStatus.Stoppet) ||
          !kandidatlisteForEier.data?.kandidatlisteId
        }
        variant='tertiary'
        size='small'
        icon={<CheckmarkCircleIcon />}
      >
        Fullfør
      </Button>
      {visFullførStillingModal && (
        <FullførStillingModal
          setVisModal={() => setVisFullførStillingModal(false)}
        />
      )}
    </>
  );
}
