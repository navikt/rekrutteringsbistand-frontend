import { useKandidatNavigering } from '../../providers/KandidatNavigeringContext';
import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface KandidatNavigeringProps {
  kandidatnr: string;
}
const KandidatNavigering: React.FC<KandidatNavigeringProps> = ({
  kandidatnr,
}) => {
  const { navigering, setNavigering } = useKandidatNavigering();
  const router = useRouter();

  React.useEffect(() => {
    if (navigering && navigering.length > 0) {
      const kandidatPlassering = navigering.indexOf(kandidatnr);
      if (kandidatPlassering === -1) {
        setNavigering([]);
      }
    }
  }, [kandidatnr, navigering, setNavigering]);

  if (!navigering || navigering.length < 1) {
    return null;
  }

  const kandidatPlassering = navigering.indexOf(kandidatnr);

  return (
    <div className='flex items-center'>
      <Button
        variant='tertiary'
        icon={<ArrowLeftIcon aria-hidden />}
        disabled={kandidatPlassering === 0}
        onClick={() => {
          if (kandidatPlassering > 0) {
            const previousKandidat = navigering[kandidatPlassering - 1];
            router.push(`/kandidat/${previousKandidat}`);
          }
        }}
      >
        forrige
      </Button>
      <BodyShort className='mx-2'>
        {kandidatPlassering + 1} av {navigering.length}
      </BodyShort>
      <Button
        variant='tertiary'
        iconPosition='right'
        icon={<ArrowRightIcon aria-hidden />}
        disabled={kandidatPlassering === navigering.length - 1}
        onClick={() => {
          if (kandidatPlassering < navigering.length - 1) {
            const nextKandidat = navigering[kandidatPlassering + 1];
            router.push(`/kandidat/${nextKandidat}`);
          }
        }}
      >
        neste
      </Button>
    </div>
  );
};

export default KandidatNavigering;
