import { Button, Popover } from '@navikt/ds-react';
import { useRef, useState } from 'react';

const GiTilbakemelding = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openState, setOpenState] = useState(false);

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={() => setOpenState(!openState)}
        aria-expanded={openState}
      >
        Gi tilbakemelding
      </Button>

      <Popover
        open={openState}
        onClose={() => setOpenState(false)}
        anchorEl={buttonRef.current}
      >
        <Popover.Content>
          {/* @ts-expect-error ikke typet */}
          <skyra-survey slug='arbeids-og-velferdsetaten-nav/oversikt'></skyra-survey>
        </Popover.Content>
      </Popover>
    </>
  );
};

export default GiTilbakemelding;
