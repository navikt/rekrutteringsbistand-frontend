import { gotoApp } from '@/tests/gotoApp';
import { type Page, expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Opprett etterregistrering (formidling)
// ────────────────────────────────────────────────────────
async function åpneOpprettMeny(page: Page) {
  await page.getByRole('button', { name: 'Opprett', exact: true }).click();
}

test.describe('Opprett etterregistrering', () => {
  test.describe('Opprett via meny', () => {
    test('Opprett-menyen viser Etterregistrering-valg', async ({ page }) => {
      await gotoApp(page, '/');
      await åpneOpprettMeny(page);

      await expect(
        page.getByRole('menuitem', { name: 'Etterregistrering' }),
      ).toBeVisible();
    });

    test('Klikk på Etterregistrering navigerer til redigeringsside', async ({
      page,
    }) => {
      await gotoApp(page, '/');
      await åpneOpprettMeny(page);
      await page.getByRole('menuitem', { name: 'Etterregistrering' }).click();

      await page.waitForURL(/\/etterregistrering\/.*\/rediger/, {
        timeout: 10000,
      });
      await expect(page.locator('main')).toBeVisible();
    });

    test('Redigeringssiden viser Avbryt- og Slett-knapper', async ({
      page,
    }) => {
      await gotoApp(page, '/');
      await åpneOpprettMeny(page);
      await page.getByRole('menuitem', { name: 'Etterregistrering' }).click();

      await page.waitForURL(/\/etterregistrering\/.*\/rediger/, {
        timeout: 10000,
      });

      await expect(page.getByRole('button', { name: 'Avbryt' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Slett' })).toBeVisible();
    });

    test('Redigeringssiden viser sjekkliste for publisering', async ({
      page,
    }) => {
      await gotoApp(page, '/');
      await åpneOpprettMeny(page);
      await page.getByRole('menuitem', { name: 'Etterregistrering' }).click();

      await page.waitForURL(/\/etterregistrering\/.*\/rediger/, {
        timeout: 10000,
      });

      await expect(
        page.getByRole('heading', { name: 'Gjør klart til publisering' }),
      ).toBeVisible();
    });
  });
});
