'use client';

import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { setKandidatlisteStatus } from '@/app/api/kandidat/setKandidatlisteStatus';
import { mutateKandidlisteKandidater } from '@/app/api/kandidat/useKandidlisteKandidater';
import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import {
  AdminStatus,
  StillingsStatus,
} from '@/app/stilling/_ui/stilling-typer';
import InfoBoks from '@/components/InfoBoks';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { CheckmarkCircleIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Heading } from '@navikt/ds-react';
import { useState } from 'react';

export default function FullførEtterregistrering() {
  const { stillingsData, refetch, erEier, kandidatlisteInfo } =
    useStillingsContext();
  const { valgtNavKontor, brukerData, visVarsel } = useApplikasjonContext();
  const [loading, setLoading] = useState(false);

  const fullførEtterregistrering = async (kandidatlisteId: string) => {
    setLoading(true);
    try {
      await setKandidatlisteStatus(kandidatlisteId, Kandidatlistestatus.Lukket);
      await oppdaterStilling(
        {
          ...stillingsData,
          stilling: {
            ...stillingsData.stilling,
            status: StillingsStatus.Stoppet,
            administration: {
              ...stillingsData.stilling.administration,
              status: AdminStatus.Done,
            },
          },
        },
        {
          eierNavident: brukerData.ident,
          eierNavn: brukerData.navn,
          eierNavKontorEnhetId: valgtNavKontor?.navKontor,
        },
      );
      visVarsel({
        type: 'success',
        tekst: 'Etterregistreringen er fullført.',
      });
      refetch?.();
      await mutateKandidlisteKandidater(stillingsData.stilling.uuid);
    } catch (error) {
      visVarsel({
        type: 'error',
        tekst: 'Klarte ikke å fullføre etterregistreringen',
      });
      new RekbisError({
        message: 'Klarte ikke å fullføre etterregistrering',
        error,
      });
    }
    setLoading(false);
  };

  return (
    <InfoBoks>
      <div className='flex items-center justify-between gap-x-6'>
        <div>
          <Heading size='small' level='3'>
            Etterregistrering pågår 📝
          </Heading>
          <BodyShort
            size='small'
            className='text-[var(--ax-text-neutral-subtle)]'
          >
            Fullfør registreringen når du er ferdig med å legge til jobbsøkere.
          </BodyShort>
        </div>
        <div className='shrink-0'>
          <Button
            loading={loading}
            icon={<CheckmarkCircleIcon />}
            disabled={
              !kandidatlisteInfo?.kandidatlisteId ||
              kandidatlisteInfo.kandidatlisteStatus ===
                Kandidatlistestatus.Lukket
            }
            variant='primary'
            size='small'
            onClick={() =>
              kandidatlisteInfo?.kandidatlisteId &&
              fullførEtterregistrering(kandidatlisteInfo.kandidatlisteId)
            }
          >
            Fullfør
          </Button>
        </div>
      </div>
    </InfoBoks>
  );
}
