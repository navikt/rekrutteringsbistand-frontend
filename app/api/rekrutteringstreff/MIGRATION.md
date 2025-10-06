# Migrering av rekrutteringstreff API

## ✅ Gjennomført

### 1. Nye filer opprettet

```
✨ app/api/rekrutteringstreff/
   ├── schemas.ts                                    [NYE]
   ├── mutations.ts                                  [NYE]
   ├── README.md                                     [NYE]
   │
   └── [...slug]/
       ├── jobbsøkere/                               [NYE]
       │   ├── schemas.ts
       │   ├── useJobbsøkere.ts
       │   ├── mutations.ts
       │   └── mocks/jobbsøkereMock.ts
       │
       └── arbeidsgivere/                            [NYE]
           ├── schemas.ts
           ├── useArbeidsgivere.ts
           ├── mutations.ts
           └── mocks/arbeidsgivereMock.ts
```

### 2. Oppdaterte filer

- ✅ `useRekrutteringstreff.ts` - Bruker nå schemas fra `schemas.ts`
- ✅ `mocks/mirage.ts` - Oppdaterte importer og ryddigere struktur

### 3. Konsolidert funksjonalitet

**I `mutations.ts`:**

- `opprettNyttRekrutteringstreff` (fra `nytt-rekrutteringstreff/`)
- `oppdaterRekrutteringstreff` (fra `oppdater-rekrutteringstreff/`)
- `slettRekrutteringstreff` (fra `slett-rekrutteringstreff/`)
- `publiserRekrutteringstreff` (fra `status/`)
- `gjenåpnRekrutteringstreff` (fra `status/`)
- `fullførRekrutteringstreff` (fra `status/`)
- `avlysRekrutteringstreff` (fra `status/`)
- `avpubliserRekrutteringstreff` (fra `status/`)
- Alle Mirage mocks for mutations

**I `schemas.ts`:**

- `RekrutteringstreffSchema`
- `HendelseSchema`
- `OpprettNyttRekrutteringstreffSchema`
- `OppdaterRekrutteringstreffSchema`
- `RekrutteringstreffStatusHendelser`
- Alle relaterte types

**I `jobbsøkere/mutations.ts`:**

- `leggTilNyeJobbsøkere` (fra `ny-jobbsøker/`)
- Mirage mock

**I `arbeidsgivere/mutations.ts`:**

- `leggTilNyArbeidsgiver` (fra `[...slug]/ny-arbeidsgiver/`)
- `fjernArbeidsgiver` (fra `[...slug]/slett-arbeidsgiver/`)
- Mirage mocks

## 🔄 Neste steg: Oppdater importer

### Komponenter og pages som bruker gamle importer

Disse må oppdateres til å bruke nye importer:

#### 1. Rekrutteringstreff mutations

**Gammel import:**

```typescript
import { opprettNyttRekrutteringstreff } from '@/app/api/rekrutteringstreff/nytt-rekrutteringstreff/opprettNyttRekrutteringstreff';
import { oppdaterRekrutteringstreff } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { slettRekrutteringstreff } from '@/app/api/rekrutteringstreff/slett-rekrutteringstreff/slettRekrutteringstreff';
import { publiserRekrutteringstreff } from '@/app/api/rekrutteringstreff/status/utførRekrutteringstreffStatusHendelser';
```

**Ny import:**

```typescript
import {
  opprettNyttRekrutteringstreff,
  oppdaterRekrutteringstreff,
  slettRekrutteringstreff,
  publiserRekrutteringstreff,
  gjenåpnRekrutteringstreff,
  fullførRekrutteringstreff,
  avlysRekrutteringstreff,
  avpubliserRekrutteringstreff,
} from '@/app/api/rekrutteringstreff/mutations';
```

#### 2. Schemas og types

**Gammel import:**

```typescript
import { OppdaterRekrutteringstreffSchema } from '@/app/api/rekrutteringstreff/oppdater-rekrutteringstreff/oppdaterRerkutteringstreff';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
```

**Ny import:**

```typescript
import {
  RekrutteringstreffDTO,
  OppdaterRekrutteringstreffSchema,
  OpprettNyttRekrutteringstreffSchema
} from '@/app/api/rekrutteringstreff/schemas';

// ELLER fortsatt via hook for bakoverkompatibilitet:
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
```

#### 3. Jobbsøkere

**Gammel import:**

```typescript
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { leggTilNyeJobbsøkere } from '@/app/api/rekrutteringstreff/ny-jobbsøker/leggTilNyjobbsøker';
```

**Ny import:**

```typescript
import { leggTilNyeJobbsøkere } from '@/app/api/rekrutteringstreff/jobbsøkere/mutations';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/jobbsøkere/useJobbsøkere';
```

#### 4. Arbeidsgivere

**Gammel import:**

```typescript
import { leggTilNyArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/ny-arbeidsgiver/leggTilNyArbeidsgiver';
import { fjernArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/slett-arbeidsgiver/fjernArbeidsgiver';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
```

**Ny import:**

````typescript
```typescript
// ❌ Gammelt
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { leggTilNyeJobbsøkere } from '@/app/api/rekrutteringstreff/ny-jobbsøker/leggTilNyjobbsøker';

// ✅ Nytt
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { leggTilNyeJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/mutations';
````

#### 4. Arbeidsgivere

**Gammel import:**

```typescript
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { leggTilNyArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/ny-arbeidsgiver/leggTilNyArbeidsgiver';
import { fjernArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/slett-arbeidsgiver/fjernArbeidsgiver';

// ✅ Nytt
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import {
  leggTilNyArbeidsgiver,
  fjernArbeidsgiver
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/mutations';
```

```

## ✅ Migrering fullført!

Alle importer er oppdatert og gamle filer er slettet.

## 📊 Fordeler med ny struktur

✅ **Bedre oversikt**: Alle mutations samlet på ett sted
✅ **Færre filer**: Fra ~15 filer til ~8 filer for samme funksjonalitet
✅ **Konsistent pattern**: Følger samme mønster som kandidat-API
✅ **Lettere vedlikehold**: Én fil å oppdatere ved API-endringer
✅ **Tydeligere domener**: jobbsøkere/ og arbeidsgivere/ som egne moduler
✅ **Sentraliserte schemas**: Ingen duplisering av Zod schemas
✅ **Bedre TypeScript support**: Re-exports gjør types lett tilgjengelige

## ✅ Fullført!

1. ✅ Nye filer opprettet
2. ✅ Mirage oppdatert
3. ✅ Alle komponenter oppdatert til å bruke nye importer
4. ✅ Gamle filer slettet
5. ✅ Ingen TypeScript-feil

Klar for commit!
```
