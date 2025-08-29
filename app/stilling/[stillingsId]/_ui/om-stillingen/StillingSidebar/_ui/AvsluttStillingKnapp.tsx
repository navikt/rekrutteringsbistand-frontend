import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { setKandidatlisteStatus } from '@/app/api/kandidat/setKandidatlisteStatus';
import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { TasklistIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import * as React from 'react';

interface AvsluttStillingKnappProps {
  kandidatlisteId?: string;
  besatteStillinger: number;
  antallStillinger?: number;
  kandidatlisteStatus?: string;
}

const AvsluttStillingKnapp: React.FC<AvsluttStillingKnappProps> = ({
  kandidatlisteId,
  besatteStillinger,
  antallStillinger,
  kandidatlisteStatus,
}) => {
  const ref = React.useRef<HTMLDialogElement>(null);
  const { stillingsData, refetch } = useStillingsContext();
  const { valgtNavKontor, brukerData } = useApplikasjonContext();
  const [loading, setLoading] = React.useState(false);

  const stillingsStatus = stillingsData.stilling.status;

  const avsluttStilling = async (kandidatlisteId: string) => {
    setLoading(true);
    try {
      await oppdaterStilling(
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
      );

      await setKandidatlisteStatus(kandidatlisteId, Kandidatlistestatus.Lukket);

      if (refetch) {
        refetch();
      }
    } catch (error) {
      new RekbisError({
        message: 'Feil ved oppdatering av stilling',
        error,
      });
    }
    setLoading(false);
    ref.current?.close();
  };

  return (
    <>
      <Modal
        width={600}
        ref={ref}
        header={{ heading: ' Vil du ferdigstille oppdraget? ' }}
      >
        <Modal.Body>
          <BodyLong>
            {besatteStillinger} av {antallStillinger}{' '}
            {antallStillinger === 1 ? 'stilling' : 'stillinger'} er besatt.
          </BodyLong>
          <BodyLong className='mt-4'>
            Dette avpubliserer stillingen og sender melding til kandidatene som
            har delt sin CV og ikke fått jobb.
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            disabled={
              loading ||
              (kandidatlisteStatus === Kandidatlistestatus.Lukket &&
                stillingsStatus === StillingsStatus.Stoppet)
            }
            onClick={() => kandidatlisteId && avsluttStilling(kandidatlisteId)}
          >
            Ferdigstill oppdrag
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => ref.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>

      <Button
        onClick={() => ref.current?.show()}
        disabled={
          loading ||
          kandidatlisteStatus !== Kandidatlistestatus.Åpen ||
          !kandidatlisteId
        }
        variant='secondary'
        size='small'
        className='h-5 w-full'
        icon={<TasklistIcon />}
      >
        Ferdigstill
      </Button>
    </>
  );
};

export default AvsluttStillingKnapp;
