import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Utløpt sesjon', () => {
  test('Viser melding om utløpt sesjon når API svarer 401', async ({
    page,
  }) => {
    const sidefeil: Error[] = [];
    page.on('pageerror', (feil) => sidefeil.push(feil));

    await gotoApp(page, '/dev/utlopt-sesjon');

    await expect(page.getByText('Du er logget ut')).toBeVisible();
    await expect(
      page.locator('a', { hasText: 'Logg inn på nytt' }),
    ).toHaveAttribute('href', '/oauth2/login?redirect=%2Fdev%2Futlopt-sesjon');
    await expect(page.getByText('Ojsann!')).toBeHidden();
    expect(sidefeil).toEqual([]);
  });
});
