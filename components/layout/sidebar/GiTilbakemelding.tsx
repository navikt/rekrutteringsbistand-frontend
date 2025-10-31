import { useSidebar } from '@/components/ui/sidebar';
import { PersonChatIcon } from '@navikt/aksel-icons';
import { Button, Popover } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const GiTilbakemelding = () => {
  const skyraSurveyRef = useRef<HTMLElement>(null);
  const [openState, setOpenState] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const { open } = useSidebar();

  useEffect(() => {
    if (!skyraSurveyRef.current || !openState) {
      const resetId = window.setTimeout(() => setInitialCheckDone(false), 0);
      return () => window.clearTimeout(resetId);
    }

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

      if (!hasShadowContent && openState) {
        setOpenState(false);
      }

      setInitialCheckDone(true);
    }, 250);

    const observer = new MutationObserver(() => {
      if (initialCheckDone && !checkShadowContent() && openState) {
        setOpenState(false);
        window.location.reload();
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
        size='small'
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
          setOpenState((prev) => !prev);
        }}
        aria-expanded={openState}
        variant='tertiary-neutral'
        icon={<PersonChatIcon />}
        className={open ? 'w-full text-left justify-start' : ''}
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
              {/* @ts-expect-error Ikke typet */}
              <skyra-survey
                ref={skyraSurveyRef}
                className='w-full h-full'
                slug='arbeids-og-velferdsetaten-nav/oversikt'
              >
                {/* @ts-expect-error Ikke typet */}
              </skyra-survey>
            </Popover.Content>
          </Popover>,
          document.body,
        )}
    </>
  );
};

export default GiTilbakemelding;
