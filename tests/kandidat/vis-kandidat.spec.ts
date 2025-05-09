import test, { expect } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test('Vis kandidat', async ({ page }) => {
  await page.goto('http://localhost:1337');
  await page.getByRole('button', { name: 'Kandidater' }).click();
  await page.getByText('Eriksen, Mikkel').click();
  await expect(
    page.getByRole('button', { name: 'Finn stilling' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Gå til aktivitetsplanen' }),
  ).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Aktivitet' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Profilkvalitet' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Siste aktivitet' }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ønsker' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Utdanning' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Erfaring', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Språk' })).toBeVisible();
  // Legg til i mock
  // await expect(
  //   page.getByRole('heading', { name: 'Godkjenninger' }),
  // ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Førerkort' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Kompetanse', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Kurs', exact: true }),
  ).toBeVisible();
  await page.getByRole('tab', { name: 'Aktivitet' }).click();
  await expect(
    page.getByRole('columnheader', { name: 'Navn på stilling' }),
  ).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Dato' })).toBeVisible();
  await expect(
    page.getByRole('columnheader', { name: 'Arbeidsgiver' }),
  ).toBeVisible();
  await expect(
    page.getByRole('columnheader', { name: 'Lagt til av' }),
  ).toBeVisible();
  await expect(
    page.getByRole('columnheader', { name: 'Status/hendelse' }),
  ).toBeVisible();
});
