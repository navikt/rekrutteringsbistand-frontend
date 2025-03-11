import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import VelgArbeidsgiver from '@/app/stilling/ny-stilling/components/VelgArbeidsgiver';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import * as React from 'react';

interface LeggTilArbeidsgiverModalProps {
  onLeggTilArbeidsgiver: (arbeidsgiver: ArbeidsgiverDTO) => void;
}

const LeggTilArbeidsgiverModal: React.FC<LeggTilArbeidsgiverModalProps> = ({
  onLeggTilArbeidsgiver,
}) => {
  const ref = React.useRef<HTMLDialogElement>(null);
  const [arbeidsgiver, setArbeidsgiver] =
    React.useState<ArbeidsgiverDTO | null>(null);

  const handleLeggTil = () => {
    if (arbeidsgiver) {
      onLeggTilArbeidsgiver(arbeidsgiver);
      ref.current?.close();
    }
  };

  return (
    <div>
      <Button
        icon={<PlusIcon />}
        type='button'
        variant='tertiary'
        onClick={() => ref.current?.showModal()}
      >
        Legg til
      </Button>

      <Modal ref={ref} header={{ heading: 'Legg til arbeidsgiver' }}>
        <Modal.Body>
          <VelgArbeidsgiver arbeidsgiverCallback={setArbeidsgiver} />
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' onClick={handleLeggTil}>
            Legg til
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={() => ref.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeggTilArbeidsgiverModal;
