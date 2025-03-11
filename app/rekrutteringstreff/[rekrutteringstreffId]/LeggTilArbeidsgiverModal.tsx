import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import VelgArbeidsgiver from '@/app/stilling/ny-stilling/components/VelgArbeidsgiver';
import { PlusIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import * as React from 'react';

const LeggTilArbeidsgiverModal: React.FC = () => {
  const ref = React.useRef<HTMLDialogElement>(null);

  const [arbeidsgiver, setArbeidsgiver] =
    React.useState<ArbeidsgiverDTO | null>(null);

  return (
    <div className='py-16'>
      <Button icon={<PlusIcon />} type='button' variant='tertiary' onClick={() => ref.current?.showModal()}>Legg til</Button>

      <Modal ref={ref} header={{ heading: 'Legg til arbeidsgiver' }}>
        <Modal.Body>
        <VelgArbeidsgiver arbeidsgiverCallback={setArbeidsgiver} />
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' onClick={() => ref.current?.close()}>
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
