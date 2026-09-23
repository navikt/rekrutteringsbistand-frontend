import { expect, test } from '@playwright/test';

export const visMørkModus = (testId: string) =>
  test('Viser mørk modus', async ({ page }) => {
    const sideUrl = page.url();

    await page.goto('/innstillinger');
    await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes('/api/bruker/innstillinger') &&
          response.request().method() === 'PUT',
      ),
      page.getByRole('radio', { name: 'Mørk modus' }).click(),
    ]);

    await page.goto(sideUrl);

    if (testId) await expect(page.getByTestId(testId).first()).toBeVisible();
  });
