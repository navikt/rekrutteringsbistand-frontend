import test, { expect } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test('Vis min etterregistrering', async ({ page }) => {
  await page.goto('http://localhost:1337/etterregistrering/minFormidling');
  await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Jobbsøkere' })).toBeVisible();
});
