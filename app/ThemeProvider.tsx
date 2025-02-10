'use client';
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
  const [darkMode, setDarkMode] = React.useState<boolean>(true);
  useEffect(() => {
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.backgroundColor = darkMode ? '#0e151f' : 'white';
  }, [darkMode]);

  return (
    <div
      style={{
        minHeight: '100%',
        height: '100%',
        backgroundColor: darkMode ? '#0e151f' : 'white',
      }}
    >
      <Theme theme={darkMode ? 'dark' : 'light'}>
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
          {children}
        </ThemeContext.Provider>
      </Theme>
    </div>
  );
};

export const useThemeProvider = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeProvider må være i scope: ThemeProvider');
  }
  return context;
};
