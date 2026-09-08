import {
  expect,
  lagringsstatus,
  test,
  åpneIntervjufordeling,
  åpneRomOgRotasjon,
  åpneTreffgjennomføring,
} from './oppsett';

for (const steg of ['Romfordeling', 'Intervjufordeling'] as const) {
  for (const handling of ['flytting', 'ny fordeling'] as const) {
    test(`${steg}: ${handling} med tapt svar og feilet oppfriskning sperrer tilstanden uten å sende på nytt`, async ({
      page,
    }) => {
      const erRom = steg === 'Romfordeling';
      if (erRom) await åpneRomOgRotasjon(page);
      else await åpneIntervjufordeling(page);
      const område = page.getByRole('region', { name: steg, exact: true });
      const lesRekkefølge = () =>
        område.getByRole('listitem').allTextContents();
      const flytt = async () => {
        if (erRom) {
          await område
            .getByRole('button', { name: /til et annet rom/ })
            .first()
            .click();
          await page
            .getByRole('menuitem', { name: 'Rom 2', exact: true })
            .click();
        } else {
          await område
            .getByRole('button', { name: /ned hos Eksempelbakeriet AS/ })
            .first()
            .click();
        }
      };
      if (handling === 'ny fordeling') {
        await flytt();
        await expect(lagringsstatus(page, steg)).toContainText('Lagret');
      }
      const før = await lesRekkefølge();
      let skriver = 0;
      let tillatOppfriskning = false;
      const endepunkt = {
        Romfordeling: {
          flytting: '**/treffgjennomforing/romfordeling/*',
          'ny fordeling': '**/treffgjennomforing/romfordeling/fordel',
        },
        Intervjufordeling: {
          flytting: '**/treffgjennomforing/intervjufordeling',
          'ny fordeling': '**/treffgjennomforing/intervjufordeling/fordel',
        },
      }[steg][handling];
      await page.route(endepunkt, async (route) => {
        skriver++;
        const svar = await route.fetch();
        expect(svar.ok()).toBeTruthy();
        await route.fulfill({
          status: 500,
          json: { feil: 'Syntetisk tapt lagringssvar' },
        });
      });
      await page.route('**/workop/treffgjennomforing-og-oppfolging', (route) =>
        tillatOppfriskning
          ? route.continue()
          : route.fulfill({
              status: 500,
              json: { feil: 'Syntetisk hentefeil' },
            }),
      );
      if (handling === 'flytting') await flytt();
      else {
        await page
          .getByRole('button', { name: 'Fordel på nytt', exact: true })
          .click();
        await page
          .getByRole('dialog')
          .getByRole('button', { name: 'Fordel på nytt', exact: true })
          .click();
      }
      await expect(
        page.getByText('Tilstanden er ubekreftet', { exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Tilbake', exact: true }),
      ).toBeDisabled();
      await expect(
        page.getByRole('button', { name: 'Fordel på nytt', exact: true }),
      ).toBeDisabled();
      expect(skriver).toBe(1);
      tillatOppfriskning = true;
      await page
        .getByRole('button', { name: 'Hent på nytt', exact: true })
        .click();
      await expect(
        page.getByText('Tilstanden er ubekreftet', { exact: true }),
      ).toBeHidden();
      await expect(page.getByText(/Vi kunne ikke bekrefte/)).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Neste', exact: true }),
      ).toBeEnabled();
      const etter = await lesRekkefølge();
      if (handling === 'flytting') expect(etter).not.toEqual(før);
      expect(skriver).toBe(1);
      await page.reload();
      await expect(område).toBeVisible();
      expect(await lesRekkefølge()).toEqual(etter);
    });
  }
}

test('oppmøtekøen venter på bekreftet henting og beholder feil bare på berørt rad', async ({
  page,
}) => {
  await åpneTreffgjennomføring(page);
  const område = page.getByRole('region', { name: 'Oppmøte', exact: true });
  const første = område
    .getByRole('listitem')
    .filter({ hasText: 'Marius Etternavn01' });
  const andre = område
    .getByRole('listitem')
    .filter({ hasText: 'Emilie Etternavn02' });
  let slippFørste!: () => void;
  const vent = new Promise<void>((resolve) => {
    slippFørste = resolve;
  });
  let skriver = 0;
  await page.route('**/treffgjennomforing/oppmote', async (route) => {
    skriver++;
    if (skriver === 1) {
      await vent;
      await route.fulfill({
        status: 500,
        json: { feil: 'Syntetisk skrivefeil' },
      });
    } else await route.continue();
  });
  let tillatOppfriskning = false;
  await page.route('**/workop/treffgjennomforing-og-oppfolging', (route) =>
    tillatOppfriskning
      ? route.continue()
      : route.fulfill({
          status: 200,
          json: { ugyldig: 'Syntetisk ugyldig aggregat' },
        }),
  );
  try {
    await første.getByRole('checkbox').uncheck();
    await expect.poll(() => skriver).toBe(1);
    await andre.getByRole('checkbox').uncheck();
    await expect(lagringsstatus(page, 'Oppmøte')).toContainText('Lagrer');
    expect(skriver).toBe(1);
  } finally {
    slippFørste();
  }
  await expect(
    page.getByText('Tilstanden er ubekreftet', { exact: true }),
  ).toBeVisible();
  await expect(første.getByRole('checkbox')).toBeDisabled();
  await expect(andre.getByRole('checkbox')).toBeDisabled();
  expect(skriver).toBe(1);
  const andreLagring = page.waitForResponse('**/treffgjennomforing/oppmote');
  tillatOppfriskning = true;
  await page.getByRole('button', { name: 'Hent på nytt', exact: true }).click();
  expect((await andreLagring).ok()).toBeTruthy();
  await expect(
    page.getByRole('button', { name: 'Gå til rom og rotasjon' }),
  ).toBeEnabled();
  await expect(første.getByRole('checkbox')).toBeChecked();
  await expect(andre.getByRole('checkbox')).not.toBeChecked();
  await expect(andre.getByRole('checkbox')).toBeEnabled();
  await expect(
    første.getByText(/Vi kunne ikke bekrefte oppmøteendringen/),
  ).toBeVisible();
  await expect(
    andre.getByText(/Vi kunne ikke bekrefte oppmøteendringen/),
  ).toHaveCount(0);
  await expect(page.getByText(/Én eller flere oppmøteendringer/)).toBeVisible();
  expect(skriver).toBe(2);
  await første.getByRole('checkbox').uncheck();
  await expect(lagringsstatus(page, 'Oppmøte')).toContainText('Lagret');
  await expect(første.getByRole('checkbox')).toBeFocused();
  await expect(page.getByText(/Én eller flere oppmøteendringer/)).toBeHidden();
  await page.reload();
  await expect(første.getByRole('checkbox')).not.toBeChecked();
  await expect(andre.getByRole('checkbox')).not.toBeChecked();
});
