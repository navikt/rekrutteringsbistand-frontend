import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, Page, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Kandidatliste – visning inne i stilling
// ────────────────────────────────────────────────────────
test.describe('Kandidatliste', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling');
    await page.getByRole('tab', { name: 'Jobbsøkere (300)' }).click();
  });

  test('Viser kandidater i listen', async ({ page }) => {
    await expect(page.getByTestId('stillings-kort').first()).toBeVisible();
  });

  test('Viser søkefelt for kandidatfiltrering', async ({ page }) => {
    await expect(page.getByPlaceholder('Søk i kandidatene')).toBeVisible();
  });

  test('Viser filter for hendelse og intern status', async ({ page }) => {
    await expect(
      page.getByText('Hendelse', { exact: true }).first(),
    ).toBeVisible();
    await expect(page.getByText('Intern status').first()).toBeVisible();
  });

  test('Viser Vis slettede-bryter', async ({ page }) => {
    await expect(page.getByText('Vis slettede')).toBeVisible();
  });

  test('Viser handlingsknapper for kandidater', async ({ page }) => {
    await expect(page.getByText('Spør om å dele CV')).toBeVisible();
    await expect(page.getByText('Del CV med arbeidsgiver')).toBeVisible();
    await expect(page.getByText('Send tips')).toBeVisible();
  });

  test('Viser sorterbare kolonneoverskrifter', async ({ page }) => {
    const main = page.locator('main');
    await expect(main.getByRole('button', { name: 'Navn' })).toBeVisible();
    await expect(main.getByRole('button', { name: 'Lagt til' })).toBeVisible();
    await expect(
      main.getByRole('button', { name: 'Siste hendelse' }),
    ).toBeVisible();
  });

  test('Viser usynlig kandidat', async ({ page }) => {
    await expect(page.getByText('Usynlig kandidat')).toBeVisible();
  });

  test('Kan markere alle kandidater', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', {
      name: 'Marker alle på siden',
      exact: true,
    });

    await checkbox.check();

    await expect(
      page.getByRole('checkbox', { name: /^Fjern markerte \(\d+\)$/ }),
    ).toBeChecked();
  });

  test('Viser "Legg til jobbsøker"-dropdown med valg', async ({ page }) => {
    const knapp = page.getByRole('button', { name: 'Legg til jobbsøker' });
    await expect(knapp).toBeVisible();

    await knapp.click();

    await expect(
      page.getByRole('menuitem', { name: 'Finn jobbsøker' }),
    ).toBeVisible();
    await expect(
      page.getByRole('menuitem', { name: 'Legg til via fødselsnummer' }),
    ).toBeVisible();
  });

  test('Kan åpne "Legg til via fødselsnummer"-dialog fra menyen', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Legg til jobbsøker' }).click();
    await page
      .getByRole('menuitem', { name: 'Legg til via fødselsnummer' })
      .click();

    await expect(
      page.getByRole('textbox', { name: 'Fødselsnummer på jobbsøker' }),
    ).toBeVisible();
  });

  snapshotTest(test);
});

