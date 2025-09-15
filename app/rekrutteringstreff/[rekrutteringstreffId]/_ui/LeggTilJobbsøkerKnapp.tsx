import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';
import { FC } from 'react';

interface LeggTilJobbsøkerKnappProps {
  className?: string;
}

const LeggTilJobbsøkerKnapp: FC<LeggTilJobbsøkerKnappProps> = ({
  className,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  return (
    <Link href={`/rekrutteringstreff/${rekrutteringstreffId}/finn-kandidater`}>
      <Button
        icon={<PlusIcon />}
        type='button'
        variant='secondary'
        className={className}
      >
        Legg til jobbsøker
      </Button>
    </Link>
  );
};

export default LeggTilJobbsøkerKnapp;
