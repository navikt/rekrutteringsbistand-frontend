# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: forside/forside.spec.ts >> Forside >> Viser mørk modus
- Location: tests/visMørkModus.ts:4:7

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/innstillinger", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Hopp til hovedinnhold" [ref=e2] [cursor=pointer]:
    - /url: "#maincontent"
  - alert [ref=e3]
  - generic [ref=e6]:
    - banner [ref=e7]:
      - banner [ref=e8]:
        - heading "Rekrutteringsbistand - Playwright" [level=1] [ref=e9]
        - button "Modia meny" [ref=e12] [cursor=pointer]:
          - img "Modia meny" [ref=e13]
        - 'button "Fornavn Etternavn Enhet: NAV Test" [ref=e15] [cursor=pointer]':
          - generic [ref=e16]:
            - generic [ref=e17]: Fornavn Etternavn
            - generic [ref=e18]: "Enhet: NAV Test"
    - generic [ref=e21]:
      - generic [ref=e24]:
        - generic [ref=e26]:
          - button "Lukk meny" [pressed] [ref=e27] [cursor=pointer]
          - button "Opprett" [ref=e31] [cursor=pointer]
        - generic [ref=e36]:
          - generic [ref=e37]:
            - button "Oversikt" [ref=e38] [cursor=pointer]
            - button "Rekrutteringstreff" [ref=e43] [cursor=pointer]
            - button "Stillingsoppdrag" [ref=e48] [cursor=pointer]
            - button "Etterregistreringer" [ref=e53] [cursor=pointer]
            - button "Jobbsøkere" [ref=e58] [cursor=pointer]
          - generic [ref=e63]:
            - button "Nyheter" [ref=e66] [cursor=pointer]
            - button "Gi tilbakemelding" [ref=e71] [cursor=pointer]
            - button "Innstillinger" [ref=e76] [cursor=pointer]
      - main [ref=e81]:
        - dialog [ref=e82]:
          - generic [ref=e83]:
            - button [active] [ref=e84] [cursor=pointer]:
              - img "Lukk" [ref=e86]
            - heading "Nyheter for deg" [level=1] [ref=e88]
          - generic [ref=e90]:
            - article [ref=e91]:
              - heading "Ny funksjonalitet for kandidatsøk" [level=2] [ref=e92]
              - paragraph [ref=e93]: 29. september 2025
              - generic [ref=e94]: Vi har lansert forbedret søkefunksjonalitet som gjør det enklere å finne relevante kandidater. Søket støtter nå flere filtre og gir bedre resultater.
            - article [ref=e95]:
              - heading "Oppdatert brukergrensesnitt" [level=2] [ref=e96]
              - paragraph [ref=e97]: 25. september 2025
              - generic [ref=e98]: Vi har oppdatert designet for å gi en bedre brukeropplevelse. Det nye grensesnittet er mer intuitivt og responsivt.
            - article [ref=e99]:
              - heading "Forbedret stillingssøk" [level=2] [ref=e100]
              - paragraph [ref=e101]: 20. september 2025
              - generic [ref=e102]: Stillingssøket har fått nye filtreringsmuligheter og bedre ytelse. Du kan nå søke mer presist etter ønskede stillinger.
            - article [ref=e103]:
              - heading "Integrasjon med nye systemer" [level=2] [ref=e104]
              - paragraph [ref=e105]: 15. september 2025
              - generic [ref=e106]: Vi har integrert med flere eksterne systemer for å gi deg tilgang til mer omfattende data og bedre arbeidsflyt.
            - article [ref=e107]:
              - heading "Forbedret sikkerhet" [level=2] [ref=e108]
              - paragraph [ref=e109]: 10. september 2025
              - generic [ref=e110]: Vi har implementert nye sikkerhetstiltak for å beskytte dine data bedre. Alle kommunikasjoner er nå kryptert ende-til-ende.
            - article [ref=e111]:
              - heading "Ny rapporteringsfunksjon" [level=2] [ref=e112]
              - paragraph [ref=e113]: 5. september 2025
              - generic [ref=e114]: Du kan nå generere detaljerte rapporter om rekrutteringsaktiviteter. Rapportene kan eksporteres i flere formater.
            - article [ref=e115]:
              - heading "Mobil app lansering" [level=2] [ref=e116]
              - paragraph [ref=e117]: 1. september 2025
              - generic [ref=e118]: Vi har lansert en ny mobil app som gjør det mulig å bruke rekrutteringsbistand på farten. Appen er tilgjengelig for både iOS og Android.
            - article [ref=e119]:
              - heading "Automatisk CV-matching" [level=2] [ref=e120]
              - paragraph [ref=e121]: 25. august 2025
              - generic [ref=e122]: Ny AI-drevet funksjonalitet som automatisk matcher kandidater med stillinger basert på kompetanse og erfaring.
            - article [ref=e123]:
              - heading "Forbedret kommunikasjonsverktøy" [level=2] [ref=e124]
              - paragraph [ref=e125]: 20. august 2025
              - generic [ref=e126]: Vi har oppgradert kommunikasjonsverktøyene for bedre samarbeid mellom rekrutterere og kandidater.
            - article [ref=e127]:
              - heading "Ny dashboard for oversikt" [level=2] [ref=e128]
              - paragraph [ref=e129]: 15. august 2025
              - generic [ref=e130]: Det nye dashboardet gir deg en komplett oversikt over alle pågående rekrutteringsprosesser på ett sted.
          - generic [ref=e131]:
            - button "Lukk" [ref=e132] [cursor=pointer]
            - button "Gå til nyhetssiden" [ref=e134] [cursor=pointer]
        - generic [ref=e138]:
          - generic [ref=e139]: Oversikt
          - generic [ref=e150]:
            - generic [ref=e151]:
              - generic [ref=e152]:
                - heading "Ditt Nav-kontor" [level=2] [ref=e153]
                - paragraph [ref=e154]: NAV Test
              - generic [ref=e156]:
                - generic [ref=e157]: Periode
                - combobox "Periode" [ref=e159]:
                  - option "1. september 2026 - 30. september 2026" [selected]
                  - option "1. august 2026 - 31. august 2026"
                  - option "1. juli 2026 - 31. juli 2026"
                  - option "1. juni 2026 - 30. juni 2026"
                  - option "1. mai 2026 - 31. mai 2026"
                  - option "1. april 2026 - 30. april 2026"
                  - option "1. mars 2026 - 31. mars 2026"
                  - option "1. februar 2026 - 28. februar 2026"
                  - option "1. januar 2026 - 31. januar 2026"
                  - option "1. desember 2025 - 31. desember 2025"
                  - option "1. november 2025 - 30. november 2025"
                  - option "1. oktober 2025 - 31. oktober 2025"
            - generic [ref=e160]:
              - generic [ref=e161]:
                - generic [ref=e163]:
                  - generic [ref=e165]:
                    - paragraph [ref=e167]: Antall som har fått jobb
                    - generic [ref=e168]: "10"
                  - generic [ref=e174]:
                    - text: 6 under 30 år
                    - button "Mer informasjon" [ref=e176] [cursor=pointer]
                    - text: · 2 utenom standardinnsats
                - generic [ref=e181]:
                  - generic [ref=e183]:
                    - paragraph [ref=e185]: Antall som har fått jobb - Stilling
                    - generic [ref=e186]: "6"
                  - generic [ref=e192]:
                    - text: 3 under 30 år
                    - button "Mer informasjon" [ref=e194] [cursor=pointer]
                    - text: · 1 utenom standardinnsats
                - generic [ref=e199]:
                  - generic [ref=e201]:
                    - paragraph [ref=e203]: Antall som har fått jobb - Rekrutteringstreff
                    - generic [ref=e204]: "2"
                  - generic [ref=e210]:
                    - text: 1 under 30 år
                    - button "Mer informasjon" [ref=e212] [cursor=pointer]
                    - text: · 1 utenom standardinnsats
                - generic [ref=e217]:
                  - generic [ref=e219]:
                    - paragraph [ref=e221]: Antall som har fått jobb - Etterregistrering
                    - generic [ref=e222]: "2"
                  - generic [ref=e228]:
                    - text: 0 under 30 år
                    - button "Mer informasjon" [ref=e230] [cursor=pointer]
                    - text: · 0 utenom standardinnsats
              - generic [ref=e234]:
                - generic [ref=e236]:
                  - generic [ref=e238]:
                    - paragraph [ref=e240]: Antall delt med arbeidsgiver
                    - generic [ref=e241]: "10"
                  - generic [ref=e247]:
                    - text: 5 under 30 år
                    - button "Mer informasjon" [ref=e249] [cursor=pointer]
                    - text: · 1 utenom standardinnsats
                - generic [ref=e255]:
                  - paragraph [ref=e262]: CV-er godkjent for deling med arbeidsgiver
                  - generic [ref=e263]:
                    - generic [ref=e264]:
                      - generic [ref=e265]: Kandidater spurt om å dele
                      - generic [ref=e266]: "54"
                    - generic [ref=e267]:
                      - generic [ref=e268]: Godkjent
                      - generic [ref=e269]: "12"
                    - generic [ref=e270]:
                      - generic [ref=e271]: Avslått
                      - generic [ref=e272]: "13"
                    - generic [ref=e273]:
                      - generic [ref=e274]: Ikke svart
                      - generic [ref=e275]: "14"
                    - generic [ref=e276]:
                      - generic [ref=e277]: Utløpt
                      - generic [ref=e278]: "15"
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | 
  3  | export const visMørkModus = (testId: string) =>
  4  |   test('Viser mørk modus', async ({ page }) => {
  5  |     const sideUrl = page.url();
  6  | 
> 7  |     await page.goto('/innstillinger');
     |                ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  8  |     await Promise.all([
  9  |       page.waitForResponse(
  10 |         (response) =>
  11 |           response.url().includes('/api/bruker/innstillinger') &&
  12 |           response.request().method() === 'PUT',
  13 |       ),
  14 |       page.getByRole('radio', { name: 'Mørk modus' }).click(),
  15 |     ]);
  16 | 
  17 |     await page.goto(sideUrl);
  18 | 
  19 |     if (testId) await expect(page.getByTestId(testId).first()).toBeVisible();
  20 |   });
  21 | 
```