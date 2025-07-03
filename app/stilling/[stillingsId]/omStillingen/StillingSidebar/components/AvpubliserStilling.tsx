import { oppdaterStilling } from '../../../../../api/stilling/oppdater-stilling/oppdaterStilling';
import { useApplikasjonContext } from '../../../../../providers/ApplikasjonContext';
import { StillingsStatus } from '../../../../stilling-typer';
import { stillingErUtløpt } from '../../../../stilling-util';
import { useStillingsContext } from '../../../StillingsContext';
import { EyeSlashIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import * as React from 'react';

export interface AvpubliserStillingProps {
  children?: React.ReactNode | undefined;
}

const AvpubliserStilling: React.FC = () => {
  const ref = React.useRef<HTMLDialogElement>(null);

  const { valgtNavKontor, brukerData } = useApplikasjonContext();
  const { stillingsData, refetch } = useStillingsContext();
  const [loading, setLoading] = React.useState(false);
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

  const erUtløpt = stillingErUtløpt(stillingsData.stilling);
  const stillingsStatus = stillingsData.stilling.status;

  return (
    <React.Fragment>
      <Button
        disabled={
          erUtløpt || loading || stillingsStatus === StillingsStatus.Stoppet
        }
        icon={<EyeSlashIcon />}
        variant='secondary'
        size='small'
        onClick={() => ref.current?.show()}
      >
        Avpubliser
      </Button>

      <Modal
        ref={ref}
        header={{
          heading: 'Er du sikker?',
          size: 'small',
          closeButton: false,
        }}
        width='small'
      >
        <Modal.Body>
          <BodyLong>Er du sikker på at du vil avpublisere stillingen?</BodyLong>
          <BodyLong>
            Du må redigere stillingen for å publisere den på nytt
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' variant='danger' onClick={avpubliserStilling}>
            Ja, jeg er sikker
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
    </React.Fragment>
  );
};

export default AvpubliserStilling;
