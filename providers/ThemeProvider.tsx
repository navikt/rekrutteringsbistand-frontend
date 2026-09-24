'use client';

import {
  oppdaterBrukerinnstillinger,
  useBrukerinnstillinger,
  type BrukerinnstillingerDTO,
} from '@/app/api/bruker/innstillinger/useBrukerinnstillinger';
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
  const brukerinnstillingerHook = useBrukerinnstillinger();
  const [darkMode, setDarkModeState] = useState(false);
  const [windowMode, setWindowModeState] = useState(false);
  const [tekststørrelse, setTekststørrelseState] =
    useState<Tekststørrelse>('standard');

  useEffect(() => {
    const lagredeInnstillinger = brukerinnstillingerHook.data;
    if (!lagredeInnstillinger) {
      return;
    }

    const timer = setTimeout(() => {
      setDarkModeState(lagredeInnstillinger.darkMode);
      setWindowModeState(lagredeInnstillinger.windowMode);
      setTekststørrelseState(lagredeInnstillinger.tekststørrelse);
    }, 0);

    return () => clearTimeout(timer);
  }, [brukerinnstillingerHook.data]);

  const lagreTemaInnstillinger = (
    innstillinger: Omit<BrukerinnstillingerDTO, 'antallLesteNyheter'>,
  ) => {
    const lagredeInnstillinger = brukerinnstillingerHook.data;
    if (!lagredeInnstillinger) {
      return;
    }

    const oppdaterteInnstillinger = {
      ...lagredeInnstillinger,
      ...innstillinger,
    };
    void brukerinnstillingerHook.mutate(
      oppdaterBrukerinnstillinger(oppdaterteInnstillinger),
      {
        optimisticData: oppdaterteInnstillinger,
        rollbackOnError: true,
        revalidate: false,
      },
    );
  };

  const setDarkMode = (verdi: boolean) => {
    setDarkModeState(verdi);
    lagreTemaInnstillinger({
      darkMode: verdi,
      windowMode,
      tekststørrelse,
    });
  };

  const setWindowMode = (verdi: boolean) => {
    setWindowModeState(verdi);
    lagreTemaInnstillinger({
      darkMode,
      windowMode: verdi,
      tekststørrelse,
    });
  };

  const setTekststørrelse = (verdi: Tekststørrelse) => {
    setTekststørrelseState(verdi);
    lagreTemaInnstillinger({
      darkMode,
      windowMode,
      tekststørrelse: verdi,
    });
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#0e151f' : 'white';
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.style.fontSize = TEKSTSTØRRELSE_PX[tekststørrelse];
  }, [tekststørrelse]);

  // Synk når forceDarkMode endres (kontrollert utenfra, f.eks. Storybook)
  useEffect(() => {
    if (forceDarkMode === undefined || forceDarkMode === darkMode) {
      return;
    }

    const timer = setTimeout(() => {
      setDarkModeState(forceDarkMode);
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
