import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Utløpt sesjon', () => {
  test('Viser varsel under headeren når henting svarer 401', async ({
    page,
  }) => {
    const sidefeil: Error[] = [];
    page.on('pageerror', (feil) => sidefeil.push(feil));

    await gotoApp(
      page,
      '/dev/utlopt-sesjon?sok=utvikler%20%26%20designer&side=2#detaljer',
    );
    await expect(page.getByText('Du er logget ut')).toBeHidden();

    await page.getByRole('button', { name: 'Simuler henting' }).click();

    await expect(page.getByText('Du er logget ut')).toBeVisible();
    const loggInn = page.getByRole('link', { name: /Logg inn på nytt/ });
    await expect(loggInn).toHaveAttribute('href', /^\/oauth2\/login\?/);
    const innloggingsUrl = new URL(
      await loggInn.evaluate((lenke: HTMLAnchorElement) => lenke.href),
    );
    expect(innloggingsUrl.searchParams.get('redirect')).toBe(page.url());
    await expect(loggInn).toHaveAttribute('target', '_blank');
    await expect(loggInn).toHaveAttribute('rel', 'noopener');
    await expect(page.getByText('Noe gikk galt!')).toBeHidden();
    await expect(page.getByText('Ojsann!')).toBeHidden();
    expect(sidefeil).toEqual([]);
  });

  test('Viser varsel når en handling som fanger feilen selv får 401', async ({
    page,
  }) => {
    await gotoApp(page, '/dev/utlopt-sesjon');

    await page.getByRole('button', { name: 'Simuler lagring' }).click();

    await expect(page.getByText('Klarte ikke å lagre')).toBeVisible();
    await expect(page.getByText('Du er logget ut')).toBeVisible();
  });

  test('Viser ikke varsel ved 401 som ikke skyldes utløpt sesjon', async ({
    page,
  }) => {
    await gotoApp(page, '/dev/utlopt-sesjon');

    await page.getByRole('button', { name: 'Simuler annen 401' }).click();

    await expect(page.getByText('Fikk 401 med gyldig sesjon')).toBeVisible();
    await expect(page.getByText('Du er logget ut')).toBeHidden();
  });
});
