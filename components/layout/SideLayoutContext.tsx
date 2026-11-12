'use client';

import * as React from 'react';
import { useCallback, useContext, useState } from 'react';

interface SideLayoutContextType {
  isSheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  toggleSheet: () => void;
  hasSidepanel: boolean; // Ny
}

const SideLayoutContext = React.createContext<
  SideLayoutContextType | undefined
>(undefined);

export const SideLayoutProvider: React.FC<{
  children: React.ReactNode;
  hasSidepanel: boolean; // Ny prop
}> = ({ children, hasSidepanel }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = useCallback(() => {
    if (hasSidepanel) {
      setIsSheetOpen(true);
    }
  }, [hasSidepanel]);

  const closeSheet = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  const toggleSheet = useCallback(() => {
    if (hasSidepanel) {
      setIsSheetOpen((prev) => !prev);
    }
  }, [hasSidepanel]);

  return (
    <SideLayoutContext.Provider
      value={{
        isSheetOpen,
        openSheet,
        closeSheet,
        toggleSheet,
        hasSidepanel,
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
