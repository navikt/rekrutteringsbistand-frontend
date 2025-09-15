# URL Windows System

Dette systemet gjør det enkelt å lage vinduer som reagerer på URL-parametere i WindowWrapper.

## Hvordan det fungerer

1. **WindowWrapper** lytter automatisk på alle konfigurerte URL-vinduer
2. **Hver vindu-type** har sin egen konfigurasjonsfil under `_windows/`
3. **nuqs** håndterer URL-state synkronisering
4. **Vinduer** opprettes/oppdateres automatisk når URL-parametere endres

## Struktur

```
app/_windows/
├── README.md                     # Denne filen
├── index.ts                      # Hovedhook som registrerer alle vinduer
├── useUrlWindow.ts              # Base-hook for URL-vinduer
├── visKandidatWindow.ts         # Konfigurasjon for kandidat-vindu
├── visStillingWindow.tsx        # Konfigurasjon for stilling-vindu
└── exampleWindow.ts             # Template for nye vinduer
```

## Legge til et nytt URL-vindu

### Steg 1: Lag en konfigurasjonsfil

Lag en ny fil under `app/_windows/` (f.eks. `minWindow.ts`):

```typescript
import { UrlWindowConfig } from './useUrlWindow';
import React from 'react';

export const minWindowConfig: UrlWindowConfig = {
  urlParam: 'minParam', // URL parameter navn
  windowId: 'minWindow', // Unik ID for vinduet
  title: 'Min tittel', // Tittel som vises
  createContent: (value: string) => {
    // Lag innholdet basert på parameter-verdien
    const MinComponent = React.lazy(() => import('@/path/to/MinComponent'));

    return React.createElement(
      React.Suspense,
      { fallback: React.createElement('div', {}, 'Laster...') },
      React.createElement(MinComponent, {
        key: `${value}-${Date.now()}`,
        minProp: value,
      }),
    );
  },
  onClose: () => {
    // Valgfri: Custom logikk når vinduet lukkes
  },
};
```

### Steg 2: Registrer vinduet

Legg til vinduet i `app/_windows/index.ts`:

```typescript
import { minWindowConfig } from './minWindow';

export const useAllUrlWindows = (
  addWindow: (props: any) => void,
  removeWindow: (id: string) => void,
) => {
  useUrlWindow(visKandidatWindowConfig, addWindow, removeWindow);
  useUrlWindow(visStillingWindowConfig, addWindow, removeWindow);
  useUrlWindow(minWindowConfig, addWindow, removeWindow); // Legg til denne linjen
};
```

### Steg 3: Bruk i komponenter

Bruk `useQueryState` fra nuqs for å kontrollere vinduet:

```typescript
import { useQueryState } from 'nuqs';

const MinKomponent = () => {
  const [minParam, setMinParam] = useQueryState('minParam', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const handleClick = () => {
    setMinParam('en-verdi'); // Dette vil åpne vinduet
  };

  return <button onClick={handleClick}>Åpne mitt vindu</button>;
};
```
