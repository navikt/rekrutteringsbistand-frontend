import { decoratorMock } from '@/app/api/modia/decorator/mocks/dekoratørMock';
import { rekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';
import type { EierOgKontor } from '@/app/api/rekrutteringstreff/eierOgKontor';
import { byggSokRespons } from '@/app/api/rekrutteringstreff/sok/rekrutteringstreffSokMock';
import { gotoApp } from '@/tests/gotoApp';
import { eierOgKontorTilfeller } from '@/tests/rekrutteringstreff/eierOgKontorTestdata';
import { expect, type Page, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

async function mockEiere(page: Page, eierOgKontor: EierOgKontor[]) {
  const eierfelt = {
    eierOgKontor,
    eiere: ['GammelEier'],
    kontorer: ['9999'],
  };
  await page.route('**/api/rekrutteringstreff/publisert', (route) =>
    route.fulfill({
      json: {
        ...rekrutteringstreffMock('publisert'),
        ...eierfelt,
        tittel: 'Eierstruktur',
      },
    }),
  );
  await page.route('**/api/rekrutteringstreff/sok*', (route) => {
    const sok = byggSokRespons({ side: 1, antallPerSide: 20 });
    return route.fulfill({
      json: {
        ...sok,
        antallTotalt: 1,
        treff: [
          {
            ...sok.treff[0],
            ...eierfelt,
            id: 'publisert',
            tittel: 'Eierstruktur',
            opprettetAv: 'GammelEier',
          },
        ],
      },
    });
  });
}

for (const { flate, sti } of [
  { flate: 'detalj', sti: '/rekrutteringstreff/publisert' },
  { flate: 'søk', sti: '/rekrutteringstreff' },
]) {
  test(`${flate} viser flere eiere med felles kontor og navnefallback`, async ({
    page,
  }) => {
    await mockEiere(page, eierOgKontorTilfeller[0].eierOgKontor);
    await gotoApp(page, sti);

    const eierinfo = page.getByRole('group', {
      name: 'Eiere, kontorer og opprettelsesdato',
    });
    const avatarer = eierinfo.getByRole('img');
    await expect(avatarer).toHaveText(['KT', 'B', 'KT']);
    await expect(
      eierinfo.getByText('Nav Grünerløkka, Nav Kongsvinger', { exact: true }),
    ).toBeVisible();
    await expect(eierinfo.getByText(/^Opprettet /)).toBeVisible();

    await avatarer.first().focus();
    await expect(page.getByRole('tooltip')).toHaveText(
      'A123456 · Kari Testesen · Nav Grünerløkka',
    );
    await page.keyboard.press('Tab');
    await expect(avatarer.nth(1)).toBeFocused();
    await expect(page.getByRole('tooltip')).toHaveText(
      'B654321 · Nav Kongsvinger',
    );
    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip')).toHaveCount(0);

    if (flate === 'søk') {
      await page
        .getByRole('link', { name: 'Eierstruktur', exact: true })
        .click();
      await expect(page).toHaveURL(/\/rekrutteringstreff\/publisert$/);
    }
  });

  test(`${flate} håndterer tom eierliste`, async ({ page }) => {
    await mockEiere(page, []);
    await gotoApp(page, sti);

    await expect(
      page.getByRole('heading', { name: 'Eierstruktur', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(/GammelEier|Udefinert Nav-kontor| · Nav /),
    ).toHaveCount(0);
    const eierinfo = page.getByRole('group', {
      name: 'Eiere, kontorer og opprettelsesdato',
    });
    await expect(eierinfo).toHaveText(/^Opprettet [^•]+$/);
    await expect(eierinfo.getByRole('list', { name: 'Eiere' })).toHaveCount(0);
    if (flate === 'detalj') {
      await expect(
        page.getByRole('button', { name: 'Rediger', exact: true }),
      ).toHaveCount(0);
    }
  });
}

test('kontortilhørighet bruker eierobjektene for formidling og medeierdialog', async ({
  page,
}) => {
  await page.route('**/api/modia/decorator', (route) =>
    route.fulfill({
      json: {
        ...decoratorMock,
        enheter: [{ enhetId: '1001', navn: 'Nav Kristiansand' }],
      },
    }),
  );
  await mockEiere(page, [
    { navIdent: 'A123456', eierNavn: 'Kari Testesen', kontorEnhetId: '1001' },
    { navIdent: 'B654321', eierNavn: null, kontorEnhetId: '1001' },
  ]);
  const formidlinger = page.waitForRequest(
    '**/publisert/formidling/liste/alle',
  );
  const jobbsøkere = page.waitForRequest(
    '**/publisert/jobbsoker/formidling/alle',
  );
  await gotoApp(page, '/rekrutteringstreff/publisert');
  await Promise.all([formidlinger, jobbsøkere]);
  await expect(
    page.getByRole('tab', { name: 'Formidlinger (4)' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Rediger', exact: true }),
  ).toHaveCount(0);
  const enhetsmeny = page.getByRole('button', { name: /Enhet:/ });
  await enhetsmeny.click();
  await page
    .getByRole('button', { name: 'Nav Kristiansand', exact: true })
    .click();
  await expect(enhetsmeny).toHaveAccessibleName(/Enhet: Nav Kristiansand/);
  await page.getByRole('button', { name: 'Legg til meg som medeier' }).click();
  await expect(
    page
      .getByRole('dialog')
      .getByText(
        'Kontoret ditt (Nav Kristiansand) er allerede knyttet til treffet.',
      ),
  ).toBeVisible();
});
