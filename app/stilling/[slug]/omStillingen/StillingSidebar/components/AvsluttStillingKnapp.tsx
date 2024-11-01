import { TrashIcon } from '@navikt/aksel-icons';
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
      <Modal ref={ref} header={{ heading: 'Avslutte oppdraget?' }}>
        <Modal.Body>
          <BodyLong>
            {besatteStillinger} av {antallStillinger}{' '}
            {antallStillinger === 1 ? 'stilling' : 'stillinger'} er besatt
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' onClick={() => ref.current?.close()}>
            Avslutt oppdrag
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
        // TODO Stoppet / Slettet er eksisterende statuser
        onClick={() => ref.current?.showModal()}
        disabled={kandidatlisteStatus === 'LUKKET'}
        variant='secondary'
        size='small'
        className='w-full h-5'
        icon={<TrashIcon />}
      >
        Avslutt
      </Button>
    </>
  );
};

export default AvsluttStillingKnapp;
