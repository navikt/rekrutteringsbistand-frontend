import { EyeSlashIcon, TasklistIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import * as React from 'react';

interface AvsluttStillingKnappProps {
  besatteStillinger: number;
  antallStillinger?: number;
  kandidatlisteStatus?: string;
}

const AvsluttStillingKnapp: React.FC<AvsluttStillingKnappProps> = ({
  besatteStillinger,
  antallStillinger,
  kandidatlisteStatus,
}) => {
  const ref = React.useRef<HTMLDialogElement>(null);

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
            onClick={() =>
              // Sett stillingstatus til STOPPET
              // Sett kandidatlistestatus til LUKKET
              ref.current?.close()
            }
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
      <Button icon={<EyeSlashIcon />} variant='secondary' size='small'>
        Avpubliser
      </Button>
      <Button
        // TODO Stoppet / Slettet er eksisterende statuser
        onClick={() => ref.current?.showModal()}
        disabled={kandidatlisteStatus === 'LUKKET'}
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
