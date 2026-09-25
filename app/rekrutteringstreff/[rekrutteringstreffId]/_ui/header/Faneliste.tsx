'use client';

import { Tabs } from '@navikt/ds-react';
import { FC, ReactNode, useEffect, useRef } from 'react';

/**
 * Aksel ruller ikke valgt fane inn i synsfeltet når fanerada er bredere enn
 * plassen, for eksempel ved 200 % zoom. Da kan aktiv fane stå avkuttet bak
 * pilknappene.
 */
const Faneliste: FC<{ children: ReactNode }> = ({ children }) => {
  const listeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const liste = listeRef.current;
    if (!liste) return;

    const visAktivFane = () => {
      const aktiv = liste.querySelector<HTMLElement>(
        '[role="tab"][aria-selected="true"]',
      );
      if (!aktiv) return;
      const listeRect = liste.getBoundingClientRect();
      const aktivRect = aktiv.getBoundingClientRect();
      if (
        aktivRect.left < listeRect.left ||
        aktivRect.width > listeRect.width
      ) {
        liste.scrollLeft -= listeRect.left - aktivRect.left;
      } else if (aktivRect.right > listeRect.right) {
        liste.scrollLeft += aktivRect.right - listeRect.right;
      }
    };

    visAktivFane();
    // Pilknappene dukker opp etter første måling og gjør lista smalere.
    const størrelse = new ResizeObserver(visAktivFane);
    størrelse.observe(liste);
    const valg = new MutationObserver(visAktivFane);
    valg.observe(liste, { subtree: true, attributeFilter: ['aria-selected'] });

    return () => {
      størrelse.disconnect();
      valg.disconnect();
    };
  }, []);

  return <Tabs.List ref={listeRef}>{children}</Tabs.List>;
};

export default Faneliste;
