import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Jobbsøkere-fane for publisert treff', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  });

  test('Viser jobbsøkere i listen', async ({ page }) => {
    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(page.getByText('Håkon Pettersen').first()).toBeVisible();
    await expect(page.getByText('Jonathan Huseby').first()).toBeVisible();
  });

  test('Viser statustagg for jobbsøkere', async ({ page }) => {
    await expect(page.getByText('Lagt til').first()).toBeVisible();
  });

  test('Viser "Legg til jobbsøker"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: /Legg til jobbsøker/ }),
    ).toBeVisible();
  });

  test('Viser "Fjern all markering"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Fjern all markering' }),
    ).toBeVisible();
  });

  test('Viser Inviter-knapp som er deaktivert uten valg', async ({ page }) => {
    const inviterKnapp = page.getByRole('button', {
      name: /Inviter \(0\)/,
    });
    await expect(inviterKnapp).toBeVisible();
    await expect(inviterKnapp).toBeDisabled();
  });

  test('Viser Slett-knapp for jobbsøker med status LAGT_TIL', async ({
    page,
  }) => {
    const mariusKort = page.getByText('Marius Johnsen').locator('..');
    await expect(
      mariusKort.locator('..').getByRole('button', { name: 'Slett' }),
    ).toBeVisible();
  });

  test('Viser Inviter-knapp ved enkelt jobbsøker med status LAGT_TIL', async ({
    page,
  }) => {
    const mariusKort = page.getByText('Marius Johnsen').locator('..');
    await expect(
      mariusKort.locator('..').getByRole('button', { name: 'Inviter' }),
    ).toBeVisible();
  });

  test('Viser antall skjulte og slettede', async ({ page }) => {
    await expect(page.getByText('Skjulte:')).toBeVisible();
    await expect(page.getByText('Slettede:')).toBeVisible();
  });

  test('Viser veileder-informasjon på jobbsøkerkort', async ({ page }) => {
    await expect(
      page.getByText('Følges opp av', { exact: false }).first(),
    ).toBeVisible();
  });
});

test.describe('Jobbsøkere-fane for utkast treff', () => {
  test('Viser jobbsøkere uten checkbox og inviter-knapp', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/utkast');
    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
    await expect(page.getByText('Marius Johnsen').first()).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Inviter \(/ }),
    ).not.toBeVisible();
  });
});

test.describe('Jobbsøkere-fane for tomt treff', () => {
  test('Viser slettet-melding for slettet treff i stedet for faner', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/slettet');
    await expect(
      page.getByText(
        'Dette rekrutteringstreffet er slettet og er ikke lenger tilgjengelig.',
      ),
    ).toBeVisible();
    await expect(
      page.getByRole('tab', { name: /Jobbsøkere/ }),
    ).not.toBeVisible();
  });
});
