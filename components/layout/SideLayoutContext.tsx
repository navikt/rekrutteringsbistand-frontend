'use client';

import React, { createContext, useContext, useState } from 'react';

interface SideLayoutContextType {
  isSheetOpen: boolean;
  openSheet: () => void;
  closeSheet: (open?: boolean) => void;
  toggleSheet: () => void;
}

const SideLayoutContext = createContext<SideLayoutContextType | undefined>(
  undefined,
);

export const useSideLayoutContext = () => {
  const context = useContext(SideLayoutContext);
  if (context === undefined) {
    throw new Error(
      'useSideLayoutContext must be used within a SideLayoutProvider',
    );
  }
  return context;
};

interface SideLayoutProviderProps {
  children: React.ReactNode;
}

export const SideLayoutProvider: React.FC<SideLayoutProviderProps> = ({
  children,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = (open?: boolean) => setIsSheetOpen(open ?? false);
  const toggleSheet = () => setIsSheetOpen((prev) => !prev);

  return (
    <SideLayoutContext.Provider
      value={{
        isSheetOpen,
        openSheet,
        closeSheet,
        toggleSheet,
      }}
    >
      {children}
    </SideLayoutContext.Provider>
  );
};
