import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const REKRUTTERINGSTREFF_ID = 'publisert-finn-kandidater';

test.describe('Finn kandidater for rekrutteringstreff', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addInitScript(() =>
      sessionStorage.removeItem('markerte-kandidater'),
    );
    await gotoApp(
      page,
      `/rekrutteringstreff/${REKRUTTERINGSTREFF_ID}/finn-kandidater`,
    );
  });

  test('Viser kandidatkort med checkbox i søkeresultatet', async ({ page }) => {
    await expect(
      page.getByRole('checkbox', { name: 'Checkbox' }).first(),
    ).toBeVisible();
  });

  test('Kan markere en enkelt kandidat med checkbox', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', { name: 'Checkbox' }).first();
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();

    await checkbox.check();

    await expect(checkbox).toBeChecked();
    await expect(
      page.getByRole('checkbox', { name: /1 markert/ }),
    ).toBeVisible();
  });

  test('Kan fjerne markering fra en kandidat', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', { name: 'Checkbox' }).first();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();

    await expect(checkbox).not.toBeChecked();
  });

  test('Kan markere flere kandidater', async ({ page }) => {
    const checkboxer = page.getByRole('checkbox', { name: 'Checkbox' });
    await expect(checkboxer.first()).toBeVisible();

    await checkboxer.nth(0).check();
    await expect(checkboxer.nth(0)).toBeChecked();
    await expect(
      page.getByRole('checkbox', { name: /1 markert/ }),
    ).toBeVisible();

    await checkboxer.nth(1).check();
    await expect(checkboxer.nth(1)).toBeChecked();
    await expect(
      page.getByRole('checkbox', { name: /2 markert/ }),
    ).toBeVisible();
  });

  test('Marker alle på siden markerer alle kandidater', async ({ page }) => {
    await expect(
      page.getByRole('checkbox', { name: 'Checkbox' }).first(),
    ).toBeVisible();

    await page.getByRole('checkbox', { name: 'Marker alle på siden' }).click();

    await expect(
      page.getByRole('checkbox', { name: /Fjern markerte/ }),
    ).toBeVisible();
  });

  test('Legg til-knapp er deaktivert uten markerte kandidater', async ({
    page,
  }) => {
    const knapp = page.getByRole('button', {
      name: 'Legg til jobbsøkere og fullfør',
    });
    await expect(knapp).toBeVisible();
    await expect(knapp).toBeDisabled();
  });

  test('Legg til-knapp aktiveres når kandidater er markert', async ({
    page,
  }) => {
    const knapp = page.getByRole('button', {
      name: 'Legg til jobbsøkere og fullfør',
    });
    await expect(knapp).toBeDisabled();

    await page.getByRole('checkbox', { name: 'Checkbox' }).first().check();

    await expect(knapp).toBeEnabled();
  });

  test('Kan lagre markerte kandidater i rekrutteringstreff', async ({
    page,
  }) => {
    await page.getByRole('checkbox', { name: 'Checkbox' }).first().check();

    const knapp = page.getByRole('button', {
      name: 'Legg til jobbsøkere og fullfør',
    });
    await expect(knapp).toBeEnabled();
    await knapp.click();

    await expect(page.getByText('lagret i rekrutteringstreff')).toBeVisible();
  });

  snapshotTest(test);
});
