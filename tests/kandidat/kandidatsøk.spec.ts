import test, { expect } from '@playwright/test';

// Bruker arbeidsgiverrettet tilgang
test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test('Kandidatsøk', async ({ page }) => {
  await page.goto('http://localhost:1337');

  await page.getByRole('tab', { name: 'Kandidatsøk' }).click();
  await expect(
    page.getByRole('searchbox', { name: 'Søk etter kandidat' }),
  ).toBeVisible();
  await expect(
    page.getByRole('combobox', { name: 'Arbeidsønsker' }),
  ).toBeVisible();

  await expect(
    page.getByRole('checkbox', { name: 'Situasjonsbestemt innsats' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Spesielt tilpasset innsats' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Delvis varig tilpasset' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Varig tilpasset innsats Liten' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Standard innsats Gode' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Ikke vurdert' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Skaffe arbeid' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Beholde arbeid' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Øke deltagelse eller mål om' }),
  ).toBeVisible();
  await expect(
    page.getByRole('combobox', { name: 'Kompetanse' }),
  ).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Førerkort' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Språk' })).toBeVisible();
  await expect(
    page.getByRole('combobox', { name: 'Arbeidserfaring' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Videregående' }),
  ).toBeVisible();
  await expect(page.getByRole('checkbox', { name: 'Fagskole' })).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Universitet/høgskole inntil 4' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Universitet/høgskole over 4 år' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Doktorgrad (PhD)' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Unge under 30 år' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Senior 50+' }),
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Har hull i CV-en' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Hva er hull i CV-en?' }),
  ).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Mitt kontor' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Mine kontorer' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Alle kontorer' })).toBeVisible();
  await expect(
    page.getByRole('tab', { name: 'Valgte kontorer' }),
  ).toBeVisible();
  await page.getByRole('checkbox', { name: 'Marker alle på siden' }).check();
  await page.getByRole('button', { name: 'Lagre i kandidatliste' }).click();
  await page.getByRole('dialog', { name: 'Lagre 25 kandidat i' }).click();
  await page.getByRole('button', { name: 'Lukk' }).click();
});
