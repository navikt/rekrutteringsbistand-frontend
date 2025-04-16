import { expect, test } from '@playwright/test';

test('🚫 Rediger stilling Validering', async ({ page }) => {
  await page.goto('http://localhost:1337/stilling/nyStilling/rediger');
  await page.getByRole('button', { name: 'Neste steg' }).click();
  await expect(
    page.locator('#textField-error-ri').getByText('Navn er påkrevd'),
  ).toBeVisible();
  await expect(
    page.locator('#textField-error-rj').getByText('Tittel er påkrevd'),
  ).toBeVisible();
  await expect(
    page
      .locator('#textField-error-rk')
      .getByText('Du må fylle ut enten e-post'),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Du må rette disse feilene før' }),
  ).toBeVisible();
  await page.goto(
    'http://localhost:1337/stilling/nyStilling/rediger?steg=om-stillingen',
  );
  await page.getByRole('button', { name: 'Neste steg' }).click();
  await expect(
    page.locator('#comboboxfield-error-rd').getByText('Velg en yrkeskategori'),
  ).toBeVisible();
  await expect(
    page
      .getByRole('paragraph')
      .filter({ hasText: 'Beskrivelse om stillingen er' }),
  ).toBeVisible();
  await expect(
    page.getByRole('paragraph').filter({ hasText: 'Du må velge arbeidssted' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Du må rette disse feilene før' }),
  ).toBeVisible();
  await page.getByRole('checkbox', { name: 'Adresse' }).check();
  await page.getByRole('button', { name: 'Neste steg' }).click();
  await expect(
    page
      .getByRole('paragraph')
      .filter({ hasText: 'Alle adressefelt må fylles ut' }),
  ).toBeVisible();
  await page.goto(
    'http://localhost:1337/stilling/nyStilling/rediger?steg=praktisk-info',
  );
  await page.getByRole('button', { name: 'Neste steg' }).click();
  await expect(
    page.getByRole('group', { name: 'Velg sektor' }).getByRole('paragraph'),
  ).toBeVisible();
  await expect(
    page
      .locator('#textField-error-rl')
      .getByText('Antall stillinger må fylles ut'),
  ).toBeVisible();
  await expect(
    page.getByRole('group', { name: 'Velg omfang' }).getByRole('paragraph'),
  ).toBeVisible();
  await expect(
    page.locator('#select-error-ru').getByText('Ansettelsesform må velges'),
  ).toBeVisible();
  await expect(
    page.getByRole('group', { name: 'Arbeidsdager' }).getByRole('paragraph'),
  ).toBeVisible();
  await expect(
    page.getByRole('group', { name: 'Arbeidstid' }).getByRole('paragraph'),
  ).toBeVisible();
  await expect(
    page
      .getByRole('paragraph')
      .filter({ hasText: 'Du må fylle ut enten oppstart' }),
  ).toBeVisible();
  await expect(
    page.getByRole('paragraph').filter({ hasText: 'Du må fylle ut enten sø' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Du må rette disse feilene før' }),
  ).toBeVisible();
  await page.goto(
    'http://localhost:1337/stilling/nyStilling/rediger?steg=innspurt',
  );
  await page.getByText('Ja, publiser stillingen').click();
  await page.getByRole('button', { name: 'Fullfør og publiser' }).click();
  await expect(
    page
      .getByRole('paragraph')
      .filter({ hasText: 'Du må fylle ut enten e-post' }),
  ).toBeVisible();
});
