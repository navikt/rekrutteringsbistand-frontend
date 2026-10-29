# 🎯 Rekrutteringsbistand Next.js

> Moderne rekrutteringsplattform bygget med Next.js, App Router, SWR hooks og Zod validering

[![Playwright Tester](https://github.com/navikt/rekrutteringsbistand-frontend/actions/workflows/playwright.yml/badge.svg)](https://github.com/navikt/rekrutteringsbistand-frontend/actions/workflows/playwright.yml)

## 📚 Innholdsfortegnelse

- [🚀 Kom i gang](#-kom-i-gang)
- [🏗️ Prosjektstruktur](#-prosjektstruktur)
- [💻 Utvikling](#-utvikling)
- [Nettleserstøtte](#nettleserstøtte)
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

## Nettleserstøtte

Vi bruker [`@navikt/browserslist-config-public`](https://github.com/navikt/browserslist/blob/main/packages/config-public/README.md)
via `browserslist` i `package.json`, slik pakkens Next.js-dokumentasjon beskriver.
Next.js 16.4.2 leser konfigurasjonen med `getSupportedBrowsers` og sender de
oppløste målene til Turbopack som `browserslistQuery` i produksjonsbygget.
Det trengs ingen ekstra plugin i `next.config.mjs`.

Versjon 0.3.0 setter nedre mål til Chrome/Edge 108, Firefox 121, Safari/iOS 16,
Opera 94 og Samsung Internet 21. Dette er kompileringsmål, ikke en garanti for
at hele appen fungerer i alle disse versjonene:

- [Next.js](https://nextjs.org/docs/architecture/supported-browsers) oppgir
  Chrome/Edge/Firefox 111 og Safari 16.4 som støttede minimumsversjoner.
  Lavere kompileringsmål utvider ikke automatisk støtten i rammeverkets runtime.
- [Tailwind CSS 4](https://tailwindcss.com/docs/compatibility) krever Chrome 111,
  Safari 16.4 og Firefox 128. PostCSS-pluginen bruker egne, faste mål og leser
  ikke Browserslist. Next.js bruker fellesmålene for sin CSS-behandling, men kan
  ikke kompensere for alle nyere CSS-funksjoner Tailwind og avhengighetene krever.
- Konfigurasjonen legger ikke til polyfills for JavaScript- eller nettleser-API-er.
  Nye API-er må vurderes mot nettlesermålene og eventuelt funksjonstestes eller
  få egne polyfills.
- Playwright-oppsettet tester Chromium, ikke de eldste nettleserversjonene i
  felleskonfigurasjonen.

`packageExtensions` i `pnpm-workspace.yaml` markerer pakkens Astro- og Vite-peers
som valgfrie, i samsvar med pakkens `package.json`. Metadataene for 0.3.0 i
registeret mangler denne markeringen; uten tilpasningen installerer pnpm begge
byggverktøyene selv om appen bare bruker Next.js.

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

### ♿ Tilgjengelighet

[Guiden på Trello](https://trello.com/c/qeBBXRx6) viser hva tilgjengelighetstestene sjekker automatisk, og hvordan du tester hvert WCAG-kriterium i tilgjengelighetserklæringen manuelt.

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
