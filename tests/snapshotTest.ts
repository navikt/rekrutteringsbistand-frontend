import { test as baseTest, expect } from '@playwright/test';

export const snapshotTest = (test = baseTest) =>
  test('Visuell snapshot', async ({ page }) => {
    test.skip(!process.env.CI, 'Snapshot-tester kjøres kun i CI');
    await expect(page).toHaveScreenshot();
  });
