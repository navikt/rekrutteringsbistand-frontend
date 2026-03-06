'use client';

import LeggTilArbeidsgiverForm from '../arbeidsgiver/LeggTilArbeidsgiverForm';
import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, Modal, Tooltip } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import { FC, useRef } from 'react';

interface Props {
  className?: string;
}

const LeggTilArbeidsgiverKnapp: FC<Props> = ({ className }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { treff } = useRekrutteringstreffData();

  const tilTidDato = treff?.tilTid ? parseISO(treff.tilTid) : null;
  const erTreffPassert = tilTidDato != null && tilTidDato < new Date();

  const erLåst =
    erTreffPassert ||
    treff?.status === RekrutteringstreffStatus.FULLFØRT ||
    treff?.status === RekrutteringstreffStatus.AVLYST;

  const tooltipTekst =
    treff?.status === RekrutteringstreffStatus.FULLFØRT
      ? 'Du kan ikke legge til arbeidsgivere etter at treffet er fullført'
      : treff?.status === RekrutteringstreffStatus.AVLYST
        ? 'Du kan ikke legge til arbeidsgivere etter at treffet er avlyst'
        : 'Du kan ikke legge til arbeidsgivere etter at treff-tidspunktet er passert';

  const åpne = () => modalRef.current?.showModal();
  const lukk = () => modalRef.current?.close();

  const knapp = (
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
  );

  if (erLåst) {
    return (
      <Tooltip content={tooltipTekst} placement={'top'}>
        <span className={className}>{knapp}</span>
      </Tooltip>
    );
  }
  return (
    <>
      {knapp}
      <Modal
        ref={modalRef}
        className='overflow-visible text-left'
        onClose={lukk}
        header={{ heading: 'Legg til arbeidsgivere' }}
      >
        <Modal.Body className='min-w-[500px] overflow-visible'>
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
