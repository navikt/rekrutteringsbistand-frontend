'use client';

import { RekbisError } from '@/util/rekbisError';
import { Provider as AkselProvider, Theme } from '@navikt/ds-react';
import { nb } from '@navikt/ds-react/locales';
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

interface ThemeContextProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  windowMode: boolean;
  setWindowMode: (val: boolean) => void;
  tekststørrelse: Tekststørrelse;
  setTekststørrelse: (val: Tekststørrelse) => void;
}

export type Tekststørrelse = 'liten' | 'standard' | 'stor' | 'ekstra-stor';

const TEKSTSTØRRELSE_PX: Record<Tekststørrelse, string> = {
  liten: '14px',
  standard: '16px',
  stor: '20px',
  'ekstra-stor': '24px',
};

export const ThemeContext = createContext<ThemeContextProps>({
  darkMode: false,
  setDarkMode: (): void => {},
  windowMode: false,
  setWindowMode: (): void => {},
  tekststørrelse: 'standard',
  setTekststørrelse: (): void => {},
});

export interface ThemeProviderProps {
  children?: ReactNode | undefined;
  /** Hvis satt: overstyr darkMode-state eksternt (kontrollert modus) */
  forceDarkMode?: boolean;
}

// SSR-trygg mounted-sjekk med useSyncExternalStore
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  forceDarkMode,
}) => {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [windowMode, setWindowMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('windowMode') === 'true';
    }
    return false;
  });
  const [tekststørrelse, setTekststørrelse] = useState<Tekststørrelse>(() => {
    if (typeof window !== 'undefined') {
      const lagret = localStorage.getItem('tekststørrelse');
      if (
        lagret === 'liten' ||
        lagret === 'standard' ||
        lagret === 'stor' ||
        lagret === 'ekstra-stor'
      ) {
        return lagret;
      }
    }
    return 'standard';
  });

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#0e151f' : 'white';
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('windowMode', windowMode.toString());
  }, [windowMode]);

  useEffect(() => {
    localStorage.setItem('tekststørrelse', tekststørrelse);
    document.documentElement.style.fontSize = TEKSTSTØRRELSE_PX[tekststørrelse];
  }, [tekststørrelse]);

  // Synk når forceDarkMode endres (kontrollert utenfra, f.eks. Storybook)
  useEffect(() => {
    if (forceDarkMode === undefined || forceDarkMode === darkMode) {
      return;
    }

    const timer = setTimeout(() => {
      setDarkMode(forceDarkMode);
    }, 0);

    return () => clearTimeout(timer);
  }, [forceDarkMode, darkMode]);

  if (!mounted) return null;

  return (
    <AkselProvider locale={nb}>
      <Theme theme={darkMode ? 'dark' : 'light'} hasBackground={false}>
        <ThemeContext.Provider
          value={{
            darkMode,
            setDarkMode,
            windowMode,
            setWindowMode,
            tekststørrelse,
            setTekststørrelse,
          }}
        >
          {children}
        </ThemeContext.Provider>
      </Theme>
    </AkselProvider>
  );
};

export const useThemeProvider = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new RekbisError({
      message: 'useThemeProvider må være i scope: ThemeProvider',
    });
  }
  return context;
};
