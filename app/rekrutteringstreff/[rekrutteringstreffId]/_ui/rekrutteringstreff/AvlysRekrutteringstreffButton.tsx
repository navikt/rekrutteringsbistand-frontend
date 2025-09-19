'use client';

import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { FC, useRef } from 'react';

type Props = {
  prosessererAvlys: boolean;
  onBekreftAvlys: () => Promise<void> | void;
};

const AvlysRekrutteringstreffButton: FC<Props> = ({
  prosessererAvlys,
  onBekreftAvlys,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleBekreftAvlys = async () => {
    try {
      await onBekreftAvlys();
      modalRef.current?.close();
    } catch {
      // Beholder modalen åpen dersom handlingen feiler
    }
  };

  const handleClose = () => {
    if (prosessererAvlys) {
      modalRef.current?.showModal();
    }
  };

  return (
    <>
      <Button
        type='button'
        size='small'
        variant='danger'
        onClick={() => modalRef.current?.showModal()}
      >
        Avlys treffet
      </Button>

      <Modal
        ref={modalRef}
        onClose={handleClose}
        header={{ heading: 'Avlys treffet' }}
      >
        <Modal.Body>
          <BodyLong>
            Deltakere får ikke lenger tilgang til innholdet og du kan ikke
            redigere videre. Dette kan ikke angres.
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            size='small'
            variant='danger'
            loading={prosessererAvlys}
            onClick={handleBekreftAvlys}
          >
            Avlys treffet
          </Button>
          <Button
            type='button'
            size='small'
            variant='secondary'
            disabled={prosessererAvlys}
            onClick={() => modalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AvlysRekrutteringstreffButton;
