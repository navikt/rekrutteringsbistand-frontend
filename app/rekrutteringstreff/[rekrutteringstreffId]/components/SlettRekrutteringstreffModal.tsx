import { RekbisError } from '../../../../util/rekbisError';
import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import { slettRekrutteringstreff } from '@/app/api/rekrutteringstreff/slett-rekrutteringstreff/slettRekrutteringstreff';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, List, Modal } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const SlettRekrutteringstreffModal = () => {
  const [open, setOpen] = React.useState(false);
  const rekrutteringstreffId =
    useRekrutteringstreffContext().rekrutteringstreffId;

  const router = useRouter();

  const handleSlettRekrutteringstreff = async () => {
    if (rekrutteringstreffId) {
      try {
        await slettRekrutteringstreff(rekrutteringstreffId);
        setOpen(false);
        router.push(`/rekrutteringstreff`);
      } catch (error) {
        throw new RekbisError({
          beskrivelse: 'Feiler når vi prøver å slette rekrutteringstreff:',
          error,
        });
      }
    }
  };

  const handleAvbryt = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant='secondary'
        icon={<TrashIcon />}
        size='medium'
        className='width-full max-w-4xl'
        onClick={() => setOpen(true)}
      >
        Slett
      </Button>
      <Modal
        className='overflow-visible'
        open={open}
        onClose={handleAvbryt}
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
            disabled={!rekrutteringstreffId}
            variant='danger'
          >
            Ja, slett treffet
          </Button>
          <Button type='button' variant='secondary' onClick={handleAvbryt}>
            Nei, behold treffet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SlettRekrutteringstreffModal;
