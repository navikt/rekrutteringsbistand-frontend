import type { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import {
  RekrutteringstreffKategori,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { gotoApp } from '@/tests/gotoApp';
import { expect, type Page, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const treffId = 'syntetisk-workop-direktelenke';
const ident = 'SYNTETISK-MEDEIER';
const opprinneligeEiere = ['SYNTETISK-EIER-EN', 'SYNTETISK-EIER-TO'];

async function mockTreff(
  page: Page,
  {
    kategori = RekrutteringstreffKategori.WORKOP,
    avvis = false,
    avvisFormidlingsliste = false,
    avvisFormidlingsjobbsøkere = false,
  }: {
    kategori?: RekrutteringstreffDTO['kategori'];
    avvis?: boolean;
    avvisFormidlingsliste?: boolean;
    avvisFormidlingsjobbsøkere?: boolean;
  } = {},
) {
  const treff: RekrutteringstreffDTO = {
    id: treffId,
    tittel: 'Syntetisk treff for direktelenke',
    beskrivelse: null,
    kategori,
    status: RekrutteringstreffStatus.PUBLISERT,
    fraTid: '2099-01-01T10:00:00+01:00',
    tilTid: '2099-01-01T12:00:00+01:00',
    svarfrist: '2098-12-31T12:00:00+01:00',
    gateadresse: 'Syntetisk teststed',
    postnummer: null,
    poststed: null,
    kommune: null,
    kommunenummer: null,
    fylke: null,
    fylkesnummer: null,
    opprettetAvPersonNavident: opprinneligeEiere[0],
    opprettetAvNavkontorEnhetId: 'SYNTETISK-KONTOR',
    opprettetAvTidspunkt: '2026-01-01T10:00:00+01:00',
    antallArbeidsgivere: 0,
    antallJobbsøkere: 0,
    antallJobbsøkereSvartJa: 0,
    antallJobbsøkereFåttJobb: 0,
    eiere: [...opprinneligeEiere],
    kontorer: ['SYNTETISK-KONTOR'],
    sistEndret: '2026-01-01T10:00:00+01:00',
    sistEndretAv: opprinneligeEiere[0],
  };
  const bakgrunnskall: string[] = [];
  const formidlingskall: string[] = [];
  let antallLagringer = 0;

  page.on('request', (request) => {
    const path = new URL(request.url()).pathname;
    if (!path.includes(`/${treffId}/`)) return;
    if (/\/(jobbsoker\/formidling|formidling\/liste)\//.test(path)) {
      formidlingskall.push(path);
      return;
    }
    if (/\/(jobbsoker|treffgjennomforing)(\/|$)/.test(path)) {
      bakgrunnskall.push(path);
    }
  });
  await page.route('**/api/modia/decorator', (route) =>
    route.fulfill({
      json: {
        ident,
        navn: 'Syntetisk Testmedarbeider',
        fornavn: 'Syntetisk',
        etternavn: 'Testmedarbeider',
        enheter: [{ enhetId: 'SYNTETISK-KONTOR', navn: 'Nav Testkontor' }],
      },
    }),
  );
  await page.route(`**/api/rekrutteringstreff/${treffId}`, (route) =>
    route.fulfill({ json: treff }),
  );
  await page.route(`**/${treffId}/arbeidsgivere`, (route) =>
    route.fulfill({ json: [] }),
  );
  await page.route(`**/${treffId}/innlegg`, (route) =>
    route.fulfill({ json: [] }),
  );
  await page.route(`**/${treffId}/jobbsoker/formidling/*`, (route) =>
    route.fulfill(
      avvisFormidlingsjobbsøkere
        ? { status: 403, json: { feil: 'Syntetisk avvist formidlingstilgang' } }
        : { json: { totalt: 1, side: 1, jobbsøkere: [] } },
    ),
  );
  await page.route(`**/${treffId}/formidling/liste/*`, (route) =>
    route.fulfill(
      avvisFormidlingsliste
        ? { status: 403, json: { feil: 'Syntetisk avvist formidlingstilgang' } }
        : { json: [] },
    ),
  );
  await page.route(`**/${treffId}/eiere/meg`, async (route) => {
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toEqual({
      eierNavn: 'Syntetisk Testmedarbeider',
    });
    antallLagringer++;
    if (avvis) {
      await route.fulfill({
        status: 403,
        json: { feil: 'Syntetisk avvist medeierskap' },
      });
    } else {
      treff.eiere = [...new Set([...treff.eiere, ident])];
      await route.fulfill({ status: 200, body: '' });
    }
  });
  return {
    treff,
    bakgrunnskall,
    formidlingskall,
    antallLagringer: () => antallLagringer,
  };
}

async function forventIkkeEier(
  page: Page,
  {
    formidlingsfane = false,
    harFormidlingsfane = true,
    kanOppretteFormidling = true,
  } = {},
) {
  if (formidlingsfane) {
    await expect(
      page.getByRole('tab', { name: /Formidlinger/ }),
    ).toHaveAttribute('aria-selected', 'true');
    await expect(
      page.getByText('Ingen formidlinger er registrert for dette treffet'),
    ).toBeVisible();
  } else {
    await expect(
      page.getByRole('heading', { name: 'Syntetisk treff for direktelenke' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Om treffet', exact: true }),
    ).toBeVisible();
  }
  await expect(page.getByRole('tab')).toHaveCount(harFormidlingsfane ? 2 : 0);
  await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toHaveCount(0);
  await expect(
    page.getByRole('tab', { name: 'Treffgjennomføring og oppfølging' }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'Rediger', exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'Opprett formidling' }),
  ).toHaveCount(kanOppretteFormidling ? (formidlingsfane ? 2 : 1) : 0);
  await expect(page.getByRole('textbox', { name: 'Tittel' })).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'Finn og foreslå jobbsøkere' }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: /Legg til jobbsøker/ }),
  ).toHaveCount(0);
}

