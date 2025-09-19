'use client';

import AvlysRekrutteringstreffButton from './AvlysRekrutteringstreffButton';
import FullforRekrutteringstreffButton from './FullforRekrutteringstreffButton';
import GjenapneRekrutteringstreffButton from './GjenapneRekrutteringstreffButton';
import PubliserRekrutteringstreffButton from './PubliserRekrutteringstreffButton';
import RedigerPublisertButton from './RedigerPublisertButton';
import SlettRekrutteringstreffModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/SlettRekrutteringstreffModal';
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
  publiserer: boolean;
  fullfører: boolean;
  gjenåpner: boolean;
  harInvitert: boolean;
  tiltidspunktHarPassert: boolean;
  onToggleForhåndsvisning: (ny: boolean) => void;
  onBekreftRedigerPublisert: () => void;
  onPubliser: () => Promise<void> | void;
  onFullfør: () => Promise<void> | void;
  onGjenåpne: () => Promise<void> | void;
  onBekreftAvlys: () => Promise<void> | void;
  prosessererAvlys: boolean;
};

const HeaderActions: FC<Props> = ({
  avlyst,
  activeStep,
  erIForhåndsvisning,
  erPubliseringklar,
  publiserer,
  fullfører,
  gjenåpner,
  harInvitert,
  tiltidspunktHarPassert,
  onToggleForhåndsvisning,
  onBekreftRedigerPublisert,
  onPubliser,
  onFullfør,
  onGjenåpne,
  onBekreftAvlys,
  prosessererAvlys,
}) => {
  const harPublisert = activeStep === 'INVITERE' || activeStep === 'FULLFØRE';

  return (
    <div className='flex items-center gap-2'>
      {!avlyst && activeStep !== 'FULLFØRE' && (
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
          publiserer={publiserer}
          onPubliser={onPubliser}
        />
      )}

      {!avlyst && activeStep === 'INVITERE' && (
        <FullforRekrutteringstreffButton
          fullfører={fullfører}
          harInvitert={harInvitert}
          tiltidspunktHarPassert={tiltidspunktHarPassert}
          onFullfør={onFullfør}
        />
      )}

      {activeStep === 'FULLFØRE' && (
        <GjenapneRekrutteringstreffButton
          gjenåpner={gjenåpner}
          onGjenåpne={onGjenåpne}
        />
      )}

      {harPublisert && !avlyst && (
        <AvlysRekrutteringstreffButton
          prosessererAvlys={prosessererAvlys}
          onBekreftAvlys={onBekreftAvlys}
        />
      )}

      {activeStep === 'PUBLISERE' && <SlettRekrutteringstreffModal />}
    </div>
  );
};

export default HeaderActions;
