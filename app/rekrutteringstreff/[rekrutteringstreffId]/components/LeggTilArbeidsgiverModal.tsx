import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import VelgArbeidsgiver from '@/app/stilling/ny-stilling/components/VelgArbeidsgiver';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import * as React from 'react';

interface LeggTilArbeidsgiverModalProps {
  onLeggTilArbeidsgiver: (arbeidsgiver: ArbeidsgiverDTO | null) => void;
  onCloseModal?: () => void;
  leggTilKnappTekst?: string;
}

const LeggTilArbeidsgiverModal: React.FC<LeggTilArbeidsgiverModalProps> = ({
  onLeggTilArbeidsgiver,
  onCloseModal = () => {},
  leggTilKnappTekst = 'Legg til',
}) => {
  const [open, setOpen] = React.useState(false);
  const [arbeidsgiver, setArbeidsgiver] =
    React.useState<ArbeidsgiverDTO | null>(null);

  const handleLeggTil = () => {
    if (arbeidsgiver) {
      onLeggTilArbeidsgiver(arbeidsgiver);
      setArbeidsgiver(null);
      setOpen(false);
      onCloseModal();
    }
  };

  const handleAvbryt = () => {
    setArbeidsgiver(null);
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
        {leggTilKnappTekst}
      </Button>

      <Modal
        className='overflow-visible'
        open={open}
        onClose={handleAvbryt}
        header={{ heading: 'Legg til arbeidsgiver' }}
      >
        <Modal.Body className='overflow-visible'>
          <VelgArbeidsgiver
            key={open ? 'open-arbeidsgiver' : 'closed-arbeidsgiver'}
            arbeidsgiverCallback={setArbeidsgiver}
            valgtArbeidsgiver={arbeidsgiver}
          />
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
