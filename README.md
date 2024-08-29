# Rekrutteringsbistand - NEXT

NextJS applikasjon m/AppRoutes, "SWR hooks" for fetching av data og zod validering av data

### Opprett API endepunkt

Opprett en route.ts i ønsket path under /api
Bruk snippet fra snippets.json som mal.

Hvis man trenger en backend komponent, legg til env variabel og inbound på gitt komponent for rekrutteringsbistand-next og outbound på gitt applikasjon i denne.

### Search params

Se på https://nextjs.org/docs/app/api-reference/functions/use-search-params og/vs https://nuqs.47ng.com/

## Logger

Implementert logger `import { logger } from '@navikt/next-logger'`, se https://logs.adeo.no/ ( https://github.com/navikt/next-logger )


# Stillingssøk direkte mot ES:
Opprett en '.env.local' fil og fyll ut:
```
STILLING_ES_URL=
STILLING_ES_PASSWORD=
STILLING_ES_USERNAME=
```

## Filstruktur

├── app
│ ├── api
│ │ ├── [endepunkter]
│ ├── [sider]
│ ├── middleware.ts / ApplikasjonsContext / Globale filer
├── components _ "Felles" komponenter
├── tilgangskontroll _ Tilgangskontroll relatert auth / roller.
├── util \* Hjelpefunksjoner
└── .gitignore

# Tips:

transform tools: https://transform.tools/

$$
TODO :>
/api/me i kandidatsok er ikke i bruk


$$
