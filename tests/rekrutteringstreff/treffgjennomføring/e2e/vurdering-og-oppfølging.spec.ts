import {
  expect,
  lagringsstatus,
  registrerOppmøte,
  test,
  åpneTreffgjennomføring,
  åpneVurdering,
} from './oppsett';
import type { Page } from '@playwright/test';

const vurderingsrad = (page: Page, navn: string) =>
  page
    .getByRole('region', { name: 'Eksempelbakeriet AS' })
    .getByRole('listitem')
    .filter({ hasText: navn });

test('viser innsatsbehov der det er kjent, uten tom etikett for andre', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);
  await registrerOppmøte(page, 'Etternavn21, Jakob');
  await page.getByRole('button', { name: 'Gå til rom og rotasjon' }).click();
  await page.getByRole('button', { name: 'Opprett møteplan' }).click();
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  for (const navn of ['Marius Etternavn01', 'Jakob Etternavn21']) {
    await page
      .getByRole('checkbox', {
        name: new RegExp(`${navn} Eksempelbakeriet AS`),
      })
      .check();
  }
  await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagret');
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await expect(vurderingsrad(page, 'Marius Etternavn01')).toContainText(
    'Gode muligheter',
  );
  await expect(vurderingsrad(page, 'Jakob Etternavn21')).not.toContainText(
    'Gode muligheter',
  );
});

test('beholder raske vurderingsendringer på flere rader etter ny lasting', async ({
  page,
}) => {
  await åpneVurdering(page);
  const første = vurderingsrad(page, 'Marius Etternavn01');
  const andre = vurderingsrad(page, 'Emilie Etternavn02');
  const vurdering = første.getByRole('combobox', { name: 'Vurdering' });
  const intervju = første.getByRole('checkbox', { name: '2. intervju' });
  const jobbtilbud = første.getByRole('checkbox', { name: 'Jobbtilbud' });
  const andreVurdering = andre.getByRole('combobox', { name: 'Vurdering' });
  const status = lagringsstatus(page, 'Vurdering og oppfølging');
  let slippLagring!: () => void;
  const vent = new Promise<void>((resolve) => {
    slippLagring = resolve;
  });
  await page.route('**/oppfolging/vurderinger', async (route) => {
    await vent;
    await route.continue();
  });
  try {
    await vurdering.selectOption('AKTUELL');
    await expect(status).toContainText('Lagrer');
    await intervju.check();
    await jobbtilbud.check();
    await andreVurdering.selectOption('KANSKJE');
    await expect(intervju).toBeChecked();
    await expect(jobbtilbud).toBeChecked();
    await expect(andreVurdering).toHaveValue('KANSKJE');
    await expect(
      page.getByRole('button', { name: 'Tilbake', exact: true }),
    ).toBeDisabled();
  } finally {
    slippLagring();
  }
  await expect(status).toContainText('Lagret');
  await expect(
    page.getByRole('button', { name: 'Tilbake', exact: true }),
  ).toBeEnabled();
  await page.reload();
  await expect(vurdering).toHaveValue('AKTUELL');
  await expect(intervju).toBeChecked();
  await expect(jobbtilbud).toBeChecked();
  await expect(andreVurdering).toHaveValue('KANSKJE');
});

test('viser lagringsfeil bare på berørt rad og lar brukeren prøve igjen', async ({
  page,
}) => {
  await åpneVurdering(page);
  const første = vurderingsrad(page, 'Marius Etternavn01');
  const andre = vurderingsrad(page, 'Emilie Etternavn02');
  const vurdering = første.getByRole('combobox', { name: 'Vurdering' });
  await vurdering.selectOption('AKTUELL');
  await expect(lagringsstatus(page, 'Vurdering og oppfølging')).toContainText(
    'Lagret',
  );
  await page.route('**/oppfolging/vurderinger', (route) =>
    route.fulfill({ status: 500, json: { feil: 'Testfeil' } }),
  );
  await vurdering.selectOption('KANSKJE');
  await expect(første.getByText(/Kunne ikke lagre vurderingen/)).toBeVisible();
  await expect(andre.getByText(/Kunne ikke lagre vurderingen/)).toHaveCount(0);
  await expect(vurdering).toHaveValue('AKTUELL');
  await page.unroute('**/oppfolging/vurderinger');
  await vurdering.selectOption('KANSKJE');
  await expect(lagringsstatus(page, 'Vurdering og oppfølging')).toContainText(
    'Lagret',
  );
  await expect(første.getByText(/Kunne ikke lagre vurderingen/)).toHaveCount(0);
  await page.reload();
  await expect(vurdering).toHaveValue('KANSKJE');
});

