import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';
import { FC } from 'react';

interface LeggTilJobbsøkerKnappProps {
  rektrutteringstreffStatus?: RekrutteringstreffStatusType;
  className?: string;
}

const LeggTilJobbsøkerKnapp: FC<LeggTilJobbsøkerKnappProps> = ({
  rektrutteringstreffStatus,
  className,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();
  const erLåst =
    rektrutteringstreffStatus === RekrutteringstreffStatus.FULLFØRT ||
    rektrutteringstreffStatus === RekrutteringstreffStatus.AVLYST;

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
