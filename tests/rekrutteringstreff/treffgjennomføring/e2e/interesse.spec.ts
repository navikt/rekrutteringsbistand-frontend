import {
  expect,
  lagringsstatus,
  test,
  åpneInteresse,
  åpneVurdering,
} from './oppsett';
import { TreffgjennomføringSchema } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';

test('lagrer flere interesser og tilbakestiller bare den som feiler', async ({
  page,
}) => {
  await åpneInteresse(page);
  const første = page.getByRole('checkbox', {
    name: /Marius Etternavn01 Eksempelbakeriet AS/,
  });
  const andre = page.getByRole('checkbox', {
    name: /Emilie Etternavn02 Eksempelbakeriet AS/,
  });
  const tredje = page.getByRole('checkbox', {
    name: /Marius Etternavn01 Prøvetorget Handel AS/,
  });
  const neste = page.getByRole('button', { name: 'Neste', exact: true });
  await expect(neste).toBeDisabled();
  let slippLagring!: () => void;
  const vent = new Promise<void>((resolve) => {
    slippLagring = resolve;
  });
  let forespørsler = 0;
  await page.route('**/treffgjennomforing/interesse', async (route) => {
    forespørsler += 1;
    if (forespørsler === 1) await vent;
    if (forespørsler === 2) {
      await route.fulfill({ status: 500, json: { feil: 'Testfeil' } });
    } else {
      await route.continue();
    }
  });
  try {
    await første.check();
    await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagrer');
    await expect(
      page.getByRole('button', { name: 'Oppmøte', exact: true }),
    ).toHaveCount(0);
    await andre.check();
    await tredje.check();
    await expect(andre).toBeChecked();
    await expect(tredje).toBeChecked();
    await expect(
      page.getByRole('row', { name: /Marius Etternavn01/ }),
    ).toContainText('2');
    await expect(neste).toBeDisabled();
    await expect(andre).toBeEnabled();
    await expect(
      page.getByRole('heading', { name: 'Interesse', exact: true }),
    ).toBeVisible();
  } finally {
    slippLagring();
  }
  await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagringsfeil');
  await expect(
    page.getByText(/Én eller flere interesser kunne ikke lagres/),
  ).toBeVisible();
  await expect(første).toBeChecked();
  await expect(andre).not.toBeChecked();
  await expect(tredje).toBeChecked();
  await expect(neste).toBeEnabled();
  await expect(
    page.getByRole('button', { name: 'Oppmøte', exact: true }),
  ).toBeVisible();

  await andre.check();
  await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagret');
  await neste.click();
  await expect(
    page.getByRole('heading', { name: 'Intervjufordeling', exact: true }),
  ).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'Interesse', exact: true }).click();
  await expect(første).toBeChecked();
  await expect(andre).toBeChecked();
  await expect(tredje).toBeChecked();
});

test('beholder siste interesseendring mens et eldre lagringsforsøk feiler', async ({
  page,
}) => {
  await åpneInteresse(page);
  const interesse = page.getByRole('checkbox', {
    name: /Marius Etternavn01 Eksempelbakeriet AS/,
  });
  let slippFørsteLagring!: () => void;
  let slippNesteLagring!: () => void;
  let nesteLagringStartet!: () => void;
  const førsteLagring = new Promise<void>((resolve) => {
    slippFørsteLagring = resolve;
  });
  const nesteLagring = new Promise<void>((resolve) => {
    slippNesteLagring = resolve;
  });
  const nesteLagringErStartet = new Promise<void>((resolve) => {
    nesteLagringStartet = resolve;
  });
  let antallLagringer = 0;
  await page.route('**/treffgjennomforing/interesse', async (route) => {
    antallLagringer += 1;
    if (antallLagringer === 1) {
      await førsteLagring;
      await route.fulfill({ status: 500, json: { feil: 'Testfeil' } });
      return;
    }
    nesteLagringStartet();
    await nesteLagring;
    await route.continue();
  });

  try {
    await interesse.check();
    await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagrer');
    await interesse.uncheck();
    await interesse.check();
    slippFørsteLagring();
    await nesteLagringErStartet;
    await expect(interesse).toBeChecked();
    await expect(
      page.getByRole('button', { name: 'Oppmøte', exact: true }),
    ).toHaveCount(0);
  } finally {
    slippFørsteLagring();
    slippNesteLagring();
  }
  await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagret');
  await page.reload();
  await expect(interesse).toBeChecked();
});

