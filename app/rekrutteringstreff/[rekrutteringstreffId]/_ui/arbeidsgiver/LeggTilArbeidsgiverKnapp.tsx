'use client';

import LeggTilArbeidsgiverForm from '../arbeidsgiver/LeggTilArbeidsgiverForm';
import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { tidspunktErIFortiden } from '@/util/dato';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, Dialog, Tooltip } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import { FC, useId, useRef, useState } from 'react';

interface Props {
  className?: string;
}

const LeggTilArbeidsgiverKnapp: FC<Props> = ({ className }) => {
  const [åpningsTeller, setÅpningsTeller] = useState(0);
  const [åpen, setÅpen] = useState(false);
  const { treff } = useRekrutteringstreffData();
  const knappRef = useRef<HTMLButtonElement>(null);
  const dialogId = `${useId()}-legg-til-arbeidsgiver-dialog`;

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
    setÅpningsTeller((forrigeAntall) => forrigeAntall + 1);
    setÅpen(true);
  };

  const knapp = (
    <Button
      ref={knappRef}
      onClick={åpne}
      aria-haspopup='dialog'
      aria-controls={åpen ? dialogId : undefined}
      variant='secondary'
      icon={<PlusIcon aria-hidden />}
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
      <Dialog open={åpen} onOpenChange={setÅpen}>
        <Dialog.Popup
          id={dialogId}
          width='large'
          className='text-left'
          closeOnOutsideClick={false}
          returnFocusTo={knappRef}
        >
          <Dialog.Header>
            <Dialog.Title>Legg til arbeidsgivere</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body className='min-w-0 sm:min-w-[500px]'>
            <LeggTilArbeidsgiverForm
              key={åpningsTeller}
              onCompleted={() => setÅpen(false)}
            />
          </Dialog.Body>
        </Dialog.Popup>
      </Dialog>
    </>
  );
};

export default LeggTilArbeidsgiverKnapp;
