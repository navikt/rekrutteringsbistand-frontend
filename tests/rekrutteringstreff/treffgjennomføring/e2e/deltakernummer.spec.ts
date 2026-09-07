import { expect, test, åpneTreffgjennomføring } from './oppsett';

test('viser deltakernummeret sammen med navnet gjennom hele gjennomføringen', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);

  const oppmøte = page.getByRole('region', { name: 'Oppmøte' });
  // Lista skal lese som en kortbunke, altså fortløpende fra 1.
  await expect(oppmøte.getByRole('listitem').first()).toContainText(
    '1. Marius Etternavn01',
  );
  await expect(oppmøte.getByRole('listitem').nth(1)).toContainText(
    '2. Emilie Etternavn02',
  );

  await page.getByRole('button', { name: 'Gå til rom og rotasjon' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();
  await expect(page.getByText('1. Marius Etternavn01').first()).toBeVisible();

  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  const interessestatus = page
    .getByRole('region', { name: 'Interesse' })
    .locator('[data-autolagringsstatus]');
  await expect(interessestatus).toContainText('Lagret');
  await expect(
    page.getByRole('checkbox', {
      name: /1\. Marius Etternavn01 Eksempelbakeriet AS/,
    }),
  ).toBeVisible();
  await page
    .getByRole('checkbox', {
      name: /1\. Marius Etternavn01 Eksempelbakeriet AS/,
    })
    .click();
  await expect(interessestatus).toContainText('Lagret');

  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  const fordelingsrad = page
    .getByRole('region', { name: 'Eksempelbakeriet AS' })
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  await expect(fordelingsrad).toContainText('1. Marius Etternavn01');
  // Plassen i rekkefølgen leses av rekkefølgen på lista. Raden skal vise
  // deltakernummeret alene, uten et plassnummer ved siden av.
  await expect(fordelingsrad).toHaveText(/^\d+\. \D/);

  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await expect(
    page
      .getByRole('region', { name: 'Eksempelbakeriet AS' })
      .getByRole('listitem')
      .filter({ hasText: 'Marius Etternavn01' }),
  ).toContainText('1. Marius Etternavn01');
});
