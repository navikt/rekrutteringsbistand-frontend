'use client';

import { RekbisError } from '@/util/rekbisError';
import { Theme } from '@navikt/ds-react';
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useEffect as useReactEffect,
  useState,
  type ReactNode,
} from 'react';

interface ThemeContextProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  windowMode: boolean;
  setWindowMode: (val: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  darkMode: false,
  setDarkMode: (): void => {},
  windowMode: false,
  setWindowMode: (): void => {},
});

export interface ThemeProviderProps {
  children?: ReactNode | undefined;
  /** Hvis satt: overstyr darkMode-state eksternt (kontrollert modus) */
  forceDarkMode?: boolean;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  forceDarkMode,
}) => {
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => {
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.backgroundColor = darkMode ? '#0e151f' : 'white';
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('windowMode', windowMode.toString());
  }, [windowMode]);

  // Synk når forceDarkMode endres (kontrollert utenfra, f.eks. Storybook)
  useEffect(() => {
    if (forceDarkMode !== undefined && forceDarkMode !== darkMode) {
      setDarkMode(forceDarkMode);
    }
  }, [forceDarkMode, darkMode]);

  useReactEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Theme theme={darkMode ? 'dark' : 'light'} hasBackground={false}>
      <ThemeContext.Provider
        value={{ darkMode, setDarkMode, windowMode, setWindowMode }}
      >
        {children}
      </ThemeContext.Provider>
    </Theme>
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
