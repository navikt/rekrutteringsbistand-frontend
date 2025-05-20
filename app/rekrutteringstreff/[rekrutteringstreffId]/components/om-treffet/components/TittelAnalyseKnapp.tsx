'use client';

import AnalyserTittel from '../AnalyserTittel';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/tittelValidering/useValiderRekrutteringstreff';
import { RobotIcon, RobotSmileIcon, RobotFrownIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import React, { useRef, useEffect } from 'react';

interface Props {
  tittel?: string;
}

const TittelAnalyseKnapp: React.FC<Props> = ({ tittel }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const { trigger, data, error, isMutating } = useValiderRekrutteringstreff();

  useEffect(() => {
    if (tittel) trigger({ tittel, beskrivelse: null });
  }, [tittel, trigger]);

  const status =
    isMutating || !data
      ? 'neutral'
      : data.bryterRetningslinjer
        ? 'error'
        : 'success';

  const icon =
    status === 'success' ? (
      <RobotSmileIcon aria-hidden fontSize='2em' />
    ) : status === 'error' ? (
      <RobotFrownIcon aria-hidden fontSize='2em' />
    ) : (
      <RobotIcon aria-hidden fontSize='2em' />
    );

  const btnClass =
    status === 'success'
      ? 'text-green-400'
      : status === 'error'
        ? 'text-red-600'
        : '';

  const open = () => modalRef.current?.showModal();
  const close = () => modalRef.current?.close();

  return (
    <>
      <Button
        icon={icon}
        className={btnClass}
        aria-label='Analyser tittel'
        variant='tertiary'
        size='medium'
        disabled={!tittel || isMutating}
        onClick={open}
      />

      <Modal
        ref={modalRef}
        header={{ heading: 'Analyser tittel' }}
        width={400}
        onClose={close}
      >
        <Modal.Body>
          {tittel && (
            <AnalyserTittel
              tittel={tittel}
              isLoadingAnalyse={isMutating}
              analyseData={data}
              analyseError={error as Error | undefined}
            />
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={close}>
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TittelAnalyseKnapp;
