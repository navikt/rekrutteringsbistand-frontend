import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button, Tooltip } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
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

  const tilTidDato = treff?.tilTid
    ? toZonedTime(parseISO(treff.tilTid), 'Europe/Oslo')
    : null;
  const erTreffPassert = tilTidDato != null && tilTidDato < new Date();

  const erLåst =
    erTreffPassert ||
    treff?.status === RekrutteringstreffStatus.FULLFØRT ||
    treff?.status === RekrutteringstreffStatus.AVLYST;

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
