# Elasticsearch Query Structure Guide

## Oversikt

Denne guiden forklarer hvordan Elasticsearch bool queries fungerer og hvordan vi bygger opp spørringer for stillingssøk.

## Elasticsearch Bool Query Struktur

En Elasticsearch bool query består av fire hovedtyper clauses:

### 1. `filter` - MÅ matche (påvirker ikke score)

- Dokumenter **MÅ** matche disse kriteriene
- Påvirker **IKKE** relevance score
- Optimalisert for caching
- Brukes for eksakte match-krav som statuser, datoer, kategorier

**Eksempel:**

```json
{
  "filter": [
    { "term": { "status": "ACTIVE" } },
    { "range": { "published": { "lte": "now/d" } } }
  ]
}
```

### 2. `must` - MÅ matche (påvirker score)

- Dokumenter **MÅ** matche disse kriteriene
- **PÅVIRKER** relevance score
- Brukes når matching skal påvirke rangering
- Brukes for krav som både må være oppfylt OG påvirke relevans

**Eksempel:**

```json
{
  "must": [{ "terms": { "properties.tags": ["INKLUDERING"] } }]
}
```

### 3. `should` - BØR matche (kan påvirke score)

- Dokumenter **BØR** matche disse kriteriene
- Kan påvirke relevance score
- Brukes sammen med `minimum_should_match` for å kreve at noen matcher
- Brukes for fritekst-søk og preferanser

**Eksempel:**

```json
{
  "minimum_should_match": 1,
  "should": [
    {
      "simple_query_string": {
        "query": "utvikler",
        "fields": ["title", "description"]
      }
    }
  ]
}
```

### 4. `must_not` - MÅ IKKE matche

- Dokumenter **MÅ IKKE** matche disse kriteriene
- Påvirker ikke score
- Brukes for å ekskludere dokumenter
- Brukes for å filtrere bort uønskede resultater

**Eksempel:**

```json
{
  "must_not": [
    { "term": { "status": "DELETED" } },
    { "term": { "status": "REJECTED" } }
  ]
}
```

## Aggregeringer (aggs)

Aggregeringer brukes for å samle statistikk og metadata om søkeresultatene.

### Når legges aggregeringer til?

I vår implementasjon legges aggregeringer alltid til når `filter.fritekst` finnes (er definert), uavhengig av om det er en tom array eller ikke. Dette følger den opprinnelige logikken:

```typescript
// Original logikk: ...(filter.fritekst && { aggs: ... })
if (filter.fritekst) {
  // Legg til aggregeringer
}
```

### Struktur av aggregeringer

```json
{
  "aggs": {
    "globalAggregering": {
      "global": {},
      "aggs": {
        "felter": {
          "filters": {
            "filters": {
              "tittel": {
                "bool": {
                  "should": [], // Tomt ved ingen fritekst-søk
                  "filter": [...] // Inneholder alle aktive filtre
                }
              },
              "annonsetekst": { "..." },
              "arbeidsgiver": { "..." },
              "annonsenummer": { "..." } // Kun når relevant
            }
          }
        }
      }
    }
  }
}
```

### Hvorfor tomme `should` arrays?

Når det ikke er fritekst-søk (`filter.fritekst` er tom array):

- `should` arrays i aggregeringene blir tomme `[]`
- Dette er **korrekt oppførsel**
- `filter` arrays inneholder alle aktive filtre
- Aggregeringene gir fortsatt nyttig metadata om søkeresultatene

## Våre Filter-kategorier

### Basic Filters (filter)

- Eksistens av stillingsinfo
- Kontor-tilhørighet
- Grunnleggende krav som må være oppfylt

### Ownership Filters (filter)

- Eierskap av stillinger
- Synlighet basert på brukerrettigheter
- Skjuling av slettede/avviste stillinger

### Status Filters (filter)

- Stillingsstatus (publisert, stoppet, utløpt)
- Publiseringsdatoer
- Administrativ status

### Category Filters (filter)

- Stillingskategorier (stilling, jobbmesse, formidling)
- Ekskludering av spesifikke kategorier

### Visibility Filters (filter)

- Synlighet basert på portefølje
- Arbeidsplassen.no vs interne stillinger

### Geography Filters (filter)

- Fylker og kommuner
- Nested queries for lokasjon

### Inclusion Filters (must)

- Inkluderingstags
- Prioriterte målgrupper
- Krav som må være oppfylt OG påvirker relevans

### Text Search (should)

- Fritekst-søk i forskjellige felter
- Relevance scoring basert på match
- `minimum_should_match` for å kreve match ved tekst-søk

## Best Practices

### Bruk `filter` når:

- Du trenger eksakte match
- Resultatet ikke skal påvirke score
- Du vil ha optimal caching
- Eksempler: statuser, datoer, kategorier

### Bruk `must` når:

- Kravet må være oppfylt OG skal påvirke score
- Du vil rangere dokumenter basert på hvor godt de matcher
- Eksempler: inkluderingstags som påvirker relevans

### Bruk `should` når:

- Du vil ha preferanser som påvirker score
- Sammen med `minimum_should_match` for krav
- Eksempler: fritekst-søk, anbefalte kriterier

### Bruk `must_not` når:

- Du vil ekskludere dokumenter
- Negativ filtrering
- Eksempler: skjul slettede stillinger

## Query Builder Pattern

Vår `ElasticSearchQueryBuilder` følger builder pattern for å:

1. **Separere logikk**: Hver filter-type har sin egen metode
2. **Gjøre det testbart**: Enkelt å teste individuelle deler
3. **Forbedre lesbarhet**: Klar struktur og navngiving
4. **Forenkle vedlikehold**: Enkelt å legge til nye filtre
5. **Type-sikkerhet**: TypeScript-støtte for alle operasjoner

## Legge til nye filtre

For å legge til et nytt filter:

1. Opprett en ny metode i `ElasticSearchQueryBuilder`
2. Bestem om det skal være `filter`, `must`, `should`, eller `must_not`
3. Kall metoden fra `buildFilters()`
4. Dokumenter logikken og hvorfor den type ble valgt

**Eksempel:**

```typescript
private addMyNewFilter(): this {
  const { filter } = this.params;

  if (filter.myNewCriteria) {
    // Bruk filter for eksakte krav som ikke påvirker score
    this.addFilter({
      term: { 'my.field': filter.myNewCriteria }
    });
  }

  return this;
}
```
