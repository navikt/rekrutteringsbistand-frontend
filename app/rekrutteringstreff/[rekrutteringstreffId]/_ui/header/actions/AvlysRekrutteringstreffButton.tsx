'use client';

import { avlysRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/statushendelser/mutations';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { RekbisError } from '@/util/rekbisError';
import { MinusCircleIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  renderTrigger?: (args: { button: ReactNode }) => ReactNode;
}

const AvlysRekrutteringstreffButton: FC<Props> = ({ renderTrigger }) => {
  const { rekrutteringstreffId, oppdaterData } = useRekrutteringstreffData();
  const [laster, setLaster] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const åpneModal = () => modalRef.current?.showModal();
  const lukkModal = () => {
    if (!laster) {
      modalRef.current?.close();
    }
  };

  useEffect(() => {
    const håndterEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalRef.current?.open) {
        event.preventDefault();
        if (!laster) {
          modalRef.current.close();
        }
      }
    };

    document.addEventListener('keydown', håndterEscape, true);
    return () => document.removeEventListener('keydown', håndterEscape, true);
  }, [laster]);

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

  const button = (
    <Button
      icon={<MinusCircleIcon />}
      data-color='danger'
      type='button'
      size='small'
      variant='tertiary'
      onClick={åpneModal}
    >
      Avlys
    </Button>
  );

  return (
    <>
      {renderTrigger ? renderTrigger({ button }) : button}
      <Modal
        ref={modalRef}
        onCancel={(event) => {
          event.preventDefault();
          lukkModal();
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
