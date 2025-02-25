import { EyeSlashIcon, TasklistIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import * as React from 'react';
import { setKandidatlisteStatus } from '../../../../../api/kandidat/setKandidatlisteStatus';
import { oppdaterStilling } from '../../../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { StillingsStatus } from '../../../../stilling-typer';
import { useStillingsContext } from '../../../StillingsContext';

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
  const [loading, setLoading] = React.useState(false);

  const stillingsStatus = stillingsData.stilling.status;

  const avsluttStilling = async (kandidatlisteId: string) => {
    setLoading(true);
    try {
      await oppdaterStilling({
        ...stillingsData,
        stilling: {
          ...stillingsData.stilling,
          status: StillingsStatus.Stoppet,
        },
      });

      await setKandidatlisteStatus(kandidatlisteId, 'LUKKET');

      refetch();
    } catch (error) {
      console.error('Error while finalizing the position:', error);
    }
    setLoading(false);
    ref.current?.close();
  };

  const avpubliserStilling = async () => {
    setLoading(true);
    await oppdaterStilling({
      ...stillingsData,
      stilling: {
        ...stillingsData.stilling,
        status: StillingsStatus.Stoppet,
      },
    });
    setLoading(false);
    refetch();
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
            er markert som fått jobben.
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            disabled={
              loading ||
              (kandidatlisteStatus === 'LUKKET' &&
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
        disabled={loading || stillingsStatus !== StillingsStatus.Stoppet}
        icon={<EyeSlashIcon />}
        variant='secondary'
        size='small'
        onClick={avpubliserStilling}
      >
        Avpubliser
      </Button>
      <Button
        onClick={() => ref.current?.show()}
        disabled={
          loading || kandidatlisteStatus === 'LUKKET' || !kandidatlisteId
        }
        variant='secondary'
        size='small'
        className='w-full h-5'
        icon={<TasklistIcon />}
      >
        Ferdigstill
      </Button>
    </>
  );
};

export default AvsluttStillingKnapp;
