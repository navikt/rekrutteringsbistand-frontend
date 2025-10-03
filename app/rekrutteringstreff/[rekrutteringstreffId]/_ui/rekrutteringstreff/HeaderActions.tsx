'use client';

import AvlysRekrutteringstreffButton from './AvlysRekrutteringstreffButton';
import FullforRekrutteringstreffButton from './FullforRekrutteringstreffButton';
import GjenapneRekrutteringstreffButton from './GjenapneRekrutteringstreffButton';
import PubliserRekrutteringstreffButton from './PubliserRekrutteringstreffButton';
import RedigerPublisertButton from './RedigerPublisertButton';
import RepubliserRekrutteringstreffButton from './RepubliserRekrutteringstreffButton';
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
  treff?: any;
  innleggHtmlFraBackend?: string | null;
  onRepubliser?: () => Promise<void>;
  republiserDisabled?: boolean;
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
  treff,
  innleggHtmlFraBackend,
  onRepubliser,
  republiserDisabled,
}) => {
  const harPublisert = activeStep === 'INVITERE' || activeStep === 'FULLFØRE';

  // Når man er i forhåndsvisning, vis knapp for å avslutte forhåndsvisning i header
  if (erIForhåndsvisning) {
    return (
      <div className='flex items-center gap-2'>
        <Button
          type='button'
          size='small'
          variant='secondary'
          onClick={() => onToggleForhåndsvisning(false)}
        >
          Avslutt forhåndsvisning
        </Button>
      </div>
    );
  }

  // Når man er i edit-modus etter publisering, vis spesielle knapper
  if (
    harPublisert &&
    !erIForhåndsvisning &&
    !avlyst &&
    activeStep !== 'FULLFØRE'
  ) {
    return (
      <div className='flex items-center gap-2'>
        <RepubliserRekrutteringstreffButton
          disabled={republiserDisabled}
          treff={treff}
          innleggHtmlFraBackend={innleggHtmlFraBackend}
          onBekreft={onRepubliser ?? (async () => {})}
        />
        <Button
          type='button'
          size='small'
          variant='secondary'
          onClick={() => onToggleForhåndsvisning(true)}
        >
          Forhåndsvis
        </Button>
        <Button
          type='button'
          size='small'
          variant='tertiary'
          onClick={() => onAvbrytRedigering()}
        >
          Avbryt
        </Button>
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
          Forhåndsvis
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
