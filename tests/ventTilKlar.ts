import { Page, expect } from '@playwright/test';

export async function ventTilKlar(
  page: Page,
  selector?: ReturnType<Page['getByTestId']> | ReturnType<Page['getByRole']>,
) {
  // Vent til DOM-root er rendret
  await page.waitForSelector('main, [data-testid="app-root"]', {
    timeout: 15000,
  });

  // Vent (best effort) på at MSW service worker er aktiv
  await page.evaluate(async () => {
    if (navigator.serviceWorker) {
      try {
        await navigator.serviceWorker.ready;
      } catch {}
    }
  });

  if (selector) {
    await expect(selector).toBeVisible({ timeout: 15000 });
  }

  // Vent til evt. globale loadere er borte
  const loaders = page.getByTitle('Laster...');
  if (await loaders.count()) {
    await expect(loaders).toHaveCount(0, { timeout: 15000 });
  }
}
