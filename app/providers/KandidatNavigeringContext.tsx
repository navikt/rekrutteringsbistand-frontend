import { rekbisError } from '../../util/rekbisError';
import {
  getSessionStorage,
  setSessionStorage,
} from '../../util/sessionStorage';
import { useQueryState } from 'nuqs';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface KandidatNavigeringContextProps {
  kandidatNavigering: string[];
  setKandidatNavigering: (navigering: string[]) => void;
  nesteKandidat: () => Promise<URLSearchParams> | null;
  forrigeKandidat: () => Promise<URLSearchParams> | null;
  lukkSidebar: () => void;
}

const KandidatNavigeringContext = createContext<
  KandidatNavigeringContextProps | undefined
>(undefined);

export const KandidatNavigeringProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [kandidatNavigering, setKandidatNavigering] = useState<string[]>(
    getSessionStorage('kandidatNavigering') || [],
  );

  const [kandidatNr, settKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const prevNavigeringRef = useRef<string[]>(kandidatNavigering);

  useEffect(() => {
    setSessionStorage('kandidatNavigering', kandidatNavigering);
    prevNavigeringRef.current = kandidatNavigering;
  }, [kandidatNavigering]);

  const updateNavigering = useCallback((newNavigering: string[]) => {
    if (
      JSON.stringify(newNavigering) !==
      JSON.stringify(prevNavigeringRef.current)
    ) {
      prevNavigeringRef.current = newNavigering;
      setKandidatNavigering(newNavigering);
    }
  }, []);

  const nesteKandidat = () => {
    const index = kandidatNavigering.indexOf(kandidatNr);
    if (index !== -1 && index < kandidatNavigering.length - 1) {
      return settKandidatnr(kandidatNavigering[index + 1]);
    } else if (index === -1 && kandidatNavigering.length > 0) {
      return settKandidatnr(kandidatNavigering[0]);
    }
    return null;
  };

  const forrigeKandidat = () => {
    const index = kandidatNavigering.indexOf(kandidatNr);
    if (index > 0) {
      return settKandidatnr(kandidatNavigering[index - 1]);
    } else if (index === -1 && kandidatNavigering.length > 0) {
      return settKandidatnr(kandidatNavigering[0]);
    }
    return null;
  };

  const lukkSidebar = () => {
    setKandidatNavigering([]);
    settKandidatnr('');
  };

  return (
    <KandidatNavigeringContext.Provider
      value={{
        kandidatNavigering,
        setKandidatNavigering: updateNavigering,
        nesteKandidat,
        forrigeKandidat,
        lukkSidebar,
      }}
    >
      {children}
    </KandidatNavigeringContext.Provider>
  );
};

export const useKandidatNavigeringContext = () => {
  const context = useContext(KandidatNavigeringContext);
  if (!context) {
    throw new rekbisError({
      beskrivelse:
        'useKandidatNavigering must be used within a KandidatNavigeringProvider',
    });
  }
  return context;
};
