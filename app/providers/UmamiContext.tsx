'use client';

import { UmamiEventObject } from '../../util/umamiEvents';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext } from 'react';

export enum UmamiDomene {
  Generell = 'Generell',
  Forside = 'Forside',
  Stilling = 'Stilling',
  Kandidat = 'Kandidat',
  Etterregistrering = 'Etterregistrering',
  Rekrutteringstreff = 'Rekrutteringstreff',
}

export const getScreenInfo = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};

  return {
    screenWidth: window.innerWidth.toString(),
    screenHeight: window.innerHeight.toString(),
  };
};

interface UmamiContextType {
  track: (event: UmamiEventObject, eventData?: Record<string, any>) => void;
  trackAndNavigate: (
    event: UmamiEventObject,
    url: string,
    eventData?: Record<string, any>,
  ) => void;
}

const UmamiContext = createContext<UmamiContextType | undefined>(undefined);

interface UmamiProviderProps {
  children: ReactNode;
}

export const UmamiProvider = ({ children }: UmamiProviderProps) => {
  const router = useRouter();

  const track = (event: UmamiEventObject, eventData?: Record<string, any>) => {
    if (window.umami) {
      const screenInfo = getScreenInfo();
      window.umami.track(event.navn, {
        ...eventData,
        ...screenInfo,
        path: window.location.pathname,
        domene: event.domene,
      });
    } else {
      console.warn('Umami script er ikke lastet', event);
    }
  };

  // Track and navigate function
  const trackAndNavigate = (
    event: UmamiEventObject,
    url: string,
    eventData?: Record<string, any>,
  ) => {
    track(event, eventData);

    setTimeout(() => {
      if (url.startsWith('http')) {
        window.location.href = url;
      } else {
        router.push(url);
      }
    }, 150);
  };

  return (
    <UmamiContext.Provider value={{ track, trackAndNavigate }}>
      {children}
    </UmamiContext.Provider>
  );
};

export const useUmami = (): UmamiContextType => {
  const context = useContext(UmamiContext);
  if (context === undefined) {
    throw new Error('useUmami must be used within a UmamiProvider');
  }
  return context;
};
