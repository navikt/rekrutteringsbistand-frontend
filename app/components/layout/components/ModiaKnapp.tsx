import { useSidebar } from '../../../../components/ui/sidebar';
import { MenuGridIcon } from '@navikt/aksel-icons';
import { Button, Popover } from '@navikt/ds-react';
import * as React from 'react';

const ModiaKnapp: React.FC = () => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [openState, setOpenState] = React.useState(false);
  const { open } = useSidebar();
  return (
    <>
      <Button
        ref={buttonRef}
        onClick={() => setOpenState(!openState)}
        variant='tertiary-neutral'
        icon={<MenuGridIcon />}
      >
        {open && 'Modia'}
      </Button>

      <Popover
        open={openState}
        onClose={() => setOpenState(false)}
        anchorEl={buttonRef.current}
      >
        <Popover.Content>- Kommer -</Popover.Content>
      </Popover>
    </>
  );
};

export default ModiaKnapp;
