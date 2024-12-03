import { test } from '@playwright/test';
import { Roller } from '../../app/components/tilgangskontroll/roller';

export const testTilgangskontroll = (rolle: Roller) => {
  test.describe(`Tilgangskontroll for ${rolle}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:1337/');
    });
  });
};
