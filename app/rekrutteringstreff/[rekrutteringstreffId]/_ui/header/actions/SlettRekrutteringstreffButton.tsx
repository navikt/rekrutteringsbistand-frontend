'use client';

import { slettRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { RekbisError } from '@/util/rekbisError';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, List, Modal, Box } from '@navikt/ds-react';
import { useRef, useState } from 'react';

const SlettRekrutteringstreffButton = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [laster, setLaster] = useState(false);
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const router = useSafeRouter();

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
      if (router?.push) {
        router.push(`/rekrutteringstreff`);
      } else {
        window.location.href = `/rekrutteringstreff`;
      }
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
        icon={<TrashIcon />}
        data-color='danger'
        type='button'
        size='small'
        variant='tertiary'
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
          <Box marginBlock='space-16' asChild>
            <List data-aksel-migrated-v8 as='ul'>
              Etter sletting:
              <List.Item>
                forsvinner treffet fra treff-oversikten i rekrutteringsbistand.
              </List.Item>
              <List.Item>kan du ikke lenger gjennopprette treffet.</List.Item>
            </List>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button
            data-color='danger'
            type='button'
            variant='primary'
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
