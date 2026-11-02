import { gotoApp } from '@/tests/gotoApp';
import { slåPåMørkModus } from '@/tests/mørkModus';
import { snapshotTest } from '@/tests/snapshotTest';
import { tilgjengelighetstest } from '@navikt/toi-next-frontend/a11y';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Jobbmesse', () => {
  test.describe('Vis jobbmesse', () => {
    test.beforeEach(async ({ page }) => {
      await gotoApp(page, '/stilling/jobbmesse');
    });

    test('Viser Jobbmesse-tag', async ({ page }) => {
      await expect(page.getByText('Jobbmesse', { exact: true })).toBeVisible();
    });

    test('Viser jobbmesse-tittel', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: 'NAV Jobbmesse Lillestrøm' }),
      ).toBeVisible();
    });

    test('Viser Om stillingen-tab', async ({ page }) => {
      await expect(
        page.getByRole('tab', { name: 'Om stillingen' }),
      ).toBeVisible();
    });

    test('Viser Jobbsøkere-tab', async ({ page }) => {
      await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
    });

    test('Skjuler CV-deling for jobbmesse', async ({ page }) => {
      await page.getByRole('tab', { name: /Jobbsøkere/ }).click();

      // "Spør om å dele CV" og "Del CV med arbeidsgiver" skal IKKE vises for jobbmesse
      await expect(page.getByText('Spør om å dele CV')).toBeHidden();
      await expect(page.getByText('Del CV med arbeidsgiver')).toBeHidden();

      // "Send tips" skal fortsatt vises
      await expect(page.getByText('Send tips')).toBeVisible();
    });

    test('Kan ikke dupliseres', async ({ page }) => {
      const hoveddel = page.locator('main');
      const rediger = hoveddel.getByRole('button', { name: 'Rediger' }).first();
      const flereHandlinger = hoveddel.getByRole('button', {
        name: 'Flere handlinger',
      });
      await expect(rediger.or(flereHandlinger).first()).toBeVisible();
      if (await flereHandlinger.isVisible()) {
        await flereHandlinger.click();
      }

      await expect(page.getByRole('button', { name: 'Dupliser' })).toHaveCount(
        0,
      );
    });

    snapshotTest(test);
    tilgjengelighetstest(test, { utvidet: true, mørkModus: slåPåMørkModus });
  });
});
