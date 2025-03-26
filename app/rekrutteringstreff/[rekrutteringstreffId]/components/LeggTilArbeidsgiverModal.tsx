import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { leggtilNyArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/ny-arbeidsgiver/leggTilNyArbeidsgiver';
import VelgArbeidsgiver from '@/app/stilling/ny-stilling/components/VelgArbeidsgiver';
import { rekbisError } from '@/util/rekbisError';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface LeggTilArbeidsgiverModalProps {
  leggTilKnappTekst?: string;
}

const LeggTilArbeidsgiverModal: React.FC<LeggTilArbeidsgiverModalProps> = ({
  leggTilKnappTekst = 'Legg til',
}) => {
  const [open, setOpen] = React.useState(false);
  const [arbeidsgiver, setArbeidsgiver] =
    React.useState<ArbeidsgiverDTO | null>(null);

  const context = useRekrutteringstreffContext();
  if (!context.rekrutteringstreffId) {
    throw new rekbisError({
      beskrivelse: 'RekrutteringstreffId mangler i konteksten!',
    });
  }
  const rekrutteringstreffId = context.rekrutteringstreffId;

  const router = useRouter();

  const handleLeggTil = () => {
    if (arbeidsgiver) {
      leggtilNyArbeidsgiver(
        {
          organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
          navn: arbeidsgiver.navn,
          status: 'Foreslått',
        },
        rekrutteringstreffId,
      )
        .then(() => {
          router.push(
            `/rekrutteringstreff/${rekrutteringstreffId}?tab=arbeidsgivere`,
          );
        })
        .catch((error) => {
          throw new rekbisError({
            beskrivelse: 'Feiler når prøver å legge til ny arbeidsgiver:',
            error,
          });
        });
      setArbeidsgiver(null);
      setOpen(false);
    }
  };

  const handleAvbryt = () => {
    setArbeidsgiver(null);
    setOpen(false);
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
