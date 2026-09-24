import { expect, test } from '@playwright/test';

export const visMørkModus = (testId: string) =>
  test('Viser mørk modus', async ({ page }) => {
    await page.route('**/api/bruker/innstillinger', async (route) => {
      if (route.request().method() !== 'GET') return route.fallback();
      const respons = await route.fetch();
      await route.fulfill({
        response: respons,
        json: { ...(await respons.json()), darkMode: true },
      });
    });

    await page.reload();

    if (testId) await expect(page.getByTestId(testId).first()).toBeVisible();
  });
