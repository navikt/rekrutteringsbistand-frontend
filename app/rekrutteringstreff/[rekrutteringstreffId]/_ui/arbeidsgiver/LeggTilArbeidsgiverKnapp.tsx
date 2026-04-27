'use client';

import LeggTilArbeidsgiverForm from '../arbeidsgiver/LeggTilArbeidsgiverForm';
import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { tidspunktErIFortiden } from '@/util/dato';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, Modal, Tooltip } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import { FC, useRef, useState } from 'react';

interface Props {
  className?: string;
}

const LeggTilArbeidsgiverKnapp: FC<Props> = ({ className }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  // Brukes som key for å resette skjemaets state når modalen lukkes/åpnes på nytt.
  const [åpningsTeller, setÅpningsTeller] = useState(0);
  const { treff } = useRekrutteringstreffData();

  const tilTidDato = treff?.tilTid ? parseISO(treff.tilTid) : null;
  const erTreffPassert = tidspunktErIFortiden(
    tilTidDato,
    tilTidDato?.getTime().toString(),
  );

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

  const åpne = () => {
    setÅpningsTeller((n) => n + 1);
    modalRef.current?.showModal();
  };
  const lukk = () => {
    modalRef.current?.close();
    // Bytt key etter lukking slik at neste åpning får et tomt skjema.
    setÅpningsTeller((n) => n + 1);
  };

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
        <Modal.Body className='min-w-[500px] overflow-y-auto'>
          <LeggTilArbeidsgiverForm
            key={åpningsTeller}
            onCompleted={() => modalRef.current?.close()}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LeggTilArbeidsgiverKnapp;
