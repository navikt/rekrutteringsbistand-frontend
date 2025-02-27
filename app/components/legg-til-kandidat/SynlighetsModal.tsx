import { Button, Modal } from '@navikt/ds-react';
import { useRef } from 'react';
import Synlighetsinfo from './Synlighetsinfo';

const SynlighetsModal = ({ fødselsnummer }: { fødselsnummer: string }) => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        variant='tertiary'
        onClick={() => ref.current?.showModal()}
        type='button'
      >
        Hvorfor er ikke kandidaten synlig?
      </Button>

      <Modal
        ref={ref}
        header={{ heading: 'Hvorfor er ikke kandidaten synlig?' }}
      >
        <Modal.Body>
          <Synlighetsinfo fødselsnummer={fødselsnummer} />
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' onClick={() => ref.current?.close()}>
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SynlighetsModal;
