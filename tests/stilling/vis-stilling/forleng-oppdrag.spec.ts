import { gotoApp } from '@/tests/gotoApp';
import { type Page, expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

/** Finn handlingsknapp – enten direkte synlig eller inne i overflow-dropdown. */
async function finnHandlingsknapp(page: Page, knappNavn: string) {
  const main = page.locator('main');
  const direkteKnapp = main
    .getByRole('button', { name: knappNavn, exact: true })
    .first();

  const overflowKnapp = main
    .getByRole('button', { name: 'Flere handlinger' })
    .first();

  try {
    await expect(direkteKnapp.or(overflowKnapp)).toBeVisible({
      timeout: 15000,
    });
  } catch {
    return direkteKnapp;
  }

  if (await direkteKnapp.isVisible()) return direkteKnapp;

  await overflowKnapp.click();
  const menyKnapp = page
    .getByRole('button', { name: knappNavn, exact: true })
    .first();
  await expect(menyKnapp).toBeVisible();
  return menyKnapp;
}

// ────────────────────────────────────────────────────────
// Forleng oppdrag – kandidatliste med LUKKET status
// Verifiserer at setKandidatlisteStatus kalles med ÅPEN
// ────────────────────────────────────────────────────────
test.describe('Forleng oppdrag – åpner lukket kandidatliste', () => {
  test('Ved forlengelse av utløpt stilling med lukket kandidatliste kalles status-endepunktet for å åpne listen', async ({
    page,
  }) => {
    // Overstyr kandidatlisteInfo til å returnere LUKKET
    await page.route('**/api/kandidat/veileder/stilling/*/kandidatlisteinfo', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          kandidatlisteId: 'test-kandidatliste-id',
          antallKandidater: 5,
          kandidatlisteStatus: 'LUKKET',
          opprettetDato: '2025-11-27T10:16:30.499+01:00',
          eier: 'Z993141',
          orgnr: '123456789',
        }),
      }),
    );

    let statusKallMottatt = false;
    let statusKallBody: Record<string, unknown> | null = null;
    let statusKallUrl = '';

    await page.route(
      '**/api/kandidat/veileder/kandidatlister/*/status',
      async (route) => {
        statusKallMottatt = true;
        statusKallUrl = route.request().url();

        const postData = route.request().postData();
        if (postData) {
          statusKallBody = JSON.parse(postData);
        }

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 'ok' }),
        });
      },
    );

    await gotoApp(page, '/stilling/utloptStilling');

    const forlengKnapp = await finnHandlingsknapp(page, 'Forleng');
    await forlengKnapp.click();

    await expect(
      page.getByRole('heading', { name: 'Forlenge oppdraget' }),
    ).toBeVisible();

    const visningsdatoInput = page.getByRole('textbox', {
      name: 'Siste visningsdato',
    });
    await visningsdatoInput.click();
    await visningsdatoInput.clear();
    await visningsdatoInput.fill('01.01.2050');

    const etterAvtaleCheckbox = page.getByRole('checkbox', {
      name: 'Etter avtale',
    });
    if (!(await etterAvtaleCheckbox.isChecked())) {
      await etterAvtaleCheckbox.check();
    }

    const snarestCheckbox = page.getByRole('checkbox', { name: 'Snarest' });
    if (!(await snarestCheckbox.isChecked())) {
      await snarestCheckbox.check();
    }

    const publiserKnapp = page.getByRole('button', { name: 'Publiser' });
    await publiserKnapp.click();

    await expect
      .poll(() => statusKallMottatt, {
        message:
          'setKandidatlisteStatus-endepunktet ble aldri kalt – lukket liste ble ikke åpnet',
        timeout: 15000,
      })
      .toBe(true);

    expect(statusKallBody).toEqual({ status: 'ÅPEN' });
    expect(statusKallUrl).toContain('test-kandidatliste-id');
  });

  test('Ved forlengelse av stilling med ÅPEN kandidatliste kalles IKKE status-endepunktet', async ({
    page,
  }) => {
    // kandidatlisteInfo er ÅPEN (default fra MSW – ikke overstyr)

    let statusKallMottatt = false;

    await page.route(
      '**/api/kandidat/veileder/kandidatlister/*/status',
      async (route) => {
        statusKallMottatt = true;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ status: 'ok' }),
        });
      },
    );

    await gotoApp(page, '/stilling/utloptStilling');

    const forlengKnapp = await finnHandlingsknapp(page, 'Forleng');
    await forlengKnapp.click();

    await expect(
      page.getByRole('heading', { name: 'Forlenge oppdraget' }),
    ).toBeVisible();

    const visningsdatoInput = page.getByRole('textbox', {
      name: 'Siste visningsdato',
    });
    await visningsdatoInput.click();
    await visningsdatoInput.clear();
    await visningsdatoInput.fill('01.01.2050');

    const etterAvtaleCheckbox = page.getByRole('checkbox', {
      name: 'Etter avtale',
    });
    if (!(await etterAvtaleCheckbox.isChecked())) {
      await etterAvtaleCheckbox.check();
    }

    const snarestCheckbox = page.getByRole('checkbox', { name: 'Snarest' });
    if (!(await snarestCheckbox.isChecked())) {
      await snarestCheckbox.check();
    }

    const publiserKnapp = page.getByRole('button', { name: 'Publiser' });
    await publiserKnapp.click();

    await page.waitForURL(/\/stilling\//, { timeout: 15000 });

    await page.waitForTimeout(1000);

    expect(statusKallMottatt).toBe(false);
  });
});

// ────────────────────────────────────────────────────────
// Forleng oppdrag – dialogen åpnes korrekt
// ────────────────────────────────────────────────────────
test.describe('Forleng oppdrag – dialog', () => {
  test('Forleng-knapp åpner dialog med riktige felter', async ({ page }) => {
    await gotoApp(page, '/stilling/utloptStilling');

    const forlengKnapp = await finnHandlingsknapp(page, 'Forleng');
    await forlengKnapp.click();

    // Dialogen er synlig
    await expect(
      page.getByRole('heading', { name: 'Forlenge oppdraget' }),
    ).toBeVisible();

    // Felter finnes
    await expect(
      page.getByRole('textbox', { name: 'Siste visningsdato' }),
    ).toBeVisible();
    await expect(
      page.getByRole('textbox', { name: 'Oppstart' }),
    ).toBeVisible();
    await expect(
      page.getByRole('textbox', { name: 'Søknadsfrist' }),
    ).toBeVisible();

    // Checkboxer finnes
    await expect(
      page.getByRole('checkbox', { name: 'Etter avtale' }),
    ).toBeVisible();
    await expect(
      page.getByRole('checkbox', { name: 'Snarest' }),
    ).toBeVisible();

    // Knapper
    await expect(
      page.getByRole('button', { name: 'Publiser' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
  });

  test('Avbryt lukker dialogen uten sideeffekter', async ({ page }) => {
    await gotoApp(page, '/stilling/utloptStilling');

    const forlengKnapp = await finnHandlingsknapp(page, 'Forleng');
    await forlengKnapp.click();

    await expect(
      page.getByRole('heading', { name: 'Forlenge oppdraget' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Avbryt' }).click();

    await expect(
      page.getByRole('heading', { name: 'Forlenge oppdraget' }),
    ).toBeHidden();
  });
});

