'use client';

import { Button, Modal } from '@navikt/ds-react';
import { FC, useRef } from 'react';

type Props = {
  fullfører: boolean;
  harInvitert: boolean;
  tiltidspunktHarPassert: boolean;
  onFullfør: () => Promise<void> | void;
};

const FullforRekrutteringstreffButton: FC<Props> = ({
  fullfører,
  harInvitert,
  tiltidspunktHarPassert,
  onFullfør,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpen = () => {
    if (tiltidspunktHarPassert) {
      onFullfør();
      return;
    }
    modalRef.current?.showModal();
  };

  const handleBekreftFullfør = () => {
    onFullfør();
    modalRef.current?.close();
  };

  return (
    <>
      <Button
        type='button'
        size='small'
        variant='primary'
        disabled={!harInvitert || fullfører}
        loading={fullfører}
        onClick={handleOpen}
      >
        Fullfør
      </Button>

      <Modal ref={modalRef} header={{ heading: 'Fullfør rekrutteringstreff?' }}>
        <Modal.Body>
          Slutttidspunktet for rekrutteringstreffet har ikke passert ennå. Er du
          sikker på at du vil fullføre rekrutteringstreffet likevel?
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            size='small'
            loading={fullfører}
            onClick={handleBekreftFullfør}
          >
            Fullfør
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

export default FullforRekrutteringstreffButton;
