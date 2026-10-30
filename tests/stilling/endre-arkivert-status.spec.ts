import type {
  JobbSøkerDTO,
  KandidatlisteKandidaterResponseDTO,
} from '@/app/api/kandidat/schema.zod';
import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const arkivertEndepunkt =
  '**/api/kandidat/veileder/kandidatlister/TEST-ARKIVERING/kandidater/TEST-KANDIDAT/arkivert';

async function åpneModal(page: Page, arkivert: boolean, detaljvisning = false) {
  let kandidatMangler = false;
  let listekall = 0;
  let infokall = 0;
  let detaljkall = 0;
  const kandidat: JobbSøkerDTO = {
    kandidat: {
      kandidatId: 'TEST-KANDIDAT-ID',
      kandidatnr: 'TEST-KANDIDAT',
      fornavn: 'Testperson',
      etternavn: 'Eksempel',
      fodselsdato: '1990-01-01',
      fodselsnr: 'TEST-FNR',
      status: InternKandidatstatus.VURDERES,
      lagtTilTidspunkt: '2026-01-01T10:00:00',
      lagtTilAv: { ident: 'Z999999', navn: 'Testveileder' },
      utfall: 'IKKE_PRESENTERT',
      telefon: null,
      epost: null,
      innsatsgruppe: 'STANDARD_INNSATS',
      arkivert,
      arkivertTidspunkt: arkivert ? '2026-01-02T10:00:00' : null,
      arkivertAv: arkivert ? { ident: 'Z999999', navn: 'Testveileder' } : null,
      aktørid: 'TEST-AKTOR',
      utfallsendringer: [],
    },
    formidlingerAvUsynligKandidat: null,
    forespørslerOmDelingAvCver: [],
    varsler: [],
  };
  await page.route(
    '**/api/kandidat/veileder/stilling/*/kandidater/TEST-KANDIDAT',
    (route) => {
      detaljkall++;
      return route.fulfill(
        kandidatMangler
          ? { status: 404, json: { message: 'Kandidaten finnes ikke' } }
          : { json: kandidat },
      );
    },
  );
  await page.route(
    '**/api/kandidat/veileder/stilling/*/kandidatlisteinfo',
    (route) => {
      infokall++;
      return route.fulfill({
        json: {
          kandidatlisteId: 'TEST-ARKIVERING',
          antallKandidater: kandidatMangler ? 0 : 1,
          kandidatlisteStatus: 'ÅPEN',
          opprettetDato: '2026-01-01T10:00:00',
          eier: 'Z993141',
          orgnr: '123456789',
        },
      });
    },
  );
  await page.route(
    '**/api/kandidat/veileder/stilling/*/kandidater?*',
    (route) => {
      listekall++;
      const respons: KandidatlisteKandidaterResponseDTO = {
        kandidatPersoner: kandidatMangler ? [] : [kandidat],
        totaltAntallKandidater: kandidatMangler ? 0 : 1,
        antallPerKategoriPerFilter: {
          internStatus: {},
          kandidatlisteHendelseType: {},
          visSlettede: {},
        },
      };
      return route.fulfill({ json: respons });
    },
  );
  await gotoApp(page, '/stilling/minStilling/kandidatliste');
  const kort = page.getByTestId('stillings-kort');
  await expect(kort).toHaveCount(1);
  if (detaljvisning) {
    await kort.getByRole('link').first().click();
    await page
      .getByRole('button', {
        name: arkivert ? /Gjenopprett$/ : /Slett$/,
      })
      .last()
      .click();
  } else {
    await kort.getByRole('button', { name: 'Saksmeny' }).click();
    await page
      .getByRole('menuitem', {
        name: arkivert ? /Gjenopprett$/ : /Slett$/,
      })
      .click();
  }
  const dialog = page.getByRole('dialog', {
    name: arkivert ? 'Bekreft gjenoppretting' : 'Bekreft sletting',
  });
  await expect(dialog).toBeVisible();
  return {
    dialog,
    knapp: dialog.getByRole('button', {
      name: arkivert ? 'Gjenopprett kandidat' : 'Slett kandidat',
    }),
    fjernKandidat: () => {
      kandidatMangler = true;
    },
    antallListekall: () => listekall,
    antallInfokall: () => infokall,
    antallDetaljkall: () => detaljkall,
  };
}

