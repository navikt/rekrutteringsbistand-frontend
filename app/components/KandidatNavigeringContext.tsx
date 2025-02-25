import React, { createContext, useContext, useState } from 'react';
import {
  getSessionStorage,
  setSessionStorage,
} from '../../util/sessionStorage';

interface KandidatNavigeringContextProps {
  navigering: string[];
  setNavigering: (navigering: string[]) => void;
}

const KandidatNavigeringContext = createContext<
  KandidatNavigeringContextProps | undefined
>(undefined);

export const KandidatNavigeringProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [navigering, setNavigering] = useState<string[]>(
    getSessionStorage('kandidatNavigering') || [],
  );

  const updateNavigering = (newNavigering: string[]) => {
    setNavigering(newNavigering);
    setSessionStorage('kandidatNavigering', newNavigering);
  };

  return (
    <KandidatNavigeringContext.Provider
      value={{ navigering, setNavigering: updateNavigering }}
    >
      {children}
    </KandidatNavigeringContext.Provider>
  );
};

export const useKandidatNavigering = () => {
  const context = useContext(KandidatNavigeringContext);
  if (!context) {
    throw new Error(
      'useKandidatNavigering must be used within a KandidatNavigeringProvider',
    );
  }
  return context;
};
