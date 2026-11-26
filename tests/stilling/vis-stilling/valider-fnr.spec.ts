import { validerFnr } from '@/util/validerFnr';
import { idnr } from '@navikt/fnrvalidator';
import { expect, test } from '@playwright/test';

const scenarioer: {
  navn: string;
  developer?: string;
  testmodus?: string;
  nodeEnv: 'development' | 'production' | 'test';
  godtas: boolean;
}[] = [
  { navn: 'lokalt', developer: 'local', nodeEnv: 'development', godtas: true },
  {
    navn: 'eksplisitt Playwright-flagg med NODE_ENV=production',
    testmodus: 'true',
    nodeEnv: 'production',
    godtas: true,
  },
  { navn: 'produksjon uten mock-flagg', nodeEnv: 'production', godtas: false },
  {
    navn: 'produksjon med deaktivert testmodus',
    testmodus: 'false',
    nodeEnv: 'production',
    godtas: false,
  },
  {
    navn: 'development uten eksplisitte mock-flagg',
    nodeEnv: 'development',
    godtas: false,
  },
  { navn: 'test uten eksplisitte mock-flagg', nodeEnv: 'test', godtas: false },
];

for (const { navn, developer, testmodus, nodeEnv, godtas } of scenarioer) {
  test(`FNR-validering: ${navn}`, () => {
    const før = process.env;
    try {
      process.env = { ...før, NODE_ENV: nodeEnv };
      delete process.env.NEXT_PUBLIC_DEVELOPER;
      delete process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE;
      if (developer !== undefined)
        process.env.NEXT_PUBLIC_DEVELOPER = developer;
      if (testmodus !== undefined)
        process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE = testmodus;
      for (const fnr of [
        '00000000040',
        '00000000041',
        '00000000042',
        '00000000043',
      ]) {
        expect(idnr(fnr).status).toBe('invalid');
        expect(validerFnr(fnr)).toBe(godtas);
      }
      for (const fnr of ['0000000040', '000000000040', '0000000004x']) {
        expect(validerFnr(fnr)).toBe(false);
      }
    } finally {
      process.env = før;
    }
  });
}
