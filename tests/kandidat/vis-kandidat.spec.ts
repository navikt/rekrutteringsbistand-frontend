import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

// ────────────────────────────────────────────────────────
// Vis kandidat – navigasjon og innhold
// ────────────────────────────────────────────────────────
test.describe('Vis kandidat', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/');
    await page.getByRole('button', { name: 'Jobbsøkere' }).click();
    await page
      .getByTestId('kandidatkort-lenke-kandidat-arenaKandidatnr-2')
      .click();
  });

  test('Viser handlingsknapper', async ({ page }) => {
    await expect(page.getByText('Finn jobb')).toBeVisible();
    await expect(page.getByText('Gå til aktivitetsplanen')).toBeVisible();
  });

  test('Viser Aktivitet-tab', async ({ page }) => {
    await expect(page.getByRole('tab', { name: 'Aktivitet' })).toBeVisible();
  });

  test('Viser rekrutteringstreff blant aktiviteter', async ({ page }) => {
    await page.route('**/api/rekrutteringstreff/jobbsoker/treff', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '71344525-ad9c-4e37-b4e7-265c19b889b4',
            tittel: 'Jobbtreff innen helse',
            lagtTilTidspunkt: '2026-09-15T08:30:00Z',
            treffStartTidspunkt: '2026-10-10T07:00:00Z',
            lagtTilAvNavn: 'Ola Nordmann',
            lagtTilAvIdent: 'A123456',
            status: 'INVITERT',
            kategori: 'REKRUTTERINGSTREFF',
            antallArbeidsgivere: 2,
          },
          {
            id: null,
            tittel: 'WorkOp innen teknologi',
            lagtTilTidspunkt: '2025-08-20T09:00:00Z',
            treffStartTidspunkt: '2025-09-12T08:00:00Z',
            lagtTilAvNavn: 'Kari Nordmann',
            lagtTilAvIdent: 'A654321',
            status: 'MØTT_OPP',
            kategori: 'WORKOP',
            antallArbeidsgivere: 0,
          },
        ]),
      }),
    );
    const forespørsel = page.waitForRequest(
      (request) =>
        request.method() === 'POST' &&
        new URL(request.url()).pathname ===
          '/api/rekrutteringstreff/jobbsoker/treff',
    );
    await page.getByRole('tab', { name: 'Aktiviteter' }).click();

    const request = await forespørsel;
    expect(request.postDataJSON()).toEqual({
      fødselsnummer: 'kandidat-fnr-2',
    });
    expect(request.url()).not.toContain('kandidat-fnr-2');

    const treff = page.getByRole('row', { name: /Jobbtreff innen helse/ });
    await expect(treff).toBeVisible();
    await expect(page.getByRole('columnheader')).toHaveText([
      'Dato',
      'Navn',
      'Type',
      'Arbeidsgiver',
      'Lagt til av',
      'Status/hendelse',
    ]);
    await expect(treff.getByRole('rowheader')).toHaveText('15.09.2026');
    await expect(treff.getByRole('cell')).toHaveText([
      'Jobbtreff innen helse',
      'Rekrutteringstreff',
      '2 arbeidsgivere',
      'Ola Nordmann',
      'Invitert',
    ]);
    const workOp = page.getByRole('row', { name: /WorkOp innen teknologi/ });
    await expect(workOp.getByRole('rowheader')).toHaveText('20.08.2025');
    await expect(workOp.getByRole('cell')).toHaveText([
      'WorkOp innen teknologi',
      'WorkOp',
      '0 arbeidsgivere',
      'Kari Nordmann',
      'Møtt opp',
    ]);
    await expect(
      treff.getByRole('cell').nth(1).locator('.aksel-tag'),
    ).toHaveAttribute('data-color', 'info');
    await expect(
      workOp.getByRole('cell').nth(1).locator('.aksel-tag'),
    ).toHaveAttribute('data-color', 'meta-purple');
    await expect(
      treff.getByRole('cell').last().locator('.aksel-tag'),
    ).toHaveClass(/aksel-tag--small/);
    const etterregistrering = page
      .getByRole('row')
      .filter({ has: page.locator('a[href^="/etterregistrering/"]') })
      .first();
    await expect(
      etterregistrering.getByRole('cell').nth(1).locator('.aksel-tag'),
    ).toHaveAttribute('data-color', 'success');
    await expect(
      etterregistrering.getByRole('cell').nth(1).locator('.aksel-tag'),
    ).toHaveAttribute('data-variant', 'outline');
    await expect(etterregistrering.getByRole('cell').nth(1)).toHaveText(
      'Etterregistrering',
    );
    const stilling = page
      .getByRole('row')
      .filter({ has: page.locator('a[href^="/stilling/"]') })
      .first();
    await expect(
      stilling.getByRole('cell').nth(1).locator('.aksel-tag'),
    ).toHaveAttribute('data-color', 'success');
    await expect(
      stilling.getByRole('cell').nth(1).locator('.aksel-tag'),
    ).toHaveAttribute('data-variant', 'outline');
    await expect(stilling.getByRole('cell').nth(1)).toHaveText('Stilling');
    const rader = await page.getByRole('row').allTextContents();
    expect(
      rader.findIndex((rad) => rad.includes('Jobbtreff innen helse')),
    ).toBeLessThan(
      rader.findIndex((rad) => rad.includes('WorkOp innen teknologi')),
    );
    expect(
      rader.findIndex((rad) => rad.includes('WorkOp innen teknologi')),
    ).toBeLessThan(rader.findIndex((rad) => rad.includes('19.09.2024')));
    await expect(
      treff.getByRole('link', { name: 'Jobbtreff innen helse' }),
    ).toHaveAttribute(
      'href',
      '/rekrutteringstreff/71344525-ad9c-4e37-b4e7-265c19b889b4',
    );
    await expect(workOp.locator('a')).toHaveCount(0);
  });

  test('Viser profilkvalitet', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Profilkvalitet' }),
    ).toBeVisible();
  });

  test('Viser kandidatinformasjon', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Ønsker' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Utdanning' }),
    ).toBeVisible();
  });

  snapshotTest(test);
});

test('Viser generell feilmelding dersom rekrutteringstreff ikke kan hentes', async ({
  page,
}) => {
  await page.route('**/api/rekrutteringstreff/jobbsoker/treff', (route) =>
    route.fulfill({
      status: 502,
      contentType: 'application/json',
      body: JSON.stringify({ beskrivelse: 'Kunne ikke slå opp enheter' }),
    }),
  );
  await gotoApp(
    page,
    '/kandidat/kandidat-arenaKandidatnr-2?kandidatFane=aktivitet',
  );
  await expect(
    page.getByText('Kunne ikke hente rekrutteringstreff.'),
  ).toBeVisible();
  await expect(page.getByText('Kunne ikke slå opp enheter')).toHaveCount(0);
});
