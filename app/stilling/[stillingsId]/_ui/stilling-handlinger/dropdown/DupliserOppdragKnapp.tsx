'use client';
import { kopierStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/kopier/[slug]/kopierStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { TabsAddIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useState } from 'react';

export default function DupliserOppdragKnapp() {
  const { stillingsData } = useStillingsContext();
  const { visVarsel } = useApplikasjonContext();
  const [loading, setLoading] = useState(false);

  const onKopierStilling = async () => {
    try {
      setLoading(true);
      await kopierStilling(stillingsData.stilling.uuid);

      visVarsel({
        tekst: 'Stilling er duplisert',
        type: 'success',
      });
    } catch (error) {
      new RekbisError({
        message: 'Feil ved duplisering av stilling',
        error,
      });
      visVarsel({
        tekst: 'Feil ved duplisering av stilling',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size='small'
      variant='tertiary'
      loading={loading}
      onClick={onKopierStilling}
      icon={<TabsAddIcon />}
    >
      Dupliser oppdraget
    </Button>
  );
}
