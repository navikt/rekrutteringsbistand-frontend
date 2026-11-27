import type {
  ForespørselOmDelingAvCvDTO,
  JobbSøkerDTO,
  KandidatlisteKandidaterResponseDTO,
} from '@/app/api/kandidat/schema.zod';
import {
  InternKandidatstatus,
  TilstandPåForespørsel,
} from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { gotoApp } from '@/tests/gotoApp';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const AKTØR_ID = 'TEST-AKTOR-DELING';
const FRAMTIDIG_FRIST = '2099-01-01T00:00:00+01:00';
const PASSERT_FRIST = '2020-01-01T00:00:00+01:00';

const forespørsel = (
  deltTidspunkt: string,
  tilstand: TilstandPåForespørsel,
  svarfrist: string,
  svar: ForespørselOmDelingAvCvDTO['svar'] = null,
): ForespørselOmDelingAvCvDTO => ({
  aktørId: AKTØR_ID,
  stillingsId: 'minStilling',
  deltStatus: 'SENDT',
  deltTidspunkt,
  deltAv: 'Z999999',
  svarfrist,
  tilstand,
  svar,
});

const venterPåSvar = (deltTidspunkt: string) =>
  forespørsel(
    deltTidspunkt,
    TilstandPåForespørsel.HAR_VARSLET,
    FRAMTIDIG_FRIST,
  );
const svartNei = (deltTidspunkt: string) =>
  forespørsel(deltTidspunkt, TilstandPåForespørsel.HAR_SVART, PASSERT_FRIST, {
    harSvartJa: false,
    svarTidspunkt: deltTidspunkt,
  });
const fristUtløpt = (deltTidspunkt: string) =>
  forespørsel(
    deltTidspunkt,
    TilstandPåForespørsel.SVARFRIST_UTLOPT,
    PASSERT_FRIST,
  );

const lagJobbsøker = (
  forespørsler: ForespørselOmDelingAvCvDTO[],
): JobbSøkerDTO => ({
  kandidat: {
    kandidatId: 'TEST-DELING',
    kandidatnr: 'TEST-KANDIDATNR-DELING',
    fornavn: 'Testperson',
    etternavn: 'Deling',
    fodselsdato: '1990-01-01',
    fodselsnr: 'TEST-FNR-DELING',
    status: InternKandidatstatus.VURDERES,
    lagtTilTidspunkt: '2026-01-01T10:00:00',
    lagtTilAv: { ident: 'Z999999', navn: 'Testveileder' },
    utfall: 'IKKE_PRESENTERT',
    telefon: null,
    epost: null,
    innsatsgruppe: 'STANDARD_INNSATS',
    arkivert: false,
    arkivertTidspunkt: null,
    arkivertAv: null,
    aktørid: AKTØR_ID,
    utfallsendringer: [],
  },
  formidlingerAvUsynligKandidat: null,
  forespørslerOmDelingAvCver: forespørsler,
  varsler: [],
});

async function mockKandidatliste(
  page: Page,
  forespørsler: ForespørselOmDelingAvCvDTO[],
) {
  await page.route(
    '**/api/kandidat/veileder/stilling/*/kandidatlisteinfo',
    (route) =>
      route.fulfill({
        json: {
          kandidatlisteId: 'TEST-DELINGSLISTE',
          antallKandidater: 1,
          kandidatlisteStatus: 'ÅPEN',
          opprettetDato: '2026-01-01T10:00:00',
          eier: 'Z993141',
          orgnr: '123456789',
        },
      }),
  );
  await page.route(
    '**/api/kandidat/veileder/stilling/*/kandidater?*',
    (route) => {
      const respons: KandidatlisteKandidaterResponseDTO = {
        kandidatPersoner: [lagJobbsøker(forespørsler)],
        totaltAntallKandidater: 1,
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

async function åpneDelMedKandidatModal(page: Page) {
  await gotoApp(page, '/stilling/minStilling/kandidatliste');
  await page
    .getByTestId('stillings-kort')
    .filter({ hasText: 'Deling, Testperson' })
    .getByRole('checkbox')
    .check();
  await page.getByRole('button', { name: 'Spør om å dele CV' }).click();
  const modal = page.getByRole('dialog');
  await modal.getByRole('radio', { name: '7 dager' }).check();
  return modal;
}

test.describe('Del med kandidat – status fra nyeste forespørsel', () => {
  test('Viser kun banner for nyeste forespørsel og spør på nytt én gang', async ({
    page,
  }) => {
    await mockKandidatliste(page, [
      venterPåSvar('2026-01-01T10:00:00'),
      svartNei('2026-01-02T10:00:00'),
      fristUtløpt('2026-01-03T10:00:00'),
    ]);
    const nyeForespørsler: string[] = [];
    await page.route('**/foresporsler/kandidat/*', (route) => {
      nyeForespørsler.push(route.request().url());
      return route.fulfill({ json: {} });
    });

    const modal = await åpneDelMedKandidatModal(page);

    await expect(
      modal.getByText('har tidligere fått spørsmål, men ikke svart'),
    ).toBeVisible();
    await expect(
      modal.getByText('har ikke svart på forespørselen'),
    ).toBeHidden();
    await expect(modal.getByText('har tidligere svart nei')).toBeHidden();
    await expect(
      modal.getByText('Spør om deling på nytt for 1 jobbsøker.'),
    ).toBeVisible();

    await modal.getByRole('button', { name: 'Del stilling' }).click();
    await expect(modal).toBeHidden();
    expect(nyeForespørsler).toHaveLength(1);
  });

  test('Kan ikke spørre på nytt når nyeste forespørsel venter på svar', async ({
    page,
  }) => {
    await mockKandidatliste(page, [
      svartNei('2026-01-01T10:00:00'),
      venterPåSvar('2026-01-02T10:00:00'),
    ]);

    const modal = await åpneDelMedKandidatModal(page);

    await expect(
      modal.getByText('1 jobbsøker har ikke svart på forespørselen.'),
    ).toBeVisible();
    await expect(modal.getByText('har tidligere svart nei')).toBeHidden();
    await expect(modal.getByText('Spør om deling på nytt')).toBeHidden();
    await expect(
      modal.getByRole('button', { name: 'Del stilling' }),
    ).toBeDisabled();
  });
});
