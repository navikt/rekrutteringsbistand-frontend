'use client';

import { avlysRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/statushendelser/mutations';
import { RekbisError } from '@/util/rekbisError';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

type Props = {
  rekrutteringstreffId: string;
  oppdaterData: () => void;
};

const AvlysRekrutteringstreffButton: FC<Props> = ({
  rekrutteringstreffId,
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

  const avlys = async () => {
    if (laster) return;
    setLaster(true);
    let skalLukke = false;

    try {
      await avlysRekrutteringstreff(rekrutteringstreffId);
      oppdaterData();
      skalLukke = true;
    } catch (error) {
      new RekbisError({
        message: 'Handling på rekrutteringstreff feilet',
        error,
      });
    } finally {
      setLaster(false);
      if (skalLukke) {
        modalRef.current?.close();
      }
    }
  };

  return (
    <>
      <Button
        data-color='danger'
        type='button'
        size='small'
        variant='primary'
        onClick={åpneModal}
      >
        Avlys treffet
      </Button>
      <Modal
        ref={modalRef}
        onClose={() => {
          if (laster) {
            modalRef.current?.showModal();
          }
        }}
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
            data-color='danger'
            type='button'
            size='small'
            variant='primary'
            loading={laster}
            onClick={() => void avlys()}
          >
            Avlys treffet
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

export default AvlysRekrutteringstreffButton;
