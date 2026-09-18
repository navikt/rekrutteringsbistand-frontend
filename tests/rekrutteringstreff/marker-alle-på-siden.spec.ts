import type {
  JobbsøkerSøkResponsDTO,
  JobbsøkerSøkTreffDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test.describe('Rekrutteringstreff – marker alle på siden', () => {
  test('Massevalg supplerer delvis valg og global avmarkering tømmer begge sider', async ({
    page,
  }) => {
    await gotoApp(
      page,
      '/rekrutteringstreff/publisert-paginering?visFane=jobbsøkere',
    );
    const rader = page.getByRole('checkbox', { name: /Velg kandidat/ });
    await expect(rader).toHaveCount(25);
    await page
      .getByRole('checkbox', {
        name: 'Velg kandidat Etternavn01, Marius',
        exact: true,
      })
      .check();

    const delvis = page.getByRole('checkbox', {
      name: 'Marker alle på siden (1 markert)',
      exact: true,
    });
    await expect(delvis).not.toBeChecked();
    await expect(delvis).toHaveJSProperty('indeterminate', false);
    await delvis.check();

    const allePåSiden = page.getByRole('checkbox', {
      name: 'Fjern markerte (9)',
      exact: true,
    });
    await expect(allePåSiden).toBeChecked();
    await expect(allePåSiden).toHaveJSProperty('indeterminate', false);
    await expect(
      page.getByRole('checkbox', { name: /Velg kandidat/, checked: true }),
    ).toHaveCount(9);
    await expect(
      page.getByRole('checkbox', { name: /Velg kandidat/, disabled: true }),
    ).toHaveCount(16);
    await expect(
      page.getByRole('checkbox', {
        name: /Velg kandidat/,
        disabled: true,
        checked: true,
      }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: 'Inviter (9)', exact: true }),
    ).toBeEnabled();

    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(rader).toHaveCount(5);
    await expect(
      page.getByRole('checkbox', { name: /Velg kandidat/, checked: true }),
    ).toHaveCount(0);
    await page
      .getByRole('checkbox', {
        name: 'Marker alle på siden (9 markert)',
        exact: true,
      })
      .check();
    await expect(
      page.getByRole('checkbox', { name: 'Fjern markerte (11)', exact: true }),
    ).toBeChecked();
    await expect(
      page.getByRole('checkbox', { name: /Velg kandidat/, checked: true }),
    ).toHaveCount(2);
    await expect(
      page.getByRole('button', { name: 'Inviter (11)', exact: true }),
    ).toBeEnabled();
    await page.getByRole('button', { name: '11 markert', exact: true }).click();
    const popover = page.getByRole('dialog');
    await expect(
      popover.getByRole('heading', { name: 'Markerte jobbsøkere (11)' }),
    ).toBeVisible();
    await expect(
      popover.getByRole('button', { name: 'Fjern kandidat' }),
    ).toHaveCount(11);
    await expect(
      popover.getByText('Etternavn01, Marius', { exact: true }),
    ).toHaveCount(1);
    await expect(
      popover.getByText('Etternavn30, Tormod', { exact: true }),
    ).toHaveCount(1);
    await expect(
      popover.getByText('Etternavn04, Håkon', { exact: true }),
    ).toHaveCount(0);
    await page.keyboard.press('Escape');

    await page.getByRole('button', { name: 'Forrige side' }).click();
    await expect(rader).toHaveCount(25);
    const fjernAlle = page.getByRole('checkbox', {
      name: 'Fjern markerte (11)',
      exact: true,
    });
    await expect(fjernAlle).toBeChecked();
    await expect(
      page.getByRole('checkbox', { name: /Velg kandidat/, checked: true }),
    ).toHaveCount(9);
    await fjernAlle.uncheck();
    await expect(
      page.getByRole('checkbox', { name: /Velg kandidat/, checked: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: 'Inviter (0)', exact: true }),
    ).toBeDisabled();
    await expect(
      page.getByRole('button', { name: /^\d+ markert$/ }),
    ).toHaveCount(0);

    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(rader).toHaveCount(5);
    await expect(
      page.getByRole('checkbox', { name: /Velg kandidat/, checked: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole('checkbox', { name: 'Marker alle på siden', exact: true }),
    ).not.toBeChecked();
  });

  for (const { navn, query } of [
    { navn: 'bare ikke-valgbare jobbsøkere', query: 'status=INVITERT' },
    { navn: 'tomt søkeresultat', query: 'fritekst=TEST-INGEN-TREFF' },
  ]) {
    test(`Deaktiverer massemarkering ved ${navn}`, async ({ page }) => {
      await gotoApp(
        page,
        `/rekrutteringstreff/publisert-paginering?visFane=jobbsøkere&${query}`,
      );
      const markerAlle = page.getByRole('checkbox', {
        name: 'Marker alle på siden',
        exact: true,
      });
      await expect(markerAlle).toBeDisabled();
      await expect(markerAlle).not.toBeChecked();
      await expect(markerAlle).toHaveJSProperty('indeterminate', false);
      await expect(
        page.getByRole('checkbox', { name: /Velg kandidat/, disabled: false }),
      ).toHaveCount(0);
      await expect(
        page.getByRole('checkbox', { name: /Velg kandidat/, checked: true }),
      ).toHaveCount(0);
      await expect(
        page.getByRole('button', { name: /^\d+ markert$/ }),
      ).toHaveCount(0);
    });
  }

  test('Inviter bruker oppdatert status også for markerte jobbsøkere på tidligere sider', async ({
    page,
  }) => {
    let førsteErInvitert = false;
    const jobbsøkere: JobbsøkerSøkTreffDTO[] = Array.from(
      { length: 26 },
      (_, index) => ({
        personTreffId: `TEST-PERSON-${index + 1}`,
        fødselsnummer: `TEST-FNR-${index + 1}`,
        fornavn: 'Testperson',
        etternavn: `Eksempel${String(index + 1).padStart(2, '0')}`,
        status: 'LAGT_TIL',
        lagtTilDato: '2026-01-01T10:00:00',
        lagtTilAv: 'Z999999',
        lagtTilAvNavn: 'Testveileder',
        alder: 36,
        innsatsgruppe: null,
        minsideHendelser: [],
      }),
    );
    await page.route(
      '**/api/rekrutteringstreff/publisert/jobbsoker/sok',
      (route) => {
        const { side, antallPerSide } = route.request().postDataJSON() as {
          side: number;
          antallPerSide: number;
        };
        const oppdatert = jobbsøkere.map((j, index) =>
          index === 0 && førsteErInvitert ? { ...j, status: 'INVITERT' } : j,
        );
        const respons: JobbsøkerSøkResponsDTO = {
          jobbsøkere: oppdatert.slice(
            (side - 1) * antallPerSide,
            side * antallPerSide,
          ),
          totalt: 26,
          side,
          antallSkjulte: 0,
          antallSlettede: 0,
          antallPerStatus: {
            LAGT_TIL: førsteErInvitert ? 25 : 26,
            INVITERT: førsteErInvitert ? 1 : 0,
          },
          antallPerAldersgruppe: {},
        };
        return route.fulfill({ json: respons });
      },
    );
    await gotoApp(page, '/rekrutteringstreff/publisert?visFane=jobbsøkere');
    const første = page.getByRole('checkbox', {
      name: 'Velg kandidat Eksempel01, Testperson',
      exact: true,
    });
    await første.check();
    await expect(
      page.getByRole('button', { name: 'Inviter (1)', exact: true }),
    ).toBeEnabled();

    førsteErInvitert = true;
    await expect(første).toBeDisabled();
    await expect(
      page.getByRole('button', { name: 'Inviter (0)', exact: true }),
    ).toBeDisabled();
    await expect(
      page.getByRole('button', { name: '1 markert', exact: true }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Neste side' }).click();
    await expect(
      page.getByRole('checkbox', {
        name: 'Velg kandidat Eksempel26, Testperson',
        exact: true,
      }),
    ).toBeVisible();
    await page
      .getByRole('checkbox', {
        name: 'Marker alle på siden (1 markert)',
        exact: true,
      })
      .check();
    await expect(
      page.getByRole('checkbox', { name: 'Fjern markerte (2)', exact: true }),
    ).toBeChecked();
    await expect(
      page.getByRole('button', { name: '2 markert', exact: true }),
    ).toBeVisible();
    await page
      .getByRole('button', { name: 'Inviter (1)', exact: true })
      .click();

    const dialog = page.getByRole('dialog', {
      name: 'Inviter jobbsøkeren til treff',
    });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByText('Testperson Eksempel26', { exact: true }),
    ).toHaveCount(1);
    await expect(
      dialog.getByText('Testperson Eksempel01', { exact: true }),
    ).toHaveCount(0);
    await expect(
      dialog.getByRole('button', { name: 'Inviter jobbsøkeren', exact: true }),
    ).toBeEnabled();
  });
});
