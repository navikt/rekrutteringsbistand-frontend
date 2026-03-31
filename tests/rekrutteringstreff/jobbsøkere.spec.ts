import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Jobbsøkere-fane for publisert treff', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();
  });

  test('Viser jobbsøkere i listen', async ({ page }) => {
    await expect(page.getByText('Johnsen, Marius').first()).toBeVisible();
    await expect(page.getByText('Pettersen, Håkon').first()).toBeVisible();
    await expect(page.getByText('Huseby, Jonathan').first()).toBeVisible();
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

  test('Viser marker-alle-checkbox', async ({ page }) => {
    const markerAlleCheckbox = page.getByRole('checkbox', {
      name: /Marker alle jobbsøkere/,
    });
    await expect(markerAlleCheckbox).toBeVisible();
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
    const mariusRad = page.locator('li').filter({ hasText: 'Johnsen, Marius' });
    await expect(
      mariusRad.getByRole('button', { name: 'Slett' }),
    ).toBeVisible();
  });

  test('Viser Inviter-knapp ved enkelt jobbsøker med status LAGT_TIL', async ({
    page,
  }) => {
    const mariusRad = page.locator('li').filter({ hasText: 'Johnsen, Marius' });
    await expect(
      mariusRad.getByRole('button', { name: 'Inviter' }),
    ).toBeVisible();
  });

  test('Viser ikke Inviter-knapp for jobbsøker som allerede er invitert', async ({
    page,
  }) => {
    const håkonRad = page.locator('li').filter({ hasText: 'Pettersen, Håkon' });

    await expect(
      håkonRad.getByRole('button', { name: 'Inviter' }),
    ).not.toBeVisible();
  });

  test('Slett-knapp er deaktivert for jobbsøker som allerede er invitert', async ({
    page,
  }) => {
    const håkonRad = page.locator('li').filter({ hasText: 'Pettersen, Håkon' });
    const slettKnapp = håkonRad.getByRole('button', { name: 'Slett' });

    await expect(slettKnapp).toBeDisabled();
  });

  test('Slett-knapp er deaktivert for jobbsøker som har svart ja', async ({
    page,
  }) => {
    const jonathanRad = page
      .locator('li')
      .filter({ hasText: 'Huseby, Jonathan' });
    const slettKnapp = jonathanRad.getByRole('button', { name: 'Slett' });

    await expect(slettKnapp).toBeDisabled();
    await expect(
      jonathanRad.getByRole('button', { name: 'Inviter' }),
    ).not.toBeVisible();
  });

  test('Klikk på Slett åpner modal uten å navigere vekk', async ({ page }) => {
    const slettKnapp = page
      .locator('li')
      .filter({ hasText: 'Johnsen, Marius' })
      .getByRole('button', { name: 'Slett' });

    await slettKnapp.click();

    await expect(
      page.getByRole('heading', { name: 'Slett jobbsøker' }),
    ).toBeVisible();
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  });

  test('Klikk på Inviter åpner modal uten å navigere vekk', async ({
    page,
  }) => {
    const inviterKnapp = page
      .locator('li')
      .filter({ hasText: 'Johnsen, Marius' })
      .getByRole('button', { name: 'Inviter' });

    await inviterKnapp.click();

    await expect(
      page.getByRole('heading', { name: 'Inviter jobbsøker' }),
    ).toBeVisible();
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  });

  test('Klikk på Avbryt i slett-modal lukker modal uten å navigere vekk', async ({
    page,
  }) => {
    const slettKnapp = page
      .locator('li')
      .filter({ hasText: 'Johnsen, Marius' })
      .getByRole('button', { name: 'Slett' });

    await slettKnapp.click();
    await expect(
      page.getByRole('heading', { name: 'Slett jobbsøker' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Avbryt' }).click();

    await expect(
      page.getByRole('heading', { name: 'Slett jobbsøker' }),
    ).not.toBeVisible();
    await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  });

  test('Viser antall skjulte og slettede', async ({ page }) => {
    await expect(page.getByText('Skjulte:')).toBeVisible();
    await expect(page.getByText('Slettede:')).toBeVisible();
  });

  test('Viser veileder-informasjon på jobbsøkerkort', async ({ page }) => {
    await expect(
      page.getByText('Fredrik Agboola', { exact: false }).first(),
    ).toBeVisible();
  });

  test('Kan søke på veilederIdent og finne riktig jobbsøker', async ({
    page,
  }) => {
    const søkefelt = page.getByPlaceholder('Søk i jobbsøkerne');
    await søkefelt.fill('L174111');
    await søkefelt.press('Enter');

    await expect(page.getByText('Johnsen, Marius').first()).toBeVisible();
    await expect(page.getByText('Berg, Emilie')).not.toBeVisible();
  });

  test('Viser telefonnummer for jobbsøker som har det', async ({ page }) => {
    await expect(page.getByText('99887766').first()).toBeVisible();
  });

  test('Viser kolonne-header for telefon', async ({ page }) => {
    await expect(page.getByText('Telefon')).toBeVisible();
  });

  test('Kan markere jobbsøker med checkbox', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', {
      name: /Velg kandidat Johnsen, Marius/,
    });
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();

    await checkbox.check();

    await expect(checkbox).toBeChecked();
  });

  test('Kan fjerne markering fra jobbsøker', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', {
      name: /Velg kandidat Johnsen, Marius/,
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
      .getByRole('checkbox', { name: /Velg kandidat Johnsen, Marius/ })
      .check();
    await expect(
      page.getByRole('button', { name: 'Inviter (1)' }),
    ).toBeVisible();

    await page
      .getByRole('checkbox', { name: /Velg kandidat Berg, Emilie/ })
      .check();
    await expect(
      page.getByRole('button', { name: 'Inviter (2)' }),
    ).toBeVisible();

    await page
      .getByRole('checkbox', { name: /Velg kandidat Haugen, Oscar/ })
      .check();
    await expect(
      page.getByRole('button', { name: 'Inviter (3)' }),
    ).toBeVisible();
  });

  test('Marker-alle checkbox tømmer markering', async ({ page }) => {
    const mariusCheckbox = page.getByRole('checkbox', {
      name: /Velg kandidat Johnsen, Marius/,
    });
    await mariusCheckbox.check();
    await expect(mariusCheckbox).toBeChecked();

    const markerAlleCheckbox = page.getByRole('checkbox', {
      name: /valgt.*markering|Marker alle/,
    });
    await markerAlleCheckbox.click();

    await expect(mariusCheckbox).not.toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Inviter (0)' }),
    ).toBeVisible();
  });

  test('Marker-alle checkbox markerer alle jobbsøkere på siden', async ({
    page,
  }) => {
    const markerAlleCheckbox = page.getByRole('checkbox', {
      name: /Marker alle jobbsøkere/,
    });

    await markerAlleCheckbox.click();

    await expect(
      page.getByRole('button', { name: 'Inviter (11)' }),
    ).toBeVisible();
    await expect(
      page.getByRole('checkbox', {
        name: /25 valgt/,
      }),
    ).toBeChecked();
  });

  snapshotTest(test);
});
