# 🎯 Rekrutteringsbistand Next.js

> Moderne rekrutteringsplattform bygget med Next.js, App Router, SWR hooks og Zod validering

[![Playwright Tester](https://github.com/navikt/rekrutteringsbistand-frontend/actions/workflows/playwright.yml/badge.svg)](https://github.com/navikt/rekrutteringsbistand-frontend/actions/workflows/playwright.yml)

## 📚 Innholdsfortegnelse

- [🚀 Kom i gang](#-kom-i-gang)
- [🏗️ Prosjektstruktur](#-prosjektstruktur)
- [💻 Utvikling](#-utvikling)
- [🧪 Testing](#-testing)
- [🔑 Miljøoppsett](#-miljøoppsett)
- [🛠️ Verktøy og tips](#-verktøy-og-tips)

## 🚀 Kom i gang

Du trenger token for navikt pakke: https://github.com/navikt/frontend#github-npm-registry

```bash
# Installer pnpm hvis du ikke har det
brew install pnpm

curl -fsSL https://get.pnpm.io/install.sh | sh -

# Installer avhengigheter
pnpm install

# Start utviklingsserver
pnpm dev

# Kjør tester (bruk pnpm test-dev)
pnpm test
```

## 🏗️ Prosjektstruktur

```
src/
├── 📁 api/          # API-ruter og endepunkter
├── 📁 app/          # App router sider og layouts
├── 📁 components/   # Delte komponenter
├── 📁 util/         # Hjelpefunksjoner
└── 📁 tests/        # Playwright tester
```

## 💻 Utvikling

### 🔄 Lokal mock

Vi bruker MSW (Mock Service Worker) for API-mocking. Alle handlere ligger samlet i `mocks/handlers.ts` og navngis med suffiks `MSWHandler`. Start dev-server som vanlig (`pnpm dev`) – MSW initialiseres automatisk i browser, og i Storybook via `msw-storybook-addon`.

### 🎮 API-utvikling

1. Opprett en `route.ts` i ønsket sti under `/api`
2. Bruk maler fra `snippets.json`
3. Legg til miljøvariabler hvis backend-integrasjon er nødvendig

### 🔍 Søkeparametere

Vi støtter to tilnærminger:

- [Next.js useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
- [nuqs](https://nuqs.47ng.com/) for avanserte behov

### 📝 Logging

```typescript
import { logger } from '@navikt/next-logger';

logger.info('Hei verden!');
```

Se logger på [logs.adeo.no](https://logs.adeo.no/)

## 🧪 Testing

### 🎭 Playwright

```bash
# Generer tester
pnpm exec playwright codegen

# Kjør tester
pnpm test

# Åpne UI-modus
pnpm test --ui
```

Testresultater: [navikt.github.io/rekrutteringsbistand-frontend](https://navikt.github.io/rekrutteringsbistand-frontend/playwright-report)

## 🔑 Miljøoppsett

Opprett `.env.local`:

```env
NEXT_PUBLIC_STILLING_ES_MOCK=true
STILLING_ES_URI=din_uri
STILLING_ES_PASSWORD=ditt_passord
STILLING_ES_USERNAME=ditt_brukernavn
```

## 🛠️ Verktøy og tips

### 🎨 Kodeformatering

- Prettier (anbefales på lagring)
- ESLint med Husky pre-commit hooks
- [transform.tools](https://transform.tools/) for raske konverteringer

### 🤖 KI-assistanse

Dette repoet bruker GitHub Copilot for kodegenerering og forslag.

### 📦 Hovedavhengigheter

- Next.js
- SWR
- Zod
- Playwright

### 🔧 Nyttige kommandoer

```bash
# Start utviklingsserver
pnpm dev

# Kjør tester
pnpm test

# Formater kode
pnpm format

# Lint sjekk
pnpm lint

```

## 📝 Lisens

MIT © [Nav IT](https://github.com/navikt)
