import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, Page, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

async function gåTilJobbsøkereFane(page: Page) {
  await gotoApp(page, '/rekrutteringstreff/publisert');
  await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
}

test.describe('Jobbsøkere-fane for publisert treff - visning og søk', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkereFane(page);
  });

  test('Viser jobbsøkere i listen', async ({ page }) => {
    await expect(page.getByText('Etternavn01, Marius').first()).toBeVisible();
    await expect(page.getByText('Etternavn04, Håkon').first()).toBeVisible();
    await expect(page.getByText('Etternavn05, Jonathan').first()).toBeVisible();
  });

  test('Viser statustagg for jobbsøkere', async ({ page }) => {
    const jobbsøkerliste = page.locator('ul');
    await expect(jobbsøkerliste.getByText('Lagt til').first()).toBeVisible();
  });

  test('Viser "Legg til jobbsøker"-knapp', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: /Legg til jobbsøker/ }),
    ).toBeVisible();
  });

  test('Viser Inviter-knapp som er deaktivert uten valg', async ({ page }) => {
    const inviterKnapp = page.getByRole('button', {
      name: /Inviter \(0\)/,
    });
    await expect(inviterKnapp).toBeVisible();
    await expect(inviterKnapp).toBeDisabled();
  });

  test('Viser antall skjulte og slettede', async ({ page }) => {
    await expect(page.getByText('Skjulte:')).toBeVisible();
    await expect(page.getByText('Slettede:')).toBeVisible();
  });

  test('Viser lagt til av med navn på jobbsøkerkort', async ({ page }) => {
    await expect(
      page.getByText('Markus Kontaktsen', { exact: false }).first(),
    ).toBeVisible();
  });

  snapshotTest(test);
});

