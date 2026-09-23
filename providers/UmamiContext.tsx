'use client';

import { UmamiEventObject } from '@/util/umamiEvents';
import { logger } from '@navikt/next-logger';
import { lagUmami } from '@navikt/toi-next-frontend/analyse';
import { useRouter } from 'next/navigation';
import { ReactNode, useMemo } from 'react';

const { UmamiProvider: PakkeUmamiProvider, useUmami: usePakkeUmami } =
  lagUmami<UmamiEventObject>();

// Wrapper-hook som skjuler runtime-feil dersom App Router ikke er tilgjengelig (f.eks. i Storybook)
const useSafeRouter = (): ReturnType<typeof useRouter> | null => {
  try {
    return useRouter();
  } catch {
    return null;
  }
};

interface UmamiProviderProps {
  children: ReactNode;
}

export const UmamiProvider = ({ children }: UmamiProviderProps) => {
  const router = useSafeRouter();

  return (
    <PakkeUmamiProvider
      naviger={router ? (url) => router.push(url) : undefined}
      logg={(hendelse, melding) => logger.error(hendelse, melding)}
    >
      {children}
    </PakkeUmamiProvider>
  );
};

export const useUmami = () => {
  const { spor, sporOgNaviger } = usePakkeUmami();
  return useMemo(
    () => ({ track: spor, trackAndNavigate: sporOgNaviger }),
    [spor, sporOgNaviger],
  );
};
