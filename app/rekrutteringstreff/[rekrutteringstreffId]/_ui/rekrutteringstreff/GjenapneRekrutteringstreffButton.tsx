'use client';

import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { FC, useRef } from 'react';

type Props = {
  gjenåpner: boolean;
  onGjenåpne: () => Promise<void> | void;
};

const GjenapneRekrutteringstreffButton: FC<Props> = ({
  gjenåpner,
  onGjenåpne,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleBekreftGjenåpne = async () => {
    await onGjenåpne();
    modalRef.current?.close();
  };

  return (
    <>
      <Button
        type='button'
        size='small'
        variant='primary'
        loading={gjenåpner}
        onClick={() => modalRef.current?.showModal()}
      >
        Gjenåpne
      </Button>

      <Modal
        ref={modalRef}
        header={{ heading: 'Gjenåpne rekrutteringstreffet?' }}
      >
        <Modal.Body>
          <BodyLong>
            Treffet blir aktivt igjen, og du kan gjøre endringer eller sende nye
            invitasjoner. Er du sikker på at du vil fortsette?
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            size='small'
            loading={gjenåpner}
            onClick={handleBekreftGjenåpne}
          >
            Gjenåpne
          </Button>
          <Button
            type='button'
            size='small'
            variant='secondary'
            onClick={() => modalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GjenapneRekrutteringstreffButton;
