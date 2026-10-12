import { expect, Page } from '@playwright/test';

/**
 * Lokalt (next dev) setter DevDekoratør «NAV FYA1» som valgt kontor etter
 * oppstart, og overskriver kontoret fra den mockede dekoratøren. Tester som er
 * avhengige av valgt kontor må derfor velge det eksplisitt i enhetsmenyen.
 */
export async function velgNavKontor(page: Page, navn: string) {
  const enhetsmeny = page.getByRole('button', { name: /Enhet:/ });
  await expect(async () => {
    await enhetsmeny.click({ timeout: 1000 });
    await page
      .getByRole('button', { name: navn, exact: true })
      .click({ timeout: 1000 });
    await expect(enhetsmeny).toHaveAccessibleName(
      new RegExp(`Enhet: ${navn}$`),
      { timeout: 1000 },
    );
  }).toPass();
}
