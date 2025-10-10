import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/hooks/useRekrutteringstreffData';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
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
  const { activeStep } = useRekrutteringstreffData();
  const erLåst = activeStep === 'FULLFØRE' || activeStep === 'AVLYST';

  return (
    <Link href={`/rekrutteringstreff/${rekrutteringstreffId}/finn-kandidater`}>
      <Button
        icon={<PlusIcon />}
        type='button'
        variant='secondary'
        disabled={erLåst}
        className={className}
      >
        Legg til jobbsøker
      </Button>
    </Link>
  );
};

export default LeggTilJobbsøkerKnapp;
