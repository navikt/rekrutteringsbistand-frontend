import { useSidebar } from '@/components/ui/sidebar';
import { PersonChatIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Loader, Popover } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const GiTilbakemelding = () => {
  const skyraSurveyRef = useRef<HTMLElement>(null);
  const [openState, setOpenState] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [skyraStatus, setSkyraStatus] = useState<
    'idle' | 'loading' | 'loaded' | 'error'
  >('idle');
  const { open } = useSidebar();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === 'loaded') {
        setSkyraStatus('loaded');
      } else if (detail === 'error') {
        setSkyraStatus((current) => (current === 'loaded' ? current : 'error'));
      }
    };

    window.addEventListener('skyra-status', handler as EventListener);

    return () => {
      window.removeEventListener('skyra-status', handler as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!openState || !skyraSurveyRef.current) {
      return undefined;
    }

    const element = skyraSurveyRef.current;

    const markLoadedIfReady = () => {
      if (element.shadowRoot && element.shadowRoot.childElementCount > 0) {
        setSkyraStatus('loaded');
        return true;
      }
      return false;
    };

    if (markLoadedIfReady()) {
      return undefined;
    }

    const observer = new MutationObserver(() => {
      if (markLoadedIfReady()) {
        observer.disconnect();
      }
    });

    observer.observe(element, { childList: true, subtree: true });
    if (element.shadowRoot) {
      observer.observe(element.shadowRoot, { childList: true, subtree: true });
    }

    const timeout = window.setTimeout(() => {
      setSkyraStatus((current) => (current === 'loaded' ? current : 'error'));
    }, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [openState]);

  return (
    <>
      <Button
        size='small'
        onClick={(event) => {
          if (openState) {
            setOpenState(false);
            setAnchorEl(null);
            return;
          }

          setAnchorEl(event.currentTarget);
          setSkyraStatus((current) =>
            current === 'loaded' ? 'loaded' : 'loading',
          );
          setOpenState(true);
        }}
        aria-expanded={openState}
        variant='tertiary-neutral'
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
              {skyraStatus === 'loading' && (
                <div className='mb-3 flex items-center gap-2'>
                  <Loader size='xsmall' title='Laster' />
                  <BodyShort>Laster tilbakemeldingsskjema…</BodyShort>
                </div>
              )}
              {skyraStatus === 'error' && (
                <BodyShort className='text-red-600'>
                  Vi klarte ikke å laste tilbakemeldingsskjemaet. Prøv igjen
                  senere.
                </BodyShort>
              )}
              {/* @ts-expect-error Ikke typet */}
              <skyra-survey
                ref={skyraSurveyRef}
                className='mt-2 h-full w-full'
                slug='arbeids-og-velferdsetaten-nav/oversikt'
                hidden={skyraStatus === 'error'}
                consent='false'
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
