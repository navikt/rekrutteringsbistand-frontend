import { expect, test } from '@playwright/test';

test('🚫 Rediger stilling Validering', async ({ page }) => {
  await page.goto('http://localhost:1337/stilling/nyStilling/rediger');
  await page.getByRole('button', { name: 'Neste steg' }).click();
  await expect(page.getByText('Navn er påkrevd')).toBeVisible();
  await expect(page.getByText('Tittel er påkrevd')).toBeVisible();
  await expect(page.getByText('Du må fylle ut enten e-post')).toBeVisible();
  await page.goto(
    'http://localhost:1337/stilling/nyStilling/rediger?steg=om-stillingen',
  );
  await page.getByRole('button', { name: 'Neste steg' }).click();
  await expect(page.getByText('Velg en yrkeskategori')).toBeVisible();
  await expect(page.getByText('Beskrivelse om stillingen er')).toBeVisible();
  await expect(page.getByText('Du må velge arbeidssted')).toBeVisible();
  await page.getByRole('checkbox', { name: 'Adresse' }).check();
  await page.getByRole('button', { name: 'Neste steg' }).click();
  await expect(page.getByText('Alle adressefelt må fylles ut')).toBeVisible();
  await page.goto(
    'http://localhost:1337/stilling/nyStilling/rediger?steg=praktisk-info',
  );
  await page.getByRole('button', { name: 'Neste steg' }).click();
  await expect(page.getByText('Sektor må velges')).toBeVisible();
  await expect(page.getByText('Antall stillinger må fylles ut')).toBeVisible();
  await expect(page.getByText('Omfang må velges')).toBeVisible();
  await expect(page.getByText('Ansettelsesform må velges')).toBeVisible();
  await expect(page.getByText('Velg minst én arbeidsdag')).toBeVisible();
  await expect(page.getByText('Du må fylle ut enten oppstart')).toBeVisible();
  await expect(page.getByText('Du må fylle ut enten sø')).toBeVisible();
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
