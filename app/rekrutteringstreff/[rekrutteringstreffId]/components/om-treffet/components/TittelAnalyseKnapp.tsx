'use client';

import AnalyserTittel from '../AnalyserTittel';
import { useValiderRekrutteringstreff } from '@/app/api/rekrutteringstreff/tittelValidering/useValiderRekrutteringstreff';
import { RobotIcon, RobotSmileIcon, RobotFrownIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import React, { useRef } from 'react';

interface TittelAnalyseKnappProps {
  tittel?: string;
}

const TittelAnalyseKnapp: React.FC<TittelAnalyseKnappProps> = ({ tittel }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const analyse = useValiderRekrutteringstreff(tittel);

  const status: 'neutral' | 'success' | 'error' =
    analyse.isLoading || !analyse.data
      ? 'neutral'
      : analyse.data.bryterRetningslinjer
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

  const disabled = !tittel || analyse.isLoading;

  const open = () => modalRef.current?.showModal();
  const close = () => modalRef.current?.close();

  return (
    <>
      <Button
        disabled={disabled}
        onClick={open}
        icon={icon}
        className={btnClass}
        aria-label='Analyser tittel'
        variant='tertiary'
        size='medium'
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
              isLoadingAnalyse={analyse.isLoading}
              analyseData={analyse.data}
              analyseError={analyse.error as Error | undefined}
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
