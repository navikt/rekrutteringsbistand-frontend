# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: rekrutteringstreff/eier-og-kontor.spec.ts >> søk viser flere eiere med felles kontor og navnefallback
- Location: tests/rekrutteringstreff/eier-og-kontor.spec.ts:50:7

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByRole('tooltip')
Expected: "B654321 · Nav Kongsvinger"
Error: strict mode violation: getByRole('tooltip') resolved to 2 elements:
    1) <div id="_r_1q_" tabindex="-1" role="tooltip" data-side="top" data-state="open" data-floating-ui-focusable="" class="aksel-tooltip aksel-detail aksel-detail--small">…</div> aka getByRole('tooltip', { name: 'A123456 · Kari Testesen · Nav' })
    2) <div id="_r_1s_" tabindex="-1" role="tooltip" data-side="top" data-state="open" data-floating-ui-focusable="" class="aksel-tooltip aksel-detail aksel-detail--small">…</div> aka getByRole('tooltip', { name: 'B654321 · Nav Kongsvinger' })

Call log:
  - Expect "toHaveText" getByRole('tooltip') with timeout 5000ms
  - waiting for getByRole('tooltip')

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
            - button "Nyheter" [ref=e65] [cursor=pointer]
            - button "Gi tilbakemelding" [ref=e70] [cursor=pointer]
            - button "Innstillinger" [ref=e75] [cursor=pointer]
      - main [ref=e80]:
        - generic [ref=e83]:
          - generic [ref=e89]:
            - navigation "Brødsmulesti" [ref=e93]:
              - list [ref=e94]:
                - listitem [ref=e95]:
                  - link [disabled] [ref=e96]
            - generic [ref=e101]:
              - button "Nytt WorkOp" [ref=e102] [cursor=pointer]
              - button "Nytt rekrutteringstreff" [ref=e104] [cursor=pointer]
          - generic [ref=e106]:
            - complementary "Sidepanel" [ref=e107]:
              - generic [ref=e110]:
                - generic [ref=e111]:
                  - generic [ref=e112]: Søk i treff
                  - generic [ref=e113]:
                    - searchbox "Søk i treff" [ref=e115]
                    - button [ref=e116] [cursor=pointer]:
                      - img "Søk" [ref=e118]
                - radiogroup "Sorter" [ref=e120]:
                  - generic [ref=e122]:
                    - generic [ref=e123]:
                      - radio "Sist oppdaterte" [checked] [ref=e124] [cursor=pointer]
                      - generic [ref=e125] [cursor=pointer]: Sist oppdaterte
                    - generic [ref=e126]:
                      - radio "Nyeste" [ref=e127] [cursor=pointer]
                      - generic [ref=e128] [cursor=pointer]: Nyeste
                    - generic [ref=e129]:
                      - radio "Eldste" [ref=e130] [cursor=pointer]
                      - generic [ref=e131] [cursor=pointer]: Eldste
                - group "Status" [ref=e132]:
                  - generic [ref=e135]:
                    - generic [ref=e136]:
                      - checkbox "Utkast (10)" [ref=e138] [cursor=pointer]
                      - generic [ref=e139] [cursor=pointer]: Utkast (10)
                    - generic [ref=e140]:
                      - checkbox "Publisert (15)" [ref=e142] [cursor=pointer]
                      - generic [ref=e143] [cursor=pointer]: Publisert (15)
                    - generic [ref=e144]:
                      - checkbox "Fullført (9)" [ref=e146] [cursor=pointer]
                      - generic [ref=e147] [cursor=pointer]: Fullført (9)
                    - generic [ref=e148]:
                      - checkbox "Avlyst (9)" [ref=e150] [cursor=pointer]
                      - generic [ref=e151] [cursor=pointer]: Avlyst (9)
                - group "Område" [ref=e152]:
                  - generic [ref=e154]:
                    - generic [ref=e155]:
                      - checkbox "Agder (3)" [ref=e157] [cursor=pointer]
                      - generic [ref=e158] [cursor=pointer]: Agder (3)
                    - generic [ref=e159]:
                      - checkbox "Akershus (5)" [ref=e161] [cursor=pointer]
                      - generic [ref=e162] [cursor=pointer]: Akershus (5)
                    - generic [ref=e163]:
                      - checkbox "Buskerud (0)" [ref=e165] [cursor=pointer]
                      - generic [ref=e166] [cursor=pointer]: Buskerud (0)
                    - generic [ref=e167]:
                      - checkbox "Finnmark (0)" [ref=e169] [cursor=pointer]
                      - generic [ref=e170] [cursor=pointer]: Finnmark (0)
                    - generic [ref=e171]:
                      - checkbox "Innlandet (0)" [ref=e173] [cursor=pointer]
                      - generic [ref=e174] [cursor=pointer]: Innlandet (0)
                    - generic [ref=e175]:
                      - checkbox "Jan Mayen (0)" [ref=e177] [cursor=pointer]
                      - generic [ref=e178] [cursor=pointer]: Jan Mayen (0)
                    - generic [ref=e179]:
                      - checkbox "Kontinentalsokkelen (0)" [ref=e181] [cursor=pointer]
                      - generic [ref=e182] [cursor=pointer]: Kontinentalsokkelen (0)
                    - generic [ref=e183]:
                      - checkbox "Møre og Romsdal (0)" [ref=e185] [cursor=pointer]
                      - generic [ref=e186] [cursor=pointer]: Møre og Romsdal (0)
                    - generic [ref=e187]:
                      - checkbox "Nordland (0)" [ref=e189] [cursor=pointer]
                      - generic [ref=e190] [cursor=pointer]: Nordland (0)
                    - generic [ref=e191]:
                      - checkbox "Oslo (8)" [ref=e193] [cursor=pointer]
                      - generic [ref=e194] [cursor=pointer]: Oslo (8)
                    - generic [ref=e195]:
                      - checkbox "Østfold (0)" [ref=e197] [cursor=pointer]
                      - generic [ref=e198] [cursor=pointer]: Østfold (0)
                    - generic [ref=e199]:
                      - checkbox "Rogaland (0)" [ref=e201] [cursor=pointer]
                      - generic [ref=e202] [cursor=pointer]: Rogaland (0)
                    - generic [ref=e203]:
                      - checkbox "Svalbard (0)" [ref=e205] [cursor=pointer]
                      - generic [ref=e206] [cursor=pointer]: Svalbard (0)
                    - generic [ref=e207]:
                      - checkbox "Telemark (0)" [ref=e209] [cursor=pointer]
                      - generic [ref=e210] [cursor=pointer]: Telemark (0)
                    - generic [ref=e211]:
                      - checkbox "Troms (0)" [ref=e213] [cursor=pointer]
                      - generic [ref=e214] [cursor=pointer]: Troms (0)
                    - generic [ref=e215]:
                      - checkbox "Trøndelag (0)" [ref=e217] [cursor=pointer]
                      - generic [ref=e218] [cursor=pointer]: Trøndelag (0)
                    - generic [ref=e219]:
                      - checkbox "Vestfold (0)" [ref=e221] [cursor=pointer]
                      - generic [ref=e222] [cursor=pointer]: Vestfold (0)
                    - generic [ref=e223]:
                      - checkbox "Vestland (6)" [ref=e225] [cursor=pointer]
                      - generic [ref=e226] [cursor=pointer]: Vestland (6)
            - generic [ref=e228]:
              - generic [ref=e229]:
                - generic [ref=e230]:
                  - button "Alle" [ref=e231] [cursor=pointer]
                  - button "Mine" [ref=e233] [cursor=pointer]
                  - button "Mitt kontor" [ref=e235] [cursor=pointer]
                  - button "Velg kontor" [ref=e237] [cursor=pointer]
                - generic [ref=e240]:
                  - text: 1-1 av 1
                  - button "Forrige side" [disabled] [ref=e241]
                  - button "Neste side" [disabled] [ref=e245]
              - generic [ref=e251] [cursor=pointer]:
                - generic [ref=e252]:
                  - heading [level=2] [ref=e253]:
                    - link "Eierstruktur" [ref=e254]:
                      - /url: /rekrutteringstreff/publisert
                  - generic [ref=e257]: Utkast
                - group "Eiere, kontorer og opprettelsesdato" [ref=e259]:
                  - group "Eiere og kontorer" [ref=e260]:
                    - list "Eiere" [ref=e261]:
                      - listitem [ref=e262]:
                        - img "A123456 · Kari Testesen · Nav Grünerløkka" [ref=e263]:
                          - generic [ref=e264]: KT
                      - listitem [ref=e265]:
                        - img "B654321 · Nav Kongsvinger" [active] [ref=e266]:
                          - generic [ref=e267]: B
                      - listitem [ref=e268]:
                        - img "TestIdent · Kari Testesen · Nav Grünerløkka" [ref=e269]:
                          - generic [ref=e270]: KT
                    - generic [ref=e271]: Nav Grünerløkka, Nav Kongsvinger
                  - generic [aria-hidden] [ref=e272]: •
                  - generic [ref=e273]: Opprettet 01.01.2026
                - generic [ref=e274]:
                  - generic [ref=e275]: Ukjent dato
                  - generic [ref=e278]: "Arbeidsgivere: 0"
                  - generic [ref=e279]: "Jobbsøkere: 0"
                  - generic [ref=e280]: "Fått jobb: 0"
  - tooltip "B654321 · Nav Kongsvinger" [ref=e281]
