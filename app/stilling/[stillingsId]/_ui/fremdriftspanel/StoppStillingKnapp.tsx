import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useKandidatlisteInfo } from '@/app/api/kandidat/useKandidatlisteInfo';
import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { Button } from '@navikt/ds-react';
import { useState } from 'react';

export default function StoppStillingKnapp() {
  const [loading, setLoading] = useState(false);
  const { stillingsData, refetch } = useStillingsContext();
  const { brukerData, valgtNavKontor, visVarsel } = useApplikasjonContext();
  const kandidatlisteInfoHook = useKandidatlisteInfo(
    stillingsData.stillingsinfo,
  );

  const settStopp = async () => {
    setLoading(true);
    try {
      await Promise.all([
        oppdaterStilling(
          {
            ...stillingsData,
            stilling: {
              ...stillingsData.stilling,
              status: StillingsStatus.Stoppet,
            },
          },
          {
            eierNavident: brukerData.ident,
            eierNavn: brukerData.navn,
            eierNavKontorEnhetId: valgtNavKontor?.navKontor,
          },
        ),
      ]);
      visVarsel({ type: 'success', tekst: 'Stillingoppdrag stoppet.' });
      refetch?.();
    } catch (error) {
      visVarsel({
        type: 'error',
        tekst: 'Klarte ikke å endre status på oppdraget',
      });
      new RekbisError({
        message: 'Klarte ikke å stoppe oppdrag via stopp knapp',
        error,
      });
    }
    setLoading(false);
  };

  if (
    kandidatlisteInfoHook.data?.kandidatlisteStatus ===
      Kandidatlistestatus.Lukket &&
    stillingsData.stilling.status !== StillingsStatus.Stoppet
  ) {
    return (
      <Button
        loading={loading}
        size='small'
        className='w-full'
        onClick={settStopp}
      >
        Set som avsluttet
      </Button>
    );
  }

  return null;
}
