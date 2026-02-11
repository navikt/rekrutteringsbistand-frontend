import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test('Vis min etterregistrering', async ({ page }) => {
  await gotoApp(page, '/etterregistrering/etterregistreringformidling');
  await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
});
