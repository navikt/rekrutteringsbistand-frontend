import { useSidebar } from '../../../../components/ui/sidebar';
import { PersonChatIcon } from '@navikt/aksel-icons';
import { Button, Popover } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';

const GiTilbakemelding = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const skyraSurveyRef = useRef<HTMLElement>(null);
  const [openState, setOpenState] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const { open } = useSidebar();

  useEffect(() => {
    if (!skyraSurveyRef.current || !openState) {
      setInitialCheckDone(false);
      return;
    }

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

    const initialCheckTimeout = setTimeout(() => {
      const hasShadowContent = checkShadowContent();

      // Only close if no content after delay
      if (!hasShadowContent && openState) {
        setOpenState(false);
      }

      setInitialCheckDone(true);
    }, 300); // 300ms delay before first check

    const observer = new MutationObserver(() => {
      if (initialCheckDone && !checkShadowContent() && openState) {
        setOpenState(false);
      }
    });

    if (skyraSurveyRef.current) {
      observer.observe(skyraSurveyRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });

      if (skyraSurveyRef.current.shadowRoot) {
        observer.observe(skyraSurveyRef.current.shadowRoot, {
          childList: true,
          subtree: true,
        });
      }
    }

    return () => {
      clearTimeout(initialCheckTimeout);
      observer.disconnect();
    };
  }, [openState, initialCheckDone]);

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
              ref={skyraSurveyRef}
              className='w-full h-full'
              slug='arbeids-og-velferdsetaten-nav/oversikt'
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
