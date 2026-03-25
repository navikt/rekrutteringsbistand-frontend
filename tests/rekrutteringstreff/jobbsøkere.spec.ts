import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Jobbsøkere-fane for publisert treff', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  });

  test('Viser jobbsøkere i listen', async ({ page }) => {
    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('Håkon Pettersen').first()).toBeVisible();
    await expect(page.getByText('Jonathan Huseby').first()).toBeVisible();
  });

  test('Viser statustagg for jobbsøkere', async ({ page }) => {
    await expect(page.getByText('Lagt til').first()).toBeVisible();
  });

  test('Viser "Legg til jobbsøker"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: /Legg til jobbsøker/ }),
    ).toBeVisible();
  });

  test('Viser "Fjern markering"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Fjern markering' }),
    ).toBeVisible();
  });

  test('Viser Inviter-knapp som er deaktivert uten valg', async ({ page }) => {
    const inviterKnapp = page.getByRole('button', {
      name: /Inviter \(0\)/,
    });
    await expect(inviterKnapp).toBeVisible();
    await expect(inviterKnapp).toBeDisabled();
  });

  test('Viser Slett-knapp for jobbsøker med status LAGT_TIL', async ({
    page,
  }) => {
    const mariusKort = page.getByText('Marius Johnsen').locator('..');
    await expect(
      mariusKort.locator('..').getByRole('button', { name: 'Slett' }),
    ).toBeVisible();
  });

  test('Viser Inviter-knapp ved enkelt jobbsøker med status LAGT_TIL', async ({
    page,
  }) => {
    const mariusKort = page.getByText('Marius Johnsen').locator('..');
    await expect(
      mariusKort.locator('..').getByRole('button', { name: 'Inviter' }),
    ).toBeVisible();
  });

  test('Klikk på Slett åpner modal uten å navigere vekk', async ({ page }) => {
    const slettKnapp = page
      .getByText('Marius Johnsen')
      .locator('..')
      .locator('..')
      .getByRole('button', { name: 'Slett' });

    await slettKnapp.click();

    await expect(
      page.getByRole('heading', { name: 'Slett jobbsøker' }),
    ).toBeVisible();
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  });

  test('Klikk på Inviter åpner modal uten å navigere vekk', async ({
    page,
  }) => {
    const inviterKnapp = page
      .getByText('Marius Johnsen')
      .locator('..')
      .locator('..')
      .getByRole('button', { name: 'Inviter' });

    await inviterKnapp.click();

    await expect(
      page.getByRole('heading', { name: 'Inviter jobbsøker' }),
    ).toBeVisible();
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  });

  test('Klikk på Avbryt i slett-modal lukker modal uten å navigere vekk', async ({
    page,
  }) => {
    const slettKnapp = page
      .getByText('Marius Johnsen')
      .locator('..')
      .locator('..')
      .getByRole('button', { name: 'Slett' });

    await slettKnapp.click();
    await expect(
      page.getByRole('heading', { name: 'Slett jobbsøker' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Avbryt' }).click();

    await expect(
      page.getByRole('heading', { name: 'Slett jobbsøker' }),
    ).not.toBeVisible();
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  });

  test('Viser veileder-informasjon på jobbsøkerkort', async ({ page }) => {
    await expect(
      page.getByText('Følges opp av', { exact: false }).first(),
    ).toBeVisible();
  });

  test('Kan markere jobbsøker med checkbox', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', {
      name: /Velg kandidat Marius Johnsen/,
    });
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();

    await checkbox.check();

    await expect(checkbox).toBeChecked();
  });

  test('Kan fjerne markering fra jobbsøker', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', {
      name: /Velg kandidat Marius Johnsen/,
    });
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();

    await expect(checkbox).not.toBeChecked();
  });

  test('Kan markere flere jobbsøkere og Inviter-knappen oppdateres', async ({
    page,
  }) => {
    await expect(
      page.getByRole('button', { name: 'Inviter (0)' }),
    ).toBeVisible();

    await page
      .getByRole('checkbox', { name: /Velg kandidat Marius Johnsen/ })
      .check();
    await expect(
      page.getByRole('button', { name: 'Inviter (1)' }),
    ).toBeVisible();

    await page
      .getByRole('checkbox', { name: /Velg kandidat Emilie Berg/ })
      .check();
    await expect(
      page.getByRole('button', { name: 'Inviter (2)' }),
    ).toBeVisible();

    await page
      .getByRole('checkbox', { name: /Velg kandidat Oscar Haugen/ })
      .check();
    await expect(
      page.getByRole('button', { name: 'Inviter (3)' }),
    ).toBeVisible();
  });

  test('Fjern all markering nullstiller valgte jobbsøkere', async ({
    page,
  }) => {
    const mariusCheckbox = page.getByRole('checkbox', {
      name: /Velg kandidat Marius Johnsen/,
    });
    await mariusCheckbox.check();
    await expect(mariusCheckbox).toBeChecked();

    await page.getByRole('button', { name: 'Fjern markering' }).click();

    await expect(mariusCheckbox).not.toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Inviter (0)' }),
    ).toBeVisible();
  });

  snapshotTest(test);
});
