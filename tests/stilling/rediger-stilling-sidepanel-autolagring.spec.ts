import { gotoApp } from '@/tests/gotoApp';
import { expect, Request, test } from '@playwright/test';

test.use({
  storageState: 'tests/.auth/arbeigsgiverrettet.json',
  // Smal visning gjør at sidepanelet vises som et ark bak «Vis sidepanel».
  viewport: { width: 680, height: 1080 },
});

const stillingUrl = '**/api/stilling/rekrutteringsbistandstilling/nyStilling';
const oppdaterStillingUrl = '**/api/stilling/oppdater-stilling';

const erLagring = (request: Request) =>
  request.method() === 'PUT' && request.url().includes('oppdater-stilling');

test('Åpning av sidepanel under autolagring beholder og lagrer siste felt', async ({
  page,
}) => {
  // Backend setter nytt «updated»-tidspunkt ved hver lagring.
  let antallLagringer = 0;
  let sisteKontaktliste: unknown[] | undefined;

  await page.route(oppdaterStillingUrl, async (route) => {
    const body = route.request().postDataJSON();
    antallLagringer += 1;
    sisteKontaktliste = body.stilling.contactList;
    await route.fulfill({
      json: {
        ...body,
        stilling: { ...body.stilling, versjon: antallLagringer + 1 },
      },
    });
  });

  await page.route(stillingUrl, async (route) => {
    const respons = await route.fetch();
    const data = await respons.json();
    data.stilling.updated = new Date(
      Date.UTC(2025, 1, 21, 22, 42, 20 + antallLagringer),
    ).toISOString();
    if (sisteKontaktliste) {
      data.stilling.contactList = sisteKontaktliste;
    }
    await route.fulfill({ response: respons, json: data });
  });

  await gotoApp(page, '/stilling/nyStilling/rediger');

  const førsteLagring = page.waitForRequest(erLagring);
  await page.getByRole('textbox', { name: 'Navn', exact: true }).fill('Ola');
  await førsteLagring;
  await expect(page.getByText(/^Lagret for/)).toBeVisible();

  const epost = 'ola.nordmann@nav.no';
  const lagringAvEpost = page.waitForRequest(
    (request) =>
      erLagring(request) && (request.postData() ?? '').includes(epost),
    { timeout: 15_000 },
  );

  await page.getByRole('textbox', { name: 'E-post' }).fill(epost);
  await expect(page.getByText('Lagrer...')).toBeVisible();
  await page.getByRole('button', { name: 'Vis sidepanel' }).click();

  const sidepanel = page.getByRole('dialog');
  await expect(
    sidepanel.getByRole('heading', { name: 'Gjør klart til publisering' }),
  ).toBeVisible();

  await lagringAvEpost;
  await expect(sidepanel).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(sidepanel).toBeHidden();
  await expect(page.getByRole('textbox', { name: 'E-post' })).toHaveValue(
    epost,
  );
});
