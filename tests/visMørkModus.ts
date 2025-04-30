import { expect, test } from '@playwright/test';

export const visMørkModus = (testId: string) =>
  test('Viser mørk modus', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Mørk modus' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Mørk modus' }).click();
    await expect(page.getByRole('button', { name: 'Lys modus' })).toBeVisible();

    await expect(page.getByTestId(testId).first()).toBeVisible();
  });
