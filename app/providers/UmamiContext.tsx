'use client';

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

const getScreenInfo = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};

  return {
    screenWidth: window.innerWidth.toString(),
    screenHeight: window.innerHeight.toString(),
  };
};

interface UmamiContextType {
  track: (
    eventName: string,
    domene: UmamiDomene,
    eventData?: Record<string, any>,
  ) => void;
  trackAndNavigate: (
    eventName: string,
    domene: UmamiDomene,
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

  const track = (
    eventName: string,
    domene: UmamiDomene,
    eventData?: Record<string, any>,
  ) => {
    if (window.umami) {
      const screenInfo = getScreenInfo();
      window.umami.track(eventName, {
        ...eventData,
        ...screenInfo,
        path: window.location.pathname,
        domene,
      });
    } else {
      console.warn('Umami script er ikke lastet', eventName);
    }
  };

  // Track and navigate function
  const trackAndNavigate = (
    eventName: string,
    domene: UmamiDomene,
    url: string,
    eventData?: Record<string, any>,
  ) => {
    track(eventName, domene, eventData);

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
