# useRekrutteringstreffData

En sentralisert custom hook for å hente og beregne rekrutteringstreff-relatert data.

## Formål

Denne hooken ble opprettet for å:

- ✅ Redusere duplisert kode på tvers av komponenter
- ✅ Eliminere props drilling
- ✅ Gjøre komponenter mer self-contained
- ✅ Sentralisere beregning av derived state

## Bruk

```tsx
import { useRekrutteringstreffData } from './useRekrutteringstreffData';

function MinKomponent() {
  const { activeStep, avlyst, harPublisert, treff, oppdaterData } =
    useRekrutteringstreffData();

  // Bruk dataene...
}
```

## Returnerer

### IDs og raw data

- `rekrutteringstreffId: string` - ID for rekrutteringstreffet
- `treff: RekrutteringstreffData | undefined` - Raw data fra API
- `hendelser: Hendelse[] | undefined` - Liste over hendelser
- `innlegg: Innlegg[] | undefined` - Liste over innlegg

### Computed state

- `activeStep: ActiveStep` - Nåværende steg ('PUBLISERE' | 'INVITERE' | 'FULLFØRE' | 'AVLYST')
- `avlyst: boolean` - Om treffet er avlyst
- `harPublisert: boolean` - Om treffet er publisert (INVITERE eller FULLFØRE)
- `harInvitert: boolean` - Om noen er invitert
- `fraTidspunktHarPassert: boolean` - Om fra-tidspunkt har passert
- `tilTidspunktHarPassert: boolean` - Om til-tidspunkt har passert
- `innleggHtmlFraBackend: string | null` - HTML-innhold for første innlegg

### Funksjoner

- `oppdaterData: () => Promise<void>` - Funksjon for å oppdatere data
- `rekrutteringstreffHook: SWRResponse` - Raw SWR hook for avansert bruk

## Komponenter som kan/bør bruke denne

Før refaktorering hadde vi denne pattern-en duplisert i:

1. ✅ **HeaderActions** (allerede refaktorert)
2. **Rekrutteringstreff.tsx** - kunne redusere fra ~40 linjer til ~10
3. **RekrutteringstreffRedigering.tsx** - henter samme data
4. **StegviserContext.tsx** - henter activeStep på samme måte
5. **RekrutteringstreffKort.tsx** - henter activeStep og treff
6. **Jobbsøkere.tsx** - henter activeStep
7. **OmTreffet.tsx** - henter treff-data
8. Flere andre komponenter...

## Eksempel: Før og Etter

### ❌ Før (med duplisering)

```tsx
function MinKomponent() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const rekrutteringstreffHook = useRekrutteringstreff(rekrutteringstreffId);
  const { data: innlegg } = useInnlegg(rekrutteringstreffId);

  const hendelser = rekrutteringstreffHook.data?.hendelser;
  const activeStep = useMemo(
    () => getActiveStepFromHendelser(hendelser),
    [hendelser],
  );
  const harPublisert = activeStep === 'INVITERE' || activeStep === 'FULLFØRE';
  const avlyst = activeStep === 'AVLYST';

  // ... mer kode
}
```

### ✅ Etter (med hook)

```tsx
function MinKomponent() {
  const { activeStep, avlyst, harPublisert, treff, innlegg } =
    useRekrutteringstreffData();

  // Ferdig! 🎉
}
```

## Fordeler

1. **Mindre kode** - Reduserer 10-15 linjer per komponent
2. **Single source of truth** - En plass å vedlikeholde logikken
3. **Type-sikkerhet** - TypeScript types er allerede definert
4. **Enklere testing** - Mock én hook i stedet for flere
5. **Bedre performance** - SWR caching deles på tvers av komponenter

## Når IKKE bruke

- Hvis du bare trenger ett enkelt felt (f.eks. bare `rekrutteringstreffId`)
- Hvis komponenten er utenfor `RekrutteringstreffContextProvider`
- Hvis du trenger spesiell SWR-konfigurasjon

## Utvidelser

Hvis du trenger mer data i hooken, legg det til her og alle komponenter får tilgang automatisk!

```tsx
// I useRekrutteringstreffData.ts
const nyttFelt = useMemo(() => {
  // beregn noe nytt
}, [dependencies]);

return {
  // ... eksisterende felter
  nyttFelt,
};
```
