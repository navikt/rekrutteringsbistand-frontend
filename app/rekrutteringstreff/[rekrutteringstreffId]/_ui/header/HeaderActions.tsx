'use client';

import AvlysRekrutteringstreffButton from '../actions/AvlysRekrutteringstreffButton';
import FullførRekrutteringstreffButton from '../actions/FullførRekrutteringstreffButton';
import GjenapneRekrutteringstreffButton from '../actions/GjenapneRekrutteringstreffButton';
import PubliserRekrutteringstreffButton from '../actions/PubliserRekrutteringstreffButton';
import RedigerPublisertButton from '../actions/RedigerPublisertButton';
import RepubliserRekrutteringstreffButton from '../actions/RepubliserRekrutteringstreffButton';
import SlettRekrutteringstreffButton from '../actions/SlettRekrutteringstreffButton';
import { useRekrutteringstreffData } from '../hooks/useRekrutteringstreffData';
import { Button } from '@navikt/ds-react';
import { FC } from 'react';

type Props = {
  erIForhåndsvisning: boolean;
  viserFullskjermForhåndsvisning?: boolean;
  erPubliseringklar: boolean;
  onToggleForhåndsvisning: (ny: boolean) => void;
  onBekreftRedigerPublisert: () => void;
  onAvlyst: () => void;
  onAvbrytRedigering: () => void;
  onPublisert?: () => void;
  onRepubliser?: () => Promise<void>;
  republiserDisabled?: boolean;
};

const HeaderActions: FC<Props> = ({
  erIForhåndsvisning,
  viserFullskjermForhåndsvisning,
  erPubliseringklar,
  onToggleForhåndsvisning,
  onBekreftRedigerPublisert,
  onAvlyst,
  onAvbrytRedigering,
  onPublisert,
  onRepubliser,
  republiserDisabled,
}) => {
  const {
    rekrutteringstreffId,
    activeStep,
    avlyst,
    harPublisert,
    harInvitert,
    tilTidspunktHarPassert,
    treff,
    innleggHtmlFraBackend,
    oppdaterData,
  } = useRekrutteringstreffData();
  const erIEditModus = !erIForhåndsvisning;

  // Hvis vi er i fullskjerm forhåndsvisning, vis kun "Avslutt forhåndsvisning"
  if (viserFullskjermForhåndsvisning) {
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
  if (erIEditModus && harPublisert && !avlyst && activeStep !== 'FULLFØRE') {
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
  if (erIEditModus && !harPublisert && activeStep === 'PUBLISERE') {
    return (
      <div className='flex items-center gap-2'>
        <PubliserRekrutteringstreffButton
          erPubliseringklar={erPubliseringklar}
          rekrutteringstreffId={rekrutteringstreffId}
          oppdaterData={oppdaterData}
          onPublisert={onPublisert}
        />
        <Button
          type='button'
          size='small'
          variant='secondary'
          onClick={() => onToggleForhåndsvisning(true)}
        >
          Forhåndsvis
        </Button>
        <SlettRekrutteringstreffButton />
      </div>
    );
  }

  // Normal view mode knapper (når man ikke er i edit-modus)
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
          onPublisert={onPublisert}
        />
      )}

      {!avlyst && activeStep === 'INVITERE' && (
        <FullførRekrutteringstreffButton
          rekrutteringstreffId={rekrutteringstreffId}
          harInvitert={harInvitert}
          tiltidspunktHarPassert={tilTidspunktHarPassert}
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

      {activeStep === 'PUBLISERE' && <SlettRekrutteringstreffButton />}
    </div>
  );
};

export default HeaderActions;
