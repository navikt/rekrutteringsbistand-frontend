'use client';

import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import LeggTilArbeidsgiverForm from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/arbeidsgivere/_ui/LeggTilArbeidsgiverForm';
import { Modal } from '@navikt/ds-react';
import { RefObject, FC } from 'react';
import * as React from 'react';

interface Props {
  modalRef: RefObject<HTMLDialogElement | null>;
}

const LeggTilArbeidsgiverModal: FC<Props> = ({ modalRef }) => {
  const lukk = () => {
    modalRef.current?.close();
  };

  return (
    <Modal
      ref={modalRef}
      className='overflow-visible'
      onClose={lukk}
      header={{ heading: 'Legg til arbeidsgivere' }}
    >
      <Modal.Body className='overflow-visible min-w-[500px]'>
        <LeggTilArbeidsgiverForm
          variant='modal'
          onCompleted={() => {
            modalRef.current?.close();
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default LeggTilArbeidsgiverModal;
