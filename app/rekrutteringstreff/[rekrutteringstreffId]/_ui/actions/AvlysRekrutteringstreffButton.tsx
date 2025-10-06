'use client';

import { avlysRekrutteringstreff } from '@/app/api/rekrutteringstreff/mutations';
import { RekbisError } from '@/util/rekbisError';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

type Props = {
  rekrutteringstreffId: string;
  oppdaterData: () => Promise<void>;
  onAvlyst: () => void;
};

const AvlysRekrutteringstreffButton: FC<Props> = ({
  rekrutteringstreffId,
  oppdaterData,
  onAvlyst,
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
      onAvlyst();
      await oppdaterData();
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
      <Button type='button' size='small' variant='danger' onClick={åpneModal}>
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
            type='button'
            size='small'
            variant='danger'
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
