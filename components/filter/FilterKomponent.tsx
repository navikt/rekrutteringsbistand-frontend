import { ChevronDownIcon } from '@navikt/aksel-icons';
import { Button, Popover } from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';

export interface FilterKomponentProps {
  children?: React.ReactNode | undefined;
  tittel: string;
}

const FilterKomponent: React.FC<FilterKomponentProps> = ({
  children,
  tittel,
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

  const lukkPopover = () => {
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

      <Popover open={open} onClose={lukkPopover} anchorEl={anchorEl}>
        <Popover.Content className='min-w-[14rem]'>{children}</Popover.Content>
      </Popover>
    </>
  );
};

export default FilterKomponent;
