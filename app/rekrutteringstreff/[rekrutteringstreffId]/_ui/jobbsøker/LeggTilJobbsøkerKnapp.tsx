'use client';

import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import LeggTilDialog from '@/components/legg-til-jobbsøker/LeggTilDialog';
import { LeggTilJobbsøkerType } from '@/components/legg-til-jobbsøker/LeggTilJobbsøker';
import { useUmami } from '@/providers/UmamiContext';
import { tidspunktErIFortiden } from '@/util/dato';
import { UmamiEvent } from '@/util/umamiEvents';
import {
  MagnifyingGlassIcon,
  PersonPlusIcon,
  PlusIcon,
} from '@navikt/aksel-icons';
import { ActionMenu, Button, Dialog, Tooltip } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import { FC, useState } from 'react';

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
  const { trackAndNavigate } = useUmami();
  const [åpen, setÅpen] = useState(false);

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

  const knapp = (
    <Button
      disabled={erLåst}
      icon={<PlusIcon aria-hidden />}
      type='button'
      variant='secondary'
      size={størrelse ? størrelse : 'medium'}
      className={className}
    >
      Legg til jobbsøker
    </Button>
  );

  if (erLåst) {
    return (
      <Tooltip content={tooltipTekst} placement={'top'}>
        <span className={className}>{knapp}</span>
      </Tooltip>
    );
  }

  return (
    <>
      <ActionMenu>
        <ActionMenu.Trigger>{knapp}</ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Item
            icon={<MagnifyingGlassIcon aria-hidden />}
            onSelect={() =>
              trackAndNavigate(
                UmamiEvent.Rekrutteringstreff.finn_jobbsøkere_knapp,
                `/rekrutteringstreff/${rekrutteringstreffId}/finn-kandidater`,
              )
            }
          >
            Finn jobbsøker
          </ActionMenu.Item>
          <ActionMenu.Item
            icon={<PersonPlusIcon aria-hidden />}
            onSelect={() => setÅpen(true)}
          >
            Legg til via fødselsnummer
          </ActionMenu.Item>
        </ActionMenu.Content>
      </ActionMenu>
      <Dialog open={åpen} onOpenChange={setÅpen}>
        <Dialog.Popup>
          <LeggTilDialog type={LeggTilJobbsøkerType.Rekrutteringstreff} />
        </Dialog.Popup>
      </Dialog>
    </>
  );
};

export default LeggTilJobbsøkerKnapp;
