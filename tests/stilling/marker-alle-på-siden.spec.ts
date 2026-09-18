import type {
  JobbSøkerDTO,
  KandidatlisteKandidaterResponseDTO,
} from '@/app/api/kandidat/schema.zod';
import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

function lagJobbsøker(nummer: number): JobbSøkerDTO {
  return {
    kandidat: {
      kandidatId: `TEST-MARKERING-${nummer}`,
      kandidatnr: `TEST-KANDIDATNR-${nummer}`,
      fornavn: 'Testperson',
      etternavn: `Eksempel${String(nummer).padStart(2, '0')}`,
      fodselsdato: '1990-01-01',
      fodselsnr: nummer === 24 ? null : `TEST-FNR-${nummer}`,
      status: InternKandidatstatus.VURDERES,
      lagtTilTidspunkt: '2026-01-01T10:00:00',
      lagtTilAv: { ident: 'Z999999', navn: 'Testveileder' },
      utfall: 'IKKE_PRESENTERT',
      telefon: null,
      epost: null,
      innsatsgruppe: 'STANDARD_INNSATS',
      arkivert: nummer === 23,
      arkivertTidspunkt: nummer === 23 ? '2026-01-02T10:00:00' : null,
      arkivertAv:
        nummer === 23 ? { ident: 'Z999999', navn: 'Testveileder' } : null,
      aktørid: `TEST-AKTOR-${nummer}`,
      utfallsendringer: [],
    },
    formidlingerAvUsynligKandidat: null,
    forespørslerOmDelingAvCver: [],
    varsler: [],
  };
}

async function mockKandidatliste(
  page: Page,
  variant: 'åpen' | 'tom' | 'ingen valgbare' | 'lukket' = 'åpen',
) {
  const jobbsøkere = Array.from({ length: 28 }, (_, i) => lagJobbsøker(i + 1));
  jobbsøkere[24] = {
    kandidat: null,
    formidlingerAvUsynligKandidat: {
      id: 'TEST-USYNLIG',
      fornavn: 'Testperson',
      mellomnavn: null,
      etternavn: 'Eksempel25',
      utfall: 'IKKE_PRESENTERT',
      lagtTilAvIdent: 'Z999999',
      lagtTilAvNavn: 'Testveileder',
      lagtTilTidspunkt: '2026-01-01T10:00:00',
      arkivert: false,
      arkivertAvIdent: null,
      arkivertAvNavn: null,
      arkivertTidspunkt: null,
    },
    forespørslerOmDelingAvCver: [],
    varsler: [],
  };
  const resultat =
    variant === 'tom'
      ? []
      : variant === 'ingen valgbare'
        ? jobbsøkere.slice(22, 25)
        : jobbsøkere;

  await page.route(
    '**/api/kandidat/veileder/stilling/*/kandidatlisteinfo',
    (route) =>
      route.fulfill({
        json: {
          kandidatlisteId: 'TEST-MARKERINGSLISTE',
          antallKandidater: resultat.length,
          kandidatlisteStatus: variant === 'lukket' ? 'LUKKET' : 'ÅPEN',
          opprettetDato: '2026-01-01T10:00:00',
          eier: 'Z993141',
          orgnr: '123456789',
        },
      }),
  );
  await page.route(
    '**/api/kandidat/veileder/stilling/*/kandidater?*',
    (route) => {
      const params = new URL(route.request().url()).searchParams;
      const side = Number(params.get('side'));
      const antall = Number(params.get('antallPerSide'));
      const respons: KandidatlisteKandidaterResponseDTO = {
        kandidatPersoner: resultat.slice((side - 1) * antall, side * antall),
        totaltAntallKandidater: resultat.length,
        antallPerKategoriPerFilter: {
          internStatus: {},
          kandidatlisteHendelseType: {},
          visSlettede: {},
        },
      };
      return route.fulfill({ json: respons });
    },
  );
}

const kandidatkort = (page: Page) => page.getByTestId('stillings-kort');

