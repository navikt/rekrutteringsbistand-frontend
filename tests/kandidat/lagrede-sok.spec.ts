import { LagredeSøkDomene } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import { Innsatsgruppe } from '@/app/kandidat/_ui/innsatsgrupper';
import {
  byggLagretSøkFilter,
  lagbareVerdier,
  normaliserLagretSøkFilter,
  tolkLagretSøkFilter,
  type KandidatSøkefiltre,
} from '@/app/kandidat/_util/lagredeSøkFilter';
import { Førerkortklasse } from '@/app/kandidat/kandidat-søk-filter/_ui/Førerkort';
import { HovedMålType } from '@/app/kandidat/kandidat-søk-filter/_ui/Hovedmål';
import { OmfangValg } from '@/app/kandidat/kandidat-søk-filter/_ui/OmfangValg';
import { PrioritertMålgruppe } from '@/app/kandidat/kandidat-søk-filter/_ui/PrioriterteMålgrupper';
import { Nivå } from '@/app/kandidat/kandidat-søk-filter/_ui/Utdanningsnivå';
import { gotoApp } from '@/tests/gotoApp';
import {
  brukEgenMockbruker,
  endepunktFor,
  opprettSøk,
  opprettStandardsøk,
  syntetiskNummer,
  tellLagringsforsøk,
  åpneLagreDialog,
  åpneMeny,
} from '@/tests/lagrede-sok/lagredeSøkHjelpere';
import { expect, test, type Page } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

const KANDIDATSØK = LagredeSøkDomene.KANDIDATSOK;

const arbeidsgivertilgang = {
  standard: 'alle',
  synlige: [...lagbareVerdier.porteføljer],
};

const tommeFiltre: KandidatSøkefiltre = {
  portefølje: 'alle',
  valgtKontor: [],
  innsatsgruppe: [],
  hovedmål: [],
  utdanningsnivå: [],
  prioritertMålgruppe: [],
  omfang: [],
  førerkort: [],
  ønsketSted: [],
  borPåØnsketSted: false,
  ønsketYrke: [],
  språk: [],
  kompetanse: [],
  arbeidserfaring: [],
};

const alleFiltre: KandidatSøkefiltre = {
  ...tommeFiltre,
  portefølje: 'valgtekontorer',
  valgtKontor: ['0301', '4601'],
  innsatsgruppe: [...lagbareVerdier.innsatsgrupper],
  hovedmål: [...lagbareVerdier.hovedmål],
  utdanningsnivå: [...lagbareVerdier.utdanningsnivåer],
  prioritertMålgruppe: [...lagbareVerdier.målgrupper],
  omfang: [...lagbareVerdier.omfang],
  førerkort: [...lagbareVerdier.førerkort],
  ønsketSted: [
    'Bergen (Kommune)',
    'Vestland (Fylke)',
    'Aurskog-Høland (Kommune)',
  ],
  borPåØnsketSted: true,
  ønsketYrke: ['Salg, butikk', 'Kokk'],
  språk: ['Engelsk', 'Norsk'],
  kompetanse: ['Truckførerbevis T1-T4', '50% stilling', 'C#'],
  arbeidserfaring: ['Servitør'],
};

