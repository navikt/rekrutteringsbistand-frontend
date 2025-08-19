import { expect, test } from '@playwright/test';

test('Test inngang fra arbeidsoppfølging hvis personen ikke finnes i rekrutteringsbistand', async ({
  page,
}) => {
  await page.goto('http://localhost:1337/personbruker');
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