for (const arkivert of [false, true]) {
  test.describe(arkivert ? 'Gjenoppretting' : 'Sletting', () => {
    test('fjerner utdatert kandidatcache i detaljvisningen ved forventet 400', async ({
      page,
    }) => {
      const modal = await åpneModal(page, arkivert, true);
      const detaljkallFør = modal.antallDetaljkall();
      expect(detaljkallFør).toBeGreaterThan(0);
      await page.route(arkivertEndepunkt, (route) => {
        modal.fjernKandidat();
        return route.fulfill({
          status: 400,
          json: {
            message:
              'Kandidat TEST-KANDIDAT finnes ikke i arbeidsgivers kandidatliste',
          },
        });
      });

      await modal.knapp.click();
      await expect.poll(modal.antallDetaljkall).toBeGreaterThan(detaljkallFør);
      await expect(modal.dialog.getByRole('alert')).toContainText(
        'Kandidaten finnes ikke lenger i kandidatlisten. Listen er oppdatert.',
      );
      await modal.dialog.getByRole('button', { name: 'Lukk' }).click();
      await expect(
        page.getByText('Fant ikke kandidat i kandidatliste'),
      ).toBeVisible();
      await expect(
        page.getByRole('button', {
          name: arkivert ? /Gjenopprett$/ : /Slett$/,
        }),
      ).toHaveCount(0);
    });

    test('hindrer lukking og gjentatte forsøk mens kallet pågår', async ({
      page,
    }) => {
      let fullfør!: () => void;
      const venter = new Promise<void>((resolve) => (fullfør = resolve));
      let antallKall = 0;
      await page.route(arkivertEndepunkt, async (route) => {
        antallKall++;
        await venter;
        await route.fulfill({ status: 204 });
      });
      const modal = await åpneModal(page, arkivert);

      try {
        await modal.knapp.dblclick({ delay: 50 });
        await expect.poll(() => antallKall).toBe(1);
        await expect(
          modal.dialog.getByRole('button', { name: 'Avbryt' }),
        ).toBeDisabled();
        await page.keyboard.press('Escape');
        await expect(modal.dialog).toBeVisible();
      } finally {
        fullfør();
      }

      await expect(modal.dialog).toBeHidden();
      expect(antallKall).toBe(1);
    });

    test('viser melding ved manglende kandidat og oppdaterer begge datakilder', async ({
      page,
    }) => {
      const sidefeil: Error[] = [];
      page.on('pageerror', (error) => sidefeil.push(error));
      const modal = await åpneModal(page, arkivert);
      const listekallFør = modal.antallListekall();
      const infokallFør = modal.antallInfokall();
      await page.route(arkivertEndepunkt, (route) => {
        modal.fjernKandidat();
        return route.fulfill({
          status: 400,
          json: {
            message:
              'Kandidat TEST-KANDIDAT finnes ikke i arbeidsgivers kandidatliste',
          },
        });
      });

      await modal.knapp.click();
      await expect(modal.dialog.getByRole('alert')).toContainText(
        'Kandidaten finnes ikke lenger i kandidatlisten. Listen er oppdatert.',
      );
      await expect.poll(modal.antallListekall).toBeGreaterThan(listekallFør);
      await expect.poll(modal.antallInfokall).toBeGreaterThan(infokallFør);
      await expect(page.getByTestId('stillings-kort')).toHaveCount(0);
      await expect(modal.dialog).toBeVisible();
      await expect(modal.knapp).toHaveCount(0);
      await modal.dialog.getByRole('button', { name: 'Lukk' }).click();
      await expect(modal.dialog).toBeHidden();
      expect(sidefeil).toEqual([]);
    });

    for (const status of [400, 500]) {
      test(`viser generell melding ved annen ${status} og kan prøve igjen`, async ({
        page,
      }) => {
        const sidefeil: Error[] = [];
        page.on('pageerror', (error) => sidefeil.push(error));
        await page.route(arkivertEndepunkt, (route) =>
          route.fulfill({ status, json: { message: 'Syntetisk feil' } }),
        );
        const modal = await åpneModal(page, arkivert);
        const listekallFør = modal.antallListekall();
        const infokallFør = modal.antallInfokall();
        await modal.knapp.click();
        await expect(modal.dialog.getByRole('alert')).toContainText(
          `Kunne ikke ${arkivert ? 'gjenopprette' : 'slette'} kandidaten. Prøv igjen.`,
        );
        await expect(modal.knapp).toBeEnabled();
        expect(modal.antallListekall()).toBe(listekallFør);
        expect(modal.antallInfokall()).toBe(infokallFør);

        await modal.dialog.getByRole('button', { name: 'Avbryt' }).click();
        await page
          .getByTestId('stillings-kort')
          .getByRole('button', { name: 'Saksmeny' })
          .click();
        await page
          .getByRole('menuitem', {
            name: arkivert ? /Gjenopprett$/ : /Slett$/,
          })
          .click();
        await expect(modal.dialog.getByRole('alert')).toHaveCount(0);
        await page.route(arkivertEndepunkt, (route) =>
          route.fulfill({ status: 204 }),
        );
        await modal.knapp.click();
        await expect(modal.dialog).toBeHidden();
        expect(sidefeil).toEqual([]);
      });
    }
  });
}
