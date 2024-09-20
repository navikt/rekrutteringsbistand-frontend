import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:1337/');
  await expect(page.getByRole('tab', { name: 'Oversikt' })).toBeVisible();
});