import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import VelgArbeidsgiver from '@/app/stilling/ny-stilling/components/VelgArbeidsgiver';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import * as React from 'react';

interface LeggTilArbeidsgiverModalProps {
  onLeggTilArbeidsgiver: (arbeidsgiver: ArbeidsgiverDTO) => void;
  onCloseModal?: () => void;
}

const LeggTilArbeidsgiverModal: React.FC<LeggTilArbeidsgiverModalProps> = ({
  onLeggTilArbeidsgiver,
  onCloseModal = () => {},
}) => {
  const [open, setOpen] = React.useState(false);
  const [arbeidsgiver, setArbeidsgiver] =
    React.useState<ArbeidsgiverDTO | null>(null);

  const handleLeggTil = () => {
    if (arbeidsgiver) {
      onLeggTilArbeidsgiver(arbeidsgiver);
      setOpen(false);
      onCloseModal();
    }
  };

  const handleAvbryt = () => {
    setOpen(false);
    onCloseModal();
  };

  return (
    <div>
      <Button
        icon={<PlusIcon />}
        type='button'
        variant='tertiary'
        onClick={() => setOpen(true)}
      >
        Legg til
      </Button>

      <Modal
        open={open}
        onClose={handleAvbryt}
        header={{ heading: 'Legg til arbeidsgiver' }}
      >
        <Modal.Body>
          <VelgArbeidsgiver arbeidsgiverCallback={setArbeidsgiver} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            onClick={handleLeggTil}
            disabled={!arbeidsgiver}
          >
            Legg til
          </Button>
          <Button type='button' variant='secondary' onClick={handleAvbryt}>
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeggTilArbeidsgiverModal;
