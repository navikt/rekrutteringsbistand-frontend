import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';
import { FC } from 'react';

interface LeggTilJobbsøkerKnappProps {
  rekrutteringstreffStatus?: RekrutteringstreffStatusType;
  className?: string;
}

const LeggTilJobbsøkerKnapp: FC<LeggTilJobbsøkerKnappProps> = ({
  rekrutteringstreffStatus,
  className,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();
  const erLåst =
    rekrutteringstreffStatus === RekrutteringstreffStatus.FULLFØRT ||
    rekrutteringstreffStatus === RekrutteringstreffStatus.AVLYST;

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
