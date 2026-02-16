import { useSidebar } from '@/components/ui/sidebar';
import { PersonChatIcon } from '@navikt/aksel-icons';
import { Button, Popover } from '@navikt/ds-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const GiTilbakemelding = () => {
  const [openState, setOpenState] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { open } = useSidebar();

  return (
    <>
      <Button
        disabled
        data-color='neutral'
        size='small'
        onClick={(event) => {
          if (openState) {
            setOpenState(false);
            setAnchorEl(null);
            return;
          }

          setAnchorEl(event.currentTarget);

          setOpenState(true);
        }}
        aria-expanded={openState}
        variant='tertiary'
        icon={<PersonChatIcon />}
        className={open ? 'w-full justify-start text-left' : ''}
      >
        {open && 'Gi tilbakemelding'}
      </Button>
      {openState &&
        createPortal(
          <Popover
            open={openState}
            onClose={() => {
              setOpenState(false);
              setAnchorEl(null);
            }}
            anchorEl={anchorEl}
          >
            <Popover.Content className='w-[360px]'>
              <div>Kommer</div>
            </Popover.Content>
          </Popover>,
          document.body,
        )}
    </>
  );
};

export default GiTilbakemelding;
