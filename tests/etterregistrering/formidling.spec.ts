import { expect, test } from '@playwright/test';
// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test(`📝 Opprett formidling`, async ({ page }) => {
  await page.goto('http://localhost:1337/formidlinger');
  await test.step('Opprett formidling', async () => {
    await page
      .getByRole('tab', { name: 'Etterregistrering', exact: true })
      .click();
    await page
      .getByRole('button', { name: 'Opprett etterregistrering' })
      .click();
    await page
      .getByRole('searchbox', { name: 'Fødselsnummer på kandidat' })
      .click();
    await page
      .getByRole('searchbox', { name: 'Fødselsnummer på kandidat' })
      .fill('04479208765');
    await page.getByTestId('velg-kandidat-resultat').click();

    await page.getByRole('button', { name: 'Neste steg' }).click();
  });

  await test.step('Om formidlingen', async () => {
    await page
      .getByRole('combobox', { name: 'Arbeidsgivers navn eller' })
      .click();
    await page
      .getByRole('combobox', { name: 'Arbeidsgivers navn eller' })
      .fill('TEST');
    await page.getByRole('option', { name: 'TEST PLUTSELIG KATT' }).click();
    await page
      .getByRole('combobox', { name: 'Velg yrkestittel (standard' })
      .click();
    await page
      .getByRole('combobox', { name: 'Velg yrkestittel (standard' })
      .fill('TEST');
    await page.getByRole('option', { name: 'Tester', exact: true }).click();
    await page.getByText('Privat', { exact: true }).click();
    await page.getByLabel('Ansettelsesform').selectOption('Fast');
    await page.getByText('Heltid (100%)').click();
    await page.getByText('Kommune, fylke eller land').click();
    await page.getByLabel('', { exact: true }).click();
    await page.getByLabel('', { exact: true }).fill('Kristi');
    await page.getByRole('option', { name: 'KRISTIANSAND (kommune)' }).click();
    await page
      .getByText('1Om kandidatene2 Om formidlingen3Om inkludering4InnspurtOm')
      .click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
  });

  await test.step('Tilrettelegging', async () => {
    await page.getByText('Arbeidstidf.eks. kortere').click();
    await page.getByText('Lønnstilskudd - midlertidig').click();
    await page.getByText('Er under 30 år').click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
  });

  await test.step('Fullfør registreringen', async () => {
    await expect(
      page.getByRole('button', { name: 'Fullfør registreringen' }),
    ).toBeVisible();
  });
});
