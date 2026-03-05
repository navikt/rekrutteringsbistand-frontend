import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Varseltag for jobbsøkere i rekrutteringstreff', () => {
  test('Viser Min side-tag når jobbsøker ikke har telefonnummer eller e-post i KRR', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');

    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();

    const storTest = page.getByText('Stor Test').first();
    await expect(storTest).toBeVisible();

    const kandidatkort = storTest.locator('..').locator('..').locator('..');
    await expect(kandidatkort.getByText('Min side')).toBeVisible();
    await expect(kandidatkort.getByText('Feilet')).not.toBeVisible();
  });

  test('Viser SMS-tag med suksess-variant for jobbsøker med SMS levert', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');

    await page.getByRole('tab', { name: /Jobbsøkere/ }).click();

    await expect(page.getByText('SMS').first()).toBeVisible();
  });
});

test.describe('Republiser-dialog varslings-UI', () => {
  const endreNavnOgÅpneModal = async (page: any) => {
    const tittelInput = page.getByLabel('Navn på treffet');
    await tittelInput.clear();
    await tittelInput.fill('Nytt navn på treff');
    await page.locator('#tittel-ki-sjekk-knapp').click();
    await page.getByRole('button', { name: 'Bruk likevel' }).first().click();
    await page.getByRole('button', { name: 'Publiser på nytt' }).click();
  };

  test('Viser ikke varslings-UI når ingen jobbsøkere har svart ja', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/ingen-svart-ja/rediger');
    await endreNavnOgÅpneModal(page);

    await expect(
      page.getByRole('heading', { name: 'Lagre endringer' }),
    ).toBeVisible();

    await expect(
      page.getByText('Du har gjort endringer du kan varsle om'),
    ).not.toBeVisible();

    await expect(
      page.getByText('Velg hva du vil ha med i varslet'),
    ).not.toBeVisible();
  });

  test('Viser "Lagre"-knapp når ingen jobbsøkere har svart ja', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/ingen-svart-ja/rediger');
    await endreNavnOgÅpneModal(page);

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });
    await expect(modal).toBeVisible();

    await expect(
      modal.getByRole('button', { name: 'Lagre', exact: true }),
    ).toBeVisible();

    await expect(
      modal.getByRole('button', { name: 'Lagre uten å varsle' }),
    ).not.toBeVisible();

    await expect(
      modal.getByRole('button', { name: 'Lagre og varsle' }),
    ).not.toBeVisible();
  });

  test('Viser "Lagre uten å varsle"-knapp når noen har svart ja men ingen varsling er valgt', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert/rediger');
    await endreNavnOgÅpneModal(page);

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });
    await expect(modal).toBeVisible();

    await expect(
      modal.getByRole('button', { name: 'Lagre uten å varsle' }),
    ).toBeVisible();

    await expect(
      modal.getByText('Du har gjort endringer du kan varsle om'),
    ).toBeVisible();

    await expect(
      modal.getByText('Velg hva du vil ha med i varslet'),
    ).toBeVisible();
  });

  test('Viser "Lagre og varsle"-knapp når varsling er aktivert', async ({
    page,
  }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert/rediger');
    await endreNavnOgÅpneModal(page);

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });
    await expect(modal).toBeVisible();

    const navnSwitch = modal.getByRole('checkbox', {
      name: /Varsle om nytt navn/i,
    });
    await navnSwitch.click();

    await expect(
      modal.getByRole('button', { name: 'Lagre og varsle' }),
    ).toBeVisible();

    await expect(
      modal.getByRole('button', { name: 'Lagre uten å varsle' }),
    ).not.toBeVisible();
  });
});

test.describe('Publiser på nytt – ingen har svart ja', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/ingen-svart-ja/rediger');
  });

  const endreNavn = async (page: any) => {
    const tittelInput = page.getByLabel('Navn på treffet');
    await tittelInput.clear();
    await tittelInput.fill('Treff uten ja-svars');
    await page.locator('#tittel-ki-sjekk-knapp').click();
    await page.getByRole('button', { name: 'Bruk likevel' }).first().click();
  };

  test('Viser info-alert om at ingen blir varslet', async ({ page }) => {
    await endreNavn(page);
    await page.getByRole('button', { name: 'Publiser på nytt' }).click();

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });
    await expect(modal).toBeVisible();

    await expect(
      modal.getByText(
        'Ingen jobbsøkere har svart ja til treffet, så ingen blir varslet om endringene.',
      ),
    ).toBeVisible();
  });

  test('Viser endringer uten varslings-switcher', async ({ page }) => {
    await endreNavn(page);
    await page.getByRole('button', { name: 'Publiser på nytt' }).click();

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });
    await expect(modal).toBeVisible();

    await expect(modal.getByText('Nytt navn')).toBeVisible();
    await expect(modal.getByText('Før:')).toBeVisible();
    await expect(modal.getByText('Nå:')).toBeVisible();

    await expect(modal.getByRole('switch')).toHaveCount(0);
  });

  test('Skjuler meldingsmal-seksjonen', async ({ page }) => {
    await endreNavn(page);
    await page.getByRole('button', { name: 'Publiser på nytt' }).click();

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });
    await expect(modal).toBeVisible();

    await expect(modal.getByText('Meldingen')).not.toBeVisible();
    await expect(
      modal.getByText('Velg hva du vil ha med i varslet'),
    ).not.toBeVisible();
  });

  test('Viser kun "Lagre"-knapp', async ({ page }) => {
    await endreNavn(page);
    await page.getByRole('button', { name: 'Publiser på nytt' }).click();

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });
    await expect(modal).toBeVisible();

    await expect(
      modal.getByRole('button', { name: 'Lagre', exact: true }),
    ).toBeVisible();
    await expect(
      modal.getByRole('button', { name: 'Lagre uten å varsle' }),
    ).not.toBeVisible();
    await expect(
      modal.getByRole('button', { name: 'Lagre og varsle' }),
    ).not.toBeVisible();
  });

  test('Skjuler bell-ikon og varslings-tekst', async ({ page }) => {
    await endreNavn(page);
    await page.getByRole('button', { name: 'Publiser på nytt' }).click();

    const modal = page.getByRole('dialog', { name: 'Lagre endringer' });
    await expect(modal).toBeVisible();

    await expect(
      modal.getByText('Du har gjort endringer du kan varsle om'),
    ).not.toBeVisible();
  });

  snapshotTest(test);
});
