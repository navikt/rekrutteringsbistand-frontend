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
    // Aksel sin disabled-prop gjør at piltastene hopper over punktet. Med
    // aria-disabled kan punktet nås med tastatur, og tooltipen forklarer hvorfor.
    return (
      <Tooltip content={disabledTooltip ?? ''} describesChild>
        <ActionMenu.Item
          aria-disabled
          className='aria-disabled:pointer-events-auto aria-disabled:cursor-not-allowed'
          onSelect={(event) => event.preventDefault()}
        >
          {innhold}
        </ActionMenu.Item>
      </Tooltip>
    );
  }

  return (
    <ActionMenu.Item variant={variant} onSelect={onSelect}>
      {innhold}
    </ActionMenu.Item>
  );
};
