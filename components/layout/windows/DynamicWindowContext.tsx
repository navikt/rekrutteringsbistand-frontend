import React, { useContext } from 'react';

export interface DynamicWindowContextValue {
  isDynamic: boolean;
  onRequestClose?: () => void;
  onRequestMinimize?: () => void;
  onRequestMaximize?: () => void;
  onRequestRestore?: () => void;
  isMaximized?: boolean;
  isMinimized?: boolean;
}

export const DynamicWindowContext = React.createContext<
  DynamicWindowContextValue | undefined
>(undefined);

export const useWindowContext = () => useContext(DynamicWindowContext);
