import { expect, test } from '@playwright/test';

test('🚫 Rediger stilling Validering', async ({ page }) => {
  await page.goto('http://localhost:1337/stilling/nyStilling/rediger');
  await page.getByRole('button', { name: 'Neste steg' }).click();
  await expect(page.getByText('Navn er påkrevd').first()).toBeVisible();
  await expect(page.getByText('Tittel er påkrevd').first()).toBeVisible();
  await expect(
    page.getByText('Du må fylle ut enten e-post').first(),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Du må rette disse feilene før' }),
  ).toBeVisible();
  await page.goto(
    'http://localhost:1337/stilling/nyStilling/rediger?steg=om-stillingen',
  );
  await page.getByRole('checkbox', { name: 'Adresse' }).uncheck();
  await page.getByRole('button', { name: 'Neste steg' }).click();
  await expect(page.getByText('Velg en yrkeskategori').first()).toBeVisible();
  await expect(
    page
      .getByRole('paragraph')
      .filter({ hasText: 'Beskrivelse om stillingen er' })
      .first(),
  ).toBeVisible();

  await expect(
    page
      .getByRole('paragraph')
      .filter({
        hasText:
          'Du må velge minst én adresse eller én eller flere kommuner, fylker eller land.',
      })
      .first(),
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
    page
      .getByRole('group', { name: 'Velg sektor' })
      .getByRole('paragraph')
      .first(),
  ).toBeVisible();
  await expect(
    page.getByText('Antall stillinger må fylles ut').first(),
  ).toBeVisible();
  await expect(
    page
      .getByRole('group', { name: 'Velg omfang' })
      .getByRole('paragraph')
      .first(),
  ).toBeVisible();
  await expect(
    page.getByText('Ansettelsesform må velges').first(),
  ).toBeVisible();
  await expect(
    page
      .getByRole('group', { name: 'Arbeidsdager' })
      .getByRole('paragraph')
      .first(),
  ).toBeVisible();
  await expect(
    page
      .getByRole('group', { name: 'Arbeidstid' })
      .getByRole('paragraph')
      .first(),
  ).toBeVisible();
  await expect(
    page
      .getByRole('paragraph')
      .filter({ hasText: 'Du må fylle ut enten oppstart' })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .getByRole('paragraph')
      .filter({ hasText: 'Du må fylle ut enten sø' })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .getByRole('heading', { name: 'Du må rette disse feilene før' })
      .first(),
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
