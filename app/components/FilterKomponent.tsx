import { ActionMenu } from '@navikt/ds-react';
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
        <div className='flex gap-2 aksel-button aksel-button--tertiary aksel-button--medium'>
          {tittel} <ChevronDownIcon />
        </div>
      </ActionMenu.Trigger>
      <ActionMenu.Content>{children}</ActionMenu.Content>
    </ActionMenu>
  );
};

export default FilterKomponent;
