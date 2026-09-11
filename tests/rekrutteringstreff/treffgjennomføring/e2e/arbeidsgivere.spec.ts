import { expect, test, åpneRomOgRotasjon } from './oppsett';

test('MSW blokkerer sletting av arbeidsgiver med deltakere i rommet', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
  await page
    .getByRole('button', { name: 'Slett', exact: true })
    .first()
    .click();
  const dialog = page.getByRole('dialog', { name: 'Slett arbeidsgiver' });
  const svar = page.waitForResponse(
    (respons) =>
      respons.request().method() === 'DELETE' &&
      respons.url().includes('/arbeidsgiver/'),
  );
  await dialog.getByRole('button', { name: 'Slett', exact: true }).click();
  expect((await svar).status()).toBe(409);
  await expect(dialog.getByRole('alert')).toContainText(
    'Arbeidsgiveren har deltakere i rommet eller registreringer i treffgjennomføringen.',
  );
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Avbryt' }).click();
  await expect(
    page.getByText('Eksempelbakeriet AS', { exact: true }),
  ).toBeVisible();
});

test('slettedialog viser korte meldinger uten å tolke backenddetaljer', async ({
  page,
}) => {
  await åpneRomOgRotasjon(page);
  await page.getByRole('tab', { name: /Arbeidsgivere/ }).click();
  await page
    .getByRole('button', { name: 'Slett', exact: true })
    .first()
    .click();
  const dialog = page.getByRole('dialog', { name: 'Slett arbeidsgiver' });
  let status = 409;
  await page.route('**/arbeidsgiver/*', (route) =>
    route.request().method() === 'DELETE'
      ? route.fulfill({
          status,
          contentType: 'text/plain',
          body: 'TEKNISK_TESTFEIL',
        })
      : route.continue(),
  );

  await dialog.getByRole('button', { name: 'Slett', exact: true }).click();
  await expect(dialog.getByRole('alert')).toContainText(
    'Flytt deltakerne og fjern registreringene',
  );
  await expect(dialog).not.toContainText('TEKNISK_TESTFEIL');

  status = 500;
  await dialog.getByRole('button', { name: 'Slett', exact: true }).click();
  await expect(dialog.getByRole('alert')).toContainText(
    'Kunne ikke slette arbeidsgiveren. Prøv igjen senere.',
  );
  await expect(dialog).not.toContainText('TEKNISK_TESTFEIL');
});
