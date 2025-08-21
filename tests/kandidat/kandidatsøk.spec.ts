import test, { expect } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test('Kandidatsøk', async ({ page }) => {
  await page.goto('http://localhost:1337');

  await page.getByRole('button', { name: 'Jobbsøkere' }).click();
  await expect(page.getByRole('heading', { name: 'Jobbsøkere' })).toBeVisible({
    timeout: 10000,
  });
  //filter test

  await expect(page.getByRole('button', { name: 'Mitt kontor' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Mine kontorer' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Alle kontorer' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Valgte kontorer' }),
  ).toBeVisible();
  await page.getByRole('checkbox', { name: 'Marker alle på siden' }).check();
  await page.getByRole('button', { name: 'Lagre i kandidatliste' }).click();
  await page.getByRole('dialog', { name: 'Lagre 13 kandidat i' }).click();
  await page.getByRole('button', { name: 'Lukk' }).click();
});
