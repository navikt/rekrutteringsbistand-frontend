import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { tidspunktErIFortiden } from '@/util/dato';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, Tooltip } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import Link from 'next/link';
import { FC } from 'react';

interface LeggTilJobbsøkerKnappProps {
  className?: string;
}

const LeggTilJobbsøkerKnapp: FC<LeggTilJobbsøkerKnappProps> = ({
  className,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();

  const tilTidDato = treff?.tilTid ? parseISO(treff.tilTid) : null;
  const erTreffPassert = tidspunktErIFortiden(tilTidDato);

  const erLåst =
    erTreffPassert || treff?.status !== RekrutteringstreffStatus.PUBLISERT;

  const tooltipTekst =
    treff?.status === RekrutteringstreffStatus.FULLFØRT
      ? 'Du kan ikke legge til jobbsøkere etter at treffet er fullført'
      : treff?.status === RekrutteringstreffStatus.AVLYST
        ? 'Du kan ikke legge til jobbsøkere etter at treffet er avlyst'
        : 'Du kan ikke legge til jobbsøkere etter at treff-tidspunktet er passert';

  const knapp = (
    <Link href={`/rekrutteringstreff/${rekrutteringstreffId}/finn-kandidater`}>
      <Button
        disabled={erLåst}
        icon={<PlusIcon />}
        type='button'
        variant='secondary'
        className={className}
      >
        Legg til jobbsøker
      </Button>
    </Link>
  );

  if (erLåst) {
    return (
      <Tooltip content={tooltipTekst} placement={'top'}>
        {knapp}
      </Tooltip>
    );
  }
  return knapp;
};

export default LeggTilJobbsøkerKnapp;
