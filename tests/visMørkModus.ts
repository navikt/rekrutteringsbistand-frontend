import { expect, test } from '@playwright/test';

export const visMørkModus = (testId: string) =>
  test('Viser mørk modus', async ({ page }) => {
    // Sett mørk modus i localStorage før navigering
    await page.addInitScript(() => {
      localStorage.setItem('darkMode', 'true');
    });

    // Refresh for å aktivere mørk modus
    await page.reload();

    if (testId) await expect(page.getByTestId(testId).first()).toBeVisible();
  });