const filterAlleVerdierFraBackend =
  'arbeidserfaring=Servit%C3%B8r&borDer=ja&forerkort=' +
  'A+-+Tung+motorsykkel%2CA1+-+Lett+motorsykkel%2CA2+-+Mellomtung+motorsykkel' +
  '%2CB+-+Personbil%2CBE+-+Personbil+med+tilhenger%2CC+-+Lastebil' +
  '%2CC1+-+Lett+lastebil%2CC1E+-+Lett+lastebil+med+tilhenger' +
  '%2CCE+-+Lastebil+med+tilhenger%2CD+-+Buss%2CD1+-+Minibuss' +
  '%2CD1E+-+Minibuss+med+tilhenger%2CDE+-+Buss+med+tilhenger' +
  '%2CS+-+Sn%C3%B8scooter%2CT+-+Traktor' +
  '&hovedmal=BEHOLDE_ARBEID%2COKE_DELTAKELSE%2CSKAFFE_ARBEID' +
  '&innsatsgruppe=GRADERT_VARIG_TILPASSET_INNSATS' +
  '%2CHAR_IKKE_GJELDENDE_14A_VEDTAK%2CSITUASJONSBESTEMT_INNSATS' +
  '%2CSPESIELT_TILPASSET_INNSATS%2CSTANDARD_INNSATS%2CVARIG_TILPASSET_INNSATS' +
  '&kompetanse=50%25+stilling%2CC%23%2CTruckf%C3%B8rerbevis+T1-T4' +
  '&kontor=0301%2C4601&malgruppe=hullICv%2Csenior%2Cunge' +
  '&omfang=DELTID%2CHELTID%2CHELTID_OG_DELTID' +
  '&portefolje=valgtekontorer&sprak=Engelsk%2CNorsk' +
  '&sted=Aurskog-H%C3%B8land+%28Kommune%29%2CBergen+%28Kommune%29' +
  '%2CVestland+%28Fylke%29' +
  '&utdanning=bachelor%2Cdoktorgrad%2Cfagskole%2Cmaster%2Cvideregaende' +
  '&yrke=Kokk%2CSalg%252C+butikk';

const søkefelt = (page: Page) =>
  page.getByRole('searchbox', {
    name: 'Søk etter jobbsøker (fnr/navn/CV-innhold)',
  });

test.describe('Serialisering av filtre i lagrede søk for kandidatsøk', () => {
  test('bygger eksakt filterstrengen bruker-api forventer, og kan lese den tilbake', () => {
    const filter = byggLagretSøkFilter(alleFiltre, arbeidsgivertilgang);

    expect(filter).toBe(filterAlleVerdierFraBackend);
    expect(normaliserLagretSøkFilter(filter, arbeidsgivertilgang)).toBe(
      filterAlleVerdierFraBackend,
    );
    expect(tolkLagretSøkFilter(filter, arbeidsgivertilgang)).toEqual({
      ...alleFiltre,
      innsatsgruppe: [...alleFiltre.innsatsgruppe].sort(),
      hovedmål: [...alleFiltre.hovedmål].sort(),
      utdanningsnivå: [...alleFiltre.utdanningsnivå].sort(),
      prioritertMålgruppe: [...alleFiltre.prioritertMålgruppe].sort(),
      omfang: [...alleFiltre.omfang].sort(),
      førerkort: [...alleFiltre.førerkort].sort(),
      valgtKontor: ['0301', '4601'],
      ønsketSted: [
        'Aurskog-Høland (Kommune)',
        'Bergen (Kommune)',
        'Vestland (Fylke)',
      ],
      ønsketYrke: ['Kokk', 'Salg, butikk'],
      språk: ['Engelsk', 'Norsk'],
      kompetanse: ['50% stilling', 'C#', 'Truckførerbevis T1-T4'],
    });
  });

  test('lagbare enumverdier samsvarer med valgene i filtergrensesnittet', () => {
    expect([...lagbareVerdier.innsatsgrupper].sort()).toEqual(
      Object.values(Innsatsgruppe).sort(),
    );
    expect([...lagbareVerdier.hovedmål].sort()).toEqual(
      Object.values(HovedMålType).sort(),
    );
    expect([...lagbareVerdier.utdanningsnivåer].sort()).toEqual(
      Object.values(Nivå).sort(),
    );
    expect([...lagbareVerdier.målgrupper].sort()).toEqual(
      Object.values(PrioritertMålgruppe).sort(),
    );
    expect([...lagbareVerdier.omfang].sort()).toEqual(
      Object.values(OmfangValg).sort(),
    );
    expect([...lagbareVerdier.førerkort].sort()).toEqual(
      Object.values(Førerkortklasse).sort(),
    );
  });

  test('utelater standardporteføljen og bevarer andre porteføljer', () => {
    for (const portefølje of lagbareVerdier.porteføljer) {
      expect(
        byggLagretSøkFilter(
          { ...tommeFiltre, portefølje },
          arbeidsgivertilgang,
        ),
      ).toBe(portefølje === 'alle' ? '' : `portefolje=${portefølje}`);
    }

    const jobbsøkerrettetTilgang = {
      standard: 'minebrukere',
      synlige: ['minebrukere', 'mittkontor', 'minekontorer'],
    };
    expect(
      byggLagretSøkFilter(
        { ...tommeFiltre, portefølje: 'minebrukere' },
        jobbsøkerrettetTilgang,
      ),
    ).toBe('');
    expect(
      byggLagretSøkFilter(
        { ...tommeFiltre, portefølje: 'alle' },
        jobbsøkerrettetTilgang,
      ),
    ).toBe('');
    expect(
      byggLagretSøkFilter(
        { ...tommeFiltre, portefølje: 'mittkontor' },
        jobbsøkerrettetTilgang,
      ),
    ).toBe('portefolje=mittkontor');
  });

  test('tar med fri tekst over 100 tegn, så lagre-dialogen kan stoppe den', () => {
    const langVerdi = `TEST-${'x'.repeat(96)}`;
    expect(
      byggLagretSøkFilter(
        { ...tommeFiltre, kompetanse: [langVerdi] },
        arbeidsgivertilgang,
      ),
    ).toBe(`kompetanse=${langVerdi}`);
  });
});

