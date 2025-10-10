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

// Wrapper-hook som skjuler runtime-feil dersom App Router ikke er tilgjengelig (f.eks. i Storybook)
const useSafeRouter = () => {
  try {
    return useRouter();
  } catch {
    return null as any; // intentional fallback
  }
};

export const UmamiProvider = ({ children }: UmamiProviderProps) => {
  const router = useSafeRouter();

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
      if (url.startsWith('http')) {
        window.location.href = url;
      } else if (router?.push) {
        router.push(url);
      } else {
        // Fallback når router ikke finnes (Storybook): full page navigation
        window.location.href = url;
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
