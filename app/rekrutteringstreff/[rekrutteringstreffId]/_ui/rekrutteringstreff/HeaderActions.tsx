'use client';

import SlettRekrutteringstreffModal from '../../_ui/SlettRekrutteringstreffModal';
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
  publiserer: boolean;
  fullfører: boolean;
  gjenåpner: boolean;
  harInvitert: boolean;
  tiltidspunktHarPassert: boolean;
  onToggleForhåndsvisning: (ny: boolean) => void;
  onOpenPubliser: () => void;
  onOpenFullfør: () => void;
  onOpenGjenåpne: () => void;
  onOpenAvlys: () => void;
  onFullførDirekte: () => void;
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
  onOpenPubliser,
  onOpenFullfør,
  onOpenGjenåpne,
  onOpenAvlys,
  onFullførDirekte,
}) => {
  const harPublisert = activeStep === 'INVITERE' || activeStep === 'FULLFØRE';

  return (
    <div className='flex items-center gap-2'>
      {!avlyst && activeStep !== 'FULLFØRE' && (
        <Button
          size='small'
          variant='secondary'
          onClick={() => onToggleForhåndsvisning(!erIForhåndsvisning)}
        >
          {erIForhåndsvisning ? 'Rediger' : 'Forhåndsvis'}
        </Button>
      )}

      {!avlyst && activeStep === 'PUBLISERE' && (
        <Button
          size='small'
          className=''
          disabled={!erPubliseringklar || publiserer}
          loading={publiserer}
          onClick={onOpenPubliser}
        >
          Publiser treffet
        </Button>
      )}

      {!avlyst && activeStep === 'INVITERE' && (
        <Button
          size='small'
          variant='primary'
          disabled={!harInvitert || fullfører}
          loading={fullfører}
          onClick={() => {
            if (!tiltidspunktHarPassert) {
              onOpenFullfør();
            } else {
              onFullførDirekte();
            }
          }}
        >
          Fullfør
        </Button>
      )}

      {activeStep === 'FULLFØRE' && (
        <Button
          size='small'
          variant='primary'
          loading={gjenåpner}
          onClick={onOpenGjenåpne}
        >
          Gjenåpne
        </Button>
      )}

      {harPublisert && !avlyst && (
        <Button size='small' variant='danger' onClick={onOpenAvlys}>
          Avlys treffet
        </Button>
      )}

      {activeStep === 'PUBLISERE' && <SlettRekrutteringstreffModal />}
    </div>
  );
};

export default HeaderActions;