test('lar vurderinger lagres selv om formidlinger ikke kan hentes', async ({
  page,
}) => {
  await page.route('**/formidling/liste/alle**', (route) =>
    route.fulfill({ status: 500, json: { feil: 'Testfeil' } }),
  );
  await åpneVurdering(page);
  await expect(
    page.getByText(
      'Fikk ikke hentet «Formidlet» fra Formidlinger. Du kan fortsatt registrere andre statuser.',
    ),
  ).toBeVisible();
  const vurdering = vurderingsrad(page, 'Marius Etternavn01').getByRole(
    'combobox',
    { name: 'Vurdering' },
  );
  await vurdering.selectOption('KANSKJE');
  await expect(lagringsstatus(page, 'Vurdering og oppfølging')).toContainText(
    'Lagret',
  );
  await page.reload();
  await expect(vurdering).toHaveValue('KANSKJE');
});

test('beholder notater fra begge parter uavhengig av vurderingen', async ({
  page,
}) => {
  await åpneVurdering(page);
  const rad = vurderingsrad(page, 'Marius Etternavn01');
  const vurdering = rad.getByRole('combobox', { name: 'Vurdering' });
  await expect(vurdering).toHaveValue('');
  await rad.getByRole('button', { name: /^Notat/ }).click();
  await page.getByRole('checkbox', { name: 'Godt inntrykk' }).check();
  await page.getByRole('checkbox', { name: 'Reisevei' }).check();
  await page.keyboard.press('Escape');
  const arbeidsgiverensNotater = rad.getByRole('group', {
    name: /^Notater fra arbeidsgiveren/,
  });
  const jobbsøkerensNotater = rad.getByRole('group', {
    name: /^Notater fra jobbsøkeren/,
  });
  await expect(arbeidsgiverensNotater).toContainText('Godt inntrykk');
  await expect(arbeidsgiverensNotater).not.toContainText('Reisevei');
  await expect(jobbsøkerensNotater).toContainText('Reisevei');
  await expect(jobbsøkerensNotater).not.toContainText('Godt inntrykk');
  await vurdering.selectOption('AKTUELL');
  await vurdering.selectOption('IKKE_AKTUELL');
  await expect(lagringsstatus(page, 'Vurdering og oppfølging')).toContainText(
    'Lagret',
  );
  await page.reload();
  await expect(vurdering).toHaveValue('IKKE_AKTUELL');
  await expect(arbeidsgiverensNotater).toContainText('Godt inntrykk');
  await expect(jobbsøkerensNotater).toContainText('Reisevei');

  await arbeidsgiverensNotater
    .getByRole('button', { name: /Godt inntrykk/ })
    .click();
  await expect(lagringsstatus(page, 'Vurdering og oppfølging')).toContainText(
    'Lagret',
  );
  await page.reload();
  await expect(arbeidsgiverensNotater).toHaveCount(0);
  await expect(jobbsøkerensNotater).toContainText('Reisevei');
});

test('lagrer valgfri intervjudato og fjerner den sammen med intervjuavtalen', async ({
  page,
}) => {
  await åpneVurdering(page);
  const rad = vurderingsrad(page, 'Marius Etternavn01');
  const intervju = rad.getByRole('checkbox', { name: '2. intervju' });
  const dato = rad.getByRole('textbox', { name: /Dato for 2\. intervju/ });
  const status = lagringsstatus(page, 'Vurdering og oppfølging');
  await expect(dato).toHaveCount(0);
  await intervju.check();
  await expect(dato).toHaveValue('');
  await dato.fill('14.09.2026');
  await dato.blur();
  await expect(status).toContainText('Lagret');
  await page.reload();
  await expect(dato).toHaveValue('14.09.2026');
  await dato.fill('');
  await dato.blur();
  await expect(status).toContainText('Lagret');
  await page.reload();
  await expect(intervju).toBeChecked();
  await expect(dato).toHaveValue('');

  await dato.fill('14.09.2026');
  await dato.blur();
  await expect(status).toContainText('Lagret');
  await intervju.uncheck();
  await expect(status).toContainText('Lagret');
  await expect(dato).toHaveCount(0);
  await intervju.check();
  await expect(dato).toHaveValue('');
});

test('åpner formidlinger filtrert på arbeidsgiveren fra vurderingsraden', async ({
  page,
}) => {
  await åpneVurdering(page);
  await vurderingsrad(page, 'Marius Etternavn01')
    .getByRole('link', { name: 'Vis formidling' })
    .click();
  await expect(page).toHaveURL(
    /visFane=formidlinger.*formidlingArbeidsgivere=TEST-ORG-WORKOP-1/,
  );
  await expect(page.getByRole('tab', { name: /Formidlinger/ })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(
    page.getByText('Etternavn01, Marius', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Etternavn02, Emilie', { exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Testetternavn formidling')).toHaveCount(0);
});
