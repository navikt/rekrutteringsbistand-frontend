import { KandidatutfallTyper } from './KandidatTyper';
import { MinusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface FjernFåttJobbenKnappProps {
  endreUtfallForKandidat: (utfall: KandidatutfallTyper) => void;
}

const FjernFåttJobbenKnapp: React.FC<FjernFåttJobbenKnappProps> = ({
  endreUtfallForKandidat,
}) => {
  return (
    <Button
      icon={<MinusCircleIcon />}
      variant='tertiary'
      size='small'
      className='self-center'
      onClick={() => endreUtfallForKandidat(KandidatutfallTyper.PRESENTERT)}
    >
      Fjern registreringen
    </Button>
  );
};

export default FjernFåttJobbenKnapp;
