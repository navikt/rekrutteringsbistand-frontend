import { ActionMenu, Tooltip } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

interface ActionMenyPunktProps {
  ikon: ReactNode;
  tekst: string;
  onSelect: () => void;
  disabled?: boolean;
  disabledTooltip?: string;
  variant?: 'danger';
}

export const ActionMenyPunkt: FC<ActionMenyPunktProps> = ({
  ikon,
  tekst,
  onSelect,
  disabled,
  disabledTooltip,
  variant,
}) => {
  const innhold = (
    <div className='flex items-center gap-1 text-lg whitespace-nowrap'>
      {ikon} {tekst}
    </div>
  );

  if (disabled) {
    return (
      <Tooltip content={disabledTooltip ?? ''}>
        <div className='px-2 py-2 text-gray-400'>{innhold}</div>
      </Tooltip>
    );
  }

  return (
    <ActionMenu.Item variant={variant} onSelect={onSelect}>
      {innhold}
    </ActionMenu.Item>
  );
};