for (const inngang of [
  '',
  '?visFane=treffgjennomforing',
  '?visFane=formidlinger',
  '/rediger',
  '/finn-kandidater',
  '/finn-kandidater/syntetisk-kandidat',
]) {
  test(`WorkOp viser vanlig ikke-eiervisning fra direktelenke ${inngang}`, async ({
    page,
  }) => {
    const { bakgrunnskall } = await mockTreff(page);
    await gotoApp(page, `/rekrutteringstreff/${treffId}${inngang}`);
    await forventIkkeEier(page, {
      formidlingsfane: inngang === '?visFane=formidlinger',
    });
    await expect(
      page.getByRole('button', { name: 'Legg til meg som medeier' }),
    ).toBeVisible();
    expect(bakgrunnskall).toEqual([]);
  });
}

test('bekreftet medeierskap gir eierfunksjoner uten oppfriskning og bevarer eksisterende eiere', async ({
  page,
}) => {
  const state = await mockTreff(page);
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  await forventIkkeEier(page);
  await page.getByRole('button', { name: 'Legg til meg som medeier' }).click();
  await forventIkkeEier(page);
  expect(state.treff.eiere).toEqual(opprinneligeEiere);
  expect(state.bakgrunnskall).toEqual([]);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Bekreft' })
    .click();

  await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Finn og foreslå jobbsøkere' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Legg til jobbsøkere', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('tab', { name: 'Treffgjennomføring og oppfølging' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Flere handlinger' }).click();
  await expect(
    page.getByRole('button', { name: 'Rediger', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Legg til meg som medeier' }),
  ).toHaveCount(0);
  expect(state.antallLagringer()).toBe(1);
  expect(state.treff.eiere).toEqual([...opprinneligeEiere, ident]);

  await page.reload();
  await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toBeVisible();
  expect(state.antallLagringer()).toBe(1);
});

test('avvist medeierskap gir ikke eierfunksjoner eller deltakerkall', async ({
  page,
}) => {
  const state = await mockTreff(page, { avvis: true });
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  await page.getByRole('button', { name: 'Legg til meg som medeier' }).click();
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Bekreft' })
    .click();
  await expect(
    page.getByText('Klarte ikke å legge til deg som medeier.'),
  ).toBeVisible();
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Avbryt' })
    .click();
  await forventIkkeEier(page);
  expect(state.treff.eiere).toEqual(opprinneligeEiere);
  expect(state.bakgrunnskall).toEqual([]);
  await page.reload();
  await forventIkkeEier(page);
});

test('jobbsøkerrettet rolle kan se WorkOp, men ikke bli medeier', async ({
  page,
  context,
}) => {
  await context.addCookies([
    {
      name: 'DEV-ROLLE',
      value: 'AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET',
      domain: 'localhost',
      path: '/',
    },
  ]);
  const { bakgrunnskall } = await mockTreff(page);
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  await forventIkkeEier(page);
  await expect(
    page.getByRole('button', { name: 'Legg til meg som medeier' }),
  ).toHaveCount(0);
  expect(bakgrunnskall).toEqual([]);
});

for (const [rolle, variant] of [
  ['AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET', 'alle'],
  ['AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET', 'mittkontor'],
] as const) {
  test(`WorkOp lar ikke-eier åpne formidlinger og opprette-dialog med vanlig tilgang: ${rolle}`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: 'DEV-ROLLE', value: rolle, domain: 'localhost', path: '/' },
    ]);
    const { bakgrunnskall, formidlingskall } = await mockTreff(page);
    await gotoApp(page, `/rekrutteringstreff/${treffId}`);
    await forventIkkeEier(page);
    await page.getByRole('tab', { name: /Formidlinger/ }).click();
    await forventIkkeEier(page, { formidlingsfane: true });
    await page
      .getByRole('button', { name: 'Opprett formidling' })
      .last()
      .click();
    await expect(
      page
        .getByRole('dialog', { name: 'Opprett formidling' })
        .getByRole('heading', { name: 'Velg arbeidsgiver (steg 1 av 4)' }),
    ).toBeVisible();
    expect(formidlingskall).toContain(
      `/api/rekrutteringstreff/${treffId}/jobbsoker/formidling/${variant}`,
    );
    expect(formidlingskall).toContain(
      `/api/rekrutteringstreff/${treffId}/formidling/liste/${variant}`,
    );
    expect(formidlingskall.every((path) => path.endsWith(`/${variant}`))).toBe(
      true,
    );
    expect(bakgrunnskall).toEqual([]);
  });
}

