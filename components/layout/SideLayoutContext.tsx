'use client';

import * as React from 'react';
import { useCallback, useContext, useRef, useState } from 'react';

interface SideLayoutContextType {
  isSheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  toggleSheet: () => void;
  hasSidepanel: boolean; // Ny
  /** Fokuserer elementet som hadde fokus da arket ble åpnet (WCAG 2.4.3). */
  gjenopprettFokus: () => boolean;
}

const SideLayoutContext = React.createContext<
  SideLayoutContextType | undefined
>(undefined);

export const SideLayoutProvider: React.FC<{
  children: React.ReactNode;
  hasSidepanel: boolean; // Ny prop
}> = ({ children, hasSidepanel }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // Knappen som åpner arket ligger utenfor Sheet, så Radix vet ikke hvor fokus skal tilbake.
  const fokusFørÅpningRef = useRef<HTMLElement | null>(null);

  const huskFokus = () => {
    if (document.activeElement instanceof HTMLElement) {
      fokusFørÅpningRef.current = document.activeElement;
    }
  };

  const openSheet = useCallback(() => {
    if (hasSidepanel) {
      huskFokus();
      setIsSheetOpen(true);
    }
  }, [hasSidepanel]);

  const closeSheet = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  const toggleSheet = useCallback(() => {
    if (hasSidepanel) {
      setIsSheetOpen((prev) => {
        if (!prev) huskFokus();
        return !prev;
      });
    }
  }, [hasSidepanel]);

  const gjenopprettFokus = useCallback(() => {
    const element = fokusFørÅpningRef.current;
    fokusFørÅpningRef.current = null;
    if (!element?.isConnected || element.offsetParent === null) return false;
    element.focus();
    return true;
  }, []);

  return (
    <SideLayoutContext.Provider
      value={{
        isSheetOpen,
        openSheet,
        closeSheet,
        toggleSheet,
        hasSidepanel,
        gjenopprettFokus,
      }}
    >
      {children}
    </SideLayoutContext.Provider>
  );
};

export const useSideLayoutContext = () => {
  const context = useContext(SideLayoutContext);
  if (!context) {
    throw new Error(
      'useSideLayoutContext must be used within SideLayoutProvider',
    );
  }
  return context;
};
