import React, { useContext } from 'react';

export interface DynamicWindowContextValue {
  isDynamic: boolean;
  onRequestClose?: () => void;
}

export const DynamicWindowContext = React.createContext<
  DynamicWindowContextValue | undefined
>(undefined);

export const useDynamicWindowContext = () => useContext(DynamicWindowContext);
