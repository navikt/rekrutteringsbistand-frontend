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
  const skalIgnorereNesteLukkRef = useRef(false);

  const ignorerNesteLukkEtterInteraksjonIInnhold = () => {
    skalIgnorereNesteLukkRef.current = true;

    // Lar flagget stå til dette klikket er ferdig, slik at lukkelogikken for samme
    // klikk ser at lukking skal ignoreres. Dette stopper ikke propagasjon, vi
    // nullstiller bare flagget rett etterpå.
    window.setTimeout(() => {
      skalIgnorereNesteLukkRef.current = false;
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

  const håndterLukkPopover = () => {
    if (skalIgnorereNesteLukkRef.current) {
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

      <Popover open={open} onClose={håndterLukkPopover} anchorEl={anchorEl}>
        <Popover.Content
          className='min-w-[14rem]'
          onMouseDownCapture={ignorerNesteLukkEtterInteraksjonIInnhold}
        >
          {children}
        </Popover.Content>
      </Popover>
    </>
  );
};

export default FilterKomponent;