test.describe('Kandidatliste – marker alle på siden', () => {
  test('Markerer bare valgbare rader og beholder og tømmer valg på tvers av sider', async ({
    page,
  }) => {
    await mockKandidatliste(page);
    await gotoApp(page, '/stilling/minStilling/kandidatliste');
    const rader = kandidatkort(page);
    await expect(rader).toHaveCount(25);

    const første = rader
      .filter({ hasText: 'Eksempel01, Testperson' })
      .getByRole('checkbox');
    await første.check();
    const delvis = page.getByRole('checkbox', {
      name: 'Marker alle på siden (1 markert)',
      exact: true,
    });
    await expect(delvis).not.toBeChecked();
    await expect(delvis).toHaveJSProperty('indeterminate', false);
    await delvis.check();

    const allePåSiden = page.getByRole('checkbox', {
      name: 'Fjern markerte (22)',
      exact: true,
    });
    await expect(allePåSiden).toBeChecked();
    await expect(allePåSiden).toHaveJSProperty('indeterminate', false);
    await expect(rader.getByRole('checkbox', { checked: true })).toHaveCount(
      22,
    );
    for (const nummer of [23, 24, 25]) {
      const ikkeValgbar = rader
        .filter({ hasText: `Eksempel${nummer}, Testperson` })
        .getByRole('checkbox');
      await expect(ikkeValgbar).toBeDisabled();
      await expect(ikkeValgbar).not.toBeChecked();
    }
    await expect(
      page.getByRole('button', { name: 'Spør om å dele CV' }),
    ).toBeEnabled();

    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(rader).toHaveCount(3);
    await expect(rader.getByRole('checkbox', { checked: true })).toHaveCount(0);
    await page
      .getByRole('checkbox', {
        name: 'Marker alle på siden (22 markert)',
        exact: true,
      })
      .check();
    await expect(rader.getByRole('checkbox', { checked: true })).toHaveCount(3);
    await page
      .getByRole('button', { name: '25 markert på kandidatliste', exact: true })
      .click();
    const popover = page.getByRole('dialog');
    await expect(
      popover.getByRole('heading', {
        name: 'Markerte kandidater på kandidatliste (25)',
      }),
    ).toBeVisible();
    await expect(
      popover.getByRole('button', { name: 'Fjern kandidat' }),
    ).toHaveCount(25);
    await expect(
      popover.getByText('Eksempel01, Testperson', { exact: true }),
    ).toHaveCount(1);
    await expect(
      popover.getByText('Eksempel28, Testperson', { exact: true }),
    ).toHaveCount(1);
    for (const nummer of [23, 24, 25]) {
      await expect(
        popover.getByText(`Eksempel${nummer}, Testperson`),
      ).toHaveCount(0);
    }
    await page.keyboard.press('Escape');

    await page.getByRole('button', { name: 'Forrige side' }).click();
    await expect(rader).toHaveCount(25);
    const fjernAlle = page.getByRole('checkbox', {
      name: 'Fjern markerte (25)',
      exact: true,
    });
    await expect(fjernAlle).toBeChecked();
    await expect(rader.getByRole('checkbox', { checked: true })).toHaveCount(
      22,
    );
    await fjernAlle.uncheck();
    await expect(rader.getByRole('checkbox', { checked: true })).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: /markert på kandidatliste/ }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: 'Spør om å dele CV' }),
    ).toBeDisabled();

    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(rader).toHaveCount(3);
    await expect(rader.getByRole('checkbox', { checked: true })).toHaveCount(0);
    await expect(
      page.getByRole('checkbox', { name: 'Marker alle på siden', exact: true }),
    ).not.toBeChecked();
  });

  for (const variant of ['tom', 'ingen valgbare', 'lukket'] as const) {
    test(`Massemarkering er deaktivert når listen er ${variant}`, async ({
      page,
    }) => {
      await mockKandidatliste(page, variant);
      await gotoApp(page, '/stilling/minStilling/kandidatliste');

      const markerAlle = page.getByRole('checkbox', {
        name: 'Marker alle på siden',
        exact: true,
      });
      await expect(markerAlle).toBeDisabled();
      await expect(markerAlle).not.toBeChecked();
      await expect(markerAlle).toHaveJSProperty('indeterminate', false);
      await expect(
        kandidatkort(page).getByRole('checkbox', { disabled: false }),
      ).toHaveCount(0);
      await expect(
        kandidatkort(page).getByRole('checkbox', { checked: true }),
      ).toHaveCount(0);
      await expect(
        page.getByRole('button', { name: /markert på kandidatliste/ }),
      ).toHaveCount(0);
      await expect(kandidatkort(page)).toHaveCount(
        variant === 'tom' ? 0 : variant === 'ingen valgbare' ? 3 : 25,
      );
    });
  }
});
