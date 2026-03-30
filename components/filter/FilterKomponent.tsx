import { ChevronDownIcon } from '@navikt/aksel-icons';
import { Button, Popover } from '@navikt/ds-react';
import * as React from 'react';
import { useRef, useState } from 'react';

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

  // Trenger denne for å unngå at popover lukker seg når man klikker på teksten til checkboksene
  const ignorerNesteLukkRef = useRef(false);

  const markerInteraksjonIInnhold = () => {
    ignorerNesteLukkRef.current = true;

    window.setTimeout(() => {
      ignorerNesteLukkRef.current = false;
    }, 0);
  };

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
    if (ignorerNesteLukkRef.current) {
      return;
    }

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
        <Popover.Content
          className='min-w-[14rem]'
          onMouseDownCapture={markerInteraksjonIInnhold}
        >
          {children}
        </Popover.Content>
      </Popover>
    </>
  );
};

export default FilterKomponent;