test.describe('Lagrede søk i jobbsøkersøket', () => {
  test('lagrer filtre og fritekst, og bruker søket fra menyen uten å sende filterdata til Umami', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await page.addInitScript(() => {
      const events: { name: string; data?: Record<string, unknown> }[] = [];
      Object.defineProperty(globalThis, '__umamiEvents', {
        configurable: true,
        value: events,
      });
      Object.defineProperty(globalThis, 'umami', {
        configurable: true,
        value: {
          track: (name: string, data?: Record<string, unknown>) =>
            events.push({ name, data }),
        },
      });
    });
    await gotoApp(page, '/kandidat?yrke=Kokk');

    await søkefelt(page).fill('testord-lager');
    await søkefelt(page).press('Enter');
    await expect(
      page.getByRole('button', { name: /testord-lager.*slett/i }),
    ).toBeVisible();
    await expect(page).not.toHaveURL(/testord-lager/);
    expect(
      await page.evaluate(() => JSON.stringify(sessionStorage)),
    ).not.toContain('testord-lager');
    await expect(page.getByRole('button', { name: 'Lagre søk' })).toBeEnabled();

    const lagringsforespørsel = page.waitForRequest(
      (request) =>
        request.method() === 'POST' &&
        request.url() === endepunktFor(KANDIDATSØK),
    );
    const dialog = await åpneLagreDialog(page);
    await dialog
      .getByRole('textbox', { name: 'Navn på søket' })
      .fill('Kokk og testord');
    await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();

    const lagringsrequest = await lagringsforespørsel;
    expect(lagringsrequest.postDataJSON()).toEqual({
      navn: 'Kokk og testord',
      filter: 'yrke=Kokk',
      fritekst: ['testord-lager'],
    });
    await expect(page.getByText('Lagret søk:')).toContainText(
      'Kokk og testord',
    );

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Vanlig søk/ }).click();
    await expect(page).not.toHaveURL(/yrke=Kokk/);
    await expect(
      page.getByRole('button', { name: /testord-lager.*slett/i }),
    ).toHaveCount(0);

    await åpneMeny(page);
    const brukRequest = page.waitForRequest(
      (request) =>
        request.method() === 'POST' &&
        request.url().includes('/api/bruker/lagrede-sok/kandidatsok/') &&
        request.url().endsWith('/bruk'),
    );
    await page.getByRole('menuitemradio', { name: /Kokk og testord/ }).click();
    await brukRequest;

    await expect(page).toHaveURL(/yrke=Kokk/);
    await expect(page).not.toHaveURL(/fritekst|testord-lager/);
    await expect(
      page.getByRole('button', { name: /testord-lager.*slett/i }),
    ).toBeVisible();
    await expect(page.getByText('Lagret søk:')).toContainText(
      'Kokk og testord',
    );

    const hendelser = await page.evaluate(
      () =>
        (
          globalThis as unknown as {
            __umamiEvents: {
              name: string;
              data?: Record<string, unknown>;
            }[];
          }
        ).__umamiEvents,
    );
    expect(
      hendelser.some(
        ({ data }) => data !== undefined && Object.hasOwn(data, 'filter'),
      ),
    ).toBe(false);
  });

  test('Jobbsøkere-menyen åpner med standardsøkets filtre', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(
      page,
      'Mitt kandidatsøk',
      'yrke=Kokk&sted=Bergen+%28Kommune%29',
      ['testord'],
      KANDIDATSØK,
    );
    await gotoApp(page, '/');

    await page.locator('a[aria-label="Jobbsøkere"]').click();

    await expect(page.getByText('Lagret søk:')).toContainText(
      'Mitt kandidatsøk',
    );
    await expect(page).toHaveURL(/yrke=Kokk/);
    await expect(page).toHaveURL(/sted=Bergen/);
    await expect(page).not.toHaveURL(/brukStandardsok|testord/);
    await expect(
      page.getByRole('button', { name: /testord.*slett/i }),
    ).toBeVisible();
  });

  test('brødsmulen «Jobbsøkere» bruker standardsøket, som menylenken', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettStandardsøk(
      page,
      'Mitt kandidatsøk',
      'yrke=Kokk',
      [],
      KANDIDATSØK,
    );
    await gotoApp(page, '/kandidat?yrke=Murer');

    await page.locator('a[href^="/kandidat/"]').first().click();
    await expect(page).toHaveURL(/\/kandidat\/[^/?]+/);
    const brødsmule = page
      .getByRole('navigation', { name: 'Brødsmulesti' })
      .getByRole('link', { name: 'Jobbsøkere' });
    await expect(brødsmule).toHaveAttribute(
      'href',
      '/kandidat?brukStandardsok=true',
    );
    await brødsmule.click();

    await expect(page.getByText('Lagret søk:')).toContainText(
      'Mitt kandidatsøk',
    );
    await expect(page).toHaveURL(/yrke=Kokk/);
    await expect(page).not.toHaveURL(/brukStandardsok|Murer/);
  });

  test('søkeknappen tømmer feltet, så et lagret søk ikke får gammel tekst', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Kokkesøk', 'yrke=Kokk', ['nyttord'], KANDIDATSØK);
    await gotoApp(page, '/kandidat');

    await søkefelt(page).fill('gammelord');
    await page.getByRole('button', { name: 'Søk', exact: true }).click();
    await expect(
      page.getByRole('button', { name: /gammelord.*slett/i }),
    ).toBeVisible();
    await expect(søkefelt(page)).toHaveValue('');

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Kokkesøk/ }).click();
    const nyttord = page.getByRole('button', { name: /nyttord.*slett/i });
    await expect(nyttord).toBeVisible();
    await expect(søkefelt(page)).toHaveValue('');

    await page.getByRole('button', { name: 'Søk', exact: true }).click();
    await expect(nyttord).toBeVisible();
    await expect(
      page.getByRole('button', { name: /gammelord.*slett/i }),
    ).toHaveCount(0);
  });

  test('Jobbsøkere-menyen viser vanlig søk når mockbrukeren ikke har standardsøk', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/');

    await page.locator('a[aria-label="Jobbsøkere"]').click();

    await expect(page).toHaveURL(/\/kandidat(?:\?|$)/);
    await expect(page).not.toHaveURL(/brukStandardsok/);
    await expect(
      page.getByRole('button', { name: 'Lagre søk' }),
    ).toBeDisabled();
    await åpneMeny(page);
    await expect(
      page.getByRole('menuitemradio', { name: /Vanlig søk/ }),
    ).toBeChecked();
    await expect(
      page.getByRole('menuitemradio', { name: /Vanlig søk/ }),
    ).toContainText('Standard');
  });

  test('11 sifre kan ikke legges til i kompetanse og arbeidserfaring og sendes ikke til forslagene', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    const forslagMedNummer: string[] = [];
    page.on('request', (request) => {
      if (
        request.url().includes('/suggest') &&
        request.postData()?.includes(syntetiskNummer)
      ) {
        forslagMedNummer.push(request.url());
      }
    });
    await gotoApp(page, '/kandidat');

    for (const felt of ['Kompetanse', 'Arbeidserfaring']) {
      const combobox = page.getByRole('combobox', { name: felt });
      await combobox.fill(syntetiskNummer);
      await combobox.press('Enter');
      await expect(
        page.getByText(`${felt} kan ikke inneholde fødselsnummer.`),
      ).toBeVisible();
    }

    await expect(page).not.toHaveURL(new RegExp(syntetiskNummer));
    await expect(
      page.getByRole('button', { name: new RegExp(syntetiskNummer) }),
    ).toHaveCount(0);
    expect(forslagMedNummer).toEqual([]);
  });

  test('et nummer delt over to verdier i kompetanse kan ikke legges til', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/kandidat');
    const combobox = page.getByRole('combobox', { name: 'Kompetanse' });
    await combobox.fill(syntetiskNummer.slice(0, 6));
    await combobox.press('Enter');
    await expect(page).toHaveURL(/kompetanse=/);

    await combobox.fill(syntetiskNummer.slice(6));
    await combobox.press('Enter');
    await expect(
      page.getByText('Kompetanse kan ikke inneholde fødselsnummer.'),
    ).toBeVisible();
    await expect(page).not.toHaveURL(new RegExp(syntetiskNummer.slice(6)));
  });

  test('verdier som ligner et fødselsnummer, fjernes fra en lenke', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(
      page,
      `/kandidat?kompetanse=Truckf%C3%B8rer,${syntetiskNummer}&arbeidserfaring=${syntetiskNummer.slice(0, 6)},${syntetiskNummer.slice(6)}`,
    );

    await expect(page).toHaveURL(/kompetanse=Truckf/);
    await expect(page).not.toHaveURL(/arbeidserfaring=/);
    expect(page.url()).not.toContain(syntetiskNummer.slice(6));
    await expect(
      page.getByRole('button', { name: /Truckfører.*slett/i }).first(),
    ).toBeVisible();
  });

  test('stanser lagring av kompetanse over 100 tegn med fast feilmelding', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    const lagringsforsøk = tellLagringsforsøk(page, KANDIDATSØK);
    const langVerdi = `TEST-${'x'.repeat(96)}`;
    await gotoApp(page, `/kandidat?kompetanse=${langVerdi}`);

    const dialog = await åpneLagreDialog(page);
    await dialog
      .getByRole('textbox', { name: 'Navn på søket' })
      .fill('Lang kompetanse');
    await dialog.getByRole('button', { name: 'Lagre', exact: true }).click();

    await expect(
      dialog.getByText(
        'En verdi i Kompetanse er for lang. Den kan ha opptil 100 tegn. Fjern den før du lagrer.',
      ),
    ).toBeVisible();
    await expect(dialog).toBeVisible();
    expect(lagringsforsøk.antall).toBe(0);
  });

  test('fritekst står ikke i sessionStorage etter refresh', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/kandidat');
    await søkefelt(page).fill('testord-scroll');
    await søkefelt(page).press('Enter');
    await expect(
      page.getByRole('button', { name: /testord-scroll.*slett/i }),
    ).toBeVisible();
    const resultatliste = page
      .locator('.scroll-container')
      .filter({ has: page.locator('ul') })
      .first();
    await expect(resultatliste).toBeVisible();

    await page.reload();
    await expect(resultatliste).toBeVisible();
    expect(
      await page.evaluate(() => JSON.stringify({ ...sessionStorage })),
    ).not.toContain('testord-scroll');
  });

  test('fritekst står etter en jobbsøker og tilbakeknappen, men ikke etter refresh', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/kandidat');
    await søkefelt(page).fill('jensen');
    await søkefelt(page).press('Enter');
    const chip = page.getByRole('button', { name: /jensen.*slett/i });
    await expect(chip).toBeVisible();

    await page
      .getByRole('link', { name: /jensen/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/kandidat\/[^/?]+/);
    await page.goBack();
    await expect(chip).toBeVisible();
    expect(
      await page.evaluate(() => JSON.stringify({ ...sessionStorage })),
    ).not.toContain('jensen');

    await page.reload();
    await expect(søkefelt(page)).toBeVisible();
    await expect(chip).toHaveCount(0);
  });

  test('fritekst med 11 sifre huskes ikke etter en jobbsøker og tilbakeknappen', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await gotoApp(page, '/kandidat');
    await søkefelt(page).fill(syntetiskNummer);
    await søkefelt(page).press('Enter');
    const chip = page.getByRole('button', {
      name: new RegExp(`${syntetiskNummer}.*slett`, 'i'),
    });
    await expect(chip).toBeVisible();

    await page.locator('a[href^="/kandidat/"]').first().click();
    await expect(page).toHaveURL(/\/kandidat\/[^/?]+/);
    await page.goBack();
    await expect(søkefelt(page)).toBeVisible();
    await expect(page.locator('a[href^="/kandidat/"]').first()).toBeVisible();
    await expect(chip).toHaveCount(0);
  });

  test('viser lagrede søk i det responsive Filtrer-panelet', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(page, 'Smalt kandidatsøk', 'yrke=Kokk', [], KANDIDATSØK);
    await page.setViewportSize({ width: 375, height: 800 });
    await gotoApp(page, '/kandidat');

    await page.getByRole('button', { name: 'Filtrer' }).click();
    const panel = page.getByRole('dialog', { name: 'Filtrer' });
    await expect(panel).toBeVisible();
    await panel.getByRole('button', { name: 'Lagrede søk' }).click();
    await page
      .getByRole('menuitemradio', { name: /Smalt kandidatsøk/ })
      .click();

    await expect(page).toHaveURL(/yrke=Kokk/);
    await expect(panel.getByText('Lagret søk:')).toContainText(
      'Smalt kandidatsøk',
    );
  });
});

