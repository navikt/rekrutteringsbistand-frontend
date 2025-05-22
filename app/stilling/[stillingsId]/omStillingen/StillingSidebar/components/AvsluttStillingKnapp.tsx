import { setKandidatlisteStatus } from '../../../../../api/kandidat/setKandidatlisteStatus';
import { oppdaterStilling } from '../../../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useApplikasjonContext } from '../../../../../providers/ApplikasjonContext';
import { StillingsStatus } from '../../../../stilling-typer';
import { stillingErUtløpt } from '../../../../stilling-util';
import { useStillingsContext } from '../../../StillingsContext';
import { EyeSlashIcon, TasklistIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
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

  const erUtløpt = stillingErUtløpt(stillingsData.stilling);

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

      await setKandidatlisteStatus(kandidatlisteId, 'LUKKET');

      refetch();
    } catch (error) {
      logger.error('Feil ved oppdatering av stilling', error);
    }
    setLoading(false);
    ref.current?.close();
  };

  const avpubliserStilling = async () => {
    setLoading(true);
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
            har delt sin CV og ikke fått jobb.
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
        disabled={
          erUtløpt || loading || stillingsStatus === StillingsStatus.Stoppet
        }
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
          loading || kandidatlisteStatus !== 'ACTIVE' || !kandidatlisteId
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