test('blir på interessesteget hvis førstegangsfordelingen feiler og lar brukeren prøve igjen', async ({
  page,
}) => {
  await åpneInteresse(page);
  const interesse = page.getByRole('checkbox', {
    name: /Marius Etternavn01 Eksempelbakeriet AS/,
  });
  await interesse.check();
  await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagret');
  let slippLagring!: () => void;
  const vent = new Promise<void>((resolve) => {
    slippLagring = resolve;
  });
  await page.route(
    '**/treffgjennomforing/intervjufordeling/fordel',
    async (route) => {
      await vent;
      await route.fulfill({ status: 500, json: { feil: 'Testfeil' } });
    },
  );
  try {
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await expect(
      page.getByRole('button').filter({ hasText: 'Neste' }),
    ).toBeDisabled();
    await expect(
      page.getByRole('button', { name: 'Tilbake', exact: true }),
    ).toBeDisabled();
  } finally {
    slippLagring();
  }
  await expect(
    page.getByText('Kunne ikke fordele intervjuene. Prøv å gå videre på nytt.'),
  ).toBeVisible();
  await expect(interesse).toBeChecked();
  await page.unroute('**/treffgjennomforing/intervjufordeling/fordel');
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await expect(
    page.getByRole('list', {
      name: 'Intervjurekkefølge hos Eksempelbakeriet AS',
    }),
  ).toContainText('Marius Etternavn01');
});

test('krever at vurderingen nullstilles før interessen kan fjernes', async ({
  page,
}) => {
  await åpneVurdering(page);
  const vurdering = page
    .getByRole('region', { name: 'Eksempelbakeriet AS' })
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' })
    .getByRole('combobox', { name: 'Vurdering' });
  await vurdering.selectOption('KANSKJE');
  await expect(lagringsstatus(page, 'Vurdering og oppfølging')).toContainText(
    'Lagret',
  );
  await page.getByRole('button', { name: 'Interesse', exact: true }).click();
  const interesse = page.getByRole('checkbox', {
    name: /Marius Etternavn01 Eksempelbakeriet AS/,
  });
  await expect(interesse).toBeDisabled();

  await page
    .getByRole('button', { name: 'Vurdering og oppfølging', exact: true })
    .click();
  await vurdering.selectOption('');
  await expect(lagringsstatus(page, 'Vurdering og oppfølging')).toContainText(
    'Lagret',
  );
  await page.getByRole('button', { name: 'Interesse', exact: true }).click();
  await expect(interesse).toBeEnabled();
  await interesse.uncheck();
  await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagret');
  await page
    .getByRole('button', { name: 'Intervjufordeling', exact: true })
    .click();
  await expect(
    page
      .getByRole('list', { name: 'Intervjurekkefølge hos Eksempelbakeriet AS' })
      .getByText(/Marius Etternavn01/),
  ).toHaveCount(0);
});

test('viser ferske serververdier etter konflikt ved interesselagring', async ({
  page,
}) => {
  await åpneInteresse(page);
  const endepunkt = '**/treffgjennomforing-og-oppfolging';
  let konflikt = false;
  await page.route(endepunkt, async (route) => {
    const response = await route.fetch();
    const data = TreffgjennomføringSchema.parse(await response.json());
    await route.fulfill({
      response,
      json: konflikt
        ? {
            ...data,
            interesser: [
              {
                personTreffId: data.oppmøte[1],
                arbeidsgiverTreffId:
                  data.arbeidsgiverRekkefølge[0].arbeidsgiverTreffId,
              },
            ],
          }
        : data,
    });
  });
  await page.route('**/treffgjennomforing/interesse', async (route) => {
    konflikt = true;
    await route.fulfill({ status: 409, json: { feil: 'Testkonflikt' } });
  });
  const første = page.getByRole('checkbox', {
    name: /Marius Etternavn01 Eksempelbakeriet AS/,
  });
  const andre = page.getByRole('checkbox', {
    name: /Emilie Etternavn02 Eksempelbakeriet AS/,
  });
  await første.check();
  await expect(første).not.toBeChecked();
  await expect(andre).toBeChecked();
  await expect(lagringsstatus(page, 'Interesse')).toContainText('Lagringsfeil');
  await page.unrouteAll({ behavior: 'wait' });
});

test('lar hele det avkortede navnet leses med tastatur', async ({ page }) => {
  await åpneInteresse(page);
  const navn = page
    .getByRole('rowheader', { name: 'Oscar Fredrik Aleksander Etternavn03' })
    .getByText('3. Oscar Fredrik Aleksander Etternavn03', { exact: true });
  await expect(navn).toHaveAttribute('tabindex', '0');
  await page
    .getByRole('row', { name: /Emilie Etternavn02/ })
    .getByRole('checkbox')
    .last()
    .focus();
  await page.keyboard.press('Tab');
  await expect(navn).toBeFocused();
  await expect(
    page.getByRole('tooltip', { name: 'Oscar Fredrik Aleksander Etternavn03' }),
  ).toBeVisible();
});
