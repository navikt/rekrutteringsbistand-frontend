'use client';

import { RekbisError } from '@/util/rekbisError';
import { getSessionStorage, setSessionStorage } from '@/util/sessionStorage';
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
  nesteKandidat: () => void;
  forrigeKandidat: () => void;
  lukkSidebar: () => void;
  harNesteKandidat: boolean;
  harForrigeKandidat: boolean;
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
  const [harNesteKandidat, setHarNesteKandidat] = useState<boolean>(false);
  const [harForrigeKandidat, setHarForrigeKandidat] = useState<boolean>(false);

  const [kandidatNr, settKandidatnr] = useQueryState('visKandidatId', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const prevNavigeringRef = useRef<string[]>(kandidatNavigering);

  useEffect(() => {
    const index = kandidatNavigering.indexOf(kandidatNr);
    setHarNesteKandidat(index !== -1 && index < kandidatNavigering.length - 1);
    setHarForrigeKandidat(index > 0);
  }, [kandidatNr, kandidatNavigering]);

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
      settKandidatnr(kandidatNavigering[index + 1]);
    } else if (index === -1 && kandidatNavigering.length > 0) {
      settKandidatnr(kandidatNavigering[0]);
    }
  };

  const forrigeKandidat = () => {
    const index = kandidatNavigering.indexOf(kandidatNr);
    if (index > 0) {
      settKandidatnr(kandidatNavigering[index - 1]);
    } else if (index === -1 && kandidatNavigering.length > 0) {
      settKandidatnr(kandidatNavigering[0]);
    }
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
        harNesteKandidat,
        harForrigeKandidat,
      }}
    >
      {children}
    </KandidatNavigeringContext.Provider>
  );
};

export const useNullableKandidatNavigeringContext = () => {
  const context = useContext(KandidatNavigeringContext);

  if (context === undefined) {
    return null;
  }
  return context;
};

export const useKandidatNavigeringContext = () => {
  const context = useContext(KandidatNavigeringContext);
  if (!context) {
    throw new RekbisError({
      message:
        'useKandidatNavigering must be used within a KandidatNavigeringProvider',
    });
  }
  return context;
};
