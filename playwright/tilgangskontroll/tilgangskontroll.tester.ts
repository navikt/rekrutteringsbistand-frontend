import { expect, test } from '@playwright/test';
import { Roller } from '../../app/components/tilgangskontroll/roller';

export const testTilgangskontroll = (rolle: Roller) => {
  test.describe(`Tilgangskontroll for ${rolle}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:1337/');
    });

    console.log('kake');
    test('1. Forside', async ({ page }) => {
      if (rolle === Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET) {
        await expect(
          page.getByRole('link', { name: 'Oversikt' }),
        ).toBeVisible();
      }

      if (rolle === Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET) {
        await expect(
          page.getByRole('link', { name: 'Oversikt' }),
        ).toBeVisible();
      }

      if (rolle === Roller.AD_GRUPPE_MODIA_GENERELL_TILGANG) {
        await expect(
          page.getByRole('link', { name: 'Oversikt' }),
        ).toBeVisible();
      }
    });
    test('1.1 Hurtiglenker', async ({ page }) => {
      const element = page.getByTestId('forside-hurtiglenker');

      if (rolle === Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET) {
        await expect(element).toBeVisible();
      }

      if (rolle === Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET) {
        await expect(element).toBeHidden();
      }

      if (rolle === Roller.AD_GRUPPE_MODIA_GENERELL_TILGANG) {
        console.log('tester');
        await expect(element).not.toBeVisible();
      }
    });
  });
};
