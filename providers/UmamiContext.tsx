'use client';

import { UmamiEventObject } from '@/util/umamiEvents';
import { logger } from '@navikt/next-logger';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext } from 'react';

export const getScreenInfo = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};

  return {
    screenWidth: window.innerWidth.toString(),
    screenHeight: window.innerHeight.toString(),
  };
};

export interface UmamiContextType {
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
  // I Storybook (uten Next App Router) vil useRouter kaste. Vi fanger og lager en enkel fallback.
  let router: { push: (url: string) => void } = {
    push: (url: string) => {
      if (typeof window !== 'undefined') {
        window.location.href = url;
      }
    },
  };
  try {
    // Forsøk å hente ekte router hvis tilgjengelig.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    router = useRouter() as any;
  } catch (e) {
    // Stillegående fallback – Storybook / test-miljø.
  }

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
      logger.error(event, 'Umami script er ikke lastet');
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
      try {
        if (url.startsWith('http')) {
          window.location.href = url;
        } else {
          router.push(url);
        }
      } catch {
        // Hvis push feiler i mock, fall tilbake på location.
        if (!url.startsWith('http')) {
          window.location.href = url;
        }
      }
    }, 120);
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
