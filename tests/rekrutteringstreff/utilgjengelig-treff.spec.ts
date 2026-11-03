import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const UTILGJENGELIG_MELDING =
  'Rekrutteringstreffet er enten skjult eller slettet og er derfor ikke lenger tilgjengelig';

test.describe('Utilgjengelig rekrutteringstreff (410)', () => {
  test('Viser melding om at treffet er utilgjengelig', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/utilgjengelig');

    await expect(page.getByText(UTILGJENGELIG_MELDING)).toBeVisible();
    await expect(
      page.getByText('Kunne ikke laste rekrutteringstreffet'),
    ).toBeHidden();
    await expect(page.getByText('Noe gikk galt!')).toBeHidden();
  });

  test('Viser ikke faner eller handlinger', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/utilgjengelig');

    await expect(page.getByText(UTILGJENGELIG_MELDING)).toBeVisible();
    await expect(
      page.getByRole('tab', { name: 'Om treffet' }),
    ).not.toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Publiser' }),
    ).not.toBeVisible();
  });

  test('Viser melding også på redigeringssiden', async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/utilgjengelig/rediger');

    await expect(page.getByText(UTILGJENGELIG_MELDING)).toBeVisible();
  });
});
