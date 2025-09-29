'use client';

import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { FC, useRef } from 'react';

type Props = {
  erIForhåndsvisning: boolean;
  harPublisert: boolean;
  onToggleForhåndsvisning: (nyForhåndsvisning: boolean) => void;
  onBekreftRedigerPublisert: () => void;
};

const RedigerPublisertButton: FC<Props> = ({
  erIForhåndsvisning,
  harPublisert,
  onToggleForhåndsvisning,
  onBekreftRedigerPublisert,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    const nyForhåndsvisning = !erIForhåndsvisning;

    if (!nyForhåndsvisning && harPublisert) {
      modalRef.current?.showModal();
      return;
    }

    onToggleForhåndsvisning(nyForhåndsvisning);
  };

  const handleRedigerLikevel = () => {
    onBekreftRedigerPublisert();
    modalRef.current?.close();
  };

  return (
    <>
      <Button
        type='button'
        size='small'
        variant='secondary'
        onClick={handleClick}
      >
        {erIForhåndsvisning ? 'Rediger' : 'Forhåndsvisning'}
      </Button>

      <Modal
        ref={modalRef}
        header={{ heading: 'Treffet er allerede publisert' }}
      >
        <Modal.Body>
          <BodyLong>
            Dette rekrutteringstreffet er allerede publisert. Hvis du gjør
            endringer nå, vil vi ikke lagre fortløpende per felt. Endringene
            blir lagret når du trykker på knappen Publiser på nytt.
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            variant='primary'
            size='small'
            onClick={handleRedigerLikevel}
          >
            Rediger likevel
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

export default RedigerPublisertButton;
