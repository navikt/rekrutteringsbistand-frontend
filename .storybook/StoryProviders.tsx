import { Roller } from '../components/tilgangskontroll/roller';
import { SidebarProvider } from '../components/ui/sidebar';
import { ApplikasjonContextProvider } from '../providers/ApplikasjonContext';
import { UmamiProvider } from '../providers/UmamiContext';
import { Theme } from '@navikt/ds-react';
import React from 'react';

/**
 * Global provider-komposisjon for stories.
 *  - Synkroniserer Aksel <Theme> med Storybook dark-mode addon.
 *  - Gir en enkel mock av ApplikasjonContext / UmamiContext.
 *  - Kan utvides med flere providere ved behov.
 */
export interface StoryProvidersProps {
  children: React.ReactNode;
  roller?: Roller[]; // Mulighet for å overstyre roller i enkelt-stories via egen wrapper om ønskelig
  darkMode?: boolean; // Verdien hentes i decorator via useDarkMode hook
}

const DEFAULT_ROLLER: Roller[] = [
  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
];

const defaultBruker = (roller: Roller[]) => ({
  ident: 'X123456',
  fornavn: 'Demo',
  etternavn: 'Bruker',
  navn: 'Demo Bruker',
  roller,
  enheter: [],
});

export const StoryProviders: React.FC<StoryProvidersProps> = ({
  children,
  roller = DEFAULT_ROLLER,
  darkMode = false,
}) => {
  return (
    <Theme theme={darkMode ? 'dark' : 'light'} hasBackground={false}>
      <UmamiProvider>
        <ApplikasjonContextProvider
          brukerData={defaultBruker(roller) as any}
          aktivEnhet={null}
          aktivBruker={null}
        >
          {children}
        </ApplikasjonContextProvider>
      </UmamiProvider>
    </Theme>
  );
};

// Dekoratør for å overstyre roller i enkel story uten å endre global provider.
export const createRollerDecorator = (roller: Roller[]) => (Story: any) => (
  <ApplikasjonContextProvider
    brukerData={defaultBruker(roller) as any}
    aktivEnhet={null}
    aktivBruker={null}
  >
    <Story />
  </ApplikasjonContextProvider>
);

// Dekoratør for å gi Sidebar-kontekst til komponenter som trenger useSidebar().
export const createSidebarDecorator =
  (className = 'h-[540px] border rounded-md') =>
  (Story: any) => (
    <SidebarProvider className={className}>
      <Story />
    </SidebarProvider>
  );

export default StoryProviders;
