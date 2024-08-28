# Rekrutteringsbistand - NEXT

NextJS applikasjon m/AppRoutes, "SWR hooks" for fetching av data og zod validering av data

### Opprett API endepunkt

Opprett en route.ts i ønsket path under /api
Bruk snippet fra snippets.json som mal.

Hvis man trenger en backend komponent, legg til env variabel og inbound på gitt komponent for rekrutteringsbistand-next og outbound på gitt applikasjon i denne.

### Search params
https://nuqs.47ng.com/

## Logger

Implementert logger `import { logger } from '@navikt/next-logger'`, se https://logs.adeo.no/

## Filstruktur

├── app
│   ├── api
│   │   ├── [endepunkter]
│   ├── [sider]
│   ├── middleware.ts / ApplikasjonsContext / Globale filer
├── components               * "Felles" komponenter
├── tilgangskontroll         * Tilgangskontroll relatert auth / roller.
├── util                     * Hjelpefunksjoner
└── .gitignore

# Tips:
transform tools: https://transform.tools/ 

$$ TODO :>
/api/me i kandidatsok er ikke i bruk

