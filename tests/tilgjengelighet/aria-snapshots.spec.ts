import { behovMetadataMock } from '@/app/api/rekrutteringstreff/arbeidsgiver-behov-metadata/useBehovMetadata';
import { PLAYWRIGHT_MSW_SCOPE_COOKIE } from '@/app/api/rekrutteringstreff/mswScope';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// Aria-snapshots av små komponenter og tilstander. Endringer i navn, roller
// og overskrifter blir synlige i review. Oppdater med `--update-snapshots`.
test.describe('Aria-snapshots', { tag: '@a11y' }, () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'chromium-desktop',
      'Aria-snapshots kjøres bare i chromium-desktop',
    );
    await page.context().addCookies([
      {
        name: PLAYWRIGHT_MSW_SCOPE_COOKIE,
        value: encodeURIComponent(testInfo.testId),
        domain: 'localhost',
        path: '/',
      },
    ]);
  });

  test.describe('Stillingssøk', () => {
    test.beforeEach(async ({ page }) => {
      await gotoApp(page, '/stilling');
      await expect(
        page.getByRole('heading', { name: 'Publisert stilling (intern)' }),
      ).toBeVisible({ timeout: 25000 });
    });

    test('stillingskort', async ({ page }) => {
      await expect(
        page.getByRole('link', { name: /Publisert stilling \(intern\)/ }),
      ).toMatchAriaSnapshot(`
        - link /^intern Publisert stilling \\(intern\\) Åpen for søkere .+ Mitt oppdrag Publisert for \\d+ dager siden/:
          - /url: /stilling/publisertStilling
          - img "intern"
          - heading "Publisert stilling (intern)" [level=1]
          - text: /Åpen for søkere .+/
          - paragraph: Mitt oppdrag
          - text: /Publisert for \\d+ dager siden \\(.+\\)/
      `);
    });

    test('resultatliste', async ({ page }) => {
      await expect(page.getByRole('main')).toMatchAriaSnapshot(`
        - button "Alle"
        - button "Mine"
        - button "Mitt kontor"
        - button "arbeidsplassen.no"
        - text: /\\d+-\\d+ av \\d+/
        - button "Forrige side" [disabled]
        - button "Neste side"
        - link /Publisert stilling \\(intern\\)/:
          - heading "Publisert stilling (intern)" [level=1]
        - link /Publisert stilling \\(arbeidsplassen\\.no\\)/:
          - heading "Publisert stilling (arbeidsplassen.no)" [level=1]
      `);
    });
  });

  test.describe('Jobbsøkersøk', () => {
    test.beforeEach(async ({ page, context }) => {
      await context.addInitScript(() =>
        sessionStorage.removeItem('markerte-kandidater'),
      );
      await gotoApp(page, '/kandidat');
      await expect(
        page.getByRole('heading', { name: 'Jensen, Andrea' }),
      ).toBeVisible({ timeout: 25000 });
    });

    test('kandidatkort', async ({ page }) => {
      await expect(
        page.getByTestId('stillings-kort').filter({
          has: page.getByRole('heading', { name: 'Jensen, Andrea' }),
        }),
      ).toMatchAriaSnapshot(`
        - checkbox "Velg kandidat Jensen, Andrea"
        - text: Velg kandidat Jensen, Andrea
        - link "Jensen, Andrea":
          - /url: /kandidat/kandidat-arenaKandidatnr-2
          - heading "Jensen, Andrea" [level=1]
        - text: /^Trenger veiledning .+/
      `);
    });

    test('resultatliste', async ({ page }) => {
      await expect(page.getByRole('main')).toMatchAriaSnapshot(`
        - checkbox "Marker alle på siden"
        - button "Lagre i kandidatliste" [disabled]
        - button "Lagre i rekrutteringstreff" [disabled]
        - text: /\\d+-\\d+ av \\d+/
        - button "Forrige side" [disabled]
        - button "Neste side" [disabled]
        - checkbox "Velg kandidat Jensen, Andrea"
        - link "Jensen, Andrea":
          - heading "Jensen, Andrea" [level=1]
        - checkbox "Velg kandidat Olsen, Lars"
        - link "Olsen, Lars":
          - heading "Olsen, Lars" [level=1]
      `);
    });

    test('dialogen «Lagre i kandidatliste»', async ({ page }) => {
      await page
        .getByRole('checkbox', { name: 'Velg kandidat Jensen, Andrea' })
        .check();
      await page
        .getByRole('button', { name: 'Lagre i kandidatliste', exact: true })
        .click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.getByRole('cell', { name: 'TEST.NO' })).toBeVisible();
      await expect(dialog.getByRole('img', { name: 'Laster...' })).toHaveCount(
        0,
      );
      await expect(dialog).toMatchAriaSnapshot(`
        - dialog "Lagre 1 kandidat i kandidatlister":
          - button "Lukk":
            - img "Lukk"
          - heading "Lagre 1 kandidat i kandidatlister" [level=1]
          - table:
            - rowgroup:
              - row "Velg alle rader Stilling Organisasjon Antall stillinger":
                - cell "Velg alle rader":
                  - checkbox "Velg alle rader"
                  - text: ""
                - columnheader "Stilling"
                - columnheader "Organisasjon"
                - columnheader "Antall stillinger"
            - rowgroup:
              - row /.+ TEST\\.NO 1/:
                - cell /.+/:
                  - checkbox /.+/
                - rowheader /.+/:
                  - link /.+/:
                    - /url: /stilling\\/[\\w-]+/
                - cell "TEST.NO"
                - cell "1"
          - navigation:
            - list:
              - listitem
              - listitem:
                - button "1"
              - listitem:
                - button "2"
              - listitem:
                - button "3"
              - listitem:
                - button "4"
              - listitem:
                - button "5"
              - listitem: ...
              - listitem:
                - button /\\d+/
              - listitem:
                - button "Neste":
                  - img "Neste"
          - button "Lagre" [disabled]
          - button "Avbryt"
      `);
    });
  });

  test.describe('Rekrutteringstreff', () => {
    test('treffkort', async ({ page }) => {
      await gotoApp(page, '/rekrutteringstreff');
      const kort = page.getByTestId('stillings-kort').filter({
        has: page.getByRole('heading', { name: 'Publisert', exact: true }),
      });
      await expect(kort).toBeVisible({ timeout: 25000 });
      await expect(kort).toMatchAriaSnapshot(`
        - heading "Publisert" [level=2]:
          - link "Publisert":
            - /url: /rekrutteringstreff/publisert
        - text: Publisert – åpen for søkere
        - group "Eiere, kontorer og opprettelsesdato":
          - group "Eiere og kontorer":
            - list "Eiere":
              - listitem:
                - img "TestIdent · Fornavn Etternavn · Nav Grünerløkka": FE
            - text: Nav Grünerløkka
          - text: /Opprettet \\d+\\.\\d+\\.\\d+/
        - text: '/\\d+\\.\\d+\\.\\d+ \\d+:\\d+–\\d+:\\d+ .+ Arbeidsgivere: \\d+ Jobbsøkere: \\d+ Fått jobb: \\d+/'
      `);
    });

    test('skjemaet for å legge til arbeidsgiver med feiloppsummering', async ({
      page,
    }) => {
      await page.route(
        '**/api/rekrutteringstreff/arbeidsgiver-behov-metadata',
        (route) =>
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(behovMetadataMock),
          }),
      );
      await gotoApp(page, '/rekrutteringstreff/publisert');
      await page
        .getByRole('button', { name: 'Legg til arbeidsgiver' })
        .click({ timeout: 25000 });
      const dialog = page.getByRole('dialog', {
        name: 'Legg til arbeidsgivere',
      });
      await dialog.getByLabel('Finn arbeidsgiver').fill('test');
      await dialog
        .getByRole('option', { name: /TEST PLUTSELIG KATT/i })
        .click();
      await dialog
        .getByRole('button', { name: 'Legg til', exact: true })
        .click();
      await expect(
        dialog.getByRole('heading', {
          name: 'Du må rette disse feilene før du kan fortsette:',
        }),
      ).toBeVisible();
      await expect(dialog).toMatchAriaSnapshot(`
        - dialog "Legg til arbeidsgivere":
          - button "Lukk":
            - img "Lukk"
          - heading "Legg til arbeidsgivere" [level=1]
          - heading "Test Plutselig Katt" [level=3]
          - paragraph: /Org\\.nr\\. \\d+ Øvre Høyrøa 9, \\d+ Søndre Bjørketunet/
          - button "Fjern TEST PLUTSELIG KATT"
          - heading "Dokumentasjon av rekrutteringsbehov" [level=3]
          - paragraph: Denne informasjonen er kun synlig for eier av rekrutteringstreffet og brukes til å dokumentere et konkret rekrutteringsbehov fra arbeidsgiver.
          - text: Antall stillinger Anslagsvis
          - textbox "Antall stillinger" [invalid]
          - paragraph: Oppgi antall stillinger
          - text: Hva arbeidsgiver leter etter Velg yrkestittel, fagbrev, førerkort, godkjenninger osv. (Du kan registrere flere ulike yrkestitler)
          - list:
            - listitem:
              - combobox "Hva arbeidsgiver leter etter" [invalid]
          - paragraph: Velg minst én kvalifikasjon arbeidsgiver leter etter
          - text: Språk Velg ett eller flere arbeidsspråk
          - list:
            - listitem:
              - combobox "Språk" [invalid]
          - paragraph: Velg minst ett arbeidsspråk
          - text: Ansettelsesform Fast, vikariat, sesong osv. (Du kan registrere flere ulike ansettelsesformer)
          - list:
            - listitem:
              - combobox "Ansettelsesform" [invalid]
          - paragraph: Velg minst én ansettelsesform
          - text: Personlige egenskaper (Valgfritt) Velg personlige egenskaper arbeidsgiver ser etter
          - list:
            - listitem:
              - combobox "Personlige egenskaper (Valgfritt)"
          - heading "Du må rette disse feilene før du kan fortsette:" [level=3]
          - list:
            - listitem:
              - link "Oppgi antall stillinger":
                - /url: /#.+-arbeidsgiver-behov-antall$/
            - listitem:
              - link "Velg minst én kvalifikasjon arbeidsgiver leter etter":
                - /url: /#.+-arbeidsgiver-behov-kvalifikasjoner$/
            - listitem:
              - link "Velg minst ett arbeidsspråk":
                - /url: /#.+-arbeidsgiver-behov-sprak$/
            - listitem:
              - link "Velg minst én ansettelsesform":
                - /url: /#.+-arbeidsgiver-behov-ansettelsesform$/
          - button "Avbryt"
          - button "Legg til"
      `);
    });
  });
});