// ────────────────────────────────────────────────────────
// Kandidatliste – del CV med arbeidsgiver
// ────────────────────────────────────────────────────────
test.describe('Del CV med arbeidsgiver', () => {
  const DEL_CV_ENDEPUNKT =
    '**/api/kandidat/veileder/kandidatlister/*/deltekandidater';

  const åpneDialog = async (page: Page) => {
    await page
      .getByRole('checkbox', { name: 'Marker alle på siden', exact: true })
      .check();
    await page.getByRole('button', { name: /Del CV med arbeidsgiver/ }).click();
    const dialog = page.getByRole('dialog', { name: 'Del med arbeidsgiver' });
    await expect(dialog).toBeVisible();
    return dialog;
  };

  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling');
    await page.getByRole('tab', { name: 'Jobbsøkere (300)' }).click();
  });

  test('Åpner dialog og lukker med Avbryt', async ({ page }) => {
    const dialog = await åpneDialog(page);

    await dialog.getByRole('button', { name: 'Vis kandidater' }).click();
    await expect(dialog.getByRole('table')).toBeVisible();

    await dialog.getByRole('button', { name: 'Avbryt' }).click();
    await expect(dialog).toBeHidden();
  });

  test('Forhåndsvisning erstatter plassholdere og viser hele e-posten', async ({
    page,
  }) => {
    const dialog = await åpneDialog(page);
    await dialog.getByRole('button', { name: 'Forhåndsvis e-posten' }).click();

    const iframe = dialog.locator('iframe[title="forhåndsvisning"]');
    const iframeRamme = iframe.contentFrame();

    await expect(iframeRamme.locator('#tittel')).not.toHaveText(
      'stillingstittel',
    );
    await expect(iframeRamme.locator('#stillingstittel')).not.toHaveText(
      'stillingstittel',
    );
    await expect(iframeRamme.locator('#avsender')).not.toHaveText('avsender');
    await expect(iframeRamme.locator('#avsender')).not.toBeEmpty();

    // Iframen skal ha høyde etter innholdet, uten intern scroll eller avkutting
    await expect
      .poll(() =>
        iframeRamme
          .locator('body')
          .evaluate(
            (body) => body.getBoundingClientRect().bottom <= window.innerHeight,
          ),
      )
      .toBe(true);
    await expect
      .poll(() => iframe.evaluate((el) => el.getBoundingClientRect().height))
      .toBeGreaterThan(0);
  });

  test('Deler kandidater og lukker dialogen ved suksess', async ({ page }) => {
    let body: Record<string, unknown> | null = null;
    await page.route(DEL_CV_ENDEPUNKT, async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{}',
      });
    });

    const dialog = await åpneDialog(page);
    await dialog.getByRole('button', { name: 'Del kandidatene' }).click();

    await expect(dialog).toBeHidden();
    expect(body).toMatchObject({
      epostTekst: '',
      epostMottakere: expect.any(Array),
      kandidater: expect.any(Array),
    });
  });

  test('Viser feilmelding og holder dialogen åpen ved feil', async ({
    page,
  }) => {
    await page.route(DEL_CV_ENDEPUNKT, (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Noe gikk galt' }),
      }),
    );

    const dialog = await åpneDialog(page);
    await dialog.getByRole('button', { name: 'Del kandidatene' }).click();

    await expect(
      dialog.getByText(/Kunne ikke dele kandidatene med arbeidsgiver/),
    ).toBeVisible({ timeout: 15000 });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Avbryt' })).toBeEnabled();
    await dialog.getByRole('button', { name: 'Avbryt' }).click();
    await expect(dialog).toBeHidden();
  });

  test('Dialogen kan ikke lukkes mens deling pågår', async ({ page }) => {
    let fullfør!: () => void;
    const venter = new Promise<void>((resolve) => (fullfør = resolve));
    await page.route(DEL_CV_ENDEPUNKT, async (route) => {
      await venter;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{}',
      });
    });

    const dialog = await åpneDialog(page);
    await dialog.getByRole('button', { name: 'Del kandidatene' }).click();

    await expect(dialog.getByRole('button', { name: 'Avbryt' })).toBeDisabled();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeVisible();

    fullfør();
    await expect(dialog).toBeHidden();
  });
});

// ────────────────────────────────────────────────────────
// Kandidatliste – paginering
// ────────────────────────────────────────────────────────
// TODO: Aktiver igjen når paginering for kandidatliste er skrudd på
test.describe.skip('Kandidatliste paginering', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/stilling/minStilling');
    await page.getByRole('tab', { name: 'Jobbsøkere (300)' }).click();
  });

  test('Viser pagineringsinfo med riktig tekst', async ({ page }) => {
    await expect(page.getByText('1-25 av 300')).toBeVisible();
  });

  test('Forrige side-knapp er deaktivert på første side', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Forrige side' }),
    ).toBeDisabled();
  });

  test('Navigerer til neste side', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page.getByText('26-50 av 300')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Forrige side' }),
    ).toBeEnabled();
  });

  test('Navigerer tilbake til forrige side', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page.getByText('26-50 av 300')).toBeVisible();

    await page.getByRole('button', { name: 'Forrige side' }).click();
    await expect(page.getByText('1-25 av 300')).toBeVisible();
  });

  test('Endrer antall per side', async ({ page }) => {
    await page.getByLabel('Antall per side').selectOption('50');
    await expect(page.getByText('1-50 av 300')).toBeVisible();
  });

  test('Endrer antall per side tilbakestiller til side 1', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page.getByText('26-50 av 300')).toBeVisible();

    await page.getByLabel('Antall per side').selectOption('50');
    await expect(page.getByText('1-50 av 300')).toBeVisible();
  });

  test('Oppdaterer URL med sideparameter', async ({ page }) => {
    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(page).toHaveURL(/side=2/);
  });

  test('Oppdaterer URL med antall-parameter', async ({ page }) => {
    await page.getByLabel('Antall per side').selectOption('50');
    await expect(page).toHaveURL(/kandidatlisteAntall=50/);
  });
});
