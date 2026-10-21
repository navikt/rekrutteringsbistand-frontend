import { kandidatHistorikkSchema } from '@/app/api/kandidat/schema.zod';
import { ESStillingPropertiesSchema } from '@/app/api/stillings-sok/schema/stillingPropertiesSchema.zod';
import { expect, test } from '@playwright/test';

test.describe('Zod-skjemaer godtar data fra prod', () => {
  test('kandidathistorikk godtar lagtTilAvEpost som null', () => {
    const resultat = kandidatHistorikkSchema
      .pick({ lagtTilAvEpost: true })
      .safeParse({ lagtTilAvEpost: null });

    expect(resultat.success).toBe(true);
  });

  test('stillingsegenskaper godtar classification_esco_code som tall og tekst', () => {
    expect(
      ESStillingPropertiesSchema.safeParse({ classification_esco_code: 9999 })
        .success,
    ).toBe(true);
    expect(
      ESStillingPropertiesSchema.safeParse({
        classification_esco_code: 'http://data.europa.eu/esco/isco/c2512',
      }).success,
    ).toBe(true);
  });
});
