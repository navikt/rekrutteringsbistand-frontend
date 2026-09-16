'use client';

import { ChevronDownIcon } from '@navikt/aksel-icons';
import { Button, Popover, type PopoverProps } from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';

export interface FilterPopoverKomponentProps {
  children?: React.ReactNode | undefined;
  tittel: string;
  placement?: PopoverProps['placement'];
}

const FilterPopoverKomponent: React.FC<FilterPopoverKomponentProps> = ({
  children,
  tittel,
  placement = 'bottom-start',
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const togglePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) {
      setOpen(false);
      setAnchorEl(null);
      return;
    }

    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const håndterLukkPopover = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant='tertiary'
        onClick={togglePopover}
        aria-expanded={open}
        aria-haspopup='dialog'
        iconPosition='right'
        icon={<ChevronDownIcon aria-hidden />}
      >
        {tittel}
      </Button>

      <Popover
        open={open}
        onClose={håndterLukkPopover}
        anchorEl={anchorEl}
        placement={placement}
      >
        <Popover.Content className='min-w-[14rem]'>{children}</Popover.Content>
      </Popover>
    </>
  );
};

export default FilterPopoverKomponent;
