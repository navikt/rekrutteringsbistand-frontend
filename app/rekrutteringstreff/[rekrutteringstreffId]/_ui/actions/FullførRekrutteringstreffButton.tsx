'use client';

import { fullførRekrutteringstreff } from '@/app/api/rekrutteringstreff/mutations';
import { RekbisError } from '@/util/rekbisError';
import { Button, Modal } from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

type Props = {
  rekrutteringstreffId: string;
  harInvitert: boolean;
  tiltidspunktHarPassert: boolean;
  oppdaterData: () => Promise<void>;
};

const FullførRekrutteringstreffButton: FC<Props> = ({
  rekrutteringstreffId,
  harInvitert,
  tiltidspunktHarPassert,
  oppdaterData,
}) => {
  const [laster, setLaster] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const åpneModal = () => modalRef.current?.showModal();
  const lukkModal = () => {
    if (!laster) {
      modalRef.current?.close();
    }
  };

  const fullfør = async () => {
    if (laster) return;
    setLaster(true);
    let skalLukke = false;

    try {
      await fullførRekrutteringstreff(rekrutteringstreffId);
      await oppdaterData();
      skalLukke = true;
    } catch (error) {
      new RekbisError({
        message: 'Avslutting av rekrutteringstreff feilet',
        error,
      });
    } finally {
      setLaster(false);
      if (skalLukke) {
        modalRef.current?.close();
      }
    }
  };

  const handleOpen = () => {
    if (tiltidspunktHarPassert) {
      void fullfør();
      return;
    }
    åpneModal();
  };

  return (
    <>
      <Button
        type='button'
        size='small'
        variant='primary'
        disabled={!harInvitert || laster}
        loading={laster}
        onClick={handleOpen}
      >
        Fullfør
      </Button>

      <Modal
        ref={modalRef}
        onClose={() => {
          if (laster) {
            modalRef.current?.showModal();
          }
        }}
        header={{ heading: 'Fullfør rekrutteringstreff?' }}
      >
        <Modal.Body>
          Slutttidspunktet for rekrutteringstreffet har ikke passert ennå. Er du
          sikker på at du vil fullføre rekrutteringstreffet likevel?
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            size='small'
            loading={laster}
            onClick={() => void fullfør()}
          >
            Fullfør
          </Button>
          <Button
            type='button'
            size='small'
            variant='secondary'
            disabled={laster}
            onClick={lukkModal}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FullførRekrutteringstreffButton;
