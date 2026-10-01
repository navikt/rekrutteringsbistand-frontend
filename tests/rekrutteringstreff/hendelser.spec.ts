import type { AlleHendelserDTO } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/useAlleHendelser';
import { gotoApp } from '@/tests/gotoApp';
import { snapshotTest } from '@/tests/snapshotTest';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Hendelser-fane', () => {
  test.beforeEach(async ({ page }) => {
    await gotoApp(page, '/rekrutteringstreff/publisert');
    await page.getByRole('tab', { name: 'Hendelser' }).click();
  });

  test('Viser kolonneoverskrifter', async ({ page }) => {
    await expect(page.getByText('Hendelse').first()).toBeVisible();
    await expect(page.getByText('Ressurs').first()).toBeVisible();
    await expect(page.getByText('Tidspunkt').first()).toBeVisible();
    await expect(page.getByText('Utført av').first()).toBeVisible();
    await expect(page.getByText('Gjelder').first()).toBeVisible();
  });

  test('Viser hendelsesrader', async ({ page }) => {
    await expect(
      page.getByText('Rekrutteringstreff', { exact: true }).first(),
    ).toBeVisible();
    await expect(
      page.getByText('Jobbsøker', { exact: true }).first(),
    ).toBeVisible();
    await expect(
      page.getByText('Arbeidsgiver', { exact: true }).first(),
    ).toBeVisible();
  });

  test('Viser aktør-identifikasjon i hendelseslisten', async ({ page }) => {
    await expect(page.getByText('A123456').first()).toBeVisible();
  });

  test('Viser subjektnavn for hendelser', async ({ page }) => {
    await expect(page.getByText('Ola Nordmann').first()).toBeVisible();
    await expect(page.getByText('NAV OSLO AS').first()).toBeVisible();
  });

  snapshotTest(test);
});

test('Viser beskrivelse når Nav-kontor er fjernet', async ({ page }) => {
  const hendelser: AlleHendelserDTO = [
    {
      id: 'kontor-fjernet',
      ressurs: 'REKRUTTERINGSTREFF',
      tidspunkt: '2026-09-18T10:00:00Z',
      hendelsestype: 'KONTOR_FJERNET',
      opprettetAvAktørType: 'ARRANGØR',
      aktørIdentifikasjon: 'A123456',
      subjektId: '0301',
      subjektNavn: 'Nav Oslo',
    },
  ];
  await page.route(
    '**/api/rekrutteringstreff/publisert/allehendelser',
    (route) => route.fulfill({ json: hendelser }),
  );
  await gotoApp(page, '/rekrutteringstreff/publisert');
  await page.getByRole('tab', { name: 'Hendelser' }).click();

  const rad = page.getByRole('row').filter({
    has: page.getByRole('cell', { name: 'Nav-kontor fjernet', exact: true }),
  });
  await expect(rad).toBeVisible();
  await expect(rad).toContainText('Nav Oslo');
});

test('Viser detaljer for jobbsøkerhendelser fra treffgjennomføringen', async ({
  page,
}) => {
  const felles = {
    ressurs: 'JOBBSØKER' as const,
    opprettetAvAktørType: 'ARRANGØR' as const,
    aktørIdentifikasjon: 'A123456',
    subjektId: '00000000001',
    subjektNavn: 'Test Testesen',
  };
  const hendelser: AlleHendelserDTO = [
    {
      ...felles,
      id: 'oppmote',
      tidspunkt: '2026-09-18T10:00:00Z',
      hendelsestype: 'REGISTRERT_OPPMØTE',
      hendelseData: { deltakernummer: 7 },
    },
    {
      ...felles,
      id: 'vurdert',
      tidspunkt: '2026-09-18T11:00:00Z',
      hendelsestype: 'VURDERT',
      hendelseData: {
        arbeidsgiverTreffId: 'ag-hendelse-1',
        forrigeVurdering: null,
        vurdering: 'AKTUELL',
      },
    },
    {
      ...felles,
      id: 'notat',
      tidspunkt: '2026-09-18T12:00:00Z',
      hendelsestype: 'NOTAT_LAGT_TIL',
      hendelseData: {
        arbeidsgiverTreffId: 'ag-hendelse-1',
        notat: 'AG_GODT_INNTRYKK',
      },
    },
    {
      ...felles,
      id: 'skjermet',
      tidspunkt: '2026-09-18T13:00:00Z',
      hendelsestype: 'REGISTRERT_OPPMØTE',
      subjektId: null,
      subjektNavn: null,
      hendelseData: { deltakernummer: 8 },
    },
    {
      ...felles,
      id: 'usynlig',
      tidspunkt: '2026-09-18T14:00:00Z',
      hendelsestype: 'REGISTRERT_OPPMØTE',
      subjektId: null,
      subjektNavn: 'Usynlig Testperson',
      hendelseData: { deltakernummer: 9 },
    },
    {
      id: 'moteplan',
      ressurs: 'REKRUTTERINGSTREFF',
      tidspunkt: '2026-09-18T09:00:00Z',
      hendelsestype: 'TREFFGJENNOMFØRING_OPPRETTET',
      opprettetAvAktørType: 'ARRANGØR',
      aktørIdentifikasjon: 'A123456',
      subjektId: null,
      subjektNavn: null,
    },
  ];
  await page.route(
    '**/api/rekrutteringstreff/publisert/allehendelser',
    (route) => route.fulfill({ json: hendelser }),
  );
  await page.route(
    '**/api/rekrutteringstreff/publisert/arbeidsgiver',
    (route) =>
      route.fulfill({
        json: [
          {
            arbeidsgiverTreffId: 'ag-hendelse-1',
            organisasjonsnummer: '000000001',
            navn: 'Eksempelbedrift AS',
            status: 'AKTIV',
            gateadresse: null,
            postnummer: null,
            poststed: null,
          },
        ],
      }),
  );
  await gotoApp(page, '/rekrutteringstreff/publisert');
  await page.getByRole('tab', { name: 'Hendelser' }).click();

  await expect(page.getByText('Deltakernummer 7')).toBeVisible();
  await expect(
    page.getByRole('row').filter({ hasText: 'Deltakernummer 8' }),
  ).toContainText('Ukjent jobbsøker');
  await expect(
    page.getByRole('row').filter({ hasText: 'Deltakernummer 8' }),
  ).not.toContainText('Ikke tilgjengelig');
  await expect(
    page.getByRole('row').filter({ hasText: 'Deltakernummer 9' }),
  ).toContainText(/Usynlig Testperson\s*\(Ikke tilgjengelig\)/);
  await expect(
    page.getByText('Eksempelbedrift AS · ingen vurdering → aktuell'),
  ).toBeVisible();
  await expect(
    page.getByText('Eksempelbedrift AS · Arbeidsgiveren: godt inntrykk'),
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Møteplan opprettet', exact: true }),
  ).toBeVisible();
});
