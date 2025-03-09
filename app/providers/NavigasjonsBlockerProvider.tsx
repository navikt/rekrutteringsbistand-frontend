'use client';

import { usePathname } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';

export interface NavigasjonsBlockerProviderProps {
  children?: React.ReactNode | undefined;
}

const NavigasjonsBlockerProvider: React.FC<NavigasjonsBlockerProviderProps> = ({
  children,
}) => {
  const pathname = usePathname();

  const testMode = process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE;

  useEffect(() => {
    // Liste over stier som ikke skal være mulig å navigere tilbake til
    const blockedPaths = testMode
      ? []
      : [
          '/stilling/[stillingsId]/rediger',
          '/formidling/ny-formidling',
          '/stilling/ny-stilling',
        ];

    // Sjekk om nåværende sti matcher en blokkert sti
    const isBlockedPath = blockedPaths.some((path) => {
      // Konverter path patterns (med [params]) til regex
      const pathRegex = new RegExp(path.replace(/\[.*?\]/g, '[^/]+'));
      return pathRegex.test(pathname);
    });

    if (isBlockedPath) {
      // Lytt etter når brukeren forlater siden
      const handleBeforeUnload = () => {
        // Bestem hvilken side brukeren skal omdirigeres til basert på gjeldende sti
        let redirectPath = '/';

        // For stilling/[stillingsId]/rediger - redirect til stilling/[stillingsId]
        if (/\/stilling\/[^/]+\/rediger/.test(pathname)) {
          redirectPath = pathname.replace('/rediger', '');
        }
        // For formidling/ny-formidling - redirect til /formidling
        else if (pathname.includes('/formidling/ny-formidling')) {
          redirectPath = '/formidling';
        }
        // For stilling/ny-stilling - redirect til /stilling
        else if (pathname.includes('/stilling/ny-stilling')) {
          redirectPath = '/stilling';
        }

        // Erstatt historikk-oppføringen for denne siden
        window.history.replaceState(null, '', redirectPath);
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () =>
        window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [pathname, testMode]);

  return children;
};

export default NavigasjonsBlockerProvider;