test('WorkOp gir ikke arbeidsgiverrettet ikke-eier formidlingstilgang uten treffkontor', async ({
  page,
}) => {
  const { treff, bakgrunnskall, formidlingskall } = await mockTreff(page);
  treff.kontorer = ['SYNTETISK-ANNET-KONTOR'];
  await gotoApp(page, `/rekrutteringstreff/${treffId}?visFane=formidlinger`);
  await forventIkkeEier(page, {
    harFormidlingsfane: false,
    kanOppretteFormidling: false,
  });
  expect(formidlingskall).toEqual([]);
  expect(bakgrunnskall).toEqual([]);
});

for (const avvisFormidlingsjobbsøkere of [false, true]) {
  test(`WorkOp respekterer 403 for formidlinger uten å åpne eierfunksjoner, avvist oppretting: ${avvisFormidlingsjobbsøkere}`, async ({
    page,
  }) => {
    const { bakgrunnskall, formidlingskall } = await mockTreff(page, {
      avvisFormidlingsliste: true,
      avvisFormidlingsjobbsøkere,
    });
    await gotoApp(page, `/rekrutteringstreff/${treffId}?visFane=formidlinger`);
    await forventIkkeEier(page, {
      harFormidlingsfane: false,
      kanOppretteFormidling: !avvisFormidlingsjobbsøkere,
    });
    await expect(
      page.getByRole('button', { name: 'Legg til meg som medeier' }),
    ).toBeVisible();
    expect(formidlingskall).toContain(
      `/api/rekrutteringstreff/${treffId}/formidling/liste/alle`,
    );
    expect(bakgrunnskall).toEqual([]);
  });
}

test('ordinære treff beholder ikke-eiers tilgang til formidlinger', async ({
  page,
}) => {
  await mockTreff(page, {
    kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
  });
  await gotoApp(page, `/rekrutteringstreff/${treffId}`);
  await expect(page.getByRole('tab', { name: /Formidlinger/ })).toBeVisible();
  await expect(page.getByRole('tab', { name: /Jobbsøkere/ })).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'Legg til meg som medeier' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Finn og foreslå jobbsøkere' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Legg til jobbsøkere', exact: true }),
  ).toBeVisible();
});

