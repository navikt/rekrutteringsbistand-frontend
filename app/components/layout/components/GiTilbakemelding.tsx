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
    if (!skyraSurveyRef.current || !openState) return;

    // Check if shadow content exists
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

    // Initial check
    const hasShadowContent = checkShadowContent();

    // Close popover if initial check shows no content
    if (!hasShadowContent && openState) {
      setOpenState(false);
      return;
    }

    // Set up mutation observer to watch for changes
    const observer = new MutationObserver(() => {
      // If shadow content disappears, close the popover
      if (!checkShadowContent() && openState) {
        setOpenState(false);
      }
    });

    // Observe the element and its shadow root if available
    if (skyraSurveyRef.current) {
      observer.observe(skyraSurveyRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });

      // Also observe shadow root if it exists
      if (skyraSurveyRef.current.shadowRoot) {
        observer.observe(skyraSurveyRef.current.shadowRoot, {
          childList: true,
          subtree: true,
        });
      }
    }

    return () => observer.disconnect();
  }, [openState]); // Re-run when popover opens/closes

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
          {/* @ts-expect-error Ikke typet */}
          <skyra-survey
            ref={skyraSurveyRef}
            className='w-full h-full'
            slug='arbeids-og-velferdsetaten-nav/oversikt'
          >
            {/* @ts-expect-error Ikke typet */}
          </skyra-survey>
        </Popover.Content>
      </Popover>
    </>
  );
};

export default GiTilbakemelding;
