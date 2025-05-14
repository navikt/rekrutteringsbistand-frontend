import { useSidebar } from '../../../../components/ui/sidebar';
import { PersonChatIcon } from '@navikt/aksel-icons';
import { Button, Popover } from '@navikt/ds-react';
import { useRef, useState } from 'react';

const GiTilbakemelding = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openState, setOpenState] = useState(false);
  const { open } = useSidebar();

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={() => setOpenState(!openState)}
        aria-expanded={openState}
        variant='tertiary-neutral'
        icon={<PersonChatIcon />}
        className={open ? 'w-full text-left justify-start' : ''}
      >
        {open && 'Gi tilbakemelding'}
      </Button>

      {openState && (
        <Popover
          open={openState}
          onClose={() => setOpenState(false)}
          anchorEl={buttonRef.current}
        >
          <Popover.Content className='w-[360px]'>
            {/* @ts-expect-error Ikke typet */}
            <skyra-survey
              className='w-full h-full'
              slug='arbeids-og-velferdsetaten-nav/oversikt'
              consent='false'
              cookieConsent='false'
            >
              {/* @ts-expect-error Ikke typet */}
            </skyra-survey>
          </Popover.Content>
        </Popover>
      )}
    </>
  );
};

export default GiTilbakemelding;
