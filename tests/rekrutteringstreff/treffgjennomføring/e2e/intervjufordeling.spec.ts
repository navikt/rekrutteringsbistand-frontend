import {
  draTil,
  expect,
  lagringsstatus,
  test,
  åpneIntervjufordeling,
} from './oppsett';

test('viser og fjerner plasskonflikter når intervjurekkefølgen endres', async ({
  page,
}) => {
  await åpneIntervjufordeling(page, [
    'Marius Etternavn01 Eksempelbakeriet AS',
    'Emilie Etternavn02 Eksempelbakeriet AS',
    'Marius Etternavn01 Prøvetorget Handel AS',
  ]);
  const liste = page.getByRole('list', {
    name: 'Intervjurekkefølge hos Eksempelbakeriet AS',
  });
  const navnSomSkalFørst = await liste.getByRole('listitem').nth(1).innerText();
  await draTil(
    liste.getByRole('listitem').first().locator('[draggable="true"]'),
    liste.getByRole('listitem').nth(1),
    async () => {
      await expect(liste.getByRole('listitem').first()).toContainText(
        navnSomSkalFørst,
      );
    },
    { x: 20, y: 1 },
  );
  await expect(lagringsstatus(page, 'Intervjufordeling')).toContainText(
    'Lagret',
  );
  await liste.getByRole('listitem').first().getByLabel('Plasskonflikt').hover();
  await expect(page.getByRole('tooltip')).toHaveText(
    'Plass 1 også hos Prøvetorget Handel AS',
  );
  await page.reload();
  await expect(liste.getByRole('listitem').first()).toContainText(
    navnSomSkalFørst,
  );
  await page
    .getByRole('button', {
      name: 'Flytt 1. Marius Etternavn01 ned hos Eksempelbakeriet AS',
    })
    .click();
  await expect(page.getByLabel('Plasskonflikt')).toHaveCount(0);
});

test('beholder flytting over sperrelinjen uten å endre interessen', async ({
  page,
}) => {
  await åpneIntervjufordeling(page);
  const ikkeMed = page.getByRole('list', {
    name: 'Ikke gjennomført speedintervju hos Eksempelbakeriet AS',
  });
  await page
    .getByRole('button', {
      name: 'Flytt 1. Marius Etternavn01 ned hos Eksempelbakeriet AS',
    })
    .click();
  await expect(lagringsstatus(page, 'Intervjufordeling')).toContainText(
    'Lagret',
  );
  await page
    .getByRole('button', {
      name: 'Flytt 1. Marius Etternavn01 under sperrelinjen hos Eksempelbakeriet AS',
    })
    .click();
  await expect(ikkeMed).toContainText('Marius Etternavn01');
  await expect(lagringsstatus(page, 'Intervjufordeling')).toContainText(
    'Lagret',
  );
  await page.getByRole('button', { name: 'Tilbake', exact: true }).click();
  await expect(
    page.getByRole('checkbox', {
      name: /Marius Etternavn01 Eksempelbakeriet AS/,
    }),
  ).toBeChecked();
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  await expect(ikkeMed).toContainText('Marius Etternavn01');
  await page.getByRole('button', { name: 'Neste', exact: true }).click();
  const vurdering = page.getByRole('region', { name: 'Eksempelbakeriet AS' });
  const marius = vurdering
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  await expect(marius.getByText('Interessert i å møte')).toBeVisible();
  await expect(marius.getByText('Satt opp til intervju')).toHaveCount(0);
  await expect(
    vurdering
      .getByRole('listitem')
      .filter({ hasText: 'Emilie Etternavn02' })
      .getByText('Satt opp til intervju'),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Intervjufordeling', exact: true })
    .click();

  await page
    .getByRole('button', {
      name: 'Flytt 1. Marius Etternavn01 over sperrelinjen hos Eksempelbakeriet AS',
    })
    .click();
  await expect(lagringsstatus(page, 'Intervjufordeling')).toContainText(
    'Lagret',
  );
  await expect(ikkeMed.getByText(/Marius Etternavn01/)).toHaveCount(0);
  await expect(page).toHaveURL(/[?&]visSteg=4(?:&|$)/);
  await page.reload();
  await expect(
    page.getByRole('list', {
      name: 'Intervjurekkefølge hos Eksempelbakeriet AS',
    }),
  ).toContainText('Marius Etternavn01');
});

test('beholder tastaturfokus og skiller lagret flytting fra lagringsfeil', async ({
  page,
}) => {
  await åpneIntervjufordeling(page);
  const status = lagringsstatus(page, 'Intervjufordeling');
  const liste = page.getByRole('list', {
    name: 'Intervjurekkefølge hos Eksempelbakeriet AS',
  });
  await page
    .getByRole('button', {
      name: 'Flytt 1. Marius Etternavn01 ned hos Eksempelbakeriet AS',
    })
    .click();
  await expect(status).toContainText('Lagret');
  await expect(
    page.getByRole('button', {
      name: /Flytt 1\. Marius Etternavn01 (ned|under sperrelinjen)/,
    }),
  ).toBeFocused();
  await expect(status).toContainText(
    'Marius Etternavn01 er flyttet til plass 2',
  );
  const førFeil = await liste.getByRole('listitem').allTextContents();

  await page.route('**/treffgjennomforing/intervjufordeling', (route) =>
    route.fulfill({ status: 500, json: { feil: 'Testfeil' } }),
  );
  await page
    .getByRole('button', {
      name: 'Flytt 2. Emilie Etternavn02 ned hos Eksempelbakeriet AS',
    })
    .click();
  await expect(status).toContainText('Lagringsfeil');
  await expect(status).not.toContainText('er flyttet');
  await expect(liste.getByRole('listitem')).toHaveText(førFeil);
  await page.unroute('**/treffgjennomforing/intervjufordeling');
  await page
    .getByRole('button', {
      name: 'Flytt 2. Emilie Etternavn02 ned hos Eksempelbakeriet AS',
    })
    .click();
  await expect(status).toContainText('Lagret');
  await expect(liste.getByRole('listitem').last()).toContainText(
    'Emilie Etternavn02',
  );
});

test('lar lange navn vises og flyttes uten at knappene blir utilgjengelige', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1000 });
  await åpneIntervjufordeling(page, [
    'Marius Etternavn01 Eksempelbakeriet AS',
    'Oscar Fredrik Aleksander Etternavn03 Eksempelbakeriet AS',
  ]);
  await page
    .getByRole('button', {
      name: 'Flytt 3. Oscar Fredrik Aleksander Etternavn03 under sperrelinjen hos Eksempelbakeriet AS',
    })
    .click();
  await expect(lagringsstatus(page, 'Intervjufordeling')).toContainText(
    'Lagret',
  );
  await expect(
    page.getByRole('list', {
      name: 'Ikke gjennomført speedintervju hos Eksempelbakeriet AS',
    }),
  ).toContainText('Oscar Fredrik Aleksander Etternavn03');
});