for (const rolle of [
  'AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET',
  'AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET',
  'AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER',
]) {
  test(`WorkOp tillater kandidatsøk for eier eller utvikler: ${rolle}`, async ({
    page,
    context,
  }) => {
    await context.addCookies([
      { name: 'DEV-ROLLE', value: rolle, domain: 'localhost', path: '/' },
    ]);
    const { treff } = await mockTreff(page);
    if (!rolle.endsWith('UTVIKLER')) treff.eiere.push(ident);
    let tillegg = 0;
    await page.route(`**/${treffId}/jobbsoker`, (route) => {
      expect(route.request().method()).toBe('POST');
      tillegg++;
      return route.fulfill({ status: 201, body: '' });
    });
    await gotoApp(page, `/rekrutteringstreff/${treffId}/finn-kandidater`);
    await expect(
      page.getByRole('button', { name: 'Legg til jobbsøkere', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('checkbox', { name: 'Checkbox' }).first(),
    ).toBeVisible();
    await page.getByRole('checkbox', { name: 'Checkbox' }).first().check();
    await page
      .getByRole('button', { name: 'Legg til jobbsøkere', exact: true })
      .click();
    await expect(
      page.getByText('1 kandidat lagret i rekrutteringstreff'),
    ).toBeVisible();
    expect(tillegg).toBe(1);
  });
}

test('jobbsøkerrettet ikke-eier kan ikke bruke direkte kandidatlenke til WorkOp', async ({
  page,
  context,
}) => {
  await context.addCookies([
    {
      name: 'DEV-ROLLE',
      value: 'AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET',
      domain: 'localhost',
      path: '/',
    },
  ]);
  const { bakgrunnskall } = await mockTreff(page);
  await gotoApp(
    page,
    `/rekrutteringstreff/${treffId}/finn-kandidater/syntetisk-kandidat`,
  );
  await forventIkkeEier(page);
  expect(bakgrunnskall).toEqual([]);
});

test('delt treffvelger skjuler WorkOp uten eierskap og lagrer bare tilgjengelige valg', async ({
  page,
}) => {
  const { treff } = await mockTreff(page);
  const egneId = 'syntetisk-eget-workop';
  const vanligId = 'syntetisk-vanlig-treff';
  const sokTreff = {
    ...treff,
    publisertStatus: null,
    opprettetAv: opprinneligeEiere[0],
  };
  await page.route('**/api/rekrutteringstreff/sok?**', (route) =>
    route.fulfill({
      json: {
        treff: [
          sokTreff,
          {
            ...sokTreff,
            id: egneId,
            tittel: 'Syntetisk eget WorkOp',
            eiere: [ident],
          },
          {
            ...sokTreff,
            id: vanligId,
            tittel: 'Syntetisk vanlig treff',
            kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
          },
        ],
        antallTotalt: 3,
        side: 1,
        antallPerSide: 20,
        kategoriaggregering: [],
        statusaggregering: [],
        publisertstatusaggregering: [],
        geografiaggregering: {
          fylkesnummeraggregering: [],
          kommunenummeraggregering: [],
        },
      },
    }),
  );
  const lagret: string[] = [];
  await page.route('**/api/rekrutteringstreff/*/jobbsoker', (route) => {
    lagret.push(new URL(route.request().url()).pathname.split('/').at(-2)!);
    return route.fulfill({ status: 201, body: '' });
  });
  await gotoApp(page, '/kandidat');
  await page.getByRole('checkbox', { name: 'Checkbox' }).first().check();
  await page
    .getByRole('button', { name: 'Lagre i rekrutteringstreff', exact: true })
    .click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('link', { name: treff.tittel })).toHaveCount(0);
  await expect(
    dialog.getByRole('link', { name: 'Syntetisk eget WorkOp' }),
  ).toBeVisible();
  await expect(
    dialog.getByRole('link', { name: 'Syntetisk vanlig treff' }),
  ).toBeVisible();
  await dialog.getByRole('checkbox', { name: 'Velg alle rader' }).check();
  await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  expect(lagret.sort()).toEqual([egneId, vanligId].sort());
});