test.describe('Lagrede søk for jobbsøkerrettet veileder', () => {
  test.use({ storageState: 'tests/.auth/jobbsokerrettet.json' });

  test('en usynlig Alle-portefølje fra lagret søk blir standardporteføljen', async ({
    page,
  }) => {
    await brukEgenMockbruker(page);
    await opprettSøk(
      page,
      'Alle-porteføljen',
      'portefolje=alle',
      [],
      KANDIDATSØK,
    );
    await gotoApp(page, '/kandidat');

    await åpneMeny(page);
    await page.getByRole('menuitemradio', { name: /Alle-porteføljen/ }).click();

    await expect(page).not.toHaveURL(/portefolje=alle/);
    await expect(page).not.toHaveURL(/portefolje=/);
    await expect(
      page.getByRole('button', { name: 'Mine brukere' }),
    ).toBeVisible();
    await expect(page.getByText('Lagret søk:')).toContainText(
      'Alle-porteføljen',
    );
  });
});

test('Finn kandidater for stilling og rekrutteringstreff bruker ikke lagrede søk', async ({
  page,
}) => {
  let hentetLagredeSøk = false;
  page.on('request', (request) => {
    if (request.url().includes('/api/bruker/lagrede-sok/')) {
      hentetLagredeSøk = true;
    }
  });

  await gotoApp(page, '/stilling/minStilling/finn-kandidater');
  await expect(søkefelt(page)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Lagrede søk' })).toHaveCount(
    0,
  );
  await expect(page.getByRole('button', { name: 'Lagre søk' })).toHaveCount(0);

  await gotoApp(page, '/rekrutteringstreff/publisert/finn-kandidater');
  await expect(søkefelt(page)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Lagrede søk' })).toHaveCount(
    0,
  );
  await expect(page.getByRole('button', { name: 'Lagre søk' })).toHaveCount(0);
  expect(hentetLagredeSøk).toBe(false);
});
