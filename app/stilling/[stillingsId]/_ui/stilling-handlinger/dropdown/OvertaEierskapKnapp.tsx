'use client';
import { overtaEierskap } from '@/app/api/stilling/overta-eierskap/overtaEierskap';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { PadlockLockedIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useState } from 'react';

export default function OvertaEierskapKnapp() {
  const {
    erEier,
    stillingsData,
    refetch,
    omStilling: { erFormidling, erDirektemeldt },
  } = useStillingsContext();

  const { brukerData, valgtNavKontor } = useApplikasjonContext();
  const [loading, setLoading] = useState(false);

  const harStillingsinfo = stillingsData.stillingsinfo !== null;

  const kanOvertaEksternStilling =
    harStillingsinfo &&
    !erEier &&
    !erDirektemeldt &&
    stillingsData.stilling.employer?.orgnr;

  const kanOvertaStilling = !erFormidling && erDirektemeldt && !erEier;

  const onOvertaStilling = async () => {
    setLoading(true);
    try {
      await overtaEierskap({
        stillingsid: stillingsData.stilling.uuid,
        eierNavident: brukerData.ident,
        eierNavn: brukerData.navn,
        eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      });
      refetch?.();
    } catch (error) {
      new RekbisError({ message: 'Feil ved overta stilling', error });
    } finally {
      setLoading(false);
    }
  };

  if (!kanOvertaEksternStilling && !kanOvertaStilling) {
    return null;
  }

  return (
    <Button
      size='small'
      variant='tertiary'
      loading={loading}
      onClick={onOvertaStilling}
      icon={<PadlockLockedIcon />}
    >
      Ta over eierskap
    </Button>
  );
}
