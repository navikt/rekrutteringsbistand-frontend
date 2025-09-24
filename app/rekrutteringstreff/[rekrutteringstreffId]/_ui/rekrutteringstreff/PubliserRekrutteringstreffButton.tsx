'use client';

import { publiserRekrutteringstreff } from '@/app/api/rekrutteringstreff/status/utførRekrutteringstreffStatusHendelser';
import { RekbisError } from '@/util/rekbisError';
import { EyeIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Modal } from '@navikt/ds-react';
import { FC, useRef, useState } from 'react';

type Props = {
  erPubliseringklar: boolean;
  rekrutteringstreffId: string;
  oppdaterData: () => Promise<void>;
};

const PubliserRekrutteringstreffButton: FC<Props> = ({
  erPubliseringklar,
  rekrutteringstreffId,
  oppdaterData,
}) => {
  const [laster, setLaster] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const closingRef = useRef(false);

  const åpneModal = () => modalRef.current?.showModal();
  const lukkModal = () => {
    if (!laster) {
      modalRef.current?.close();
    }
  };

  const handleBekreftPublisering = async () => {
    if (laster) return;
    setLaster(true);
    let skalLukke = false;
    try {
      await publiserRekrutteringstreff(rekrutteringstreffId);
      await oppdaterData();
      skalLukke = true;
    } catch (error) {
      new RekbisError({
        message: 'Publisering av rekrutteringstreff feilet',
        error,
      });
    } finally {
      if (skalLukke) {
        closingRef.current = true;
        modalRef.current?.close();
        // Reset flag after a microtask to ensure onClose has processed
        setTimeout(() => {
          closingRef.current = false;
        }, 0);
      }
      setLaster(false);
    }
  };

  return (
    <>
      <Button
        type='button'
        size='small'
        disabled={!erPubliseringklar || laster}
        loading={laster}
        onClick={åpneModal}
      >
        Publiser treffet
      </Button>

      <Modal
        ref={modalRef}
        onClose={() => {
          if (closingRef.current) {
            return;
          }
          if (laster) {
            modalRef.current?.showModal();
          }
        }}
        header={{ heading: 'Publiser treffet' }}
      >
        <Modal.Body>
          <div className='bg-bg-subtle p-4 rounded-md'>
            <Box.New>
              <BodyShort className='font-bold'>
                Dette skjer når du publiserer treffet
              </BodyShort>
              <div className='flex items-center gap-2 mt-4'>
                <EyeIcon fontSize='1.5rem' aria-hidden />
                <BodyShort className='flex-1'>
                  Treffet blir synlig for:
                </BodyShort>
              </div>
              <ul className='list-disc pl-16 mt-1'>
                <li>Nav-ansatte i rekrutteringsbistand.</li>
                <li>Nav brukere som blir invitert via aktivitetsplanen.</li>
              </ul>
            </Box.New>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            variant='primary'
            size='small'
            loading={laster}
            onClick={() => void handleBekreftPublisering()}
          >
            Publiser
          </Button>
          <Button
            type='button'
            variant='secondary'
            size='small'
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

export default PubliserRekrutteringstreffButton;
