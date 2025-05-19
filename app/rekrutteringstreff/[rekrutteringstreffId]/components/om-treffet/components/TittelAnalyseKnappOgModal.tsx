'use client';

import AnalyserTittel from '../AnalyserTittel';
import { useTittelAnalyse } from '@/app/api/rekrutteringstreff/validerRekrutteringstreff/useTittelAnalyse';
import { RobotIcon, RobotSmileIcon, RobotFrownIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';

interface TittelAnalyseKnappOgModalProps {
  tittel?: string;
}

const TittelAnalyseKnappOgModal: React.FC<TittelAnalyseKnappOgModalProps> = ({
  tittel,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const analyse = useTittelAnalyse(tittel);

  const handleOpenModal = () => {
    if (typeof tittel === 'string' && tittel.length > 0 && !analyse.isLoading) {
      setIsModalOpen(true);
    }
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const status: 'neutral' | 'success' | 'error' =
    analyse.isLoading || !analyse.data
      ? 'neutral'
      : analyse.data.bryterRetningslinjer
        ? 'error'
        : 'success';

  let robotIconElement = <RobotIcon aria-hidden />;
  let robotButtonClass = '';

  if (status === 'success') {
    robotIconElement = <RobotSmileIcon aria-hidden />;
    robotButtonClass = 'text-green-600';
  } else if (status === 'error') {
    robotIconElement = <RobotFrownIcon aria-hidden />;
    robotButtonClass = 'aksel-error-message';
  }

  const isButtonDisabled =
    typeof tittel !== 'string' || tittel.length === 0 || analyse.isLoading;

  return (
    <>
      <Button
        icon={robotIconElement}
        className={robotButtonClass}
        aria-label='Analyser tittel'
        variant='tertiary'
        size='small'
        onClick={handleOpenModal}
        disabled={isButtonDisabled}
      />

      {isModalOpen && typeof tittel === 'string' && tittel.length > 0 && (
        <AnalyserTittel
          open={isModalOpen}
          onClose={handleCloseModal}
          tittel={tittel}
          isLoadingAnalyse={analyse.isLoading}
          analyseData={analyse.data}
          analyseError={analyse.error as Error | undefined}
        />
      )}
    </>
  );
};

export default TittelAnalyseKnappOgModal;
