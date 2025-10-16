import { gotoApp } from '@/tests/gotoApp';
import { test, expect } from '@playwright/test';

test('Test inngang fra arbeidsoppfølging hvis personen ikke finnes i rekrutteringsbistand', async ({
  page,
}) => {
  await gotoApp(page, '/personbruker');
  await expect(
    page.getByRole('heading', { name: 'Personen vises ikke i' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Vis reglene på navet' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Opprett en melding i Porten' }),
  ).toBeVisible();
});
