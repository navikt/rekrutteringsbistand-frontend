import { slåPåMørkModus } from '@/tests/mørkModus';
import { expect, test } from '@playwright/test';

export const visMørkModus = (testId: string) =>
  test('Viser mørk modus', async ({ page }) => {
    await slåPåMørkModus(page);

    if (testId) await expect(page.getByTestId(testId).first()).toBeVisible();
  });
