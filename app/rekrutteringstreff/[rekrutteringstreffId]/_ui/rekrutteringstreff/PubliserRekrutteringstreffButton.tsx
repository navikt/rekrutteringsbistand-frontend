'use client';

import { EyeIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Modal } from '@navikt/ds-react';
import { FC, useRef } from 'react';

type Props = {
  erPubliseringklar: boolean;
  publiserer: boolean;
  onPubliser: () => Promise<void> | void;
};

const PubliserRekrutteringstreffButton: FC<Props> = ({
  erPubliseringklar,
  publiserer,
  onPubliser,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleBekreftPublisering = async () => {
    modalRef.current?.close();
    await onPubliser();
  };

  return (
    <>
      <Button
        type='button'
        size='small'
        disabled={!erPubliseringklar || publiserer}
        loading={publiserer}
        onClick={() => modalRef.current?.showModal()}
      >
        Publiser treffet
      </Button>

      <Modal ref={modalRef} header={{ heading: 'Publiser treffet' }}>
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
            loading={publiserer}
            onClick={handleBekreftPublisering}
          >
            Publiser
          </Button>
          <Button
            type='button'
            variant='secondary'
            size='small'
            onClick={() => modalRef.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PubliserRekrutteringstreffButton;
