'use client';

import AvlysRekrutteringstreffButton from './AvlysRekrutteringstreffButton';
import FullforRekrutteringstreffButton from './FullforRekrutteringstreffButton';
import GjenapneRekrutteringstreffButton from './GjenapneRekrutteringstreffButton';
import PubliserRekrutteringstreffButton from './PubliserRekrutteringstreffButton';
import RedigerPublisertButton from './RedigerPublisertButton';
import SlettRekrutteringstreffModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/SlettRekrutteringstreffModal';
import { Button } from '@navikt/ds-react';
import { FC } from 'react';

export type ActiveStep =
  | 'PUBLISERE'
  | 'INVITERE'
  | 'FULLFØRE'
  | 'AVLYST'
  | string
  | undefined;

type Props = {
  avlyst: boolean;
  activeStep: ActiveStep;
  erIForhåndsvisning: boolean;
  erPubliseringklar: boolean;
  harInvitert: boolean;
  tiltidspunktHarPassert: boolean;
  rekrutteringstreffId: string;
  oppdaterData: () => Promise<void>;
  onToggleForhåndsvisning: (ny: boolean) => void;
  onBekreftRedigerPublisert: () => void;
  onAvlyst: () => void;
  onAvbrytRedigering: () => void;
};

const HeaderActions: FC<Props> = ({
  avlyst,
  activeStep,
  erIForhåndsvisning,
  erPubliseringklar,
  harInvitert,
  tiltidspunktHarPassert,
  rekrutteringstreffId,
  oppdaterData,
  onToggleForhåndsvisning,
  onBekreftRedigerPublisert,
  onAvlyst,
  onAvbrytRedigering,
}) => {
  const harPublisert = activeStep === 'INVITERE' || activeStep === 'FULLFØRE';

  // Når man er i edit-modus etter publisering, vis spesielle knapper
  if (
    harPublisert &&
    !erIForhåndsvisning &&
    !avlyst &&
    activeStep !== 'FULLFØRE'
  ) {
    return (
      <div className='flex items-center gap-2'>
        <Button
          type='button'
          size='small'
          variant='secondary'
          onClick={() => onToggleForhåndsvisning(true)}
        >
          Forhåndsvisning
        </Button>
        <Button
          type='button'
          size='small'
          variant='tertiary'
          onClick={() => onAvbrytRedigering()}
        >
          Avbryt
        </Button>
        {/* TODO: Legg til "Publiser på nytt" knapp her når logikken er klar */}
      </div>
    );
  }

  // Når man er i edit-modus før publisering
  if (!harPublisert && !erIForhåndsvisning && activeStep === 'PUBLISERE') {
    return (
      <div className='flex items-center gap-2'>
        <PubliserRekrutteringstreffButton
          erPubliseringklar={erPubliseringklar}
          rekrutteringstreffId={rekrutteringstreffId}
          oppdaterData={oppdaterData}
        />
        <Button
          type='button'
          size='small'
          variant='secondary'
          onClick={() => onToggleForhåndsvisning(true)}
        >
          Forhåndsvisning
        </Button>
        <SlettRekrutteringstreffModal />
      </div>
    );
  }

  // Normal view mode knapper
  return (
    <div className='flex items-center gap-2'>
      {!avlyst && harPublisert && activeStep !== 'FULLFØRE' && (
        <RedigerPublisertButton
          erIForhåndsvisning={erIForhåndsvisning}
          harPublisert={harPublisert}
          onToggleForhåndsvisning={onToggleForhåndsvisning}
          onBekreftRedigerPublisert={onBekreftRedigerPublisert}
        />
      )}

      {!avlyst && activeStep === 'PUBLISERE' && (
        <PubliserRekrutteringstreffButton
          erPubliseringklar={erPubliseringklar}
          rekrutteringstreffId={rekrutteringstreffId}
          oppdaterData={oppdaterData}
        />
      )}

      {!avlyst && activeStep === 'INVITERE' && (
        <FullforRekrutteringstreffButton
          rekrutteringstreffId={rekrutteringstreffId}
          harInvitert={harInvitert}
          tiltidspunktHarPassert={tiltidspunktHarPassert}
          oppdaterData={oppdaterData}
        />
      )}

      {activeStep === 'FULLFØRE' && (
        <GjenapneRekrutteringstreffButton
          rekrutteringstreffId={rekrutteringstreffId}
          oppdaterData={oppdaterData}
        />
      )}

      {harPublisert && !avlyst && (
        <AvlysRekrutteringstreffButton
          rekrutteringstreffId={rekrutteringstreffId}
          oppdaterData={oppdaterData}
          onAvlyst={onAvlyst}
        />
      )}

      {activeStep === 'PUBLISERE' && <SlettRekrutteringstreffModal />}
    </div>
  );
};

export default HeaderActions;
