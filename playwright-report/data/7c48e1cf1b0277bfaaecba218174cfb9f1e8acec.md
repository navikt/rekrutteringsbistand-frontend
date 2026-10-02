# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: stilling/vis-stilling/stilling-handlinger.spec.ts >> Handlinger – eier, aktiv direktemeldt stilling >> Viser alle eier-handlinger
- Location: tests/stilling/vis-stilling/stilling-handlinger.spec.ts:51:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('main').getByRole('button', { name: 'Flere handlinger' }).first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
            - button "Nyheter" [ref=e65] [cursor=pointer]
            - button "Gi tilbakemelding" [ref=e70] [cursor=pointer]
            - button "Innstillinger" [ref=e75] [cursor=pointer]
      - main [ref=e80]:
        - generic [ref=e85]:
          - generic [ref=e89]:
            - generic [ref=e90]:
              - navigation "Brødsmulesti" [ref=e94]:
                - list [ref=e95]:
                  - listitem [ref=e96]:
                    - link [ref=e97] [cursor=pointer]:
                      - /url: /stilling
                  - listitem [aria-hidden] [ref=e101]: /
                  - listitem [ref=e102]:
                    - link "Product Quality Assistant" [disabled] [ref=e103]
              - generic [ref=e106]:
                - generic [aria-hidden]:
                  - generic:
                    - button:
                      - generic: Rediger
                  - generic:
                    - button:
                      - generic: Pause
                  - generic:
                    - button:
                      - generic: Fullfør
                  - generic:
                    - button:
                      - generic: Forleng
                  - generic:
                    - button:
                      - generic: Dupliser
                  - generic:
                    - button:
                      - generic: Slett
                - button "Rediger" [ref=e107] [cursor=pointer]
                - button "Pause" [ref=e112] [cursor=pointer]
                - button "Fullfør" [ref=e117] [cursor=pointer]
                - button "Forleng" [ref=e122] [cursor=pointer]
                - button "Dupliser" [ref=e127] [cursor=pointer]
                - button "Slett" [ref=e132] [cursor=pointer]
            - tablist [ref=e140]:
              - generic [ref=e141]:
                - tab "Om stillingen" [selected] [ref=e142] [cursor=pointer]
                - tab "Jobbsøkere (300)" [ref=e145] [cursor=pointer]
          - tabpanel "Om stillingen" [ref=e150]:
            - generic [ref=e152]:
              - generic [ref=e153]:
                - generic [ref=e154]:
                  - heading "Product Quality Assistant" [level=1] [ref=e155]
                  - generic [ref=e156]:
                    - generic "Stillingen eies av Tester" [ref=e158]:
                      - generic [ref=e159]: T
                      - text: Tester
                    - generic [ref=e160]: •
                    - text: Opprettet 24. april 2025
                    - generic [ref=e161]: Åpen for søkere
                    - generic [ref=e163]: 300 jobbsøkere
                - generic [ref=e166]:
                  - button "Kopier delingslenke" [ref=e167] [cursor=pointer]
                  - button "Skriv ut" [ref=e173] [cursor=pointer]
              - generic [ref=e179]:
                - generic [ref=e180]:
                  - generic [ref=e181]:
                    - generic [ref=e182] [cursor=pointer]:
                      - generic [ref=e184]: 👉
                      - link "Finn og foreslå jobbsøkere" [ref=e186]:
                        - /url: /stilling/minStilling/finn-kandidater
                      - generic [ref=e187]: Se alle som leter etter jobb nå, og finn riktig person til jobben
                    - generic [ref=e190] [cursor=pointer]:
                      - generic [ref=e192]: ➕
                      - button "Legg til jobbsøkere" [ref=e194]
                      - generic [ref=e195]: Vet du fødselsnummeret til personen, kan du legge dem til med en gang.
                  - generic [ref=e199]:
                    - heading "Om jobben" [level=3] [ref=e200]
                    - generic [ref=e201]:
                      - generic [ref=e202]: Rogneplassen 20, 4653 Loodden
                      - generic [ref=e208]: Vikariat - Deltid
                      - generic [ref=e214]: Ukedager - Dagtid
                      - generic [ref=e220]: 1 stillinger
                      - generic [ref=e226]: 100% stilling
                      - generic [ref=e232]: Oppstart 31. mai 2025
                      - generic [ref=e238]: "-"
                      - generic [ref=e244]: Søknadsfrist 31. mai 2025
                    - paragraph [ref=e251]: Atqui conatus aperte. Conitor vilicus non utrimque tutamen ventosus degero in theologus. Depraedor patruus accendo optio damno. Comburo vapulus nesciunt auctus tertius perspiciatis adnuo curia spoliatio. A voluptatibus cotidie voluptate pecco tricesimus necessitatibus quisquam circumvenio ocer. Una temeritas sublime urbs commodi speciosus defendo creber cunctatio. Cometes quasi curtus voluptate spiritus avarus. Coniecto thema utrum venio somnus centum. Umbra eum thorax mollitia tabella.
                - complementary [ref=e252]:
                  - generic [ref=e254]:
                    - heading "Om arbeidsgiveren" [level=3] [ref=e255]
                    - generic [ref=e256]:
                      - paragraph [ref=e257]: Arnesen-Edvardsen
                      - generic [ref=e258]: Vesper celer aedificium tabesco ter venustas vicissitudo. Canonicus provident vir. Iusto veritas saepe cribro depereo peccatus inflammatio vester versus crur.
                    - generic [ref=e259]:
                      - term [ref=e260]: Organisasjonsnummer
                      - definition [ref=e261]: "123456789"
                    - generic [ref=e262]:
                      - term [ref=e263]: Sektor
                      - definition [ref=e264]: Privat
                    - paragraph [ref=e265]: Kontaktperson
                    - generic [ref=e267]:
                      - term [ref=e268]: Amalie Eide, Direct Data Coordinator
                      - definition [ref=e269]: Maria41@hotmail.com Tlf 05 6 59 59 1
                  - generic [ref=e272]:
                    - heading "Om stillingsoppdraget" [level=3] [ref=e273]
                    - generic [ref=e274]:
                      - term [ref=e275]: Annonsenummer
                      - definition [ref=e276]: R962100
                    - generic [ref=e277]:
                      - term [ref=e278]: Hentet fra
                      - definition [ref=e279]: DIR
                    - generic [ref=e280]:
                      - term [ref=e281]: Referanse
                      - definition [ref=e282]: aVlKJSCKlg
                    - generic [ref=e283]:
                      - term [ref=e284]: Publisert
                      - definition [ref=e285]: 24.04.25
                    - generic [ref=e286]:
                      - term [ref=e287]: Siste visning
                      - definition [ref=e288]: 01.01.50
                    - generic [ref=e289]:
                      - term [ref=e290]: Sist endret
                      - definition [ref=e291]: 01.06.25
                    - generic [ref=e292]:
                      - term [ref=e293]: Kontaktperson hos Nav
                      - definition [ref=e294]: Tester (TestIdent)
