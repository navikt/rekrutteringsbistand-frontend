import { MenuElipsisHorizontalIcon } from '@navikt/aksel-icons';
import { Button, Dropdown } from '@navikt/ds-react';
import React, { useEffect, useRef, useState } from 'react';

interface StillingDropdownProps {
  children: React.ReactNode;
}

function DropdownItemWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [erSynlig, setErSynlig] = useState(true);

  useEffect(() => {
    const sjekkSynlighet = () => {
      if (ref.current) {
        const førsteBarn = ref.current.firstElementChild as HTMLElement;
        if (førsteBarn) {
          const style = window.getComputedStyle(førsteBarn);
          // Sjekk både CSS display og om elementet har innhold
          const erCssSkjult = style.display === 'none';
          const harInnhold =
            førsteBarn.childElementCount > 0 || førsteBarn.textContent?.trim();
          setErSynlig(!erCssSkjult && Boolean(harInnhold));
        } else {
          // Ingen barn-element = komponenten returnerte null
          setErSynlig(false);
        }
      }
    };

    // Kjør etter rendering
    const timeout = setTimeout(sjekkSynlighet, 0);

    // Observer header-containeren for resize-endringer
    const headerContainer = document.querySelector(
      '[class*="@container/header"]',
    );
    const resizeObserver = new ResizeObserver(sjekkSynlighet);
    if (headerContainer) {
      resizeObserver.observe(headerContainer);
    }

    // Observer også ref-elementet for endringer i innhold
    const mutationObserver = new MutationObserver(sjekkSynlighet);
    if (ref.current) {
      mutationObserver.observe(ref.current, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(timeout);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  if (!erSynlig) {
    // Rendre fortsatt for å beholde ref, men ikke som dropdown-item
    return (
      <div ref={ref} style={{ display: 'none' }}>
        {children}
      </div>
    );
  }

  return <div ref={ref}>{children}</div>;
}

export default function StillingDropdown({ children }: StillingDropdownProps) {
  const childArray = React.Children.toArray(children).filter(Boolean);

  if (childArray.length === 0) {
    return null;
  }

  return (
    <Dropdown>
      <Button
        size='small'
        variant='tertiary'
        icon={<MenuElipsisHorizontalIcon />}
        as={Dropdown.Toggle}
      />
      <Dropdown.Menu>
        <Dropdown.Menu.GroupedList>
          {childArray.map((child, index) => (
            <DropdownItemWrapper key={index}>{child}</DropdownItemWrapper>
          ))}
        </Dropdown.Menu.GroupedList>
      </Dropdown.Menu>
    </Dropdown>
  );
}
