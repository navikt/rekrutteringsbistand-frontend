import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

for (const side of [
  '/rekrutteringstreff/utkast/rediger',
  '/stilling/minStilling/rediger',
]) {
  test(`håndterer ukjent postnummer uten serverfeil på ${side}`, async ({
    page,
  }) => {
    const feil: string[] = [];
    page.on('console', (melding) => {
      if (melding.type() === 'error' || melding.type() === 'warning') {
        feil.push(melding.text());
      }
    });
    page.on('pageerror', (error) => feil.push(error.message));

    await gotoApp(page, side);

    const postnummer = page
      .getByRole('textbox', { name: 'Postnummer' })
      .first();
    const ukjentSvar = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === '/api/pam-geografi/postdata/0000',
    );
    await postnummer.fill('0000');
    const response = await ukjentSvar;

    expect(response.status()).toBe(200);
    expect(await response.json()).toBeNull();
    await expect(
      page.getByText('Ugyldig postnummer', { exact: true }),
    ).toBeVisible();
    await expect(postnummer).toHaveAttribute('aria-invalid', 'true');
    await expect(postnummer).toHaveAccessibleDescription('Ugyldig postnummer');

    await postnummer.fill('000');
    await expect(
      page.getByText('Ugyldig postnummer', { exact: true }),
    ).toHaveCount(0);
    await expect(postnummer).not.toHaveAttribute('aria-invalid', 'true');

    const kjentSvar = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === '/api/pam-geografi/postdata/4604',
    );
    await postnummer.fill('4604');
    expect((await kjentSvar).status()).toBe(200);
    await expect(
      page.getByText('Kristiansand S', { exact: true }).first(),
    ).toBeVisible();
    await expect(
      page.getByText('Ugyldig postnummer', { exact: true }),
    ).toHaveCount(0);
    await expect(postnummer).not.toHaveAttribute('aria-invalid', 'true');

    await postnummer.fill('0000');
    await expect(
      page.getByText('Ugyldig postnummer', { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText('Kristiansand S', { exact: true }).first(),
    ).not.toBeVisible();
    await postnummer.fill('');
    await expect(
      page.getByText('Ugyldig postnummer', { exact: true }),
    ).toHaveCount(0);
    expect(
      feil.filter((melding) =>
        /postdata|Zod-validering|Serverfeil/.test(melding),
      ),
    ).toEqual([]);
  });
}