test('bekrefter ny fordeling og beholder manuelle valg hvis fordelingen feiler', async ({
  page,
}) => {
  await åpneIntervjufordeling(page);
  const liste = page.getByRole('list', {
    name: 'Intervjurekkefølge hos Eksempelbakeriet AS',
  });
  await page
    .getByRole('button', {
      name: 'Flytt 1. Marius Etternavn01 ned hos Eksempelbakeriet AS',
    })
    .click();
  await expect(lagringsstatus(page, 'Intervjufordeling')).toContainText(
    'Lagret',
  );
  await page
    .getByRole('button', {
      name: 'Flytt 1. Marius Etternavn01 under sperrelinjen hos Eksempelbakeriet AS',
    })
    .click();
  await expect(lagringsstatus(page, 'Intervjufordeling')).toContainText(
    'Lagret',
  );
  const ikkeMed = page.getByRole('list', {
    name: 'Ikke gjennomført speedintervju hos Eksempelbakeriet AS',
  });
  await page
    .getByRole('button', { name: 'Fordel på nytt', exact: true })
    .click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: 'Avbryt' }).click();
  await expect(ikkeMed).toContainText('Marius Etternavn01');

  await page.route('**/treffgjennomforing/intervjufordeling/fordel', (route) =>
    route.fulfill({ status: 500, json: { feil: 'Testfeil' } }),
  );
  await page
    .getByRole('button', { name: 'Fordel på nytt', exact: true })
    .click();
  await dialog
    .getByRole('button', { name: 'Fordel på nytt', exact: true })
    .click();
  await expect(
    page.getByText('Vi kunne ikke bekrefte den nye fordelingen.', {
      exact: false,
    }),
  ).toBeVisible();
  await expect(ikkeMed).toContainText('Marius Etternavn01');

  await page.unroute('**/treffgjennomforing/intervjufordeling/fordel');
  await page
    .getByRole('button', { name: 'Fordel på nytt', exact: true })
    .click();
  await dialog
    .getByRole('button', { name: 'Fordel på nytt', exact: true })
    .click();
  await expect(lagringsstatus(page, 'Intervjufordeling')).toContainText(
    'Intervjuene er fordelt på nytt',
  );
  await expect(liste.getByRole('listitem')).toHaveCount(1);
  await expect(ikkeMed).toContainText('Marius Etternavn01');
  await page.reload();
  await expect(ikkeMed).toContainText('Marius Etternavn01');
});
