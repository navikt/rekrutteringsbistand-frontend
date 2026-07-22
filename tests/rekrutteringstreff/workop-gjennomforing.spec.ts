import { gotoApp } from '@/tests/gotoApp';
import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/.auth/arbeigsgiverrettet.json' });

test('registrerer ønsker og fordeler speedintervju i femstegsflyten', async ({
  page,
}) => {
  await gotoApp(page, '/rekrutteringstreff/workop');

  await page.getByRole('tab', { name: 'WorkOp-gjennomføring' }).click();
  await expect(
    page.getByText('20 møtt · 5 rom · 5 arbeidsgivere'),
  ).toBeVisible();
  const stepper = page.getByRole('list', { name: 'WorkOp-gjennomføring' });
  await expect(stepper.getByText('Oppmøte og oppsett')).toBeVisible();
  await expect(stepper.getByText('Rom og rotasjon')).toBeVisible();
  await expect(stepper.getByText('Ønsker')).toBeVisible();
  await expect(stepper.getByText('Intervjufordeling')).toBeVisible();
  await expect(stepper.getByText('Vurdering')).toBeVisible();

  await page.getByRole('button', { name: 'Sett opp møteplan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Romfordeling' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Neste' }).click();

  const førsteØnske = page.getByRole('checkbox', {
    name: /Etternavn01, Marius Arbeidsgiver 1/,
  });
  await førsteØnske.click();
  await expect(førsteØnske).toBeChecked();
  await expect(
    page.getByRole('row', { name: /Etternavn01, Marius/ }),
  ).toContainText('1');
  await page.getByRole('button', { name: 'Neste' }).click();

  const førsteJobbsøkerRad = page.getByRole('row', {
    name: /Etternavn01, Marius/,
  });
  await expect(førsteJobbsøkerRad.getByText('Ikke ønsket')).toHaveCount(4);
  const førsteTildeling = page.getByRole('checkbox', {
    name: /Etternavn01, Marius Arbeidsgiver 1/,
  });
  await førsteTildeling.click();
  await expect(førsteTildeling).toBeChecked();
  await expect(
    page.getByRole('columnheader', {
      name: /Arbeidsgiver 1 1 tildelt/,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('row', { name: /Etternavn01, Marius/ }),
  ).toContainText('1');

  await page.getByRole('button', { name: 'Neste' }).click();
  await expect(
    page.getByText(
      'Vurderingsmatrisen bygges i neste fase. Intervjutildelingene er klare som grunnlag.',
    ),
  ).toBeVisible();
  await expect(page.getByRole('combobox')).toHaveCount(0);
});
