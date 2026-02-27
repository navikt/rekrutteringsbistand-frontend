import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const endreFelterOgÅpneModal = async (page: any) => {
  // 1. NAVN: Endre tittel + kjør KI-sjekk
  const tittelInput = page.getByLabel('Navn på treffet');
  await tittelInput.clear();
  await tittelInput.fill('Nytt navn for varsling');
  await page.locator('#tittel-ki-sjekk-knapp').click();
  await page.getByRole('button', { name: 'Bruk likevel' }).first().click();

  // 2. STED: Endre gateadresse
  const gateadresseInput = page.getByLabel('Gateadresse');
  await gateadresseInput.clear();
  await gateadresseInput.fill('Storgata 10');

  // 3. TIDSPUNKT: Endre fraDato til fremtidig dato
  const fraDatoInput = page.getByPlaceholder('dd.mm.åååå').nth(0);
  await fraDatoInput.click();
  await fraDatoInput.fill('01.06.2039');
  await page.keyboard.press('Escape');
  await gateadresseInput.click();
  await page.waitForTimeout(300);

  // 4. SVARFRIST: Endre svarfristDato til ny fremtidig dato
  const svarfristDatoInput = page.getByPlaceholder('dd.mm.åååå').nth(1);
  await svarfristDatoInput.click();
  await svarfristDatoInput.fill('31.05.2039');
  await page.keyboard.press('Escape');
  await gateadresseInput.click();
  await page.waitForTimeout(300);

  // Åpne republiser-modalen
  await page.getByRole('button', { name: 'Publiser på nytt' }).click();
};

test.describe('Republiser med 4 endringer og selektiv varsling', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert/rediger');
  });

  test('Viser alle 4 endringer i republiser-modalen', async ({ page }) => {
    await endreFelterOgÅpneModal(page);

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });
    await expect(modal).toBeVisible();

    await expect(modal.getByText('Nytt navn', { exact: true })).toBeVisible();
    await expect(modal.getByText('Nytt sted', { exact: true })).toBeVisible();
    await expect(
      modal.getByText('Nytt tidspunkt', { exact: true }),
    ).toBeVisible();
    await expect(
      modal.getByText('Ny svarfrist', { exact: true }),
    ).toBeVisible();
  });

  test('Viser 4 varslings-switcher når det finnes jobbsøkere som har svart ja', async ({
    page,
  }) => {
    await endreFelterOgÅpneModal(page);

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });

    await expect(
      modal.getByRole('checkbox', { name: /Varsle om nytt navn/i }),
    ).toBeVisible();
    await expect(
      modal.getByRole('checkbox', { name: /Varsle om nytt sted/i }),
    ).toBeVisible();
    await expect(
      modal.getByRole('checkbox', { name: /Varsle om nytt tidspunkt/i }),
    ).toBeVisible();
    await expect(
      modal.getByRole('checkbox', { name: /Varsle om ny svarfrist/i }),
    ).toBeVisible();
  });

  test('Knapp viser "Lagre uten å varsle" når ingen varsling er valgt', async ({
    page,
  }) => {
    await endreFelterOgÅpneModal(page);

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });

    await expect(
      modal.getByRole('button', { name: 'Lagre uten å varsle' }),
    ).toBeVisible();
  });

  test('Kan velge 2 av 4 endringer for varsling og knapp endres til "Lagre og varsle"', async ({
    page,
  }) => {
    await endreFelterOgÅpneModal(page);

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });

    // Aktiver varsling for NAVN og STED
    await modal.getByRole('checkbox', { name: /Varsle om nytt navn/i }).click();
    await modal.getByRole('checkbox', { name: /Varsle om nytt sted/i }).click();

    await expect(
      modal.getByRole('button', { name: 'Lagre og varsle' }),
    ).toBeVisible();
    await expect(
      modal.getByRole('button', { name: 'Lagre uten å varsle' }),
    ).not.toBeVisible();
  });

  test('Uvarslete endringer forblir synlige men med avslåtte switcher', async ({
    page,
  }) => {
    await endreFelterOgÅpneModal(page);

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });

    // Aktiver varsling kun for NAVN og STED
    await modal.getByRole('checkbox', { name: /Varsle om nytt navn/i }).click();
    await modal.getByRole('checkbox', { name: /Varsle om nytt sted/i }).click();

    // TIDSPUNKT og SVARFRIST switcher skal fortsatt være unchecked
    await expect(
      modal.getByRole('checkbox', { name: /Varsle om nytt tidspunkt/i }),
    ).not.toBeChecked();
    await expect(
      modal.getByRole('checkbox', { name: /Varsle om ny svarfrist/i }),
    ).not.toBeChecked();

    // NAVN og STED skal være checked
    await expect(
      modal.getByRole('checkbox', { name: /Varsle om nytt navn/i }),
    ).toBeChecked();
    await expect(
      modal.getByRole('checkbox', { name: /Varsle om nytt sted/i }),
    ).toBeChecked();
  });

  test('Kan skru av varsling igjen og knapp endres tilbake til "Lagre uten å varsle"', async ({
    page,
  }) => {
    await endreFelterOgÅpneModal(page);

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });

    // Aktiver varsling for NAVN
    await modal.getByRole('checkbox', { name: /Varsle om nytt navn/i }).click();

    await expect(
      modal.getByRole('button', { name: 'Lagre og varsle' }),
    ).toBeVisible();

    // Deaktiver igjen
    await modal.getByRole('checkbox', { name: /Varsle om nytt navn/i }).click();

    await expect(
      modal.getByRole('button', { name: 'Lagre uten å varsle' }),
    ).toBeVisible();
  });

  snapshotTest(test);
});
