import React, { createContext, useContext, useState } from 'react';

interface KandidatNavigeringContextProps {
  navigering: string[];
  setNavigering: (navigering: string[]) => void;
}

const KandidatNavigeringContext = createContext<KandidatNavigeringContextProps | undefined>(undefined);

export const KandidatNavigeringProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navigering, setNavigering] = useState<string[]>([]);

  return (
    <KandidatNavigeringContext.Provider value={{ navigering, setNavigering }}>
      {children}
    </KandidatNavigeringContext.Provider>
  );
};

export const useKandidatNavigering = () => {
  const context = useContext(KandidatNavigeringContext);
  if (!context) {
    throw new Error('useKandidatNavigering must be used within a KandidatNavigeringProvider');
  }
  return context;
};