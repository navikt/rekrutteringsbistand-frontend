'use client';

import { slettRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { BodyShort, Button, List, Modal } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const SlettRekrutteringstreffButton = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [laster, setLaster] = useState(false);
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const router = useRouter();

  const åpneModal = () => modalRef.current?.showModal();
  const lukkModal = () => {
    if (!laster) {
      modalRef.current?.close();
    }
  };

  const handleSlettRekrutteringstreff = async () => {
    if (laster || !rekrutteringstreffId) return;
    setLaster(true);
    let skalLukke = false;

    try {
      await slettRekrutteringstreff(rekrutteringstreffId);
      skalLukke = true;
      router.push(`/rekrutteringstreff`);
    } catch (error) {
      new RekbisError({
        message: 'Feiler når vi prøver å slette rekrutteringstreff',
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
        type='button'
        size='small'
        variant='danger'
        disabled={laster}
        loading={laster}
        onClick={åpneModal}
      >
        Slett
      </Button>

      <Modal
        ref={modalRef}
        onClose={() => {
          if (laster) {
            modalRef.current?.showModal();
          }
        }}
        className='overflow-visible'
        header={{ heading: 'Slett treffet' }}
      >
        <Modal.Body className='overflow-visible'>
          <BodyShort className='mb-4'>
            Siden treffet ikke er publisert kan du slette det.
          </BodyShort>
          <List as='ul'>
            Etter sletting:
            <List.Item>
              forsvinner treffet fra treff-oversikten i rekrutteringsbistand.
            </List.Item>
            <List.Item>kan du ikke lenger gjennopprette treffet.</List.Item>
          </List>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            variant='danger'
            size='small'
            loading={laster}
            onClick={() => void handleSlettRekrutteringstreff()}
          >
            Ja, slett treffet
          </Button>
          <Button
            type='button'
            variant='secondary'
            size='small'
            disabled={laster}
            onClick={lukkModal}
          >
            Nei, behold treffet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SlettRekrutteringstreffButton;
