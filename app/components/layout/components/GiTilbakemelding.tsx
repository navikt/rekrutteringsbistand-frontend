import { useSidebar } from '../../../../components/ui/sidebar';
import { PersonChatIcon } from '@navikt/aksel-icons';
import { Button, Popover } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';

const GiTilbakemelding = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const skyraSurveyRef = useRef<HTMLElement>(null);
  const [openState, setOpenState] = useState(false);
  const { open } = useSidebar();

  useEffect(() => {
    if (!skyraSurveyRef.current) return;

    // Function to check if shadow root has content
    const checkShadowContent = () => {
      const element = skyraSurveyRef.current;
      if (
        element &&
        element.shadowRoot &&
        element.shadowRoot.childElementCount > 0
      ) {
        return true;
      }
      return false;
    };

    // Try immediately in case it's already loaded
    if (checkShadowContent()) return;

    // Set up mutation observer for the element itself
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          checkShadowContent();
        }
      }
    });

    observer.observe(skyraSurveyRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => observer.disconnect();
  }, [openState]); // Re-run when popover opens

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

      <Popover
        open={openState}
        onClose={() => setOpenState(false)}
        anchorEl={buttonRef.current}
      >
        <Popover.Content>
          {/* @ts-expect-error  Ikke typet */}
          <skyra-survey
            ref={skyraSurveyRef}
            className='w-full h-full text-inherit'
            slug='arbeids-og-velferdsetaten-nav/oversikt'
          >
            {/* @ts-expect-error  Ikke typet */}
          </skyra-survey>
        </Popover.Content>
      </Popover>
    </>
  );
};

export default GiTilbakemelding;
