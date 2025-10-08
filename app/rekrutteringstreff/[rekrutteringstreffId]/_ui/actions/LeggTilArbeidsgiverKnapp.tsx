'use client';

import LeggTilArbeidsgiverForm from '../arbeidsgiver/LeggTilArbeidsgiverForm';
import { useRekrutteringstreffData } from '../hooks/useRekrutteringstreffData';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import { FC, RefObject, useRef } from 'react';

interface Props {
  className?: string;
}

const LeggTilArbeidsgiverKnapp: FC<Props> = ({ className }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { activeStep } = useRekrutteringstreffData();
  const erLåst = activeStep === 'FULLFØRE' || activeStep === 'AVLYST';

  const åpne = () => modalRef.current?.showModal();
  const lukk = () => modalRef.current?.close();

  return (
    <>
      <Button
        onClick={åpne}
        variant='secondary'
        icon={<PlusIcon />}
        disabled={erLåst}
        className={className}
        type='button'
      >
        Legg til arbeidsgiver
      </Button>

      <Modal
        ref={modalRef}
        className='overflow-visible'
        onClose={lukk}
        header={{ heading: 'Legg til arbeidsgivere' }}
      >
        <Modal.Body className='overflow-visible min-w-[500px]'>
          <LeggTilArbeidsgiverForm
            variant='modal'
            onCompleted={() => modalRef.current?.close()}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LeggTilArbeidsgiverKnapp;
