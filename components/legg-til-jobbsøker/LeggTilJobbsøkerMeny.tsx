'use client';

import LeggTilDialog from '@/components/legg-til-jobbsøker/LeggTilDialog';
import { LeggTilJobbsøkerType } from '@/components/legg-til-jobbsøker/LeggTilJobbsøker';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEventObject } from '@/util/umamiEvents';
import {
  MagnifyingGlassIcon,
  PersonPlusIcon,
  PlusIcon,
} from '@navikt/aksel-icons';
import { ActionMenu, Button, Dialog, Tooltip } from '@navikt/ds-react';
import { FC, useState } from 'react';

interface LeggTilJobbsøkerMenyProps {
  type: LeggTilJobbsøkerType;
  finnHref: string;
  finnUmamiEvent: UmamiEventObject;
  disabled?: boolean;
  tooltip?: string;
  className?: string;
  størrelse?: 'small' | 'medium' | 'xsmall';
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const LeggTilJobbsøkerMeny: FC<LeggTilJobbsøkerMenyProps> = ({
  type,
  finnHref,
  finnUmamiEvent,
  disabled,
  tooltip,
  className,
  størrelse,
  variant = 'secondary',
}) => {
  const { trackAndNavigate } = useUmami();
  const [åpen, setÅpen] = useState(false);

  const knapp = (
    <Button
      disabled={disabled}
      icon={<PlusIcon aria-hidden />}
      type='button'
      variant={variant}
      size={størrelse ? størrelse : 'medium'}
      className={className}
    >
      Legg til jobbsøker
    </Button>
  );

  if (disabled) {
    return tooltip ? (
      <Tooltip content={tooltip} placement='top'>
        <span className={className}>{knapp}</span>
      </Tooltip>
    ) : (
      knapp
    );
  }

  return (
    <>
      <ActionMenu>
        <ActionMenu.Trigger>{knapp}</ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Item
            icon={<MagnifyingGlassIcon aria-hidden />}
            onSelect={() => trackAndNavigate(finnUmamiEvent, finnHref)}
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
          <LeggTilDialog type={type} />
        </Dialog.Popup>
      </Dialog>
    </>
  );
};

export default LeggTilJobbsøkerMeny;