```

# Test source

```ts
  1   | import { decoratorMock } from '@/app/api/modia/decorator/mocks/dekoratørMock';
  2   | import { rekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';
  3   | import type { EierOgKontor } from '@/app/api/rekrutteringstreff/eierOgKontor';
  4   | import { byggSokRespons } from '@/app/api/rekrutteringstreff/sok/rekrutteringstreffSokMock';
  5   | import { gotoApp } from '@/tests/gotoApp';
  6   | import { eierOgKontorTilfeller } from '@/tests/rekrutteringstreff/eierOgKontorTestdata';
  7   | import { expect, type Page, test } from '@playwright/test';
  8   | 
  9   | test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });
  10  | 
  11  | async function mockEiere(page: Page, eierOgKontor: EierOgKontor[]) {
  12  |   const eierfelt = {
  13  |     eierOgKontor,
  14  |     eiere: ['GammelEier'],
  15  |     kontorer: ['9999'],
  16  |   };
  17  |   await page.route('**/api/rekrutteringstreff/publisert', (route) =>
  18  |     route.fulfill({
  19  |       json: {
  20  |         ...rekrutteringstreffMock('publisert'),
  21  |         ...eierfelt,
  22  |         tittel: 'Eierstruktur',
  23  |       },
  24  |     }),
  25  |   );
  26  |   await page.route('**/api/rekrutteringstreff/sok*', (route) => {
  27  |     const sok = byggSokRespons({ side: 1, antallPerSide: 20 });
  28  |     return route.fulfill({
  29  |       json: {
  30  |         ...sok,
  31  |         antallTotalt: 1,
  32  |         treff: [
  33  |           {
  34  |             ...sok.treff[0],
  35  |             ...eierfelt,
  36  |             id: 'publisert',
  37  |             tittel: 'Eierstruktur',
  38  |             opprettetAv: 'GammelEier',
  39  |           },
  40  |         ],
  41  |       },
  42  |     });
  43  |   });
  44  | }
  45  | 
  46  | for (const { flate, sti } of [
  47  |   { flate: 'detalj', sti: '/rekrutteringstreff/publisert' },
  48  |   { flate: 'søk', sti: '/rekrutteringstreff' },
  49  | ]) {
  50  |   test(`${flate} viser flere eiere med felles kontor og navnefallback`, async ({
  51  |     page,
  52  |   }) => {
  53  |     await mockEiere(page, eierOgKontorTilfeller[0].eierOgKontor);
  54  |     await gotoApp(page, sti);
  55  | 
  56  |     const eierinfo = page.getByRole('group', {
  57  |       name: 'Eiere, kontorer og opprettelsesdato',
  58  |     });
  59  |     const avatarer = eierinfo.getByRole('img');
  60  |     await expect(avatarer).toHaveText(['KT', 'B', 'KT']);
  61  |     await expect(
  62  |       eierinfo.getByText('Nav Grünerløkka, Nav Kongsvinger', { exact: true }),
  63  |     ).toBeVisible();
  64  |     await expect(eierinfo.getByText(/^Opprettet /)).toBeVisible();
  65  | 
  66  |     await avatarer.first().focus();
  67  |     await expect(page.getByRole('tooltip')).toHaveText(
  68  |       'A123456 · Kari Testesen · Nav Grünerløkka',
  69  |     );
  70  |     await page.keyboard.press('Tab');
  71  |     await expect(avatarer.nth(1)).toBeFocused();
> 72  |     await expect(page.getByRole('tooltip')).toHaveText(
      |                                             ^ Error: expect(locator).toHaveText(expected) failed
  73  |       'B654321 · Nav Kongsvinger',
  74  |     );
  75  |     await page.keyboard.press('Escape');
  76  |     await expect(page.getByRole('tooltip')).toHaveCount(0);
  77  | 
  78  |     if (flate === 'søk') {
  79  |       await page
  80  |         .getByRole('link', { name: 'Eierstruktur', exact: true })
  81  |         .click();
  82  |       await expect(page).toHaveURL(/\/rekrutteringstreff\/publisert$/);
  83  |     }
  84  |   });
  85  | 
  86  |   test(`${flate} håndterer tom eierliste`, async ({ page }) => {
  87  |     await mockEiere(page, []);
  88  |     await gotoApp(page, sti);
  89  | 
  90  |     await expect(
  91  |       page.getByRole('heading', { name: 'Eierstruktur', exact: true }),
  92  |     ).toBeVisible();
  93  |     await expect(
  94  |       page.getByText(/GammelEier|Udefinert Nav-kontor| · Nav /),
  95  |     ).toHaveCount(0);
  96  |     const eierinfo = page.getByRole('group', {
  97  |       name: 'Eiere, kontorer og opprettelsesdato',
  98  |     });
  99  |     await expect(eierinfo).toHaveText(/^Opprettet [^•]+$/);
  100 |     await expect(eierinfo.getByRole('list', { name: 'Eiere' })).toHaveCount(0);
  101 |     if (flate === 'detalj') {
  102 |       await expect(
  103 |         page.getByRole('button', { name: 'Rediger', exact: true }),
  104 |       ).toHaveCount(0);
  105 |     }
  106 |   });
  107 | }
  108 | 
  109 | test('kontortilhørighet bruker eierobjektene for formidling og medeierdialog', async ({
  110 |   page,
  111 | }) => {
  112 |   await page.route('**/api/modia/decorator', (route) =>
  113 |     route.fulfill({
  114 |       json: {
  115 |         ...decoratorMock,
  116 |         enheter: [{ enhetId: '1001', navn: 'Nav Kristiansand' }],
  117 |       },
  118 |     }),
  119 |   );
  120 |   await mockEiere(page, [
  121 |     { navIdent: 'A123456', eierNavn: 'Kari Testesen', kontorEnhetId: '1001' },
  122 |     { navIdent: 'B654321', eierNavn: null, kontorEnhetId: '1001' },
  123 |   ]);
  124 |   const formidlinger = page.waitForRequest(
  125 |     '**/publisert/formidling/liste/alle',
  126 |   );
  127 |   const jobbsøkere = page.waitForRequest(
  128 |     '**/publisert/jobbsoker/formidling/alle',
  129 |   );
  130 |   await gotoApp(page, '/rekrutteringstreff/publisert');
  131 |   await Promise.all([formidlinger, jobbsøkere]);
  132 |   await expect(
  133 |     page.getByRole('tab', { name: 'Formidlinger (4)' }),
  134 |   ).toBeVisible();
  135 |   await expect(
  136 |     page.getByRole('button', { name: 'Rediger', exact: true }),
  137 |   ).toHaveCount(0);
  138 |   const enhetsmeny = page.getByRole('button', { name: /Enhet:/ });
  139 |   await enhetsmeny.click();
  140 |   await page
  141 |     .getByRole('button', { name: 'Nav Kristiansand', exact: true })
  142 |     .click();
  143 |   await expect(enhetsmeny).toHaveAccessibleName(/Enhet: Nav Kristiansand/);
  144 |   await page.getByRole('button', { name: 'Legg til meg som medeier' }).click();
  145 |   await expect(
  146 |     page
  147 |       .getByRole('dialog')
  148 |       .getByText(
  149 |         'Kontoret ditt (Nav Kristiansand) er allerede knyttet til treffet.',
  150 |       ),
  151 |   ).toBeVisible();
  152 | });
  153 | 
```