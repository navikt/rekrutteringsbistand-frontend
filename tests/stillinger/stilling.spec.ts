import test from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe(`Stillingssøk test`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1337/stillinger');
  });
});
