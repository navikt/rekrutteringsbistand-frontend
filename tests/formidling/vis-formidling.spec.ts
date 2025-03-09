import test, { expect } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test('Vis min formidling', async ({ page }) => {
  await page.goto('http://localhost:1337/formidling/minFormidling');
  await expect(page.getByRole('tab', { name: 'Om stillingen' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Kandidater' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Kandidater' })).toBeVisible();
});
