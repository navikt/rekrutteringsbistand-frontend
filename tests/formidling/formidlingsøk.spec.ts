import { gotoApp } from '@/tests/gotoApp';
import { test } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test('Vis etterregistrering', async ({ page }) => {
  await gotoApp(page, '/');
  await page.getByRole('button', { name: 'Etterregistrering' }).click();
  await page.getByRole('button', { name: 'Opprett etterregistrering' }).click();
});
