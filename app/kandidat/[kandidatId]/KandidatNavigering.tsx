import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatNavigering } from '../../components/KandidatNavigeringContext';

interface KandidatNavigeringProps {
  kandidatnr: string;
}
const KandidatNavigering: React.FC<KandidatNavigeringProps> = ({
  kandidatnr,
}) => {
  const { navigering, setNavigering } = useKandidatNavigering();

  console.log('🎺 kandidatnr', kandidatnr);
  if (!navigering || navigering.length < 1) {
    return null;
  }

  const kandidatPlassering = navigering.indexOf(kandidatnr);

  if (kandidatPlassering === -1) {
    setNavigering([]);
    return null;
  }

  return (
    <div className='flex items-center'>
      <Button
        variant='tertiary'
        icon={<ArrowLeftIcon aria-hidden />}
        disabled={kandidatPlassering === 0}
      >
        forrige
      </Button>
      {kandidatPlassering + 1} av {navigering.length}
      <Button
        variant='tertiary'
        iconPosition='right'
        icon={<ArrowRightIcon aria-hidden />}
        disabled={kandidatPlassering === navigering.length - 1}
      >
        neste
      </Button>
    </div>
  );
};

export default KandidatNavigering;