test.describe('Jobbsøkere-fane for publisert treff - handlinger på enkeltjobbsøker', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkereFane(page);
  });

  test('Viser Slett-knapp for jobbsøker med status LAGT_TIL', async ({
    page,
  }) => {
    const mariusRad = page
      .locator('li')
      .filter({ hasText: 'Etternavn01, Marius' });
    await mariusRad.getByRole('button', { name: 'Saksmeny' }).first().click();
    await expect(page.locator('#Slett')).toMatchAriaSnapshot(`
    - img "Slett"
    - text: Slett
    `);
  });

  test('Viser Inviter-knapp ved enkelt jobbsøker med status LAGT_TIL', async ({
    page,
  }) => {
    const mariusRad = page
      .locator('li')
      .filter({ hasText: 'Etternavn01, Marius' });
    await mariusRad.getByRole('button', { name: 'Saksmeny' }).first().click();
    await expect(page.locator('#Inviter')).toMatchAriaSnapshot(`
    - img
    - text: Inviter
    `);
  });

  test('Viser ikke Inviter-knapp for jobbsøker som allerede er invitert', async ({
    page,
  }) => {
    const håkonRad = page
      .locator('li')
      .filter({ hasText: 'Etternavn04, Håkon' });

    await expect(
      håkonRad.getByRole('button', { name: 'Inviter' }),
    ).not.toBeVisible();
  });

  test('Slett-knapp er deaktivert for jobbsøker som allerede er invitert', async ({
    page,
  }) => {
    const håkonRad = page
      .locator('li')
      .filter({ hasText: 'Etternavn04, Håkon' });
    await håkonRad.getByRole('button', { name: 'Saksmeny' }).first().click();
    await expect(page.locator('#Slett-deaktivert')).toMatchAriaSnapshot(`
    - img "Slett"
    - text: Slett
    `);
  });

  test('Slett-knapp er deaktivert for jobbsøker som har svart ja', async ({
    page,
  }) => {
    const jonathanRad = page
      .locator('li')
      .filter({ hasText: 'Etternavn05, Jonathan' });
    await jonathanRad.getByRole('button', { name: 'Saksmeny' }).first().click();
    await expect(page.locator('#Slett-deaktivert')).toMatchAriaSnapshot(`
    - img "Slett"
    - text: Slett
    `);
  });

  test('Klikk på Slett åpner modal uten å navigere vekk', async ({ page }) => {
    const mariusRad = page
      .locator('li')
      .filter({ hasText: 'Etternavn01, Marius' });

    await mariusRad.getByRole('button', { name: 'Saksmeny' }).first().click();
    await page.getByRole('menuitem', { name: 'Slett Slett' }).click();

    await expect(
      page.getByRole('heading', { name: 'Slett jobbsøker' }),
    ).toBeVisible();
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  });

  test('Klikk på Inviter åpner modal uten å navigere vekk', async ({
    page,
  }) => {
    const mariusRad = page
      .locator('li')
      .filter({ hasText: 'Etternavn01, Marius' });

    await mariusRad.getByRole('button', { name: 'Saksmeny' }).first().click();

    await page.getByText('Inviter', { exact: true }).click();

    await expect(
      page.getByRole('heading', { name: 'Inviter jobbsøker' }),
    ).toBeVisible();
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  });

  test('Klikk på Avbryt i slett-modal lukker modal uten å navigere vekk', async ({
    page,
  }) => {
    const mariusRad = page
      .locator('li')
      .filter({ hasText: 'Etternavn01, Marius' });

    await mariusRad.getByRole('button', { name: 'Saksmeny' }).first().click();
    page.getByText('Slett Slett').click();

    await expect(
      page.getByRole('heading', { name: 'Slett jobbsøker' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Avbryt' }).click();

    await expect(
      page.getByRole('heading', { name: 'Slett jobbsøker' }),
    ).not.toBeVisible();
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  });
});

test.describe('Jobbsøkere-fane for publisert treff - markering', () => {
  test.beforeEach(async ({ page }) => {
    await gåTilJobbsøkereFane(page);
  });

  test('Kan markere jobbsøker med checkbox', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', {
      name: /Velg kandidat Etternavn01, Marius/,
    });
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();

    await checkbox.check();

    await expect(checkbox).toBeChecked();
  });

  test('Kan fjerne markering fra jobbsøker', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', {
      name: /Velg kandidat Etternavn01, Marius/,
    });
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();

    await expect(checkbox).not.toBeChecked();
  });

  test('Kan markere flere jobbsøkere og Inviter-knappen oppdateres', async ({
    page,
  }) => {
    await expect(
      page.getByRole('button', { name: 'Inviter (0)' }),
    ).toBeVisible();

    await page
      .getByRole('checkbox', { name: /Velg kandidat Etternavn01, Marius/ })
      .check();
    await expect(
      page.getByRole('button', { name: 'Inviter (1)' }),
    ).toBeVisible();

    await page
      .getByRole('checkbox', { name: /Velg kandidat Etternavn02, Emilie/ })
      .check();
    await expect(
      page.getByRole('button', { name: 'Inviter (2)' }),
    ).toBeVisible();

    await page
      .getByRole('checkbox', { name: /Velg kandidat Etternavn03, Oscar/ })
      .check();
    await expect(
      page.getByRole('button', { name: 'Inviter (3)' }),
    ).toBeVisible();
  });

  test('Fjern all markering-knapp er synlig og deaktivert uten valg', async ({
    page,
  }) => {
    const fjernKnapp = page.getByRole('button', {
      name: 'Fjern all markering',
    });
    await expect(fjernKnapp).toBeVisible();
    await expect(fjernKnapp).toBeDisabled();
  });

  test('Fjern all markering tømmer alle markeringer', async ({ page }) => {
    const mariusCheckbox = page.getByRole('checkbox', {
      name: /Velg kandidat Etternavn01, Marius/,
    });
    const emilieCheckbox = page.getByRole('checkbox', {
      name: /Velg kandidat Etternavn02, Emilie/,
    });
    await mariusCheckbox.check();
    await emilieCheckbox.check();
    await expect(
      page.getByRole('button', { name: 'Inviter (2)' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Fjern all markering' }).click();

    await expect(mariusCheckbox).not.toBeChecked();
    await expect(emilieCheckbox).not.toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Inviter (0)' }),
    ).toBeVisible();
  });
});
