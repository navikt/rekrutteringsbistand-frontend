'use client';

import { RekbisError } from '@/util/rekbisError';
import { Theme } from '@navikt/ds-react';
import * as React from 'react';
import { useEffect } from 'react';

interface ApplikasjonContextType {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const ThemeContext = React.createContext<ApplikasjonContextType>({
  darkMode: false,
  setDarkMode: () => false,
});

export interface ThemeProviderProps {
  children?: React.ReactNode | undefined;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
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

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Theme theme={darkMode ? 'dark' : 'light'} hasBackground={false}>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        {children}
      </ThemeContext.Provider>
    </Theme>
  );
};

export const useThemeProvider = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new RekbisError({
      message: 'useThemeProvider må være i scope: ThemeProvider',
    });
  }
  return context;
};
