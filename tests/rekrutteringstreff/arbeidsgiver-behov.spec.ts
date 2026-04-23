import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Arbeidsgiver-behov', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
  });

  test('Eier ser "Rediger behov"-knapp eller "Legg til behov"-knapp på arbeidsgiver-rader', async ({
    page,
  }) => {
    const knapp = page
      .getByRole('button', { name: /Rediger behov|Legg til behov/i })
      .first();
    await expect(knapp).toBeVisible();
  });

  test('Modal for legg til arbeidsgiver viser Behov-felt og validerer', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Legg til arbeidsgiver' }).click();
    const modal = page.getByRole('dialog', {
      name: /Legg til arbeidsgivere/i,
    });
    await expect(modal).toBeVisible();

    // Velg en arbeidsgiver via søk
    const finn = modal.getByLabel('Finn arbeidsgiver');
    await finn.fill('test');
    const første = modal.getByRole('option').first();
    await første.click();

    // Behov-felt skal nå være synlige
    await expect(modal.getByLabel('Antall stillinger')).toBeVisible();
    await expect(
      modal.getByLabel('Hva arbeidsgiver leter etter'),
    ).toBeVisible();
    await expect(modal.getByLabel('Språk')).toBeVisible();
    await expect(modal.getByLabel('Ansettelsesform')).toBeVisible();

    // Submit uten å fylle ut → valideringsmeldinger
    await modal.getByRole('button', { name: 'Legg til', exact: true }).click();
    await expect(
      modal.getByText('Velg minst én kvalifikasjon arbeidsgiver leter etter'),
    ).toBeVisible();
    await expect(
      modal.getByText('Velg minst ett arbeidsspråk'),
    ).toBeVisible();
    await expect(
      modal.getByText('Velg minst én ansettelsesform'),
    ).toBeVisible();
  });
});
