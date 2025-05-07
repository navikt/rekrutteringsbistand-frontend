import { KandidatutfallTyper } from '../KandidatTyper';
import { MinusCircleIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface FjernFåttJobbenKnappProps {
  endreUtfallForKandidat: (utfall: KandidatutfallTyper) => void;
  loading: boolean;
  lukketKandidatliste?: boolean;
}

const FjernFåttJobbenKnapp: React.FC<FjernFåttJobbenKnappProps> = ({
  endreUtfallForKandidat,
  loading,
  lukketKandidatliste,
}) => {
  return (
    <Button
      disabled={lukketKandidatliste}
      icon={<MinusCircleIcon />}
      variant='tertiary'
      size='small'
      className='self-center'
      loading={loading}
      onClick={() => endreUtfallForKandidat(KandidatutfallTyper.PRESENTERT)}
    >
      Fjern fått jobben registreringen
    </Button>
  );
};

export default FjernFåttJobbenKnapp;
