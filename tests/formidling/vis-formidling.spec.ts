import { gotoApp } from '@/tests/gotoApp';
import { test, expect } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test('Vis min etterregistrering', async ({ page }) => {
  await gotoApp(page, '/etterregistrering/minFormidling');
  await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Jobbsøkere' })).toBeVisible();
});
