import { expect, type Page } from '@playwright/test';

/** Slår på mørk modus via brukerinnstillingene og laster siden på nytt. */
export const slåPåMørkModus = async (page: Page) => {
  await page.route('**/api/bruker/innstillinger', async (route) => {
    if (route.request().method() !== 'GET') return route.fallback();
    const respons = await route.fetch();
    await route.fulfill({
      response: respons,
      json: { ...(await respons.json()), darkMode: true },
    });
  });

  await page.reload();
  await expect(page.locator('.aksel-theme.dark').first()).toBeAttached();
};
