import { expect, test } from '@playwright/test';

export const snapshotTest = () =>
  test('Visuell snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot();
  });
