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
    const skyraConfigScriptId = 'skyra-config-script';
    const skyraSurveyScriptId = 'skyra-survey-script';

    if (openState) {
      // Load scripts
      if (!document.getElementById(skyraConfigScriptId)) {
        const configScript = document.createElement('script');
        configScript.id = skyraConfigScriptId;
        configScript.innerHTML = `window.SKYRA_CONFIG = { org: 'arbeids-og-velferdsetaten-nav' }`;
        document.head.appendChild(configScript);
      }

      if (!document.getElementById(skyraSurveyScriptId)) {
        const surveyScript = document.createElement('script');
        surveyScript.id = skyraSurveyScriptId;
        surveyScript.src = 'https://survey.skyra.no/skyra-survey.js';
        surveyScript.defer = true;
        document.head.appendChild(surveyScript);
      }
    }

    // The rest of your existing useEffect logic for checking shadow DOM
    if (!skyraSurveyRef.current || !openState) {
      setInitialCheckDone(false);
      // Do not return here if openState is true, allow script loading and observer setup
    }

    let initialCheckTimeout: NodeJS.Timeout | undefined;
    let observer: MutationObserver | undefined;

    if (openState && skyraSurveyRef.current) {
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

      initialCheckTimeout = setTimeout(() => {
        const hasShadowContent = checkShadowContent();
        if (!hasShadowContent) {
          // Removed openState check here as we only run this if openState is true
          setOpenState(false); // Close if content doesn't load
        }
        setInitialCheckDone(true);
      }, 500);

      observer = new MutationObserver(() => {
        if (initialCheckDone && !checkShadowContent()) {
          // Removed openState check
          setOpenState(false);
        }
      });

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
      observer?.disconnect();

      if (!openState) {
        // Unload scripts only if popover is being closed
        const configScript = document.getElementById(skyraConfigScriptId);
        if (configScript) {
          configScript.remove();
        }
        const surveyScript = document.getElementById(skyraSurveyScriptId);
        if (surveyScript) {
          surveyScript.remove();
        }
      }
    };
  }, [openState, initialCheckDone]); // initialCheckDone is still a dependency for the observer logic

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
        <>
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
        </>
      )}
    </>
  );
};

export default GiTilbakemelding;
