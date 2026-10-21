import { ActionMenu, Button } from '@navikt/ds-react';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

export interface FilterKomponentProps {
  children?: React.ReactNode | undefined;
  tittel: string;
}

const FilterKomponent: React.FC<FilterKomponentProps> = ({
  children,
  tittel,
}) => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          variant='tertiary'
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition='right'
        >
          {tittel}
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>{children}</ActionMenu.Content>
    </ActionMenu>
  );
};

export default FilterKomponent;
