import { kandidatlisteoversiktMock } from '@/app/api/kandidat/mocks/kandidatlisteoversiktMock';
import { kandidatHistorikkSchema } from '@/app/api/kandidat/schema.zod';
import { mockBaseStilling } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const historikk = kandidatHistorikkSchema.parse({
  ...kandidatlisteoversiktMock[2],
  tittel: 'Historisk stillingstittel',
  organisasjonNavn: 'Historisk arbeidsgiver',
});

for (const scenario of [
  { navn: '404', status: 404, body: '', tittel: historikk.tittel },
  { navn: 'tom body', status: 200, body: '', tittel: historikk.tittel },
  { navn: 'JSON null', status: 200, body: 'null', tittel: historikk.tittel },
  {
    navn: 'manglende stilling',
    status: 200,
    body: '{}',
    tittel: historikk.tittel,
  },
  { navn: '404 uten historikktittel', status: 404, body: '', tittel: null },
]) {
  test(`Viser historikkraden ved ${scenario.navn}`, async ({ page }) => {
    const sidefeil: Error[] = [];
    const loggmeldinger: string[] = [];
    page.on('pageerror', (feil) => sidefeil.push(feil));
    page.on('console', (melding) => loggmeldinger.push(melding.text()));

    await page.route(
      '**/api/kandidat/veileder/kandidater/*/listeoversikt',
      (route) =>
        route.fulfill({
          json: [
            { ...historikk, tittel: scenario.tittel },
            {
              ...historikk,
              uuid: 'eksisterende-stilling',
              stillingId: 'eksisterende-stilling',
            },
          ],
        }),
    );
    await page.route(
      '**/api/stilling/rekrutteringsbistandstilling/eksisterende-stilling',
      (route) => route.fulfill({ json: mockBaseStilling }),
    );
    await page.route(
      `**/api/stilling/rekrutteringsbistandstilling/${historikk.stillingId}`,
      (route) =>
        route.fulfill({
          status: scenario.status,
          contentType: 'application/json',
          body: scenario.body,
        }),
    );

    await gotoApp(
      page,
      '/kandidat/kandidat-arenaKandidatnr-2?kandidatFane=aktivitet',
    );

    const rad = page.getByRole('row').filter({
      has: page.getByRole('cell', {
        name: scenario.tittel ?? 'Ukjent stilling',
        exact: true,
      }),
    });
    await expect(rad).toBeVisible();
    await expect(rad.getByRole('link')).toHaveCount(0);
    await expect(rad.getByRole('rowheader')).toHaveText('19.06.2024');
    await expect(rad.getByRole('cell')).toHaveText([
      scenario.tittel ?? 'Ukjent stilling',
      'Stilling',
      'Historisk arbeidsgiver',
      historikk.lagtTilAvNavn,
      'Vurderes',
    ]);
    await expect(
      page.getByRole('link', {
        name: mockBaseStilling.stilling.title,
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByText('Noe gikk galt!')).toHaveCount(0);
    expect(sidefeil).toEqual([]);
    expect(
      loggmeldinger.filter((melding) =>
        melding.includes('Ressurs ikke funnet'),
      ),
    ).toEqual([]);
  });
}

test('Viser fremdeles uventede feil fra stilling-api', async ({ page }) => {
  await page.route(
    '**/api/kandidat/veileder/kandidater/*/listeoversikt',
    (route) => route.fulfill({ json: [historikk] }),
  );
  await page.route(
    `**/api/stilling/rekrutteringsbistandstilling/${historikk.stillingId}`,
    (route) => route.fulfill({ status: 500, body: '' }),
  );

  await gotoApp(
    page,
    '/kandidat/kandidat-arenaKandidatnr-2?kandidatFane=aktivitet',
  );

  await expect(
    page.getByRole('row').filter({ hasText: 'Serverfeil' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', {
      name: historikk.tittel ?? 'Ukjent stilling',
      exact: true,
    }),
  ).toHaveCount(0);
});
