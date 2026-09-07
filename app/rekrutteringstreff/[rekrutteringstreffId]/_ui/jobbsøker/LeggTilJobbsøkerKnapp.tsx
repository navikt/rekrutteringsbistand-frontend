'use client';

import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { LeggTilJobbsøkerType } from '@/components/legg-til-jobbsøker/LeggTilJobbsøker';
import LeggTilJobbsøkerMeny from '@/components/legg-til-jobbsøker/LeggTilJobbsøkerMeny';
import { tidspunktErIFortiden } from '@/util/dato';
import { UmamiEvent } from '@/util/umamiEvents';
import { parseISO } from 'date-fns';
import { FC } from 'react';

interface LeggTilJobbsøkerKnappProps {
  className?: string;
  størrelse?: 'small' | 'medium' | 'xsmall';
}

const LeggTilJobbsøkerKnapp: FC<LeggTilJobbsøkerKnappProps> = ({
  className,
  størrelse,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();

  const tilTidDato = treff?.tilTid ? parseISO(treff.tilTid) : null;
  const erTreffPassert = tidspunktErIFortiden(
    tilTidDato,
    tilTidDato?.getTime().toString(),
  );

  const erLåst =
    erTreffPassert || treff?.status !== RekrutteringstreffStatus.PUBLISERT;

  const tooltipTekst =
    treff?.status === RekrutteringstreffStatus.FULLFØRT
      ? 'Du kan ikke legge til jobbsøkere etter at treffet er fullført'
      : treff?.status === RekrutteringstreffStatus.AVLYST
        ? 'Du kan ikke legge til jobbsøkere etter at treffet er avlyst'
        : 'Du kan ikke legge til jobbsøkere etter at treff-tidspunktet er passert';

  return (
    <LeggTilJobbsøkerMeny
      type={LeggTilJobbsøkerType.Rekrutteringstreff}
      finnHref={`/rekrutteringstreff/${rekrutteringstreffId}/finn-kandidater`}
      finnUmamiEvent={UmamiEvent.Rekrutteringstreff.finn_jobbsøkere_knapp}
      disabled={erLåst}
      tooltip={erLåst ? tooltipTekst : undefined}
      className={className}
      størrelse={størrelse}
    />
  );
};

export default LeggTilJobbsøkerKnapp;
