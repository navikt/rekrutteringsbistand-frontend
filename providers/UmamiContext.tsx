'use client';

import { UmamiEventObject } from '@/util/umamiEvents';
import { logger } from '@navikt/next-logger';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';

export const getScreenInfo = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};

  return {
    screenWidth: window.innerWidth.toString(),
    screenHeight: window.innerHeight.toString(),
  };
};

interface UmamiContextType {
  track: (event: UmamiEventObject, eventData?: Record<string, unknown>) => void;
  trackAndNavigate: (
    event: UmamiEventObject,
    url: string,
    eventData?: Record<string, unknown>,
  ) => void;
}

const UmamiContext = createContext<UmamiContextType | undefined>(undefined);

interface UmamiProviderProps {
  children: ReactNode;
}

// Wrapper-hook som skjuler runtime-feil dersom App Router ikke er tilgjengelig (f.eks. i Storybook)
const useSafeRouter = (): ReturnType<typeof useRouter> | null => {
  try {
    return useRouter();
  } catch {
    return null;
  }
};

export const UmamiProvider = ({ children }: UmamiProviderProps) => {
  const router = useSafeRouter();

  const track = useCallback(
    (event: UmamiEventObject, eventData?: Record<string, unknown>) => {
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
    },
    [],
  );

  const trackAndNavigate = useCallback(
    (
      event: UmamiEventObject,
      url: string,
      eventData?: Record<string, unknown>,
    ) => {
      track(event, eventData);
      setTimeout(() => {
        if (url.startsWith('http')) {
          window.location.href = url;
        } else if (router?.push) {
          router.push(url);
        } else {
          window.location.href = url;
        }
      }, 150);
    },
    [track, router],
  );

  const value = useMemo(
    () => ({ track, trackAndNavigate }),
    [track, trackAndNavigate],
  );

  return (
    <UmamiContext.Provider value={value}>{children}</UmamiContext.Provider>
  );
};

export const useUmami = (): UmamiContextType => {
  const context = useContext(UmamiContext);
  if (context === undefined) {
    throw new Error('useUmami must be used within a UmamiProvider');
  }
  return context;
};