```

# Test source

```ts
  1   | import { gotoApp } from '@/tests/gotoApp';
  2   | import { type Page, expect, test } from '@playwright/test';
  3   | 
  4   | /** Returnerer main-området på siden. */
  5   | function hoveddel(page: Page) {
  6   |   return page.locator('main');
  7   | }
  8   | 
  9   | /** Finn knapp i main – bruker .first() for å unngå strict mode (duplikater fra DynamiskDropdown måle-container o.l.). */
  10  | function knapp(page: Page, navn: string) {
  11  |   return hoveddel(page)
  12  |     .getByRole('button', { name: navn, exact: true })
  13  |     .first();
  14  | }
  15  | 
  16  | /**
  17  |  * Finn handlingsknapp – enten direkte synlig eller inne i overflow-dropdown.
  18  |  * DynamiskDropdown sin overflow-knapp har aria-label="Flere handlinger".
  19  |  */
  20  | async function finnHandlingsknapp(page: Page, knappNavn: string) {
  21  |   const direkteKnapp = knapp(page, knappNavn);
  22  | 
  23  |   const overflowKnapp = hoveddel(page)
  24  |     .getByRole('button', { name: 'Flere handlinger' })
  25  |     .first();
  26  | 
  27  |   try {
  28  |     await expect(direkteKnapp.or(overflowKnapp)).toBeVisible({
  29  |       timeout: 15000,
  30  |     });
  31  |   } catch {
  32  |     return direkteKnapp;
  33  |   }
  34  | 
  35  |   if (await direkteKnapp.isVisible()) return direkteKnapp;
  36  | 
> 37  |   await overflowKnapp.click();
      |                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  38  |   const menyKnapp = page
  39  |     .getByRole('button', { name: knappNavn, exact: true })
  40  |     .first();
  41  |   await expect(menyKnapp).toBeVisible();
  42  |   return menyKnapp;
  43  | }
  44  | 
  45  | // ────────────────────────────────────────────────────────
  46  | // 1. Eier – aktiv direktemeldt stilling (alle handlinger)
  47  | // ────────────────────────────────────────────────────────
  48  | test.describe('Handlinger – eier, aktiv direktemeldt stilling', () => {
  49  |   test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });
  50  | 
  51  |   test('Viser alle eier-handlinger', async ({ page }) => {
  52  |     await gotoApp(page, '/stilling/minStilling');
  53  | 
  54  |     const forventedeKnapper = [
  55  |       'Rediger',
  56  |       'Pause',
  57  |       'Fullfør',
  58  |       'Forleng',
  59  |       'Dupliser',
  60  |       'Slett',
  61  |     ];
  62  | 
  63  |     for (const knappNavn of forventedeKnapper) {
  64  |       const knapp = await finnHandlingsknapp(page, knappNavn);
  65  |       await expect(knapp).toBeVisible();
  66  |     }
  67  |   });
  68  | 
  69  |   test('Viser ikke Ta over eierskap for eier', async ({ page }) => {
  70  |     await gotoApp(page, '/stilling/minStilling');
  71  |     await expect(knapp(page, 'Ta over eierskap')).toBeHidden();
  72  |   });
  73  | });
  74  | 
  75  | // ────────────────────────────────────────────────────────
  76  | // 2. Ikke eier – aktiv direktemeldt stilling
  77  | // ────────────────────────────────────────────────────────
  78  | test.describe('Handlinger – ikke eier, aktiv direktemeldt stilling', () => {
  79  |   test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });
  80  | 
  81  |   test('Viser Ta over eierskap, Dupliser – skjuler Rediger, Slett, Fullfør', async ({
  82  |     page,
  83  |   }) => {
  84  |     // internStilling har ingen eksplisitt navIdent → ikke eier
  85  |     await gotoApp(page, '/stilling/internStilling');
  86  | 
  87  |     await expect(
  88  |       await finnHandlingsknapp(page, 'Ta over eierskap'),
  89  |     ).toBeVisible();
  90  |     await expect(await finnHandlingsknapp(page, 'Dupliser')).toBeVisible();
  91  | 
  92  |     // Eier-spesifikke knapper skal være skjult
  93  |     await expect(knapp(page, 'Rediger')).toBeHidden();
  94  |     await expect(knapp(page, 'Slett')).toBeHidden();
  95  |   });
  96  | });
  97  | 
  98  | // ────────────────────────────────────────────────────────
  99  | // 3. Jobbsøkerrettet rolle – ingen handlinger
  100 | // ────────────────────────────────────────────────────────
  101 | test.describe('Handlinger – jobbsøkerrettet rolle', () => {
  102 |   test.use({ storageState: 'tests/.auth/jobbsokerrettet.json' });
  103 | 
  104 |   test('Viser ingen StillingHandlinger-knapper for jobbsøkerrettet rolle', async ({
  105 |     page,
  106 |   }) => {
  107 |     await gotoApp(page, '/stilling/publisertStilling');
  108 | 
  109 |     // StillingHandlinger er skjult bak TilgangskontrollForInnhold (krever arbeidsgiverrettet)
  110 |     await expect(knapp(page, 'Rediger')).toBeHidden();
  111 |     await expect(knapp(page, 'Fullfør')).toBeHidden();
  112 |     await expect(knapp(page, 'Slett')).toBeHidden();
  113 |     // Merk: Pause-knapp fra PauseSøkeforslag i banner ER synlig (eget komponent, ikke StillingHandlinger)
  114 |   });
  115 | });
  116 | 
  117 | // ────────────────────────────────────────────────────────
  118 | // 4. Utkast – kun Rediger og Slett
  119 | // ────────────────────────────────────────────────────────
  120 | test.describe('Handlinger – utkast', () => {
  121 |   test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });
  122 | 
  123 |   test('Viser kun Rediger og Slett for utkast', async ({ page }) => {
  124 |     await gotoApp(page, '/stilling/utkastStilling');
  125 | 
  126 |     await expect(knapp(page, 'Rediger')).toBeVisible();
  127 |     // Slett vises både i handlingsraden og i utkast-innholdet
  128 |     await expect(knapp(page, 'Slett')).toBeVisible();
  129 |   });
  130 | 
  131 |   test('Viser ikke Pause, Fullfør, Forleng, Dupliser for utkast', async ({
  132 |     page,
  133 |   }) => {
  134 |     await gotoApp(page, '/stilling/utkastStilling');
  135 | 
  136 |     await expect(knapp(page, 'Pause')).toBeHidden();
  137 |     await expect(knapp(page, 'Fullfør')).toBeHidden();
```