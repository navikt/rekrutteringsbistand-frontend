import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { rekbisError } from '../../util/rekbisError';
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

  const prevNavigeringRef = useRef<string[]>(navigering);

  useEffect(() => {
    setSessionStorage('kandidatNavigering', navigering);
    prevNavigeringRef.current = navigering;
  }, [navigering]);

  const updateNavigering = useCallback((newNavigering: string[]) => {
    if (
      JSON.stringify(newNavigering) !==
      JSON.stringify(prevNavigeringRef.current)
    ) {
      prevNavigeringRef.current = newNavigering;
      setNavigering(newNavigering);
    }
  }, []);

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
    throw new rekbisError({
      beskrivelse:
        'useKandidatNavigering must be used within a KandidatNavigeringProvider',
    });
  }
  return context;
};
