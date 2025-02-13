# Rekrutteringsbistand - NEXT

NextJS applikasjon m/AppRoutes, "SWR hooks" for fetching av data og zod validering av data

## Kom igang med utvikling

`pnpm install`
`pnpm run dev`

## Filstruktur

```
│ ├── api
│ │ ├── [endepunkter]
│ ├── [sider]
│ ├── middleware.ts / ApplikasjonsContext / Globale filer
├── components _ "Felles" komponenter
├── tilgangskontroll _ Tilgangskontroll relatert auth / roller.
├── util \* Hjelpefunksjoner
└── .gitignore
```

## Utvikling

### Lokal mock

Bruker miragejs, se mirage.ts for server og mocks mappen for mocks.

### Opprett API endepunkt

Opprett en route.ts i ønsket path under /api
Bruk snippet fra snippets.json som mal.

Hvis man trenger en backend komponent, legg til env variabel og inbound på gitt komponent for rekrutteringsbistand-frontend og outbound på gitt applikasjon i denne.

### Search params

Se på https://nextjs.org/docs/app/api-reference/functions/use-search-params og/vs https://nuqs.47ng.com/

### Logger

Implementert logger `import { logger } from '@navikt/next-logger'`, se https://logs.adeo.no/ ( https://github.com/navikt/next-logger )

### Stillingssøk direkte mot ES:

Opprett en '.env.local' fil og fyll ut:

```
STILLING_ES_URI=
STILLING_ES_PASSWORD=
STILLING_ES_USERNAME=
```

### Prettier og lint med husky

Gjerne kjør prettier on save for å formatere koden mens du utvikler.
Det er installert eslint og husky som formaterer koden og gir evt feilmeldinger ved ubrukte variabler samt at params blir sortert alfabetisk for bedre oversikt.

Får du ikke pushet, se gitlog for feilmelding...

# Testing

## Playwright

`npx playwright codegen`

Resultat: https://navikt.github.io/rekrutteringsbistand-frontend

Happy hacking! 🎭

# Tips:

transform tools: https://transform.tools/

## Kode generert av GitHub Copilot

Dette repoet bruker GitHub Copilot til å generere kode.
