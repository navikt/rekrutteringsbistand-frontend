import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Markerte kandidater og popover', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/kandidat');
    await page.evaluate(() => sessionStorage.removeItem('markerte-kandidater'));
  });

  test('Popover vises ikke når ingen kandidater er markert', async ({
    page,
  }) => {
    await expect(
      page.getByRole('button', { name: /markert/ }),
    ).not.toBeVisible();
  });

  test('Popover vises når en kandidat markeres', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Checkbox' }).first().check();

    await expect(page.getByRole('button', { name: '1 markert' })).toBeVisible();
  });

  test('Popover oppdaterer antall ved markering av flere', async ({ page }) => {
    const checkboxer = page.getByRole('checkbox', { name: 'Checkbox' });
    await checkboxer.nth(0).check();
    await checkboxer.nth(1).check();

    await expect(page.getByRole('button', { name: '2 markert' })).toBeVisible();
  });

  test('Popover viser kandidatliste ved klikk', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Checkbox' }).first().check();
    await page.getByRole('button', { name: '1 markert' }).click();

    await expect(
      page.getByRole('heading', { name: /Markerte kandidater/ }),
    ).toBeVisible();
  });

  test('Kan fjerne en kandidat fra popover', async ({ page }) => {
    const checkboxer = page.getByRole('checkbox', { name: 'Checkbox' });
    await checkboxer.nth(0).check();
    await checkboxer.nth(1).check();

    await page.getByRole('button', { name: '2 markert' }).click();

    const fjernKnapper = page.getByRole('button', { name: 'Fjern kandidat' });
    await fjernKnapper.first().click();

    await expect(page.getByRole('button', { name: '1 markert' })).toBeVisible();
  });

  test('Kan fjerne alle kandidater fra popover', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Marker alle på siden' }).check();

    const popoverKnapp = page.getByRole('button', { name: /markert/ });
    await expect(popoverKnapp).toBeVisible();
    await popoverKnapp.click();

    await page.getByRole('button', { name: 'Fjern alle' }).click();

    await expect(
      page.getByRole('button', { name: /markert/ }),
    ).not.toBeVisible();
  });

  test('Markerte kandidater overlever navigasjon til kandidat og tilbake', async ({
    page,
  }) => {
    await page.getByRole('checkbox', { name: 'Checkbox' }).first().check();

    await expect(page.getByRole('button', { name: '1 markert' })).toBeVisible();

    await page
      .getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2')
      .click();

    await expect(page.getByRole('button', { name: '1 markert' })).toBeVisible();
  });

  test('Markerte kandidater overlever hard navigasjon', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Checkbox' }).first().check();
    await expect(page.getByRole('button', { name: '1 markert' })).toBeVisible();

    await gotoApp(page, '/kandidat');

    await expect(page.getByRole('button', { name: '1 markert' })).toBeVisible();
  });

  test('Popover forsvinner etter at alle markerte fjernes med checkbox', async ({
    page,
  }) => {
    const checkbox = page.getByRole('checkbox', { name: 'Checkbox' }).first();
    await checkbox.check();

    await expect(page.getByRole('button', { name: '1 markert' })).toBeVisible();

    await checkbox.uncheck();

    await expect(
      page.getByRole('button', { name: /markert/ }),
    ).not.toBeVisible();
  });
});
