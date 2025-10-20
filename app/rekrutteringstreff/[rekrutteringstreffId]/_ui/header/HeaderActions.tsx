'use client';

import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import KiLoggLenke from './KiLoggLenke';
import AvlysRekrutteringstreffButton from './actions/AvlysRekrutteringstreffButton';
import FullførRekrutteringstreffButton from './actions/FullførRekrutteringstreffButton';
import GjenapneRekrutteringstreffButton from './actions/GjenapneRekrutteringstreffButton';
import PubliserRekrutteringstreffButton from './actions/PubliserRekrutteringstreffButton';
import RedigerPublisertButton from './actions/RedigerPublisertButton';
import RepubliserRekrutteringstreffButton from './actions/RepubliserRekrutteringstreffButton';
import SlettRekrutteringstreffButton from './actions/SlettRekrutteringstreffButton';
import { AktivtSteg } from '@/app/rekrutteringstreff/_types/constants';
import { Button } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

type Props = {
  erIForhåndsvisning: boolean;
  viserFullskjermForhåndsvisning?: boolean;
  erPubliseringklar: boolean;
  onToggleForhåndsvisning: (ny: boolean) => void;
  onBekreftRedigerPublisert: () => void;
  onAvbrytRedigering: () => void;
  onPublisert?: () => void;
};

const HeaderActions: FC<Props> = ({
  erIForhåndsvisning,
  viserFullskjermForhåndsvisning,
  erPubliseringklar,
  onToggleForhåndsvisning,
  onBekreftRedigerPublisert,
  onAvbrytRedigering,
  onPublisert,
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

  const knapper = (): ReactNode[] => {
    // Fullskjerm forhåndsvisning - kun "Avslutt forhåndsvisning"
    if (viserFullskjermForhåndsvisning) {
      return [
        <Button
          key='avslutt-forhandsvisning'
          type='button'
          size='small'
          variant='secondary'
          onClick={() => onToggleForhåndsvisning(false)}
        >
          Avslutt forhåndsvisning
        </Button>,
      ];
    }

    // Edit-modus etter publisering
    if (
      erIEditModus &&
      harPublisert &&
      !avlyst &&
      activeStep !== AktivtSteg.FULLFØRE
    ) {
      return [
        <RepubliserRekrutteringstreffButton
          key='republiser'
          treff={treff}
          innleggHtmlFraBackend={innleggHtmlFraBackend}
        />,
        <Button
          key='forhandsvis'
          type='button'
          size='small'
          variant='secondary'
          onClick={() => onToggleForhåndsvisning(true)}
        >
          Forhåndsvis
        </Button>,
        <Button
          key='avbryt'
          type='button'
          size='small'
          variant='tertiary'
          onClick={() => onAvbrytRedigering()}
        >
          Avbryt
        </Button>,
        <KiLoggLenke key='kilogg' />,
      ];
    }

    // Edit-modus før publisering
    if (erIEditModus && !harPublisert && activeStep === AktivtSteg.KLADD) {
      return [
        <PubliserRekrutteringstreffButton
          key='publiser'
          erPubliseringklar={erPubliseringklar}
          rekrutteringstreffId={rekrutteringstreffId}
          oppdaterData={oppdaterData}
          onPublisert={onPublisert}
        />,
        <Button
          key='forhandsvis'
          type='button'
          size='small'
          variant='secondary'
          onClick={() => onToggleForhåndsvisning(true)}
        >
          Forhåndsvis
        </Button>,
        <SlettRekrutteringstreffButton key='slett' />,
        <KiLoggLenke key='kilogg' />,
      ];
    }

    // Normal view-modus
    return [
      !avlyst && harPublisert && activeStep !== AktivtSteg.FULLFØRE && (
        <RedigerPublisertButton
          key='rediger'
          erIForhåndsvisning={erIForhåndsvisning}
          harPublisert={harPublisert}
          onToggleForhåndsvisning={onToggleForhåndsvisning}
          onBekreftRedigerPublisert={onBekreftRedigerPublisert}
        />
      ),
      !avlyst && activeStep === AktivtSteg.KLADD && (
        <PubliserRekrutteringstreffButton
          key='publiser'
          erPubliseringklar={erPubliseringklar}
          rekrutteringstreffId={rekrutteringstreffId}
          oppdaterData={oppdaterData}
          onPublisert={onPublisert}
        />
      ),
      !avlyst && activeStep === AktivtSteg.INVITERE && (
        <FullførRekrutteringstreffButton
          key='fullfør'
          rekrutteringstreffId={rekrutteringstreffId}
          harInvitert={harInvitert}
          tiltidspunktHarPassert={tilTidspunktHarPassert}
          oppdaterData={oppdaterData}
        />
      ),
      activeStep === AktivtSteg.FULLFØRE && (
        <GjenapneRekrutteringstreffButton
          key='gjenapne'
          rekrutteringstreffId={rekrutteringstreffId}
          oppdaterData={oppdaterData}
        />
      ),
      harPublisert && !avlyst && (
        <AvlysRekrutteringstreffButton
          key='avlys'
          rekrutteringstreffId={rekrutteringstreffId}
          oppdaterData={oppdaterData}
        />
      ),
      activeStep === AktivtSteg.KLADD && (
        <SlettRekrutteringstreffButton key='slett' />
      ),
      <KiLoggLenke key='kilogg' />,
    ].filter(Boolean);
  };

  return <div className='flex items-center gap-2'>{knapper()}</div>;
};

export default HeaderActions;
