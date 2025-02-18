import { expect, test } from '@playwright/test';

export const visMørkModus = (testId: string) =>
  test('Viser mørk modus', async ({ page }) => {
    await expect(
      page.getByRole('checkbox', { name: 'Mørk modus' }),
    ).toBeVisible();

    await page.getByRole('checkbox', { name: 'Mørk modus' }).click();
    await expect(
      page.getByRole('checkbox', { name: 'Mørk modus' }),
    ).toBeChecked();

    await expect(page.getByTestId(testId).first()).toBeVisible();
  });
