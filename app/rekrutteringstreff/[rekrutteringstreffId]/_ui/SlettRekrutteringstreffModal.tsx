import { slettRekrutteringstreff } from '@/app/api/rekrutteringstreff/slett-rekrutteringstreff/slettRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { BodyShort, Button, List, Modal } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const SlettRekrutteringstreffModal = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const router = useRouter();

  const handleSlettRekrutteringstreff = async () => {
    if (rekrutteringstreffId) {
      try {
        await slettRekrutteringstreff(rekrutteringstreffId);
        ref.current?.close();
        router.push(`/rekrutteringstreff`);
      } catch (error) {
        throw new RekbisError({
          message: 'Feiler når vi prøver å slette rekrutteringstreff:',
          error,
        });
      }
    }
  };

  const handleAvbryt = () => {
    ref.current?.close();
  };

  return (
    <>
      <Button
        type='button'
        size='small'
        variant='danger'
        onClick={() => ref.current?.showModal()}
      >
        Slett
      </Button>
      <Modal
        ref={ref}
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
            onClick={handleSlettRekrutteringstreff}
            variant='danger'
          >
            Ja, slett treffet
          </Button>
          <Button type='button' variant='secondary' onClick={handleAvbryt}>
            Nei, behold treffet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SlettRekrutteringstreffModal;
