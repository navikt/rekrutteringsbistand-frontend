import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';

interface LeggTilJobbsøkerKnappProps {
  className?: string;
}

const LeggTilJobbsøkerKnapp: React.FC<LeggTilJobbsøkerKnappProps> = ({
  className,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  return (
    <Link
      href={`/rekrutteringstreff/${rekrutteringstreffId}/finn-kandidater`}
      passHref
      legacyBehavior
    >
      <Button
        icon={<PlusIcon />}
        type='button'
        variant='secondary'
        as='a'
        className={className}
      >
        Legg til jobbsøker
      </Button>
    </Link>
  );
};

export default LeggTilJobbsøkerKnapp;
